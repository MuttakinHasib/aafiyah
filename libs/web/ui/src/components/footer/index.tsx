import Link from 'next/link';

const informationNav = [
  { label: 'About Us', link: '/about-us' },
  { label: 'Delivery Information', link: '/delivery-information' },
  { label: 'Privacy Policy', link: '/privacy-policy' },
  { label: 'Brands', link: '/brands' },
  { label: 'Contact Us', link: '/contact-us' },
  { label: 'Returns', link: '/returns' },
  { label: 'Site Map', link: '/site-map' },
];

const accountNav = [
  { label: 'Store Location', link: '/store-location' },
  { label: 'Order History', link: '/order-history' },
  { label: 'Wish List', link: '/wishlist' },
  { label: 'Newsletter', link: '/newsletter' },
  { label: 'Special Offers', link: '/special-offers' },
];

export const Footer = () => {
  return (
    <footer className="text-white">
      <div className="bg-gray-700">
        <div className="container pt-14 pb-12 flex flex-wrap justify-between xl:gap-0 gap-10">
          <div className="space-y-6 xl:w-1/3 w-full text-center xl:text-left">
            <h5 className="text-xl font-medium">Contact Us</h5>
            <p className="text-gray-400">
              Hi, we are always open for cooperation and suggestions, contact us
              in one of the ways below:
            </p>
            <address className="flex flex-wrap not-italic gap-y-5 lg:gap-y-0 justify-between">
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Phone number
                </dt>
                <dd className="text-sm">+880 1315-873250</dd>
              </dl>
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Email address
                </dt>
                <dd className="text-sm break-words">
                  muttakinislamhasib@gmail.com
                </dd>
              </dl>
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Our Location
                </dt>
                <dd className="text-sm">715 Fake Street, New York 10021 USA</dd>
              </dl>
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Working hours
                </dt>
                <dd className="text-sm">Mon-Sat 10:00 AM - 7:00 PM</dd>
              </dl>
            </address>
          </div>
          <div className="space-y-6 px-5">
            <h5 className="text-xl font-medium">Information</h5>
            <div className="space-y-3 flex flex-col">
              {informationNav.map((nav) => (
                <Link
                  key={nav.label}
                  href={nav.link}
                  className="text-[15px] text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-6 px-5">
            <h5 className="text-xl font-medium">My Account</h5>
            <div className="space-y-3 flex flex-col">
              {accountNav.map((nav) => (
                <Link
                  key={nav.label}
                  href={nav.link}
                  className="text-[15px] text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-6 w-1/3">
            <h5 className="text-xl font-medium">Newsletter</h5>
            <p className="text-gray-400">
              Enter your email address below to subscribe to our newsletter and
              keep up to date with discounts and special offers.
            </p>
            <div className="flex items-center gap-x-3 max-w-lg w-full">
              <input
                type="email"
                className="bg-gray-600 border-2 w-full border-gray-600 px-3 py-2 rounded focus:ring-0 focus:border-gray-600 focus:bg-gray-700 focus:outline-none placeholder-gray-400"
                placeholder="email@example.com"
              />
              <button className="border-none bg-brand text-white py-2 px-5 border-2 border-brand rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800">
        <div className="container pt-14 pb-12"></div>
      </div>
    </footer>
  );
};
