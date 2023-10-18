'use client';
import Link from 'next/link';
import Slider from 'react-slick';

export const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="py-8">
      <div className="container">
        <Slider {...settings}>
          <div className="min-h-[500px] bg-gray-200 flex items-center">
            <div className="py-16 px-20 space-y-10">
              <div className="space-y-5">
                <span className="font-bold uppercase text-4xl bg-yellow-300 py-[2px] px-2 inline-block animate__fadeInLeft animate__animated animate__faster">
                  30% off
                </span>
                <h5 className="font-bold text-5xl animate__fadeIn animate__animated animate__faster">
                  When Buying Parts <br /> With Installation
                </h5>
                <p className="font-normal text-lg text-gray-500 animate__fadeInUp animate__animated animate__faster">
                  Installation of parts in the services of <br />
                  our service center
                </p>
              </div>
              <Link
                className="inline-block bg-brand py-3 text-lg font-medium px-10 transition-colors duration-300 hover:bg-gray-700 text-white animate__fadeIn animate__animated animate__faster"
                href="/shop"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="min-h-[500px] bg-gray-200 flex items-center">
            <div className="py-16 px-20 space-y-10">
              <div className="space-y-5">
                <span className="font-bold uppercase text-4xl bg-yellow-300 py-[2px] px-2 inline-block animate__fadeInLeft animate__animated animate__faster">
                  30% off
                </span>
                <h5 className="font-bold text-5xl animate__fadeIn animate__animated animate__faster">
                  When Buying Parts <br /> With Installation
                </h5>
                <p className="font-normal text-lg text-gray-500 animate__fadeInUp animate__animated animate__faster">
                  Installation of parts in the services of <br />
                  our service center
                </p>
              </div>
              <Link
                className="inline-block bg-brand py-3 text-lg font-medium px-10 transition-colors duration-300 hover:bg-gray-700 text-white animate__fadeIn animate__animated animate__faster"
                href="/shop"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="min-h-[500px] bg-gray-200 flex items-center">
            <div className="py-16 px-20 space-y-10">
              <div className="space-y-5">
                <span className="font-bold uppercase text-4xl bg-yellow-300 py-[2px] px-2 inline-block animate__fadeInLeft animate__animated animate__faster">
                  30% off
                </span>
                <h5 className="font-bold text-5xl animate__fadeIn animate__animated animate__faster">
                  When Buying Parts <br /> With Installation
                </h5>
                <p className="font-normal text-lg text-gray-500 animate__fadeInUp animate__animated animate__faster">
                  Installation of parts in the services of <br />
                  our service center
                </p>
              </div>
              <Link
                className="inline-block bg-brand py-3 text-lg font-medium px-10 transition-colors duration-300 hover:bg-gray-700 text-white animate__fadeIn animate__animated animate__faster"
                href="/shop"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};
