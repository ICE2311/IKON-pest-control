import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Updated pricing table
const pricing = {
  "One Time": {
    "General Disinfectant": { RK: 1850, "1BHK": 1850, "2BHK": 2250, "3BHK": 2650, "4BHK": 3250 },
    "Termite Treatment": { RK: 2150, "1BHK": 2150, "2BHK": 2550, "3BHK": 2950, "4BHK": 2950 },
    "Bed Bug Treatment": { RK: 1950, "1BHK": 1950, "2BHK": 2350, "3BHK": 2750, "4BHK": 3350 },
    "Wood Borer Treatment": { RK: 1800, "1BHK": 1800, "2BHK": 2200, "3BHK": 2600, "4BHK": 3100 },
    "Rat Control": { RK: 1750, "1BHK": 1750, "2BHK": 2100, "3BHK": 2500, "4BHK": 3000 },
    "Ticks Treatment": { RK: 1900, "1BHK": 1900, "2BHK": 2300, "3BHK": 2700, "4BHK": 3200 },
    "Honey Bee Removal": { RK: 2000, "1BHK": 2000, "2BHK": 2400, "3BHK": 2800, "4BHK": 3300 },
    "Mosquito Fogging": { RK: 1600, "1BHK": 1600, "2BHK": 1950, "3BHK": 2300, "4BHK": 2800 }
  },
  "1 Year AMC (12 months - 3 times)": {
    "General Disinfectant": { RK: 4625, "1BHK": 4625, "2BHK": 5625, "3BHK": 6625, "4BHK": 8125 },
    "Termite Treatment": { RK: 5375, "1BHK": 5375, "2BHK": 6375, "3BHK": 7375, "4BHK": 7375 },
    "Bed Bug Treatment": { RK: 4875, "1BHK": 4875, "2BHK": 5875, "3BHK": 6875, "4BHK": 8375 },
    "Wood Borer Treatment": { RK: 4450, "1BHK": 4450, "2BHK": 5450, "3BHK": 6450, "4BHK": 7750 },
    "Rat Control": { RK: 4375, "1BHK": 4375, "2BHK": 5250, "3BHK": 6250, "4BHK": 7500 },
    "Ticks Treatment": { RK: 4700, "1BHK": 4700, "2BHK": 5700, "3BHK": 6700, "4BHK": 8100 },
    "Honey Bee Removal": { RK: 5000, "1BHK": 5000, "2BHK": 6000, "3BHK": 7000, "4BHK": 8500 },
    "Mosquito Fogging": { RK: 4000, "1BHK": 4000, "2BHK": 4875, "3BHK": 5750, "4BHK": 7000 }
  },
  "2 Year AMC (24 months - 6 times)": {
    "General Disinfectant": { RK: 7400, "1BHK": 7400, "2BHK": 9000, "3BHK": 10600, "4BHK": 13000 },
    "Termite Treatment": { RK: 8600, "1BHK": 8600, "2BHK": 10200, "3BHK": 11800, "4BHK": 11800 },
    "Bed Bug Treatment": { RK: 7800, "1BHK": 7800, "2BHK": 9400, "3BHK": 11000, "4BHK": 13400 },
    "Wood Borer Treatment": { RK: 7200, "1BHK": 7200, "2BHK": 8800, "3BHK": 10400, "4BHK": 12700 },
    "Rat Control": { RK: 7000, "1BHK": 7000, "2BHK": 8400, "3BHK": 10000, "4BHK": 12000 },
    "Ticks Treatment": { RK: 7600, "1BHK": 7600, "2BHK": 9200, "3BHK": 10800, "4BHK": 13000 },
    "Honey Bee Removal": { RK: 8000, "1BHK": 8000, "2BHK": 9600, "3BHK": 11200, "4BHK": 13600 },
    "Mosquito Fogging": { RK: 6400, "1BHK": 6400, "2BHK": 7800, "3BHK": 9200, "4BHK": 11200 }
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
