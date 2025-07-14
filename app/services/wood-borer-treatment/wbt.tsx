'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

const pricing = {
    "One Time": {
        "Wood Borer Treatment": { RK: 1800, "1BHK": 1800, "2BHK": 2200, "3BHK": 2600, "4BHK": 3100 },
        "General Disinfectant": { RK: 800, "1BHK": 800, "2BHK": 1000, "3BHK": 1200, "4BHK": 1400 },
        "Termite Treatment": { RK: 1000, "1BHK": 1300, "2BHK": 1500, "3BHK": 1700, "4BHK": 1900 },
        "Bed Bug Treatment": { RK: 1500, "1BHK": 1600, "2BHK": 1800, "3BHK": 2000, "4BHK": 2300 },
        "Rat Control": { RK: 1200, "1BHK": 1400, "2BHK": 1600, "3BHK": 1900, "4BHK": 2200 },
        "Ticks Treatment": { RK: 1900, "1BHK": 1900, "2BHK": 2300, "3BHK": 2700, "4BHK": 3200 },
        "Mosquito Fogging": { RK: 800, "1BHK": 900, "2BHK": 1100, "3BHK": 1200, "4BHK": 1600 }
    },
    "1 Year AMC (12 months - 3 times)": {
        "General Disinfectant": { RK: 2000, "1BHK": 2200, "2BHK": 2400, "3BHK": 2600, "4BHK": 2900 },
        "Termite Treatment": { RK: 2900, "1BHK": 3100, "2BHK": 4300, "3BHK": 4900, "4BHK": 5600 },
        "Bed Bug Treatment": { RK: 4875, "1BHK": 4875, "2BHK": 3600, "3BHK": 4000, "4BHK": 4500 },
        "Wood Borer Treatment": { RK: 4450, "1BHK": 4450, "2BHK": 5450, "3BHK": 6450, "4BHK": 7750 },
        "Rat Control": { RK: 3100, "1BHK": 3500, "2BHK": 3900, "3BHK": 4500, "4BHK": 5200 },
        "Ticks Treatment": { RK: 4700, "1BHK": 4700, "2BHK": 5700, "3BHK": 6700, "4BHK": 8100 },
        "Mosquito Fogging": { RK: 2000, "1BHK": 2300, "2BHK": 2900, "3BHK": 3200, "4BHK": 3800 }
    },
    "2 Year AMC (24 months - 6 times)": {
        "General Disinfectant": { RK: 3800, "1BHK": 4200, "2BHK": 4600, "3BHK": 5000, "4BHK": 5600 },
        "Termite Treatment": { RK: 4900, "1BHK": 6100, "2BHK": 7200, "3BHK": 8200, "4BHK": 9400 },
        "Bed Bug Treatment": { RK: 7300, "1BHK": 8700, "2BHK": 9800, "3BHK": 10900, "4BHK": 12500 },
        "Wood Borer Treatment": { RK: 7200, "1BHK": 7200, "2BHK": 8800, "3BHK": 10400, "4BHK": 12700 },
        "Rat Control": { RK: 6000, "1BHK": 6500, "2BHK": 7500, "3BHK": 8500, "4BHK": 9500 },
        "Ticks Treatment": { RK: 7600, "1BHK": 7600, "2BHK": 9200, "3BHK": 10800, "4BHK": 13000 },
        "Mosquito Fogging": { RK: 4400, "1BHK": 5000, "2BHK": 6000, "3BHK": 6500, "4BHK": 8000 }
    }
} as const;

type Freq = keyof typeof pricing;
type ProductType = keyof typeof pricing["One Time"];
type FlatType = keyof typeof pricing["One Time"]["General Disinfectant"];

