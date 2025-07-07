'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Phone, ArrowLeft, Home, Building } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

const pricing = {
    "One Time": {
        "Termite Treatment": { RK: 2150, "1BHK": 2150, "2BHK": 2550, "3BHK": 2950, "4BHK": 2950 },
        "General Pest Control": { RK: 1850, "1BHK": 1850, "2BHK": 2250, "3BHK": 2650, "4BHK": 3250 },
        "Bed Bug Eradication": { RK: 1950, "1BHK": 1950, "2BHK": 2350, "3BHK": 2750, "4BHK": 3350 },
        "Rodent Management": { RK: 1750, "1BHK": 1750, "2BHK": 2100, "3BHK": 2500, "4BHK": 3000 },
        "Mosquito Control": { RK: 1600, "1BHK": 1600, "2BHK": 1950, "3BHK": 2300, "4BHK": 2800 },
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

export default function TermiteTreatmentPage() {

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
                        <span className="text-gray-900">Termite Treatment</span>
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
                            <Badge className="bg-red-100 text-red-800 mb-4">Critical Protection</Badge>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Termite Treatment</h1>
                            <p className="text-xl text-gray-600 mb-6">
                                Comprehensive termite control solutions for both pre-construction and post-construction properties.
                                Protect your valuable investment from destructive termite damage with our proven treatment methods.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call 84485 20507
                                </Button>
                                <Button size="lg" variant="outline">
                                    Free Termite Inspection
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

            {/* Treatment Types */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Termite Treatment Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We offer both preventive and curative termite treatments using advanced methods and WHO-approved chemicals
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card className="p-8">
                            <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Building className="h-8 w-8 text-green-600" />
                                    <CardTitle className="text-2xl">Pre-Construction Treatment</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-gray-600 mb-6">
                                    Preventive termite treatment applied during construction phase to create a chemical barrier that
                                    prevents termite infestation for years to come.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-gray-900">Treatment Areas:</h4>
                                    {[
                                        "Foundation soil treatment",
                                        "Plinth level treatment",
                                        "Backfill soil treatment",
                                        "Masonry treatment",
                                        "Wooden framework treatment",
                                    ].map((area, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{area}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        <strong>Best Value:</strong> Most cost-effective when done during construction. Provides 5-10 years
                                        of protection.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-8">
                            <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Home className="h-8 w-8 text-green-600" />
                                    <CardTitle className="text-2xl">Post-Construction Treatment</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-gray-600 mb-6">
                                    Curative treatment for existing buildings showing signs of termite infestation. We eliminate current
                                    termites and create protective barriers.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-gray-900">Treatment Methods:</h4>
                                    {[
                                        "Drilling & chemical injection",
                                        "Soil treatment around foundation",
                                        "Wood treatment for affected areas",
                                        "Localized spot treatment",
                                        "Monitoring & baiting systems",
                                    ].map((method, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{method}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>Immediate Action:</strong> Quick response to active infestations. Includes damage assessment
                                        and repair recommendations.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Signs of Termite Infestation */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Signs You Need Termite Treatment</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Visible Signs</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Mud tubes on walls/foundation",
                                                    "Hollow-sounding wood",
                                                    "Discarded wings near windows",
                                                    "Small holes in wood",
                                                    "Sagging floors or ceilings",
                                                ].map((sign, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                                        {sign}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Other Indicators</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Clicking sounds in walls",
                                                    "Tight-fitting doors/windows",
                                                    "Cracked paint on wood surfaces",
                                                    "Frass (termite droppings)",
                                                    "Swarms of flying insects",
                                                ].map((indicator, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                                        {indicator}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-800 text-sm">
                                            <strong>Early Detection is Key:</strong> The sooner termite infestation is detected and treated,
                                            the less damage and lower the treatment cost.
                                        </p>
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
                                                title: "Detailed Inspection",
                                                description:
                                                    "Comprehensive property assessment to identify termite species, infestation extent, and damage evaluation.",
                                            },
                                            {
                                                step: "2",
                                                title: "Treatment Plan",
                                                description:
                                                    "Customized treatment strategy based on property type, infestation level, and construction details.",
                                            },
                                            {
                                                step: "3",
                                                title: "Chemical Application",
                                                description:
                                                    "Professional application of WHO-approved termiticides using drilling, injection, and barrier methods.",
                                            },
                                            {
                                                step: "4",
                                                title: "Monitoring & Follow-up",
                                                description:
                                                    "Regular monitoring visits and additional treatments if required during warranty period.",
                                            },
                                        ].map((process, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                    {process.step}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-2">{process.title}</h3>
                                                    <p className="text-gray-600 text-sm">{process.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Chemicals Used */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Safe & Effective Chemicals</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            "WHO approved termiticides",
                                            "Long-lasting protection (5-10 years)",
                                            "Safe for humans and pets",
                                            "Environmentally responsible",
                                            "Odorless formulations",
                                            "Government certified products",
                                            "Non-staining chemicals",
                                            "Proven effectiveness against all termite species",
                                        ].map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">

                            {/* Pricing Guide */}
                            <Card className="p-6">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="text-lg">Treatment Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-4">
                                    <div className="border-b pb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Pre-Construction</span>
                                            <span className="text-sm text-green-600">₹8-12/sq ft</span>
                                        </div>
                                        <p className="text-xs text-gray-500">During construction phase</p>
                                    </div>
                                    <div className="border-b pb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Post-Construction</span>
                                            <span className="text-sm text-green-600">₹15-25/sq ft</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Existing buildings</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Spot Treatment</span>
                                            <span className="text-sm text-green-600">₹5,000+</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Localized treatment</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Warranty Info */}
                            <Card className="p-6 bg-blue-50 border-blue-200">
                                <CardContent className="p-0">
                                    <h3 className="font-semibold text-gray-900 mb-2">Warranty Coverage</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Pre-Construction:</span>
                                            <span className="font-semibold">5-10 years</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Post-Construction:</span>
                                            <span className="font-semibold">3-5 years</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-blue-600 mt-3">
                                        Free re-treatment if termites return during warranty period
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-green-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Protect Your Property from Termites</h2>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        Don't let termites destroy your valuable investment. Contact IKON for professional termite treatment today.
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
