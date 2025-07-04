import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, Phone, MessageCircle, Link } from "lucide-react"

export const metadata = {
  title: 'Pricing - IKON',
  description: 'Pricing for IKON Pest Control Services. Get a quote for your pest control needs.',
};

export default function PricingPage() {

  const oneTimeServices = [
    {
      service: "General Pest Control",
      price: "Starting at ₹2000",
      description: "Covers cockroaches, ants, lizards, and other common pests"
    },
    {
      service: "Termite Treatment",
      price: "On Inspection",
      description: "Pre-Construction and Post-Construction termite protection"
    },
    {
      service: "Bed Bug Eradication",
      price: "Starting at ₹2000",
      description: "Targeted treatment for complete bed bug removal"
    },
    {
      service: "Rodent Management",
      price: "Starting at ₹2000",
      description: "Trapping and baiting methods for effective rodent control"
    },
    {
      service: "Mosquito Control",
      price: "Starting at ₹2000",
      description: "Fogging and spraying to reduce mosquito populations"
    },
    {
      service: "Herbal / Non-toxic Pest Control",
      price: "Starting at ₹2000",
      description: "Eco-friendly, chemical-free pest control solutions"
    }
  ];



  const addOns = [
    {
      name: "Pigeon Netting and Bird Spikes Installation",
      price: "Starting at $99",
      description: "Prevents bird nesting and roosting on buildings and structures"
    },
    {
      name: "Balcony and Duct Netting for Homes/Societies",
      price: "Quote",
      description: "Custom bird netting solutions for balconies and ducts"
    },
    {
      name: "Annual Maintenance Contracts (AMC)",
      price: "Custom Plan",
      description: "Year-round pest management for homes, societies, and offices"
    },
    {
      name: "Industrial & Commercial Pest Management",
      price: "On Inspection",
      description: "Large-scale pest control solutions tailored for commercial properties"
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white lg:py-16 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h1>
            <p className="text-xl text-gray-600 mb-8">
              No hidden fees, no surprises. Choose the plan that works best for your home and budget.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <strong>Important:</strong> Final pricing may vary based on property size and infestation severity. Free
              inspection included with every service.
            </div>
          </div>
        </div>
      </section>

      {/* One-Time Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {oneTimeServices.map((service, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{service.service}</h3>
                    <span className="text-green-600 font-bold">{service.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <a href="/contact">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Get Quote
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Add-On Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enhance your pest control service with these additional options
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{addon.name}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">{addon.price}</p>
                  <p className="text-gray-600 text-sm">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Are there any hidden charges?",
                answer:
                  "No, we believe in transparent pricing. All costs are discussed upfront during your free inspection.",
              },
              {
                question: "Do I need to leave the house during treatment?",
                answer:
                  "For most treatments, you can stay home. We'll inform you of any specific requirements during scheduling.",
              },
              {
                question: "What if the pests come back?",
                answer:
                  "All our services come with a warranty. If pests return within the warranty period, we'll re-treat at no extra cost.",
              },
              {
                question: "How do you determine the final price?",
                answer:
                  "Pricing depends on property size, type of pest, severity of infestation, and treatment method required.",
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
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Book a free inspection to get an accurate quote for your specific pest control needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <a href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Book Free Inspection
              </a>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              <a href="tel:8448520507">
                <MessageCircle className="mr-2 h-5 w-5" />
                Talk to Our Experts
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
