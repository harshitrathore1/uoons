import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';

const PriceStore = ({ priceStoreData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const handlePriceRangeClick = (num) => {
    navigate(`/ProductListPriceStore/${num}`); // navigate to appropriate route
  };

  // Array of image paths
  const images = [
    "/199 store (1).jpg",
    "/299 store (1).jpg",
    "/499 store.jpg",
  ];

  return (
    <div className="mt-7 mb-12 bg-gradient-to-br from-[#000080] to-blue-600 h-full w-full p-10">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-white">Price Store</h1>
        <p className="text-xs text-gray-400 mb-6">Find the best deals within your budget.</p>
        
        <div className="flex justify-center gap-6 flex-wrap">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => handlePriceRangeClick(index + 1)}
              className="cursor-pointer border rounded-lg shadow-lg w-[300px] hover:shadow-2xl flex flex-col items-center relative overflow-hidden bg-blue-100"
              data-aos="fade-up"
            >
              <img src={image} alt={`Price Store ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceStore;
