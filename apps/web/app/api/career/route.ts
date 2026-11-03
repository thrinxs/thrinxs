import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { dbInsert } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, level, message } = body

    await dbInsert("career_applications", {
      name, email, phone, level, message,
    })

    await resend.emails.send({
      from: "Thrinxs Website <no-reply@thrinxs.com.ng>",
      to: "info@thrinxs.com.ng",
      subject: `New Career Application — ${level}: ${name}`,
      html: `<h2>New Career Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Level:</strong> ${level}</p>
        <p><strong>Message:</strong></p><p>${message}</p>`,
    }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Career route error:", err)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
