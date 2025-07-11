import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
              <span className="text-xl font-bold text-white">IKON Pest Control</span>
            </Link>
            <p className="text-gray-400 mb-4 py-2">
              Professional pest management solutions since 2005. Serving Mira Road, Bhayandar, and Thane with WHO &
              HACCP approved treatments.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Our Services", href: "/services" },
                { name: "Pricing Plans", href: "/pricing" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "General Pest Control",
                "Termite Treatment",
                "Bed Bug Treatment",
                "Rodent Management",
                "Mosquito Control",
                "Wood Borer Treatment",
              ].map((service) => {
                const url = `/services/${service.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <li key={service}>
                    <a href={url} className="text-gray-400 hover:text-gray-700 transition-colors duration-200">
                      {service}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600" />
                <a href="tel:8830495135">
                  <div>
                    <p className="text-white text-xl font-semibold">88304 95135</p>
                    <p className="text-gray-400 text-sm">24/7 Service Available</p>
                  </div>
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-600" />
                <a href="mailto:OjHtT@example.com">
                  <div>
                    <p className="text-white">ikonpestcontrol@gmail.com</p>
                  </div>
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-600" />
                <a href="https://maps.app.goo.gl/Hsh5sENoLLKVgaSb7">
                  <div>
                    <p className="text-white">Shop No. 7, E Wing, Bhairav Darshan</p>
                    <p className="text-gray-400 text-sm">Bhayandar (E), Thane - 401105</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      {/* <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get pest prevention tips and special offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-r-none"
              />
              <Button className="bg-green-600 hover:bg-green-700 rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Roshan Singh. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
