import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-black py-16">
          <div className="container px-4 text-center md:px-6">
            <h1 className="text-4xl font-bold tracking-tight text-white">Contact Us</h1>
            <p className="mt-4 text-xl text-gray-300">
              We're here to help with any questions about our products or services
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 md:px-6 md:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-medium">Phone</h3>
                <p className="mt-2 text-muted-foreground">Mon-Fri, 9am-6pm CET</p>
                <a href="tel:+4930123456789" className="mt-2 font-medium text-red-600 hover:underline">
                  +49 30 123 456 789
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-medium">Email</h3>
                <p className="mt-2 text-muted-foreground">We'll respond within 24 hours</p>
                <a href="mailto:info@deutschepoint.com" className="mt-2 font-medium text-red-600 hover:underline">
                  info@deutschepoint.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-medium">Location</h3>
                <p className="mt-2 text-muted-foreground">Visit our showroom</p>
                <address className="mt-2 not-italic text-red-600">
                  Berliner Straße 123
                  <br />
                  10115 Berlin, Germany
                </address>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Send Us a Message</h2>
              <p className="mt-2 text-muted-foreground">
                Have a question about a specific part or need technical assistance? Fill out the form below and our team
                will get back to you as soon as possible.
              </p>

              <form className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input id="last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone (Optional)
                  </label>
                  <Input id="phone" type="tel" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" rows={5} required />
                </div>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="h-[400px] overflow-hidden rounded-lg bg-gray-200 md:h-auto">
              {/* In a real implementation, this would be a Google Maps embed */}
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Map Placeholder</p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium">What payment methods do you accept?</h3>
                <p className="mt-2 text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for orders within the EU.
                </p>
              </div>
              <div>
                <h3 className="font-medium">How long does shipping take?</h3>
                <p className="mt-2 text-muted-foreground">
                  Shipping times vary by location. Within Germany, delivery typically takes 1-3 business days.
                  International shipping can take 5-10 business days.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Do you offer international shipping?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.
                </p>
              </div>
              <div>
                <h3 className="font-medium">What is your return policy?</h3>
                <p className="mt-2 text-muted-foreground">
                  We offer a 30-day return policy for most items. Parts must be unused and in their original packaging.
                  Some special order items may not be eligible for return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
