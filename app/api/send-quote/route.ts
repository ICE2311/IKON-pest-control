import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Updated pricing table
const pricing = {
  "One Time": {
    "General Disinfectant": { RK: 800, "1BHK": 800, "2BHK": 1000, "3BHK": 1200, "4BHK": 1400 },
    "Termite Treatment": { RK: 1000, "1BHK": 1300, "2BHK": 1500, "3BHK": 1700, "4BHK": 1900 },
    "Bed Bug Treatment": { RK: 1500, "1BHK": 1600, "2BHK": 1800, "3BHK": 2000, "4BHK": 2300 },
    "Wood Borer Treatment": { RK: 1800, "1BHK": 1800, "2BHK": 2200, "3BHK": 2600, "4BHK": 3100 },
    "Rat Control": { RK: 1200, "1BHK": 1400, "2BHK": 1600, "3BHK": 1900, "4BHK": 2200 },
    "Ticks Treatment": { RK: 1900, "1BHK": 1900, "2BHK": 2300, "3BHK": 2700, "4BHK": 3200 },
    "Honey Bee Removal": { RK: 2000, "1BHK": 2000, "2BHK": 2400, "3BHK": 2800, "4BHK": 3300 },
    "Wasp Removal": { RK: 1800, "1BHK": 1800, "2BHK": 2200, "3BHK": 2600, "4BHK": 3100 },
    "Hornet Nest Removal": { RK: 2500, "1BHK": 2500, "2BHK": 2900, "3BHK": 3300, "4BHK": 3800 },
    "Beehive Relocation": { RK: 3000, "1BHK": 3000, "2BHK": 3500, "3BHK": 4000, "4BHK": 4500 },
    "Mosquito Fogging": { RK: 800, "1BHK": 900, "2BHK": 1100, "3BHK": 1200, "4BHK": 1600 }
  },
  "1 Year AMC (12 months - 3 times)": {
    "General Disinfectant": { RK: 2000, "1BHK": 2200, "2BHK": 2400, "3BHK": 2600, "4BHK": 2900 },
    "Termite Treatment": { RK: 2900, "1BHK": 3100, "2BHK": 4300, "3BHK": 4900, "4BHK": 5600 },
    "Bed Bug Treatment": { RK: 4875, "1BHK": 4875, "2BHK": 3600, "3BHK": 4000, "4BHK": 4500 },
    "Wood Borer Treatment": { RK: 4450, "1BHK": 4450, "2BHK": 5450, "3BHK": 6450, "4BHK": 7750 },
    "Rat Control": { RK: 3100, "1BHK": 3500, "2BHK": 3900, "3BHK": 4500, "4BHK": 5200 },
    "Honey Bee Removal": { RK: 2000, "1BHK": 2000, "2BHK": 2400, "3BHK": 2800, "4BHK": 3300 },
    "Wasp Removal": { RK: 1800, "1BHK": 1800, "2BHK": 2200, "3BHK": 2600, "4BHK": 3100 },
    "Hornet Nest Removal": { RK: 2500, "1BHK": 2500, "2BHK": 2900, "3BHK": 3300, "4BHK": 3800 },
    "Beehive Relocation": { RK: 3000, "1BHK": 3000, "2BHK": 3500, "3BHK": 4000, "4BHK": 4500 },
    "Ticks Treatment": { RK: 4700, "1BHK": 4700, "2BHK": 5700, "3BHK": 6700, "4BHK": 8100 },
    "Mosquito Fogging": { RK: 2000, "1BHK": 2300, "2BHK": 2900, "3BHK": 3200, "4BHK": 3800 }
  },
  "2 Year AMC (24 months - 6 times)": {
    "General Disinfectant": { RK: 3800, "1BHK": 4200, "2BHK": 4600, "3BHK": 5000, "4BHK": 5600 },
    "Termite Treatment": { RK: 4900, "1BHK": 6100, "2BHK": 7200, "3BHK": 8200, "4BHK": 9400 },
    "Bed Bug Treatment": { RK: 7300, "1BHK": 8700, "2BHK": 9800, "3BHK": 10900, "4BHK": 12500 },
    "Wood Borer Treatment": { RK: 7200, "1BHK": 7200, "2BHK": 8800, "3BHK": 10400, "4BHK": 12700 },
    "Rat Control": { RK: 6000, "1BHK": 6500, "2BHK": 7500, "3BHK": 8500, "4BHK": 9500 },
    "Honey Bee Removal": { RK: 2000, "1BHK": 2000, "2BHK": 2400, "3BHK": 2800, "4BHK": 3300 },
    "Wasp Removal": { RK: 1800, "1BHK": 1800, "2BHK": 2200, "3BHK": 2600, "4BHK": 3100 },
    "Hornet Nest Removal": { RK: 2500, "1BHK": 2500, "2BHK": 2900, "3BHK": 3300, "4BHK": 3800 },
    "Beehive Relocation": { RK: 3000, "1BHK": 3000, "2BHK": 3500, "3BHK": 4000, "4BHK": 4500 },
    "Ticks Treatment": { RK: 7600, "1BHK": 7600, "2BHK": 9200, "3BHK": 10800, "4BHK": 13000 },
    "Mosquito Fogging": { RK: 4400, "1BHK": 5000, "2BHK": 6000, "3BHK": 6500, "4BHK": 8000 }
  }
} as const;

type Freq = keyof typeof pricing
type ProductType = keyof typeof pricing["One Time"]
type FlatType = keyof typeof pricing["One Time"]["General Disinfectant"]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { frequency, productType, flatType, phone, comments } = body as {
      frequency: Freq,
      productType: ProductType,
      flatType: FlatType,
      phone: string,
      comments: string
    }

    // Validate
    if (!frequency || !productType || !flatType || !phone) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 })
    }

    const cost = pricing[frequency]?.[productType]?.[flatType]
    if (!cost) {
      return NextResponse.json({ success: false, message: "Invalid pricing data" }, { status: 400 })
    }

    // Email setup
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Quote Request" <${process.env.SMTP_USER}>`,
      to: "bluepc.ice@gmail.com",
      subject: "New Quote Request",
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Product Type:</strong> ${productType}</p>
        <p><strong>Flat Type:</strong> ${flatType}</p>
        <p><strong>Service Frequency:</strong> ${frequency}</p>
        <p><strong>Estimated Cost:</strong> ₹${cost.toLocaleString()}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Comments:</strong><br/>${comments?.replace(/\n/g, "<br/>") || "None"}</p>
        <hr />
        <p><em>Note: 18% GST applicable on total service charges.</em></p>
      `,
    })

    return NextResponse.json({ success: true, message: "Quote email sent successfully." })

  } catch (err) {
    console.error("Email error:", err)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
