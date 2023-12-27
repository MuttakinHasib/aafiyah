import { QueryClient } from "@tanstack/react-query";
import AddressBookScreen from "../screens/address-book.screen";

export const metadata = {
  title: "Address Book",
};

const AddressBookPage = async () => {
  // const cookie = getCookieString('connect.sid');
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['addresses'],
  //   queryFn: async () =>
  //     await fetch(`${baseURL}${ADDRESSES_ROUTE}`, {
  //       credentials: 'include',
  //       headers: { cookie },
  //     }),
  // });

  return <AddressBookScreen />;
};

export default AddressBookPage;
