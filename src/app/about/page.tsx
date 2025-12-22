import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to our food ordering platform! We are passionate about connecting you with the best local restaurants and delicious meals.
            </p>
            
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to make food ordering simple, convenient, and enjoyable. We work with top restaurants to bring you a diverse range of cuisines right to your doorstep.
            </p>
            
            <p className="text-lg text-gray-600">
              With our platform, you can browse menus, read reviews, and order your favorite dishes with just a few clicks. We are committed to providing excellent service and ensuring every meal is a great experience.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;