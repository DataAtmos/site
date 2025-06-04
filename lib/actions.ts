"use server"

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

type WaitlistResponse = {
  status: "success" | "error"
  message?: string
  isNew?: boolean
}

export async function joinWaitlist(email: string, type: string): Promise<WaitlistResponse> {
  try {
    if (!email || !email.includes("@")) {
      return { status: "error", message: "Please provide a valid email address" }
    }

    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    const existingUser = await sql`SELECT * FROM waitlist WHERE email = ${email}`
    const isNew = existingUser.length === 0

    if (isNew) {
      await sql`INSERT INTO waitlist (email, type) VALUES (${email}, ${type})`
    }

    const totalCount = await sql`SELECT COUNT(*) FROM waitlist`
    const count = totalCount[0].count

    await sendSlackNotification({ email, type, isNew, totalCount: Number(count) })

    return { status: "success", isNew }
  } catch (error) {
    console.error("Error joining waitlist:", error)
    return { status: "error", message: "Failed to join waitlist. Please try again later." }
  }
}

async function sendSlackNotification({
  email,
  type,
  isNew,
  totalCount,
}: {
  email: string
  type: string
  isNew: boolean
  totalCount: number
}) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  const message = isNew
    ? `New waitlist entry:\nEmail: ${email}\nType: ${type}\nTotal waitlist count: ${totalCount}.`
    : `Repeat signup attempt:\nEmail: ${email}\nType: ${type}\nTotal waitlist count: ${totalCount}.`

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    })
  } catch (error) {
    console.error("Error sending Slack notification:", error)
  }
}
