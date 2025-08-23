import Image from "next/image"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-black py-16">
          <div className="container px-4 text-center md:px-6">
            <h1 className="text-4xl font-bold tracking-tight text-white">About Deutsche Point</h1>
            <p className="mt-4 text-xl text-gray-300">
              Your trusted source for premium BMW and Mercedes-Benz parts since 1985
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 md:px-6 md:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Founded in 1985 by German automotive engineers, Deutsche Point began as a small specialty shop
                  providing hard-to-find parts for German luxury vehicles. What started as a passion project quickly
                  grew into one of the most trusted names in premium auto parts.
                </p>
                <p>
                  For over 35 years, we've maintained our commitment to quality, authenticity, and exceptional customer
                  service. Our team of certified technicians and parts specialists work tirelessly to ensure that every
                  component we sell meets the exacting standards of German engineering.
                </p>
                <p>
                  Today, Deutsche Point serves customers worldwide, providing genuine OEM and high-quality aftermarket
                  parts for BMW and Mercedes-Benz vehicles. We pride ourselves on our extensive inventory, competitive
                  pricing, and unmatched expertise.
                </p>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Deutsche Point headquarters"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-24">
            <h2 className="text-center text-3xl font-bold tracking-tight">Our Values</h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium">Quality</h3>
                <p className="mt-2 text-muted-foreground">
                  We never compromise on quality, offering only genuine and premium aftermarket parts that meet or
                  exceed OEM specifications.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium">Expertise</h3>
                <p className="mt-2 text-muted-foreground">
                  Our team consists of certified technicians and specialists with decades of experience working with BMW
                  and Mercedes-Benz vehicles.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium">Authenticity</h3>
                <p className="mt-2 text-muted-foreground">
                  We guarantee the authenticity of every part we sell, providing peace of mind to our customers with
                  every purchase.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium">Service</h3>
                <p className="mt-2 text-muted-foreground">
                  Customer satisfaction is our priority. We provide exceptional support, fast shipping, and a
                  hassle-free return policy.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="text-center text-3xl font-bold tracking-tight">Our Team</h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    alt="Klaus Schmidt"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-medium">Klaus Schmidt</h3>
                <p className="text-muted-foreground">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    alt="Sophia Weber"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-medium">Sophia Weber</h3>
                <p className="text-muted-foreground">Technical Director</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    alt="Markus Bauer"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-medium">Markus Bauer</h3>
                <p className="text-muted-foreground">Head of Customer Service</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
