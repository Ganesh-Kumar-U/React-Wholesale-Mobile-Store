import React, { useState, useEffect } from 'react';
import sliderSamsung from "../assets/slider_samsung.png"
import Iphone16pro from "../assets/iPhone_16_Pro.png";
import Deals from '../assets/deals.png'
const slides = [
  {
    title: "SAMSUNG GALAXY S25+ ON US",
    subtitle: "Express AUK",
    image: sliderSamsung,
    buttonText: "Pre-order now"
  },
  {
    title: "iPhone 16 Pro Max",
    subtitle: "Express AUK",
    image: Iphone16pro,
    buttonText: "Buy now"
  },
  {
    title: "Special Deals",
    subtitle: "Express AUK",
    image: Deals,
    buttonText: "Shop now"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[300px] bg-[#FF5722] rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <span className="text-white text-sm mb-2">{slides[currentSlide].subtitle}</span>
          <h2 className="text-3xl font-bold text-white mb-6">{slides[currentSlide].title}</h2>
          <button className="bg-white text-[#FF5722] px-6 py-2 rounded-full w-fit text-sm font-medium">
            {slides[currentSlide].buttonText}
          </button>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title}
            className="h-[250px] object-contain"
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;