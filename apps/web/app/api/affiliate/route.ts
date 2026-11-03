import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    await prisma.affiliateApplication.create({
      data: { name, email, phone, company: company || null, message },
    });

    await resend.emails.send({
      from: "Thrinxs Website <no-reply@thrinxs.com.ng>",
      to: "info@thrinxs.com.ng",
      subject: `New Affiliate Application — ${name}`,
      html: `<h2>New Affiliate Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>How they plan to promote:</strong></p><p>${message}</p>`,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Affiliate route error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}