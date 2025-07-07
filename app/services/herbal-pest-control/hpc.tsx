'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

const pricing = {
    "One Time": {
        "Herbal Pest Control": { RK: 2000, "1BHK": 2000, "2BHK": 2400, "3BHK": 2800, "4BHK": 3400 },
        "General Pest Control": { RK: 1850, "1BHK": 1850, "2BHK": 2250, "3BHK": 2650, "4BHK": 3250 },
        "Termite Treatment": { RK: 2150, "1BHK": 2150, "2BHK": 2550, "3BHK": 2950, "4BHK": 2950 },
        "Bed Bug Eradication": { RK: 1950, "1BHK": 1950, "2BHK": 2350, "3BHK": 2750, "4BHK": 3350 },
        "Rodent Management": { RK: 1750, "1BHK": 1750, "2BHK": 2100, "3BHK": 2500, "4BHK": 3000 },
        "Mosquito Control": { RK: 1600, "1BHK": 1600, "2BHK": 1950, "3BHK": 2300, "4BHK": 2800 },
    },
    "1 Year AMC": {
        "General Pest Control": { RK: 4625, "1BHK": 4625, "2BHK": 5625, "3BHK": 6625, "4BHK": 8125 },
        "Termite Treatment": { RK: 5375, "1BHK": 5375, "2BHK": 6375, "3BHK": 7375, "4BHK": 7375 },
        "Bed Bug Eradication": { RK: 4875, "1BHK": 4875, "2BHK": 5875, "3BHK": 6875, "4BHK": 8375 },
        "Rodent Management": { RK: 4375, "1BHK": 4375, "2BHK": 5250, "3BHK": 6250, "4BHK": 7500 },
        "Mosquito Control": { RK: 4000, "1BHK": 4000, "2BHK": 4875, "3BHK": 5750, "4BHK": 7000 },
        "Herbal Pest Control": { RK: 5000, "1BHK": 5000, "2BHK": 6000, "3BHK": 7000, "4BHK": 8500 }
    },
    "2 Year AMC": {
        "General Pest Control": { RK: 7400, "1BHK": 7400, "2BHK": 9000, "3BHK": 10600, "4BHK": 13000 },
        "Termite Treatment": { RK: 8600, "1BHK": 8600, "2BHK": 10200, "3BHK": 11800, "4BHK": 11800 },
        "Bed Bug Eradication": { RK: 7800, "1BHK": 7800, "2BHK": 9400, "3BHK": 11000, "4BHK": 13400 },
        "Rodent Management": { RK: 7000, "1BHK": 7000, "2BHK": 8400, "3BHK": 10000, "4BHK": 12000 },
        "Mosquito Control": { RK: 6400, "1BHK": 6400, "2BHK": 7800, "3BHK": 9200, "4BHK": 11200 },
        "Herbal Pest Control": { RK: 8000, "1BHK": 8000, "2BHK": 9600, "3BHK": 11200, "4BHK": 13600 }
    }
} as const;

type Freq = keyof typeof pricing;
type ProductType = keyof typeof pricing["One Time"];
type FlatType = keyof typeof pricing["One Time"]["General Pest Control"];

