"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

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
} as const;

type Freq = keyof typeof pricing;
type Flat = keyof typeof pricing["One Time"];

export default function QuoteCard() {
  const productTypes = [
    "Cockroaches",
    "Termites",
    "Bed Bugs",
    "Mosquitoes",
    "Lizard & Spider",
    "Rats & Rodent"
  ];
  const frequencies = ["One Time", "1 Year AMC", "2 Year AMC"] as Freq[];
  const flatTypes = [
    "1 RK",
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5 BHK",
    "Villa/Other"
  ] as Flat[];

  const [productType, setProductType] = useState(productTypes[0]);
  const [frequency, setFrequency] = useState<Freq>("One Time");
  const [flatType, setFlatType] = useState<Flat>("1 RK");
  const [comments, setComments] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const cost = useMemo(() => pricing[frequency][flatType], [frequency, flatType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      setMessage("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productType,
          flatType,
          frequency,
          comments,
          phone
        })
      });

      const result = await res.json();

      if (result.success) {
        setMessage("✅ Quote request sent!");
      } else {
        setMessage("❌ Failed to send. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-green-50 border-green-200">
      <CardContent className="p-0 space-y-6">
        <h3 className="font-semibold text-gray-900 text-lg mb-2">Get Instant Quote</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
            <select
              className="w-full p-2 rounded border text-black"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              {productTypes.map((pt) => (
                <option key={pt}>{pt}</option>
              ))}
            </select>
          </div>

          {/* Flat Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flat Type</label>
            <select
              className="w-full p-2 rounded border text-black"
              value={flatType}
              onChange={(e) => setFlatType(e.target.value as Flat)}
            >
              {flatTypes.map((ft) => (
                <option key={ft}>{ft}</option>
              ))}
            </select>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Frequency</label>
            <select
              className="w-full p-2 rounded border text-black"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Freq)}
            >
              {frequencies.map((fr) => (
                <option key={fr}>{fr}</option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 rounded border text-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Cost Summary */}
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">₹{cost.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{frequency} cost for {flatType}</p>
          </div>

          {/* Comments */}
          <textarea
            className="w-full p-2 rounded border text-black"
            rows={3}
            placeholder="Additional Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          {/* Feedback Message */}
          {message && (
            <p className={`text-sm ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={loading}
            >
              {loading ? "Sending..." : "Get Quote"}
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <a href="tel:8448520507">
                <Phone className="mr-2 h-4 w-4" />
                Call Now: 84485 20507
              </a>
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-600 mt-2">
            18% GST will be applicable on total service charges. <br />
            <span className="underline cursor-pointer">*Terms & Conditions apply</span>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
