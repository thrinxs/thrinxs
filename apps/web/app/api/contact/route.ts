import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { dbInsert } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    await dbInsert("contact_submissions", {
      name, email,
      phone: phone || null,
      subject: subject || null,
      message,
    })

    await resend.emails.send({
      from: "Thrinxs Website <no-reply@thrinxs.com.ng>",
      to: "info@thrinxs.com.ng",
      subject: `New Contact Message: ${subject || "No subject"}`,
      html: `<h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject || "Not provided"}</p>
        <p><strong>Message:</strong></p><p>${message}</p>`,
    }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact route error:", err)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
