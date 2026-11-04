import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { dbInsert } from "@/lib/supabase"


export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const { name, email, phone, country, company, services, notes, refCode, region } = body

    await dbInsert("get_started_submissions", {
      name, email, phone,
      country: country || null,
      company: company || null,
      services: JSON.stringify(services || []),
      notes: notes || null,
      ref_code: refCode || null,
      region: region || "intl",
    })

    const serviceList = Array.isArray(services)
      ? services.map((s: { service: string; option: string }) => `${s.service} — ${s.option}`).join("<br/>")
      : "None selected"

    await resend.emails.send({
      from: "Thrinxs Website <no-reply@thrinxs.com.ng>",
      to: "info@thrinxs.com.ng",
      subject: `New Project Enquiry from ${name}`,
      html: `<h2>New Get Started Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Ref Code:</strong> ${refCode || "None"}</p>
        <p><strong>Services:</strong><br/>${serviceList}</p>
        <p><strong>Notes:</strong> ${notes || "None"}</p>`,
    }).catch(() => {})

    await resend.emails.send({
      from: "Thrinxs <no-reply@thrinxs.com.ng>",
      to: email,
      subject: "We received your enquiry — Thrinxs",
      html: `<h2>Hi ${name},</h2>
        <p>Thank you for reaching out to Thrinxs. We have received your project enquiry and our team will be in touch within 1 business day.</p>
        <p>If you have any urgent questions, email us at info@thrinxs.com.ng or WhatsApp +234 903 344 0966.</p>
        <p>The Thrinxs Team</p>`,
    }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Get started route error:", err)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
