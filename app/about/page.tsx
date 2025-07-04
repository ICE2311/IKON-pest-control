import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Award, Star, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: 'About - IKON',
  description: 'Learn more about IKON Pest Control Services, our team and our mission.',
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Roshan Singh",
      role: "Founder & Lead Technician",
      experience: "15+ years",
      certifications: ["Licensed Pest Control Operator", "Termite Specialist"],
      image: "/placeholder-user.jpg",
    },
    {
      name: "Roshan Singh",
      role: "Operations Manager",
      experience: "10+ years",
      certifications: ["Business Operations", "Customer Service Excellence"],
      image: "/placeholder-user.jpg",
    },
    {
      name: "Roshan Singh",
      role: "Senior Technician",
      experience: "8+ years",
      certifications: ["Certified Pest Control Technician", "Safety Specialist"],
      image: "/placeholder-user.jpg",
    },
  ]

  const certifications = [
    { name: "State Pest Control License", number: "#PC-2024-001" },
    { name: "EPA Certified", number: "#EPA-REG-12345" },
    { name: "NPMA Member", number: "National Pest Management Association" },
    { name: "Better Business Bureau", rating: "A+" },
    { name: "Eco-Safe Certified", number: "Environmental Safety Compliance" },
  ]

  const processSteps = [
    {
      step: "1",
      title: "Inspection",
      description: "Thorough property assessment to identify pest issues and entry points",
      icon: "🔍",
    },
    {
      step: "2",
      title: "Custom Treatment Plan",
      description: "Tailored solution based on your specific pest problems and property needs",
      icon: "📋",
    },
    {
      step: "3",
      title: "Safe Treatment",
      description: "Professional application using eco-friendly, family-safe methods",
      icon: "🛡️",
    },
    {
      step: "4",
      title: "Prevention & Follow-up",
      description: "Ongoing monitoring and prevention strategies to keep pests away",
      icon: "✅",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white lg:py-16 py-5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-4">Established 2005</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Your Trusted Local Pest Control Experts</h1>
              <p className="text-xl text-gray-600 mb-6">
                Founded in 2005, PestGuard Pro is a family-owned business dedicated to protecting homes and businesses
                from unwanted pests using safe, effective, and environmentally responsible methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 ">
                <a href="/services"><Button className="bg-green-600 hover:bg-green-700">Learn About Our Services</Button></a>
                <a href="#team"><Button variant="outline">Meet Our Team</Button></a>
              </div>
            </div>
            <div className="relative md:flex justify-center">
              <Image
                src="/team.webp"
                alt="PestGuard Pro team"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              "To create pest-free environments for families and businesses using safe, effective methods while
              providing exceptional customer service and building lasting relationships in our community."
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are committed to providing the highest quality pest control services
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.experience} experience</p>
                  <div className="space-y-1">
                    {member.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Licenses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We maintain all required licenses and certifications to ensure safe, professional service
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="p-0">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">{cert.number || cert.rating}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Proven Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to ensure effective pest control and long-term prevention
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center p-6 relative">
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="absolute -top-3 -right-3 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Social Proof */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by Thousands</h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Our commitment to excellence has earned us the trust of homeowners and businesses throughout the region
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <Users className="h-12 w-12 mx-auto mb-4" />
              <p className="text-3xl font-bold mb-2">500+</p>
              <p className="text-green-100">Happy Customers</p>
            </div>
            <div>
              <Star className="h-12 w-12 mx-auto mb-4" />
              <p className="text-3xl font-bold mb-2">4.8/5</p>
              <p className="text-green-100">Average Rating</p>
            </div>
            <div>
              <Clock className="h-12 w-12 mx-auto mb-4" />
              <p className="text-3xl font-bold mb-2">20+</p>
              <p className="text-green-100">Years Experience</p>
            </div>
            <div>
              <Award className="h-12 w-12 mx-auto mb-4" />
              <p className="text-3xl font-bold mb-2">100%</p>
              <p className="text-green-100">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience the PestGuard Pro Difference?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us to keep their homes and businesses pest-free
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Schedule Free Inspection
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                Learn About Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
