import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star, Phone, ArrowLeft, Target, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function RodentManagementPage() {
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
            <span className="text-gray-900">Rodent Management</span>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Services
              </Link>
              <Badge className="bg-orange-100 text-orange-800 mb-4">Health & Safety Priority</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Rodent Management</h1>
              <p className="text-xl text-gray-600 mb-6">
                Professional rodent control using humane trapping methods and strategic baiting systems. Protect your
                property from rats and mice with our comprehensive rodent management solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 84485 20507
                </Button>
                <Button size="lg" variant="outline">
                  Free Rodent Inspection
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/rodent-management.png"
                alt="Rodent management and control"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Rodent Control Methods</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We use integrated pest management approaches combining multiple methods for effective rodent control
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-2xl">Strategic Trapping</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600 mb-6">
                  Humane and effective trapping systems strategically placed in high-activity areas to capture rodents
                  without using harmful chemicals.
                </p>
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Trap Types:</h4>
                  {[
                    "Snap traps for quick elimination",
                    "Live traps for humane capture",
                    "Multi-catch traps for high activity",
                    "Bait stations for ongoing control",
                    "Electronic traps for sensitive areas",
                  ].map((trap, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{trap}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
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
                <p className="text-gray-600 mb-6">
                  Professional-grade rodenticides in tamper-resistant bait stations for ongoing population control and
                  prevention of re-infestation.
                </p>
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Features:</h4>
                  {[
                    "Tamper-resistant bait stations",
                    "WHO-approved rodenticides",
                    "Weather-resistant placement",
                    "Child and pet-safe design",
                    "Regular monitoring & refilling",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
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
      <section className="py-16 bg-white">
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
                      <h3 className="font-semibold text-gray-900 mb-3">Common Rats</h3>
                      <ul className="space-y-2">
                        {[
                          "Norway rats (Brown rats)",
                          "Roof rats (Black rats)",
                          "House rats",
                          "Bandicoot rats",
                          "Field rats",
                        ].map((rat, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            {rat}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Mice Species</h3>
                      <ul className="space-y-2">
                        {["House mice", "Field mice", "Deer mice", "Harvest mice", "Wood mice"].map((mouse, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
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
                      <h3 className="font-semibold text-gray-900 mb-3">Physical Evidence</h3>
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
                      <h3 className="font-semibold text-gray-900 mb-3">Behavioral Signs</h3>
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
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
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
                      <p className="text-2xl font-bold text-green-600">₹2,000 - ₹5,000</p>
                      <p className="text-sm text-gray-600">Starting price for Residentials</p>
                    </div>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white" >
                      <a href="tel:8448520507">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now: 84485 20507
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <a href="http://wa.me/918448520507" target="_blank" rel="noopener noreferrer">
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
                    <span className="text-sm">Safe for Family & Pets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Quick Response Time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Humane Methods</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Ongoing Monitoring</span>
                  </div>
                </CardContent>
              </Card>

              {/* AMC Option */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-gray-900 mb-2">Annual Maintenance</h3>
                  <p className="text-sm text-gray-600 mb-4">
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
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Protect Your Property from Rodents</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Don't let rodents damage your property or threaten your family's health. Contact IKON for professional
            rodent management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-green-600 hover:bg-gray-100">
              <a href="tel:8448520507">
                <Phone className="mr-2 h-5 w-5" />
                Call 84485 20507
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