export default function WoodBorerTreatmentPage() {
    const productTypes = Object.keys(pricing["One Time"]) as ProductType[];
    const frequencies = Object.keys(pricing) as Freq[];
    const flatTypes = ["RK", "1BHK", "2BHK", "3BHK", "4BHK"] as FlatType[];

    const [productType, setProductType] = useState<ProductType>(productTypes[0]);
    const [frequency, setFrequency] = useState<Freq>("One Time");
    const [flatType, setFlatType] = useState<FlatType>("RK");
    const [comments, setComments] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <section className="bg-white py-4 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-ikontext">
                        <Link href="/" className="hover:text-ikongold">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/services" className="hover:text-ikongold">
                            Services
                        </Link>
                        <span>/</span>
                        <span className="text-ikontext">Wood Borer Treatment</span>
                    </div>
                </div>
            </section>

            {/* Header */}
            <section className="bg-white lg:py-16 py-5">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 ">
                        <div className="mt-0">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-ikongold hover:text-ikongold mb-4"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Services
                            </Link>
                            <Badge className="bg-green-100 text-ikongold mb-4">Specialized Treatment</Badge>
                            <h1 className="text-4xl font-bold text-ikontext mb-4">Wood Borer Treatment</h1>
                            <p className="text-xl text-ikontext mb-6">
                                Professional wood borer treatment to protect your wooden furniture, flooring, and structures from destructive borers. Our specialized treatment eliminates existing infestations and prevents future damage.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="tel:8830495135" className="hover:text-ikongold">
                                    <Button size="lg" className="bg-ikongold text-xl hover:bg-ikongold">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call 88304 95135
                                    </Button>
                                </a>
                                <a href="/contact">
                                    <Button size="lg" variant="outline" className="text-xl text-ikontext hover:bg-green-50">
                                        Get Free Quote
                                    </Button>
                                </a>
                            </div>
                        </div>
                        {/* Quick Contact */}
                        <Card className="p-6 bg-amber-50 border-ikongold">
                            <CardContent className="p-0 space-y-6">
                                <h3 className="font-semibold text-ikontext text-lg mb-2">Get Instant Quote</h3>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-ikontext mb-1">Treatment Type</label>
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
                                        <label className="block text-sm font-medium text-ikontext mb-1">Area Size</label>
                                        <select
                                            className="w-full p-2 rounded border text-black"
                                            value={flatType}
                                            onChange={(e) => setFlatType(e.target.value as FlatType)}
                                        >
                                            {flatTypes.map((at) => (
                                                <option key={at}>{at}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-ikontext mb-1">Service Frequency</label>
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
                                        <label className="block text-sm font-medium text-ikontext mb-1">Phone Number</label>
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
                                        <p className="text-2xl font-bold text-ikongold">₹{cost.toLocaleString()}</p>
                                        <p className="text-sm text-ikontext">{frequency} cost for {flatType}</p>
                                    </div>

                                    <textarea
                                        className="w-full p-2 rounded border text-black"
                                        rows={3}
                                        placeholder="Additional Comments (e.g., specific furniture items affected)"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            type="submit"
                                            className="w-full bg-ikongold hover:bg-ikongold text-white"
                                            disabled={loading}
                                        >
                                            {loading ? "Sending..." : "Get Quote"}
                                        </Button>
                                        <Button variant="outline" asChild className="w-full text-xl bg-transparent">
                                            <a href="tel:8830495135">
                                                <Phone className="mr-2 h-4 w-4" />
                                                Call Now: 88304 95135
                                            </a>
                                        </Button>
                                    </div>

                                    <p className="text-xs text-ikontext mt-2">
                                        18% GST will be applicable on total service charges. <br />
                                        <span className="underline cursor-pointer">*Terms & Conditions apply</span>
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* What We Treat */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Wood Borers We Eliminate</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Common Wood Borers</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Powderpost Beetles",
                                                    "Deathwatch Beetles",
                                                    "Old House Borers",
                                                    "Furniture Beetles",
                                                    "Wood Boring Weevils",
                                                ].map((pest, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {pest}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Signs of Infestation</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Small round exit holes (1-2mm diameter)",
                                                    "Fine wood powder around furniture",
                                                    "Crumbling wood edges",
                                                    "Tunnels visible in wood cross-sections",
                                                    "Adult beetles emerging from wood"
                                                ].map(
                                                    (sign, index) => (
                                                        <li key={index} className="flex items-center gap-2 text-sm">
                                                            <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                            {sign}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Treatment Process */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Our Wood Borer Treatment Process</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="space-y-6">
                                        {[
                                            {
                                                step: "1",
                                                title: "Detailed Wood Inspection",
                                                description:
                                                    "Thorough examination of all wooden surfaces to identify infestation severity, borer type, and damage extent using specialized tools.",
                                            },
                                            {
                                                step: "2",
                                                title: "Drilling & Injection",
                                                description:
                                                    "Precision drilling into affected wood and injecting specialized chemicals that penetrate deep into borer tunnels and galleries.",
                                            },
                                            {
                                                step: "3",
                                                title: "Surface Spray Treatment",
                                                description:
                                                    "Application of protective coating on wood surfaces to create a chemical barrier against future infestations.",
                                            },
                                            {
                                                step: "4",
                                                title: "Fumigation (if required)",
                                                description:
                                                    "For severe infestations, we use targeted fumigation techniques to eliminate all life stages of wood borers.",
                                            },
                                            {
                                                step: "5",
                                                title: "Preventive Measures",
                                                description:
                                                    "Recommendations for wood preservation and preventive treatments to protect against future infestations.",
                                            },
                                        ].map((process, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="bg-ikongold text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                    {process.step}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-ikontext mb-2">{process.title}</h3>
                                                    <p className="text-ikontext text-sm">{process.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Benefits */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Why Choose Our Wood Borer Treatment?</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            "Specialized wood-preservation chemicals",
                                            "Non-staining and odorless treatment",
                                            "5-7 years protection guarantee",
                                            "Minimal drilling technique",
                                            "Safe for polished and painted wood",
                                            "Eco-friendly treatment options",
                                            "Herbal treatment available",
                                            "Free post-treatment inspection",
                                        ].map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-ikongold flex-shrink-0" />
                                                <span className="text-ikontext">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Service Features */}
                            <Card className="p-6">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="text-lg">Treatment Highlights</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">Deep Penetration Chemicals</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">Same Day Service Available</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">5-7 Years Protection</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">Safe for All Wood Types</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* AMC Option */}
                            <Card className="p-6 bg-blue-50 border-blue-200">
                                <CardContent className="p-0">
                                    <h3 className="font-semibold text-ikontext mb-2">Wood Protection AMC</h3>
                                    <p className="text-sm text-ikontext mb-4">
                                        Protect your wooden assets year-round with our comprehensive maintenance plans. Save up to 35% with AMC.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                    >
                                        Learn About AMC
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Prevention Tips */}
                            <Card className="p-6 bg-amber-50 border-amber-200">
                                <CardContent className="p-0">
                                    <h3 className="font-semibold text-ikontext mb-2">Wood Borer Prevention Tips</h3>
                                    <ul className="text-sm text-ikontext space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span>•</span>
                                            <span>Keep wood dry and well-ventilated</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span>•</span>
                                            <span>Regularly inspect wooden furniture</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span>•</span>
                                            <span>Apply wood polish/preservatives annually</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span>•</span>
                                            <span>Treat new wood before use</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-ikontext mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    question: "How long does wood borer treatment take to work?",
                                    answer:
                                        "Adult borers are eliminated immediately, while larvae inside wood may take 2-3 weeks to be completely eradicated as the chemicals take effect.",
                                },
                                {
                                    question: "Will the treatment damage my furniture?",
                                    answer:
                                        "No, our specialized techniques use minimal drilling and non-staining chemicals that won't damage your furniture's finish or appearance.",
                                },
                                {
                                    question: "How long does the protection last?",
                                    answer:
                                        "Our standard treatment provides 5-7 years of protection. With AMC plans, we provide regular inspections and touch-ups for continued protection.",
                                },
                                {
                                    question: "Is the treatment safe for antique furniture?",
                                    answer:
                                        "Yes, we have special herbal and low-pressure treatment options specifically designed for delicate and antique wooden items.",
                                },
                                {
                                    question: "Can I stay at home during treatment?",
                                    answer:
                                        "Yes, our treatments are safe for occupancy. We only recommend staying away for 2-3 hours post-treatment for the solution to dry completely.",
                                },
                            ].map((faq, index) => (
                                <Card key={index} className="p-6">
                                    <CardContent className="p-0">
                                        <h3 className="font-semibold text-ikontext mb-2">{faq.question}</h3>
                                        <p className="text-ikontext">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-ikongold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-ikontext mb-4">Protect Your Wooden Assets Today</h2>
                    <p className="text-ikontext mb-8 max-w-2xl mx-auto">
                        Don't let wood borers destroy your valuable furniture and structures. Contact IKON Pest Control for professional wood borer treatment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="bg-white text-xl text-ikongold hover:bg-gray-100">
                            <a href="tel:8830495135">
                                <Phone className="mr-2 h-5 w-5" />
                                Call 88304 95135
                            </a>
                        </Button>
                        <Button
                            size="lg"
                            asChild
                            variant="outline"
                            className="border-white text-white hover:bg-white text-xl hover:text-ikongold bg-transparent"
                        >
                            <a href="/contact">
                                Get Free Quote
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}