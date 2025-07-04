import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star, Phone, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: 'General Pest Control - IKON',
  description: 'Professional pest control for ants, cockroaches, spiders, and more.',
};

export default function GeneralPestControlPage() {

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
            <span className="text-gray-900">General Pest Control</span>
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
              <Badge className="bg-green-100 text-green-800 mb-4">Most Popular Service</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">General Pest Control</h1>
              <p className="text-xl text-gray-600 mb-6">
                Comprehensive pest control solution for common household pests including cockroaches, ants, lizards,
                spiders, and other crawling insects. Safe, effective, and long-lasting protection for your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:8448520507" className="hover:text-green-600">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 84485 20507
                  </Button>
                </a>
                <a href="/contact">
                  <Button size="lg" variant="outline">
                    Get Free Quote
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative md:flex justify-center">
              <Image
                src="/general-pest-control.webp"
                alt="General pest control treatment"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
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
                  <CardTitle className="text-2xl">Pests We Control</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Crawling Insects</h3>
                      <ul className="space-y-2">
                        {[
                          "Cockroaches (German & American)",
                          "Ants (all species)",
                          "Spiders & House spiders",
                          "Silverfish",
                          "Centipedes & Millipedes",
                        ].map((pest, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            {pest}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Other Pests</h3>
                      <ul className="space-y-2">
                        {["Lizards (Geckos)", "Beetles & Weevils", "Earwigs", "Carpet beetles", "Book lice"].map(
                          (pest, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              {pest}
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
                  <CardTitle className="text-2xl">Our Treatment Process</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-6">
                    {[
                      {
                        step: "1",
                        title: "Thorough Inspection",
                        description:
                          "Complete assessment of your property to identify pest entry points, breeding areas, and infestation levels.",
                      },
                      {
                        step: "2",
                        title: "Customized Treatment Plan",
                        description:
                          "Based on inspection findings, we create a targeted treatment strategy using WHO-approved chemicals.",
                      },
                      {
                        step: "3",
                        title: "Safe Application",
                        description:
                          "Professional application of eco-friendly, odorless chemicals in all affected areas including cracks, crevices, and hiding spots.",
                      },
                      {
                        step: "4",
                        title: "Follow-up & Monitoring",
                        description:
                          "Post-treatment monitoring and follow-up visits to ensure complete pest elimination and prevention.",
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

              {/* Benefits */}
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl">Why Choose Our General Pest Control?</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      "WHO & HACCP approved chemicals",
                      "Odorless and child/pet safe",
                      "Long-lasting protection (3-6 months)",
                      "Certified and trained technicians",
                      "24/7 service availability",
                      "Comprehensive warranty coverage",
                      "Eco-friendly treatment options",
                      "Competitive pricing with AMC options",
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
                      <p className="text-2xl font-bold text-green-600">₹1,500 - ₹3,000</p>
                      <p className="text-sm text-gray-600">Starting price for 1BHK-3BHK</p>
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
                    <span className="text-sm">WHO Approved Chemicals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Same Day Service</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-green-600" />
                    <span className="text-sm">3-6 Months Protection</span>
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
                    Save up to 30% with our AMC plans. Regular treatments ensure year-round protection.
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
                  question: "How long does the treatment take?",
                  answer:
                    "Typically 1-2 hours depending on the size of your property. Our technicians work efficiently while ensuring thorough coverage.",
                },
                {
                  question: "Is the treatment safe for children and pets?",
                  answer:
                    "Yes, we use WHO-approved, odorless chemicals that are completely safe for children and pets. We recommend staying away for 2-3 hours post-treatment.",
                },
                {
                  question: "How long does the treatment last?",
                  answer:
                    "Our general pest control treatment provides protection for 3-6 months, depending on the pest type and environmental conditions.",
                },
                {
                  question: "Do you provide warranty?",
                  answer:
                    "Yes, we provide warranty coverage. If pests return within the warranty period, we'll re-treat at no additional cost.",
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Rid of Pests?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Contact IKON Pest Control Services today for professional general pest control treatment
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
