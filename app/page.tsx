'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Clock, CheckCircle, Phone, MapPin, Users, Timer } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import TimerPopup from "@/components/TimerPopup"
import axios from "axios"
import { useState } from "react"

export default function HomePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/send-mail', formData);
      alert("Your request has been submitted!");
    } catch (error) {
      console.error("Error sending form:", error);
      alert("There was a problem. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen">
      <TimerPopup />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-5 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Serving Mira Road, Bhayandar & Thane Since 2005
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Professional Pest Control –<span className="text-green-600"> 24/7 Service</span> Available!
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  IKON Pest Control Services offers comprehensive pest management solutions using WHO & HACCP approved
                  chemicals. Trusted by 500+ customers with 4.8★ Google rating.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:8448520507">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 84485 20507
                  </Button>
                </a>
                <a href="/contact">
                  <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
                    Get Free Quote
                  </Button>
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  WHO Approved Chemicals
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Child & Pet Safe
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  4.8★ Google Rating
                </div>
              </div>
            </div>
            <div className="relative md:flex justify-center">
              <Image
                src="/unrecognizable-person.webp"
                alt="IKON Pest Control technician at work"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Service Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Pest Control Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive pest management solutions for residential, commercial, and industrial spaces
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "General Pest Control", icon: "🐜", href: "/services/general-pest-control" },
              { name: "Termite Treatment", icon: "🏠", href: "/services/termite-treatment" },
              { name: "Bed Bug Eradication", icon: "🛏️", href: "/services/bed-bug-eradication" },
              { name: "Rodent Management", icon: "🐭", href: "/services/rodent-management" },
              { name: "Mosquito Control", icon: "🦟", href: "/services/mosquito-control" },
              { name: "Herbal Pest Control", icon: "🍀", href: "/services/herbal-pest-control" },
            ].map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className="font-semibold text-gray-900 text-sm">{service.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose IKON */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose IKON Pest Control?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Over 15+ years of experience serving Mira Road, Bhayandar, and Thane with professional pest management
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "WHO & HACCP Approved",
                description: "Government-approved chemicals ensuring safe and effective treatments",
              },
              {
                icon: Star,
                title: "4.8★ Google Rating",
                description: "Trusted by 20+ customers with excellent service reviews",
              },
              {
                icon: Clock,
                title: "24/7 Service Available",
                description: "Round-the-clock availability for all your pest control needs",
              },
              {
                icon: CheckCircle,
                title: "Certified Technicians",
                description: "Trained and certified professionals with eco-friendly treatment options",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <feature.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Serving Your Local Area</h2>
              <p className="text-gray-600 mb-6">
                IKON Pest Control Services proudly serves the Mira Road, Bhayandar, and Thane regions with professional
                pest management solutions for homes, offices, and industrial facilities.
              </p>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {[
                  "Mira Road East",
                  "Bhayandar East & West",
                  "Thane District",
                  "Residential Societies",
                  "Commercial Complexes",
                  "Industrial Areas",
                ].map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
              <a href="tel:8448520507">
                <Button className="bg-green-600 hover:bg-green-700">Check Service Availability</Button>
              </a>
            </div>
            <div className="bg-gray-200 rounded-lg h-80 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60257.36049870116!2d72.81722136203126!3d19.27866810307839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b05931cfcaf1%3A0x747d46e84f49bcf1!2sMira%20Bhayandar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1751460712209!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-gray-600 ml-2">4.8/5 from 20+ Google reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mira Road",
                review:
                  "Excellent service! IKON team solved our cockroach problem completely. Very professional and used safe chemicals.",
                rating: 5,
              },
              {
                name: "Rajesh Patel",
                location: "Bhayandar East",
                review:
                  "Quick response and effective termite treatment. The technicians were knowledgeable and courteous.",
                rating: 5,
              },
              {
                name: "Sunita Joshi",
                location: "Thane",
                review: "Great AMC service. Regular visits keep our society pest-free. Highly recommend IKON!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Booking Form */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-green-100 mb-8">
              Contact IKON Pest Control Services today for professional pest management solutions
            </p>
            <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
              <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit} >
                <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required />
                <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
                <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
                <select name="serviceType" value={formData.serviceType} onChange={(e) =>
                  setFormData((prev) => ({ ...prev, serviceType: e.target.value }))
                }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select service type</option>
                  <option value="general">General Pest Control</option>
                  <option value="termites">Termite Control</option>
                  <option value="bedbugs">Bed Bug Treatment</option>
                  <option value="rodents">Rodent Control</option>
                  <option value="mosquitoes">Mosquito Control</option>
                  <option value="emergency">Emergency Service</option>
                  <option value="commercial">Commercial Service</option>
                </select>
                <div className="md:col-span-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    Get Free Quote
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">4.8★</p>
              <p className="text-gray-600">Google Rating</p>
            </div>
            <div>
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">20+</p>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div>
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-gray-600">Service Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
