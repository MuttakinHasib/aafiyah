import Link from 'next/link';

const TOPBAR_NAVIGATION = [
  {
    label: 'About Us',
    path: '/about',
  },
  {
    label: 'Contacts',
    path: '/contacts',
  },
  {
    label: 'Store Location',
    path: '/store',
  },
  {
    label: 'Track Order',
    path: '/track',
  },
  {
    label: 'Blog',
    path: '/blog',
  },
];

export const TopBar = () => {
  return (
    <div className="container flex justify-between gap-10 items-center py-2 text-sm font-normal text-gray-500">
      <div className="flex items-center gap-5">
        {TOPBAR_NAVIGATION.map((navigation) => (
          <Link
            key={navigation.label}
            href={navigation.path}
            className="hover:text-black transition duration-300"
          >
            {navigation.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <Link
          href="/login"
          className="hover:text-black transition duration-300"
        >
          Compare: <strong>05</strong>
        </Link>
      </div>
    </div>
  );
};
