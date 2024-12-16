import React from 'react'
import Team from '../assets/Team.webp'
const About = () => {
  return (
    <main className="flex-grow container ml-20 px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4">
              Welcome to ShopX, your one-stop destination for all your online shopping needs. Founded in 2023, we've quickly grown to become a leader in the e-commerce industry, offering a wide range of high-quality products at competitive prices.
            </p>
            <p className="mb-4">
              Our mission is to provide an exceptional online shopping experience, combining cutting-edge technology with outstanding customer service. We're committed to making your shopping journey as smooth and enjoyable as possible.
            </p>
            <p>
              At ShopX, we believe in the power of innovation and continuous improvement. We're constantly expanding our product range and enhancing our platform to meet the evolving needs of our customers.
            </p>
          </div>
          <div className="relative h-64 md:h-full">
            <img
              src={Team}
              alt="ShopX Team"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-6">Why Choose ShopX?</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Wide Selection", description: "Thousands of products across multiple categories" },
            { title: "Quality Assurance", description: "All products are carefully vetted for quality" },
            { title: "Fast Shipping", description: "Quick and reliable delivery to your doorstep" },
            { title: "24/7 Support", description: "Our customer service team is always here to help" },
            { title: "Secure Payments", description: "Your transactions are safe and protected" },
            { title: "Easy Returns", description: "Hassle-free return policy for your peace of mind" },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-bold mb-2">{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
  )
}

export default About