import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="size-6">
                      <div className="size-5 bg-black"></div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+91 1234567891</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-3">
                      <div className="w-5 h-3 bg-black"></div>
                      <div className="w-5 h-2.5 bg-black"></div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">munasbas007@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full h-16 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20 px-4 py-2"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full h-16 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20 px-4 py-2"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full h-32 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20 px-4 py-2"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-amber-400 text-black rounded-[10px] outline outline-[3px] outline-amber-400 inline-flex justify-center items-center gap-2.5"
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