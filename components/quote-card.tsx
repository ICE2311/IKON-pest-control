"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

// Full pricing for all 10 services and 3 frequencies
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

type Freq = keyof typeof pricing;
type ProductType = keyof typeof pricing["One Time"];
type FlatType = keyof typeof pricing["One Time"]["General Disinfectant"];

export default function QuoteCard() {
    const productTypes = Object.keys(pricing["One Time"]) as ProductType[];
    const frequencies = Object.keys(pricing) as Freq[];
    const flatTypes = ["RK", "1BHK", "2BHK", "3BHK", "4BHK"] as FlatType[];

    const [productType, setProductType] = useState<ProductType>(productTypes[0]);
    const [frequency, setFrequency] = useState<Freq>("One Time");
    const [flatType, setFlatType] = useState<FlatType>("RK");
    const [comments, setComments] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const cost = useMemo(() => pricing[frequency][productType][flatType], [frequency, productType, flatType]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(phone)) {
            alert("❌ Please enter a valid 10-digit phone number.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productType,
                    flatType,
                    frequency,
                    comments,
                    phone,
                    cost,
                }),
            });

            const result = await res.json();

            if (result.success) {
                alert("✅ Quote request sent!");
            } else {
                alert("❌ Failed to send. Please try again.");
            }
        } catch {
            alert("❌ Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-6 bg-green-50 border-green-200">
            <CardContent className="p-0 space-y-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Get Instant Quote</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                        <select
                            className="w-full p-2 rounded border text-black"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value as ProductType)}
                        >
                            {productTypes.map((pt) => (
                                <option key={pt}>{pt}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Flat Type</label>
                        <select
                            className="w-full p-2 rounded border text-black"
                            value={flatType}
                            onChange={(e) => setFlatType(e.target.value as FlatType)}
                        >
                            {flatTypes.map((ft) => (
                                <option key={ft}>{ft}</option>
                            ))}
                        </select>
                    </div>

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

                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">₹{cost.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{frequency} cost for {flatType}</p>
                    </div>

                    <textarea
                        className="w-full p-2 rounded border text-black"
                        rows={3}
                        placeholder="Additional Comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />

                    <div className="flex flex-col gap-2">
                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Get Quote"}
                        </Button>
                        <Button variant="outline" asChild className="w-full bg-transparent">
                            <a href="tel:8830495135">
                                <Phone className="mr-2 h-4 w-4" />
                                Call Now: 88304 95135
                            </a>
                        </Button>
                    </div>

                    <p className="text-xs text-gray-600 mt-2">
                        18% GST will be applicable on total service charges. <br />
                        <span className="underline cursor-pointer">*Terms & Conditions apply</span>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
