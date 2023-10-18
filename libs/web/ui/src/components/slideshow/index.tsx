'use client';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import Slider, { Settings } from 'react-slick';

const slides = [
  {
    offer: '30% off',
    title: 'Elegant Timepieces and Accessories',
    description:
      'Discover our exquisite collection of handcrafted watches and accessories, designed to elevate your style.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    link: '/shop',
  },
  {
    offer: '30% off',
    title: 'When Buying Parts With Installation',
    description: 'Installation of parts in the services of our service center',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88',
    link: '/shop',
  },
];

export const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings: Settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="py-8">
      <div className="container">
        <Slider {...settings} afterChange={setCurrentSlide}>
          {slides.map((slide, index) => (
            <React.Fragment key={index}>
              <div
                className={`h-[500px] flex items-center bg-no-repeat bg-cover bg-center w-full cursor-pointer`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="py-16 px-20 space-y-10 w-full">
                  <div className="space-y-5">
                    {slide.offer && (
                      <span
                        className={clsx(
                          'font-bold uppercase text-4xl bg-yellow-300 py-[2px] px-2 inline-block opacity-0',
                          currentSlide === index &&
                            'animate__fadeInLeft animate__animated'
                        )}
                      >
                        {slide.offer}
                      </span>
                    )}
                    <h5
                      className={clsx(
                        'font-bold text-5xl max-w-md w-full opacity-0',
                        currentSlide === index &&
                          'animate__animated animate__bounceIn opacity-100'
                      )}
                    >
                      {slide.title}
                    </h5>
                    <p
                      className={clsx(
                        'font-normal text-lg text-gray-500 max-w-sm w-full opacity-0',
                        currentSlide === index &&
                          'animate__fadeInUp animate__animated'
                      )}
                    >
                      {slide.description}
                    </p>
                  </div>
                  <Link
                    className={clsx(
                      'inline-block bg-brand py-3 text-lg font-medium px-10 transition-colors duration-300 hover:bg-gray-700 text-white opacity-0',
                      currentSlide === index &&
                        'animate__fadeIn animate__animated'
                    )}
                    href={slide.link}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </React.Fragment>
          ))}
        </Slider>
      </div>
    </div>
  );
};
