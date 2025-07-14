'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star, Phone, ArrowLeft, Target, Zap } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

const pricing = {
    "One Time": {
        "Rat Control": { RK: 1200, "1BHK": 1400, "2BHK": 1600, "3BHK": 1900, "4BHK": 2200 },
        "General Disinfectant": { RK: 800, "1BHK": 800, "2BHK": 1000, "3BHK": 1200, "4BHK": 1400 },
        "Termite Treatment": { RK: 1000, "1BHK": 1300, "2BHK": 1500, "3BHK": 1700, "4BHK": 1900 },
        "Bed Bug Treatment": { RK: 1500, "1BHK": 1600, "2BHK": 1800, "3BHK": 2000, "4BHK": 2300 },
        "Wood Borer Treatment": { RK: 1800, "1BHK": 1800, "2BHK": 2200, "3BHK": 2600, "4BHK": 3100 },
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

export default function RodentManagementPage() {

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
                        <span className="text-ikontext">Rodent Management</span>
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
                                className="inline-flex items-center gap-2 text-ikongold hover:text-ikongold mb-4"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Services
                            </Link>
                            <Badge className="bg-orange-100 text-orange-800 mb-4">Health & Safety Priority</Badge>
                            <h1 className="text-4xl font-bold text-ikontext mb-4">Rodent Management</h1>
                            <p className="text-xl text-ikontext mb-6">
                                Professional rodent control using humane trapping methods and strategic baiting systems. Protect your
                                property from rats and mice with our comprehensive rodent management solutions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="tel:8830495135">
                                    <Button size="lg" className="bg-ikongold text-xl text-ikontext hover:bg-ikongold">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call 88304 95135
                                    </Button>
                                </a>
                                <a href="/contact">
                                    <Button size="lg" variant="outline" className="text-ikontext text-xl">
                                        Free Rodent Inspection
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
                                        <label className="block text-sm font-medium text-ikontext mb-1">Product Type</label>
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
                                        <label className="block text-sm font-medium text-ikontext mb-1">Flat Type</label>
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
                                        placeholder="Additional Comments"
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

            {/* Service Methods */}
            <section className="pt-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-ikontext mb-4">Our Rodent Control Methods</h2>
                        <p className="text-ikontext max-w-2xl mx-auto">
                            We use integrated pest management approaches combining multiple methods for effective rodent control
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card className="p-8">
                            <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Target className="h-8 w-8 text-ikongold" />
                                    <CardTitle className="text-2xl">Strategic Trapping</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-ikontext mb-6">
                                    Humane and effective trapping systems strategically placed in high-activity areas to capture rodents
                                    without using harmful chemicals.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-ikontext">Trap Types:</h4>
                                    {[
                                        "Snap traps for quick elimination",
                                        "Live traps for humane capture",
                                        "Multi-catch traps for high activity",
                                        "Bait stations for ongoing control",
                                        "Electronic traps for sensitive areas",
                                    ].map((trap, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                            <span className="text-sm text-ikontext">{trap}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-ikongold">
                                        <strong>Safe & Effective:</strong> No chemicals required. Safe for children, pets, and food
                                        preparation areas.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-8">
                            <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Zap className="h-8 w-8 text-blue-600" />
                                    <CardTitle className="text-2xl">Baiting Systems</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-ikontext mb-6">
                                    Professional-grade rodenticides in tamper-resistant bait stations for ongoing population control and
                                    prevention of re-infestation.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-ikontext">Features:</h4>
                                    {[
                                        "Tamper-resistant bait stations",
                                        "WHO-approved rodenticides",
                                        "Weather-resistant placement",
                                        "Child and pet-safe design",
                                        "Regular monitoring & refilling",
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                            <span className="text-sm text-ikontext">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>Long-term Control:</strong> Provides ongoing protection with regular monitoring and
                                        maintenance visits.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-4 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Rodent Types */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Rodents We Control</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Common Rats</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Norway rats (Brown rats)",
                                                    "Roof rats (Black rats)",
                                                    "House rats",
                                                    "Bandicoot rats",
                                                    "Field rats",
                                                ].map((rat, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {rat}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Mice Species</h3>
                                            <ul className="space-y-2">
                                                {["House mice", "Field mice", "Deer mice", "Harvest mice", "Wood mice"].map((mouse, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {mouse}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Signs of Infestation */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Signs of Rodent Infestation</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Physical Evidence</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Droppings near food sources",
                                                    "Gnaw marks on furniture/wires",
                                                    "Grease marks along walls",
                                                    "Nesting materials",
                                                    "Footprints in dusty areas",
                                                ].map((evidence, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                                        {evidence}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Behavioral Signs</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Scratching sounds in walls",
                                                    "Squeaking or chattering noises",
                                                    "Pet behavior changes",
                                                    "Food packaging damage",
                                                    "Strong ammonia-like odor",
                                                ].map((behavior, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                                        {behavior}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                        <p className="text-orange-800 text-sm">
                                            <strong>Health Risk:</strong> Rodents carry diseases and contaminate food. Immediate professional
                                            treatment is recommended.
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
                                                title: "Comprehensive Inspection",
                                                description:
                                                    "Thorough property assessment to identify entry points, nesting areas, and activity levels of rodent population.",
                                            },
                                            {
                                                step: "2",
                                                title: "Customized Control Plan",
                                                description:
                                                    "Develop targeted strategy combining trapping and baiting methods based on rodent species and infestation severity.",
                                            },
                                            {
                                                step: "3",
                                                title: "Strategic Implementation",
                                                description:
                                                    "Professional placement of traps and bait stations in optimal locations for maximum effectiveness and safety.",
                                            },
                                            {
                                                step: "4",
                                                title: "Monitoring & Maintenance",
                                                description:
                                                    "Regular monitoring visits to check traps, refill bait stations, and adjust strategy as needed.",
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

                            {/* Prevention Tips */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Prevention & Exclusion</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            "Seal cracks and entry points",
                                            "Remove food sources and water",
                                            "Proper waste management",
                                            "Regular cleaning and sanitation",
                                            "Trim vegetation near buildings",
                                            "Store food in sealed containers",
                                            "Fix plumbing leaks promptly",
                                            "Install door sweeps and screens",
                                        ].map((tip, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-ikongold flex-shrink-0" />
                                                <span className="text-ikontext">{tip}</span>
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
                                    <CardTitle className="text-lg">Service Highlights</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">Safe for Family & Pets</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">Quick Response Time</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">Humane Methods</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">Ongoing Monitoring</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* AMC Option */}
                            <Card className="p-6 bg-blue-50 border-blue-200">
                                <CardContent className="p-0">
                                    <h3 className="font-semibold text-ikontext mb-2">Annual Maintenance</h3>
                                    <p className="text-sm text-ikontext mb-4">
                                        Regular monitoring and maintenance visits to ensure long-term rodent control.
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

            {/* CTA Section */}
            <section className="py-16 bg-ikongold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-ikontext mb-4">Protect Your Property from Rodents</h2>
                    <p className="text-ikontext mb-8 max-w-2xl mx-auto">
                        Don't let rodents damage your property or threaten your family's health. Contact IKON for professional
                        rodent management.
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
                            className="border-white text-white text-xl hover:bg-white hover:text-ikongold bg-transparent"
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
