import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star, Phone, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HerbalPestControlPage() {
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
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 84485 20507
                </Button>
                <Button size="lg" variant="outline">Get Free Quote</Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/herbal-pest-control.png"
                alt="Herbal pest control treatment"
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
              {/* Quick Contact */}
              <Card className="p-6 bg-green-50 border-green-200">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-gray-900 mb-4">Get Instant Quote</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">₹1,000 - ₹2,500</p>
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
