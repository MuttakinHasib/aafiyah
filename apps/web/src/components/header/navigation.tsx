import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "..";

export const NAVIGATION = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Shop",
    path: "/shop",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "FAQ",
    path: "/faq",
  },
];

export const Navigation = () => {
  return (
    <nav className="container py-2 flex justify-between items-center">
      <div className="flex items-center divide-x gap-x-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 py-2 px-3 rounded-none text-base font-medium">
                <Bars3Icon className="w-6 h-6" /> Shop By Category
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <Link href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </Link>
                  <Link href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </Link>
                  <Link href="/docs/primitives/typography" title="Typography">
                    Styles for headings, paragraphs, lists...etc
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2 pl-2 font-medium">
          {NAVIGATION.map((nav) => (
            <Link
              key={nav.label}
              className="py-2 px-3 transition duration-300 hover:bg-gray-100"
              href={{ pathname: nav.path }}
            >
              {nav.label}
            </Link>
          ))}
        </div>
      </div>
      <Link
        href="tel:+8801315873250"
        className="py-2 px-3 transition duration-300 hover:bg-gray-100"
      >
        Call Us: <strong>+880 1315-873250</strong>
      </Link>
    </nav>
  );
};
