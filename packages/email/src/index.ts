import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM   = process.env.EMAIL_FROM ?? 'noreply@thrinxs.com.ng'

export async function sendEmail({ to, subject, html }: { to: string | string[]; subject: string; html: string }) {
  return resend.emails.send({ from: FROM, to, subject, html })
}

export const emailTemplates = {
  welcome: (name: string) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h1 style="color:#0284c7;">Welcome to Thrinxs CMS, ${name}!</h1>
      <p>Your account has been created. Start managing your content today.</p>
      <a href="${process.env.NEXT_PUBLIC_CMS_URL}"
         style="background:#0284c7;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;margin-top:16px;">
        Go to Dashboard
      </a>
    </div>`,

  invite: (inviterName: string, orgName: string, inviteUrl: string) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h1 style="color:#0284c7;">You have been invited!</h1>
      <p>${inviterName} invited you to join <strong>${orgName}</strong> on Thrinxs CMS.</p>
      <a href="${inviteUrl}"
         style="background:#0284c7;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;margin-top:16px;">
        Accept Invitation
      </a>
    </div>`,

  passwordReset: (resetUrl: string) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h1 style="color:#0284c7;">Reset your password</h1>
      <p>This link expires in 1 hour.</p>
      <a href="${resetUrl}"
         style="background:#0284c7;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;margin-top:16px;">
        Reset Password
      </a>
    </div>`,
}
