'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";


export default function ServicesPage() {
  const router = useRouter();
  const services = [
    {
      title: "General Pest Control",
      description: "Covers common household pests like cockroaches, ants, and lizards",
      features: [
        "Cockroach, ant & lizard treatment",
        "Indoor & outdoor spraying",
        "Odorless chemicals available",
        "Quarterly maintenance plans"
      ],
      image: "/general-pest-control.webp",
      href: "/services/general-pest-control",
      popular: true
    },
    {
      title: "Termite Treatment",
      description: "Complete termite elimination with pre- & post-construction treatment",
      features: [
        "Pre-construction soil treatment",
        "Post-construction drilling & injection",
        "Annual maintenance service",
        "Up to 5-year warranty"
      ],
      image: "termite-treatment.webp",
      href: "/services/termite-treatment",
      popular: true
    },
    {
      title: "Bed Bug Eradication",
      description: "Effective heat and chemical treatment to eliminate bed bugs",
      features: [
        "Heat treatment (non-toxic)",
        "Targeted chemical application",
        "Mattress & furniture coverage",
        "Follow-up inspection & treatment"
      ],
      image: "/bed-bug-eradication.webp",
      href: "/services/bed-bug-eradication",
      popular: false
    },
    {
      title: "Rodent Management",
      description: "Humane and effective trapping and baiting for rodents",
      features: [
        "Rodent proofing & sealing",
        "Mechanical traps & bait stations",
        "Odor control & sanitization",
        "Ongoing monitoring"
      ],
      image: "/rodent-management.webp",
      href: "/services/rodent-management",
      popular: false
    },
    {
      title: "Mosquito Control",
      description: "Fogging, spraying, and breeding site control to reduce mosquitoes",
      features: [
        "Outdoor fogging",
        "Larvicide treatment",
        "Monthly spraying service",
        "Breeding site inspection"
      ],
      image: "/mosquito-control.webp",
      href: "/services/mosquito-control",
      popular: false
    },
    {
      title: "Herbal Pest Control",
      description: "Eco-friendly and non-toxic solutions for a safer environment",
      features: [
        "100% herbal & biodegradable products",
        "Safe for kids & pets",
        "No fumes or residue",
        "Custom treatment plans"
      ],
      image: "/herbal-pest-control.webp",
      href: "/services/herbal-pest-control",
      popular: false
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Pest Control Services</h1>
            <p className="text-xl text-gray-600 mb-8">
              Tailored solutions for every infestation, delivered by licensed professionals with guaranteed results
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Licensed & Insured
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                24/7 Emergency Service
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-green-600" />
                100% Satisfaction Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">Most Popular</Badge>
                )}
                <div className="relative h-48">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => router.push("/contact")}>Book Now</Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.push(service.href)}>
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-center">Residential Services</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  {[
                    "Home pest inspections",
                    "Interior & exterior treatments",
                    "Preventive maintenance plans",
                    "Emergency pest control",
                    "Eco-friendly options",
                    "Pet & child safe treatments",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/contact">
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">Get Residential Quote</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-center">Commercial Services</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  {[
                    "Restaurant pest control",
                    "Office building treatments",
                    "Warehouse pest management",
                    "Retail store services",
                    "Healthcare facility pest control",
                    "Compliance documentation",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/contact">
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">Get Commercial Quote</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure What You Need?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Schedule a free inspection and our experts will identify your pest problems and recommend the best treatment
            plan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-green-600 hover:bg-gray-100">
              <a href="/contact">
                Schedule Free Inspection
              </a>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              <a href="tel:8448520507">
                Call 84485 20507
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
