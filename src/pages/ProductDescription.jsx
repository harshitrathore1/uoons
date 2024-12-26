import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTag, } from 'react-icons/fa';
import EmiLogo from '../assets/emi-logo.png'
import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaTruck, FaDollarSign, FaBoxOpen } from 'react-icons/fa';
import { BsFillCartPlusFill, BsFillBagFill } from 'react-icons/bs';
import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai';
import { FaExchangeAlt, FaClipboardCheck, FaShieldAlt } from 'react-icons/fa';
import FrequentlyBought from '../components/FrequentlyBought';
import RatingsReview from '../components/RatingsReview';
import FaqsProduct from '../components/FaqsProduct'
import ImageMagnification from '../components/ImageMagnification';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import UserSession from '../user';





const product = {
  specifications: {
    "Sales Package": "Laptop, Power Adaptor, User Guide, Warranty Documents",
    "Model Number": "GF63 Thin 11UCX-1496IN",
    "Part Number": "9S7-16R612-1496",
    "Series": "GF63",
    "Color": "Black",
    "Type": "Gaming Laptop",
    "Suitable For": "Gaming",
    "Power Supply": "120W AC Adapter",
    "Battery Cell": "3 Cell",
    "MS Office Provided": "No",
    "Processor Brand": "Intel",
    "Processor Name": "Core i5",
    "Processor Generation": "11th Gen",
    "SSD": "Yes",
    "SSD Capacity": "512 GB",
    "RAM": "16 GB",
    "RAM Type": "DDR4",
    "Clock Speed": "2.6 GHz with Turbo Boost Upto 4.4 GHz",
    "Cache": "12 MB",
    "Graphic Processor": "NVIDIA GeForce RTX 2050",
    "Number of Cores": "4",
    "OS Architecture": "64 bit",
    "Operating System": "Windows 11 Home",
    "System Architecture": "64 bit",
    "Mic In": "Yes",
    "RJ45": "Yes",
    "USB Port": "1 x Type-C USB 3.2 Gen 1, 3 x Type-A USB 3.2 Gen 1",
    "HDMI Port": "1 x HDMI (4k @ 30Hz)",
    "Multi Card Slot": "No",
    "Touchscreen": "No",
    "Screen Size": "15.6 inch",
    "Screen Resolution": "1920 x 1080 Pixel",
    "Screen Type": "Full HD LED Backlit IPS Display (144Hz Refresh Rate)",
    "Speakers": "Built-in Dual Speakers",
    "Internal Mic": "Built-in Microphone",
    "Sound Properties": "Nahimic 3",
    "Wireless LAN": "Intel Wi-Fi 6 AX201 (2x2)",
    "Bluetooth": "v5.2",
    "Dimensions": "359 x 254 x 21.7 mm",
    "Weight": "1.86 kg",
  }
};




