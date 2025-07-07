'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star, Phone, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

const pricing = {
    "One Time": {
        "Mosquito Control": { RK: 1600, "1BHK": 1600, "2BHK": 1950, "3BHK": 2300, "4BHK": 2800 },
        "General Pest Control": { RK: 1850, "1BHK": 1850, "2BHK": 2250, "3BHK": 2650, "4BHK": 3250 },
        "Termite Treatment": { RK: 2150, "1BHK": 2150, "2BHK": 2550, "3BHK": 2950, "4BHK": 2950 },
        "Bed Bug Eradication": { RK: 1950, "1BHK": 1950, "2BHK": 2350, "3BHK": 2750, "4BHK": 3350 },
        "Rodent Management": { RK: 1750, "1BHK": 1750, "2BHK": 2100, "3BHK": 2500, "4BHK": 3000 },
        "Herbal Pest Control": { RK: 2000, "1BHK": 2000, "2BHK": 2400, "3BHK": 2800, "4BHK": 3400 }
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

export default function MosquitoControlPage() {

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
                        <Link href="/" className="hover:text-green-600">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/services" className="hover:text-green-600">
                            Services
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">Mosquito Control</span>
                    </div>
                </div>
            </section>

            {/* Header */}
            <section className="bg-white lg:py-16 py-5">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Services
                            </Link>
                            <Badge className="bg-red-100 text-red-800 mb-4">Essential Health Service</Badge>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mosquito Control</h1>
                            <p className="text-xl text-gray-600 mb-6">
                                Effective mosquito control solution to protect your family from dengue, malaria, and other
                                mosquito-borne illnesses. Safe, fast-acting treatment for both indoor and outdoor areas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call 84485 20507
                                </Button>
                                <Button size="lg" variant="outline">
                                    Get Free Quote
                                </Button>
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
                                    <CardTitle className="text-2xl">Mosquito Sources We Target</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Breeding Grounds</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Stagnant water sources",
                                                    "Plant pot trays",
                                                    "Drains and water tanks",
                                                    "AC water outlets",
                                                    "Bathroom and kitchen traps",
                                                ].map((item, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Resting Areas</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Curtains and under furniture",
                                                    "Balconies and shaded corners",
                                                    "Garden plants and bushes",
                                                    "Inside wardrobes and bathrooms",
                                                    "Wall corners and ceilings",
                                                ].map((item, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                        {item}
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
                                    <CardTitle className="text-2xl">Our Treatment Process</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="space-y-6">
                                        {[
                                            {
                                                step: "1",
                                                title: "Inspection & Identification",
                                                description:
                                                    "We inspect your property to identify breeding sources, stagnant water, and high-risk zones.",
                                            },
                                            {
                                                step: "2",
                                                title: "Larvicidal Treatment",
                                                description:
                                                    "We apply safe larvicides in stagnant water sources to eliminate mosquito larvae before they mature.",
                                            },
                                            {
                                                step: "3",
                                                title: "Adult Mosquito Fogging",
                                                description:
                                                    "We conduct ULV or thermal fogging to eliminate adult mosquitoes from both indoor and outdoor areas.",
                                            },
                                            {
                                                step: "4",
                                                title: "Prevention & Aftercare",
                                                description:
                                                    "Post-treatment advice and support to prevent re-infestation and keep your environment mosquito-free.",
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
                                    <CardTitle className="text-2xl">Why Choose Our Mosquito Control?</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            "WHO-certified safe insecticides",
                                            "Odorless, non-staining spray",
                                            "Indoor & outdoor treatment",
                                            "Prevention of dengue & malaria",
                                            "Trained & certified technicians",
                                            "Fast-acting & long-lasting results",
                                            "Affordable pricing & AMC plans",
                                            "Free re-treatment within warranty",
                                        ].map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                                <span className="text-gray-700">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Contact */}
                            <Card className="p-6 bg-green-50 border-green-200">
                                <CardContent className="p-0">
                                    <h3 className="font-semibold text-gray-900 mb-4">Get Instant Quote</h3>
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-green-600">₹800 - ₹2,000</p>
                                            <p className="text-sm text-gray-600">Starting price for 1BHK-3BHK</p>
                                        </div>
                                        <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white" >
                                            <a href="tel:8830495135">
                                                <Phone className="mr-2 h-4 w-4" />
                                                Call Now: 88304 95135
                                            </a>
                                        </Button>
                                        <Button variant="outline" asChild className="w-full bg-transparent">
                                            <a href="http://wa.me/918830495135" target="_blank" rel="noopener noreferrer">
                                                WhatsApp Quote
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Service Features */}
                            <Card className="p-6">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="text-lg">Service Highlights</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">WHO Approved Chemicals</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">Same Day Service</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">3-4 Weeks Protection</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">100% Safe for Family</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* AMC Option */}
                            <Card className="p-6 bg-blue-50 border-blue-200">
                                <CardContent className="p-0">
                                    <h3 className="font-semibold text-gray-900 mb-2">Annual Maintenance Contract</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Regular mosquito control helps maintain a bite-free home. Save with our annual packages.
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
                                    question: "Is mosquito control treatment safe for kids and pets?",
                                    answer:
                                        "Yes, we use WHO-approved and odorless chemicals that are completely safe. We suggest avoiding the treated area for 1-2 hours.",
                                },
                                {
                                    question: "How long does the treatment last?",
                                    answer:
                                        "Our treatment offers effective relief for 3–4 weeks. Regular follow-ups are advised during high mosquito seasons.",
                                },
                                {
                                    question: "Do you offer fogging for outdoors?",
                                    answer:
                                        "Yes, we provide ULV or thermal fogging for outdoor spaces like gardens, balconies, and society areas.",
                                },
                                {
                                    question: "What if mosquitoes come back after treatment?",
                                    answer:
                                        "If mosquitoes return within the warranty period, we will re-treat your space at no extra cost as per our warranty terms.",
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
                    <h2 className="text-3xl font-bold text-white mb-4">Protect Your Family From Mosquitoes</h2>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        Book IKON Mosquito Control service now and stay safe from mosquito-borne diseases.
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
