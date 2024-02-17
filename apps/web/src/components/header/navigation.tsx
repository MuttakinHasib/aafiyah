import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "..";
import { useCategory } from "@/hooks";

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

const Navigation = () => {
  const {
    data: { categories },
  } = useCategory({ fetch: true });
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
                <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {categories.map((category) => (
                    <Link
                      className="font-medium py-2 px-3 transition duration-300 hover:bg-gray-100 rounded"
                      key={category.id}
                      href={{
                        pathname: "/products",
                        query: { categories: category.slug },
                      }}
                      title={category.name}
                    >
                      {category.name}
                    </Link>
                  ))}
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

export default Navigation;
