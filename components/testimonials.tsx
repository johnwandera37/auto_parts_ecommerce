import type React from "react"

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-950">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-white mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial Card 1 */}
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <div className="p-6">
              <p className="text-gray-300 italic mb-4">
                "Exceptional service! They exceeded our expectations and delivered outstanding results. We highly
                recommend them."
              </p>
              <div className="flex items-center justify-center">
                <div className="mr-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Client 1"
                    className="rounded-full w-10 h-10 object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold">John Doe</p>
                  <p className="text-gray-500 text-sm">CEO, Company A</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Testimonial Card 2 */}
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <div className="p-6">
              <p className="text-gray-300 italic mb-4">
                "Their expertise and professionalism are unmatched. They provided valuable insights and helped us
                achieve our goals."
              </p>
              <div className="flex items-center justify-center">
                <div className="mr-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Client 2"
                    className="rounded-full w-10 h-10 object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold">Jane Smith</p>
                  <p className="text-gray-500 text-sm">Marketing Manager, Company B</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Testimonial Card 3 */}
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <div className="p-6">
              <p className="text-gray-300 italic mb-4">
                "We were impressed with their attention to detail and commitment to quality. They delivered exceptional
                results on time and within budget."
              </p>
              <div className="flex items-center justify-center">
                <div className="mr-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Client 3"
                    className="rounded-full w-10 h-10 object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold">David Lee</p>
                  <p className="text-gray-500 text-sm">Project Manager, Company C</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>
}

export { Testimonials }
