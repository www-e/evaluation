import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="grow py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-12">We would love to hear from you! Get in touch with our team.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <Phone className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+91 1234567891</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0">
                    <Mail className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">munasbas007@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0">
                    <MapPin className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">123 Food Street, Culinary City</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 9:00 PM</p>
                  <p className="text-gray-600">Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full h-12 bg-white rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full h-12 bg-white rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full h-12 bg-white rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-white rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;