export default function HerbalPestControlPage() {

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
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-green-600">Home</Link>
                        <span>/</span>
                        <Link href="/services" className="hover:text-green-600">Services</Link>
                        <span>/</span>
                        <span className="text-gray-900">Herbal Pest Control</span>
                    </div>
                </div>
            </section>

            {/* Header */}
            <section className="bg-white lg:py-16 py-5">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 ">
                        <div>
                            <Link href="/services" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Services
                            </Link>
                            <Badge className="bg-green-100 text-green-800 mb-4">Eco-Friendly Option</Badge>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Herbal Pest Control</h1>
                            <p className="text-xl text-gray-600 mb-6">
                                100% eco-friendly pest control using plant-based herbal extracts. Safe for kids, pets, elderly, and the environment. Ideal for homes, schools, and health-sensitive spaces.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="tel:8830495135">
                                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call 8830 495135
                                    </Button>
                                </a>
                                <a href="/contact">
                                    <Button size="lg" variant="outline">Get Free Quote</Button>
                                </a>
                            </div>
                        </div>
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
                                    <CardTitle className="text-2xl">Pests We Control (Herbally)</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Crawling Insects</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Cockroaches",
                                                    "Ants (all types)",
                                                    "Spiders",
                                                    "Silverfish",
                                                    "House crickets",
                                                ].map((pest, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                        {pest}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Flying & Hidden Pests</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Mosquitoes",
                                                    "Fruit flies & drain flies",
                                                    "Lizards (deterrence only)",
                                                    "Moths & carpet beetles",
                                                    "Mild infestations of bed bugs",
                                                ].map((pest, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                        {pest}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Treatment Process */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Our Herbal Treatment Process</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="space-y-6">
                                        {[
                                            {
                                                step: "1",
                                                title: "Site Inspection",
                                                description:
                                                    "A technician visits your property to identify pest activity and recommend a suitable herbal formula.",
                                            },
                                            {
                                                step: "2",
                                                title: "Herbal Spray Application",
                                                description:
                                                    "Plant-based repellents are applied using low-pressure sprayers in kitchens, bathrooms, baseboards, and pest hotspots.",
                                            },
                                            {
                                                step: "3",
                                                title: "Non-toxic Gel Baiting",
                                                description:
                                                    "For cockroaches and ants, herbal gel bait is applied near nests and food sources, attracting pests naturally.",
                                            },
                                            {
                                                step: "4",
                                                title: "Monitoring & Advice",
                                                description:
                                                    "We offer follow-up suggestions to maintain a chemical-free home, along with optional re-treatments if needed.",
                                            },
                                        ].map((step, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                    {step.step}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                                                    <p className="text-gray-600 text-sm">{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Benefits */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Why Choose Herbal Pest Control?</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            "100% herbal plant-based products",
                                            "No chemicals or synthetic toxins",
                                            "Safe for infants, elderly, pets",
                                            "Ideal for kitchens and food areas",
                                            "Mild pleasant herbal aroma",
                                            "Non-staining and residue-free",
                                            "Eco-conscious and biodegradable",
                                            "Perfect for allergy-prone individuals",
                                        ].map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-gray-700">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">

                            {/* Service Highlights */}
                            <Card className="p-6">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="text-lg">Service Highlights</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">100% Herbal Formula</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">Same Day Service</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">No Side Effects</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">Family & Pet Safe</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* AMC Option */}
                            <Card className="p-6 bg-blue-50 border-blue-200">
                                <CardContent className="p-0">
                                    <h3 className="font-semibold text-gray-900 mb-2">Annual Maintenance Contract</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Opt for herbal AMC and stay protected throughout the year with quarterly green treatments.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                    >
                                        Learn About AMC
                                    </Button>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    question: "Is herbal pest control as effective as chemical treatment?",
                                    answer: "Herbal pest control is effective for mild to moderate infestations. For severe cases, we may recommend a hybrid approach.",
                                },
                                {
                                    question: "Is it safe for infants and pets?",
                                    answer: "Yes, the herbal products we use are completely safe for babies, pets, and the elderly.",
                                },
                                {
                                    question: "Will there be any smell?",
                                    answer: "Our herbal spray has a light, pleasant aroma from essential oils and plant extracts. No harsh chemical smells.",
                                },
                                {
                                    question: "How long does the effect last?",
                                    answer: "Protection typically lasts for 2–3 weeks. AMC plans ensure year-round protection.",
                                },
                            ].map((faq, index) => (
                                <Card key={index} className="p-6">
                                    <CardContent className="p-0">
                                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-green-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Want a Chemical-Free Pest Solution?</h2>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        Choose our herbal pest control service and enjoy a safer, greener way to stay pest-free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="bg-white text-green-600 hover:bg-gray-100">
                            <a href="tel:8830495135">
                                <Phone className="mr-2 h-5 w-5" />
                                Call 88304 95135
                            </a>
                        </Button>
                        <Button
                            size="lg"
                            asChild
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
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
