"use client";

import { LOGGED_IN } from "@/constants";
import { AUTH_API } from "@/services";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";

const AccountActivate = () => {
  const token = useSearchParams().get("token");
  const [, setLoggedIn] = useLocalStorage(LOGGED_IN, false);

  const { push } = useRouter();
  useEffect(() => {
    (async () => {
      try {
        await AUTH_API.activate(token as string);
        setLoggedIn(true);
        push("/dashboard");
      } catch (error: any) {
        console.error(error);
        if (error.message === "jwt expired") {
          toast.error(
            "Account activation link expired. Please register again."
          );
          push("/register");
        }
      }
    })();
  }, []);

  return null;
};

export default AccountActivate;
