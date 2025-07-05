import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const pricing = {
  "One Time": {
    "1 RK": "900",
    "1 BHK": "1200",
    "2 BHK": "1500",
    "3 BHK": "1800",
    "4 BHK": "2100",
    "5 BHK": "2400",
    "Villa/Other": "3000+"
  },
  "1 Year AMC": {
    "1 RK": "2500",
    "1 BHK": "3000",
    "2 BHK": "3800",
    "3 BHK": "4500",
    "4 BHK": "5200",
    "5 BHK": "6000",
    "Villa/Other": "7500+"
  },
  "2 Year AMC": {
    "1 RK": "4500",
    "1 BHK": "5500",
    "2 BHK": "7000",
    "3 BHK": "8500",
    "4 BHK": "10000",
    "5 BHK": "12000",
    "Villa/Other": "15000+"
  }
} as const

type Freq = keyof typeof pricing
type Flat = keyof typeof pricing[Freq]

export async function POST(request: Request) {
  const body = await request.json()

  const frequency = body.frequency as Freq
  const flatType = body.flatType as Flat
  const productType = body.productType as string
  const comments = body.comments as string
  const phone = body.phone as string

  const cost = pricing[frequency][flatType]

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  try {
    await transporter.sendMail({
      from: `"Quote Request" <${process.env.SMTP_USER}>`,
      to: "bluepc.ice@gmail.com",
      subject: "New Quote Request",
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Product Type:</strong> ${productType}</p>
        <p><strong>Flat Type:</strong> ${flatType}</p>
        <p><strong>Service Frequency:</strong> ${frequency}</p>
        <p><strong>Estimated Cost:</strong> ₹${cost}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Comments:</strong><br/>${comments.replace(/\n/g, '<br/>')}</p>
      `
    })

    return NextResponse.json({ success: true, message: "Quote email sent successfully." })
  } catch (err) {
    console.error("Email error:", err)
    return NextResponse.json({ success: false, message: "Email send failed" }, { status: 500 })
  }
}
