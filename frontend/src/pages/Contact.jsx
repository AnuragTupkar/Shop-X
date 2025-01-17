
import { useState } from 'react'
import Support  from '../assets/Support.webp'
export default function Contact() {


  const handleSubmit = async () => {
    e.preventDefault()
    setFormStatus('sending')

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    // In a real application, you would send the form data to your server here
    // const response = await fetch('/api/contact', { method: 'POST', body: new FormData(e.currentTarget) })
    // if (response.ok) {
    //   setFormStatus('sent')
    // } else {
    //   setFormStatus('error')
    // }

    setFormStatus('sent')
  }
  return (
    <main className="container flex-grow py-8 ml-24">
    <h2 className="mb-6 text-3xl font-bold">Contact Us</h2>
    
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            
            className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit

          </button>
        </form>

      </div>
      <div className='ml-8'>
        <h3 className="mb-4 text-xl font-semibold ">Our Information</h3>
        <p className="mb-2"><strong>Address:</strong> 123 E-commerce St, Digital City, 12345</p>
        <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
        <p className="mb-2"><strong>Email:</strong> support@shopx.com</p>
        <p className="mb-4"><strong>Hours:</strong> Monday - Friday: 9am - 5pm</p>
        <div className="relative h-64 md:h-80">
          <img
            src={Support}
            alt="Map"
            layout="fill"
            objectFit="cover"
            className="rounded-lg "
            
          />
        </div>
      </div>
    </div>
  </main>
  )
}