const ProductDescription = () => {
  // const pid = 242; // for now!
  const pid = useParams();
  const auth = UserSession.getAuth();

  // Fetch Product Detail:
  const [ProductData, setProductData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // function to add a product to recently viewed
const addToRecentlyViewed = async () => {
  try {
    const response = await axios.post(
      '/api/addRecentyViewedProduct',
      {
        product_id: pid,
      },
      {
        headers: {
          'Channel-Code': 'ANDROID',
          'Auth': auth
        },
      }
    );

    console.log('Response:', response.data);
    alert("Recently View Added")
  } catch (error) {
    console.error('Error adding to recently viewed:', error);
  }
};

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/productDetail?pid=${pid}`, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'channel-code': 'ANDROID'
          }
        });
        setProductData(response.data);
        addToRecentlyViewed()
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProductData();
  }, []); 

  console.log(ProductData)

  const [coupon, setCoupon] = useState('');
  const handleApplyCoupon = () => {
    alert(`Coupon "${coupon}" applied!`);
  };

  const [pincode, setPincode] = useState(455001);
  const [availability, setAvailability] = useState(null);
  const handleCheckAvailability = async () => {
    const response = await fetch(`/api/productLocationAvailability?pincode=${pincode}&pid=${pid}`, {
      method: 'GET',
      headers: {
        'Channel-Code': 'ANDROID'
      }
    });
    const data = await response.json();
    setAvailability(data.Data);
  };

  const [amount, setAmount] = useState(1);

  const images = [
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf9afc0e-f0e0-46f3-b6d5-8e697afa47e2.__CR0,0,2000,2000_PT0_SX300_V1___.jpg",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf9afc0e-f0e0-46f3-b6d5-8e697afa47e2.__CR0,0,2000,2000_PT0_SX300_V1___.jpg",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf9afc0e-f0e0-46f3-b6d5-8e697afa47e2.__CR0,0,2000,2000_PT0_SX300_V1___.jpg"
  ];


 // Function to parse the return policy string
 const parseReturnPolicy = (policy) => {
  const summaryMatch = policy.match(/Warranty Summary\s*:\s*(.+?)\s*Service Type\s*:/s);
  const serviceTypeMatch = policy.match(/Service Type\s*:\s*(.+?)\s*Covered in Warranty\s*:/s);
  const coveredMatch = policy.match(/Covered in Warranty\s*:\s*(.+)$/s);

  return {
    summary: summaryMatch ? summaryMatch[1].trim() : '',
    serviceType: serviceTypeMatch ? serviceTypeMatch[1].trim() : '',
    covered: coveredMatch ? coveredMatch[1].trim() : '',
  };
};

const [showAllSpecs, setShowAllSpecs] = useState(false);
const displayedSpecifications = showAllSpecs ? Object.entries(product.specifications) : Object.entries(product.specifications).slice(0, 4);


const baseURL = "https://uoons.com/";
  return (
    <>
    <Navbar />
    {loading?(<div>Loading...</div>):
    (
     
      // main-body_Description 
      <div className="p-3 bg-white w-screen">
         <Navbar />
        {/* main-Section */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6">
          {/* {console.log(ProductData.Data.pid)} */}

          {/* productImage */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[300px]">
              <ImageMagnification 
                mainImage={baseURL + ProductData.Data.images[0].product_image} 
                thumbnailImages={ProductData.Data.images.map(image => baseURL + image.product_image)} 
              />
            </div>
          </div>


          {/* main-description */}
          <div className='flex items-start lg:w-custom xl:w-5/6'>

            {/* mid-section */}
            <div className="flex flex-col p-6 gap-2 border border-black w-full xl:w-5/6">
                {/* headings */}
                <div>
                  <span className="text-grey-100 font-semibold">Brand-Name</span>
                  <h1 className="text-3xl font-bold ">{ProductData.Data.product_name}</h1>
                </div>
                {/* ratings */}
                <div className="flex items-center mt-1 pb-1 border-b border-gray-400">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(Math.floor(ProductData.Data.rating.rating))].map((_, index) => <FaStar key={index} />)}
                    {ProductData.Data.rating.rating % 1 !== 0 && <FaStarHalfAlt />}
                    {[...Array(5 - Math.ceil(ProductData.Data.rating.rating))].map((_, index) => <FaRegStar key={index} />)}
                  </div>
                  <span className="ml-2 text-gray-600">({ProductData.Data.reviews.length} reviews)</span>
                </div>
                {/* pricing */}
                <div className="flex flex-row items-center gap-3 mt-3">
                  <h6 className="text-2xl font-semibold">₹{ProductData.Data.product_sale_price}</h6>
                  <span className="line-through text-gray-500">₹{ProductData.Data.product_price}</span>
                  <span className="text-green-600">({ProductData.Data.discount}% OFF)</span>
                </div>
                {/* Emi option */}
                <div className="text-gray-600 flex items-center gap-1">
                  <img src={EmiLogo} alt="" className='w-10'/>
                  <span>Starts at</span>
                  ₹1209.91/- per month
                </div>
                {/* apply coupon */}
                <div className="mt-1 flex items-center gap-2">
                  <FaTag className="text-green-600" />
                  <input
                    type="text"
                    placeholder="Apply coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                  />
                  <button onClick={handleApplyCoupon} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105">Apply</button>
                </div>
                {/* check availability */}
                <div className="mt-1 p-6 bg-white shadow-lg rounded-lg w-fit">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Check Availability</h2>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                    />
                    <button
                      onClick={handleCheckAvailability}
                      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Check
                    </button>
                  </div>
                  {availability && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Availability Details</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className={`text-${availability.isServiceable ? 'green' : 'red'}-600`} />
                          <span>{availability.isServiceable ? 'Serviceable' : 'Not Serviceable'}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FaDollarSign className="text-gray-600" />
                          <span>Shipping Charge: ${availability.shippingCharge}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FaTruck className="text-gray-600" />
                          <span>Expected Delivery: {availability.expDeliveryTime}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FaBoxOpen className="text-gray-600" />
                          <span>Stock Status: {availability.stock_availability}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className={`text-${availability.isCOD ? 'green' : 'red'}-600`} />
                          <span>{availability.isCOD ? 'COD Available' : 'COD Not Available'}</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* set quantity and the buttons */}
                <div className="flex flex-col items-start md:flex-row md:items-center gap-12 mt-4">
                  {/* quantity */}
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-700">Set Quantity:</h2>
                    <div className="flex flex-row items-center rounded-lg shadow-md">
                      <button
                        className="bg-gray-200 px-3 text-gray-700 text-3xl rounded-l-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300"
                        onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
                      >
                        -
                      </button>
                      <span className=" px-5 text-lg text-gray-700">{amount}</span>
                      <button
                        className="bg-gray-200 px-3 text-gray-700 text-3xl rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300"
                        onClick={() => setAmount((prev) => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>


                  <div className='flex gap-3 text-lg'>
                    <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-xl h-full flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105">
                      <BsFillCartPlusFill />
                      Add to Cart
                    </button>
                    <button className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl h-full flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105">
                      <BsFillBagFill />
                      Buy Now
                    </button>
                  </div>
                </div>
                {/* return policy */}
                <div className="mt-6 p-6 bg-white shadow rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Return Policy</h3>
                    <div className="space-y-4">
                      {(() => {
                        const { summary, serviceType, covered } = parseReturnPolicy(ProductData.Data.return_policy);
                        return (
                          <>
                            <div className="flex items-start space-x-3">
                              <FaExchangeAlt className="text-blue-500 text-xl mt-1" />
                              <div>
                                <h4 className="text-xl font-semibold text-gray-700">Warranty Summary</h4>
                                <p className="text-gray-600">{summary}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <FaClipboardCheck className="text-green-500 text-xl mt-1" />
                              <div>
                                <h4 className="text-xl font-semibold text-gray-700">Service Type</h4>
                                <p className="text-gray-600">{serviceType}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <FaShieldAlt className="text-red-500 text-xl mt-1" />
                              <div>
                                <h4 className="text-xl font-semibold text-gray-700">Covered in Warranty</h4>
                                <p className="text-gray-600">{covered}</p>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                {/* salient features and seller highlight */}
                <div className='flex items-start gap-3 mt-6 xl:hidden'>
                  <div className="p-6 bg-gradient-to-b from-orange-200 to-white shadow-lg rounded-lg ">
                    <h3 className="text-2xl font-bold text-gray-800">Salient Features</h3>
                    <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
                      {ProductData.Data.salient_features.map((feature, index) => (
                        <li key={index} className="text-lg leading-6">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>


                  <div className="p-6 bg-gradient-to-b from-orange-200 to-white shadow-lg rounded-lg xl:hidden">
                    <h3 className="text-2xl font-bold text-gray-800">Shipping Information</h3>
                    <div className="mt-2 text-gray-700">
                      <div className="flex items-center mb-2">
                        <AiOutlineHome className="mr-2 text-gray-600" size={20} />
                        <p>Ships From: <span className="font-medium text-orange-600">Uoons</span></p>
                      </div>
                      <div className="flex items-center">
                        <AiOutlineShop className="mr-2 text-gray-600" size={20} />
                        <p>Sold By: <span className="font-medium text-blue-600">Lotus Electronics</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product Description */}
                <div className="mt-6 p-6 bg-white shadow rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-800">Product Description</h3>

                  {images.map((image, index) => (
                    <div className="mt-4" key={index}>
                      <img
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="w-[300px] mx-auto rounded-md"
                      />
                      <div
                        className="mt-4 text-gray-700 text-lg leading-6"
                        dangerouslySetInnerHTML={{ __html: ProductData.Data.product_description }}
                      ></div>
                    </div>
                  ))}
                </div>
                {/* additional information */}
                <div className="mt-6 p-6 bg-white shadow rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-800">Specifications</h3>
                  <table className="mt-4 text-gray-700 w-full">
                    <tbody>
                      {displayedSpecifications.map(([key, value], index) => (
                        <tr
                          key={index}
                          className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-[#f2f2f2]' : 'bg-white'}`}
                        >
                          <td className="py-3 px-4 font-semibold text-gray-800">{key}</td>
                          <td className="py-3 px-4">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="text-blue-600 mt-4 font-semibold hover:underline"
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                  >
                    {showAllSpecs ? 'Show less' : 'Show more'}
                  </button>
                </div>


                <FrequentlyBought />
                <RatingsReview />
                <FaqsProduct pid={pid} auth={auth}/>
            </div>

          </div>

        </div>
        
        {/* salient features and seller highlight */}
        {/* <div className='hidden xl:flex flex-col w-1/6'>
                                      
                <div className='flex items-start gap-3 mt-6 '>
                  <div className="p-6 bg-white shadow-lg rounded-lg ">
                    <h3 className="text-2xl font-bold text-gray-800">Salient Features</h3>
                    <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
                      {ProductData.Data.salient_features.map((feature, index) => (
                        <li key={index} className="text-lg leading-6">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>


                  <div className="p-6 bg-white shadow-lg rounded-lg ">
                    <h3 className="text-2xl font-bold text-gray-800">Shipping Information</h3>
                    <div className="mt-2 text-gray-700">
                      <div className="flex items-center mb-2">
                        <AiOutlineHome className="mr-2 text-gray-600" size={20} />
                        <p>Ships From: <span className="font-medium text-orange-600">Uoons</span></p>
                      </div>
                      <div className="flex items-center">
                        <AiOutlineShop className="mr-2 text-gray-600" size={20} />
                        <p>Sold By: <span className="font-medium text-blue-600">Lotus Electronics</span></p>
                      </div>
                    </div>
                  </div>
                </div>
        </div> */}

      </div>
    )
    }
    <Footer />
    </>
  )
}

export default ProductDescription;



