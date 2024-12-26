import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaRegCopyright } from 'react-icons/fa';
import Test344 from '../pages/Test344';

const Footer = () => {
  return (
    <>
      <Test344 />
      <footer className="bg-[#000080] text-white">
        <div className="container mx-auto px-4 py-8">

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center sm:text-left mb-6">
            
            {/* Information */}
            <div>
              <h2 className="text-white text-lg mb-3">INFORMATION</h2>
              <ul className="text-sm space-y-3">
                <li><a href="#about" className="hover:text-orange-500 transition">About Us</a></li>
                <li><a href="/ContactUs" className="hover:text-orange-500 transition">Contact Us</a></li>
                <li><a href="#privacy" className="hover:text-orange-500 transition">Privacy Policy</a></li>
                <li><a href="/T&c" className="hover:text-orange-500 transition">Terms & Conditions</a></li>
                <li><a href="/Faq" className="hover:text-orange-500 transition">FAQ</a></li>
                <li><a href="#returns" className="hover:text-orange-500 transition">Returns</a></li>
                <li><a href="#gifts" className="hover:text-orange-500 transition">Gift Certificates</a></li>
                <li><a href="#blogs" className="hover:text-orange-500 transition">Blogs</a></li>
              </ul>
            </div>

            {/* My Account */}
            <div>
              <h2 className="text-white text-lg mb-3">MY ACCOUNT</h2>
              <ul className="text-sm space-y-3">
                <li><a href="/Profile" className="hover:text-orange-500 transition">User Profile</a></li>
                <li><a href="/MyOrders2" className="hover:text-orange-500 transition">Order History</a></li>
                <li><a href="/wishlist" className="hover:text-orange-500 transition">Wish List</a></li>
                <li><a href="#newsletter" className="hover:text-orange-500 transition">Newsletter</a></li>
                <li><a href="#affiliate" className="hover:text-orange-500 transition">Affiliate</a></li>
                <li><a href="#international" className="hover:text-orange-500 transition">International Orders</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-white text-lg mb-3">SERVICES</h2>
              <ul className="text-sm space-y-3">
                <li><a href="#franchise" className="hover:text-orange-500 transition">Franchise</a></li>
                <li><a href="#kiosk" className="hover:text-orange-500 transition">Kiosk</a></li>
                <li><a href="#repair" className="hover:text-orange-500 transition">Phone Repairing</a></li>
                <li><a href="#sales" className="hover:text-orange-500 transition">Sales & Services</a></li>
              </ul>
            </div>

            {/* Office Address */}
            <div>
              <h2 className="text-white text-lg mb-3">Office Address:</h2>
              <p className="text-sm">
                Vershama Tech Pvt. Ltd.<br />
                304 Capital Tower, Sapna Sangeeta Road,<br />
                Indore, Madhya Pradesh - 452001
              </p>
              <p className="text-sm mt-4">
                Email: <a href="mailto:care@uoons.com" className="hover:text-orange-500 transition">care@uoons.com</a>
              </p>
              <p className="text-sm mt-4">
                Please Note that you are accessing the BETA version of www.uoons.com.
                Should you encounter any bugs, lack of functionality, glitches, delayed deliveries, billing errors or any other problems, please write to us at <a href="mailto:care@uoons.com" className="hover:text-orange-500 transition">care@uoons.com</a>.
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-400 w-4/5 mx-auto my-6" />

          {/* Contact Email */}
          <div className="text-center text-lg font-semibold text-red-600">care@uoons.com</div>

          {/* Social Media Icons */}
          <div className="container mx-auto text-center mt-4 pb-6">
            <div className="flex justify-center space-x-6">
              <a href="https://www.facebook.com/uoons/" className="text-2xl p-4 rounded-full bg-white text-blue-600 shadow-md transition-all hover:bg-blue-600 hover:text-white hover:scale-110">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com/uoonsIndia/" className="text-2xl p-4 rounded-full bg-white text-blue-400 shadow-md transition-all hover:bg-blue-400 hover:text-white hover:scale-110">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/uoonsindia/" className="text-2xl p-4 rounded-full bg-white text-pink-500 shadow-md transition-all hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:text-white hover:scale-110">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/channel/UCCmdMR5T5nm6rwM-trKSeMQ" className="text-2xl p-4 rounded-full bg-white text-red-600 shadow-md transition-all hover:bg-red-600 hover:text-white hover:scale-110">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="text-center text-sm text-white py-4">
            <FaRegCopyright className="inline-block mb-1" /> 2024 Uoons (INDIA) PRIVATE LIMITED. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
