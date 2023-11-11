"use client";

import { StateProvider, initialState } from "@/context/StateContext";
import reducer from "@/context/StateReducer";
import api from "@/utils/ApiRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";

export default function GoogleAuthProvier({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const token = Cookies.get("auth");
  const getUser = Cookies.get("userInfo");
  const parseUserData = getUser ? JSON.parse(getUser) : null;

  // useEffect(() => {
  //   const email = parseUserData?.email;
  //   if (email !== undefined) {
  //     api.get(`/auth/user${email}`).then((res) => {
  //       const user = {
  //         name: res.data?.name,
  //         email: res.data?.email,
  //         picture: res.data?.picture,
  //         newUser: false,
  //       };
  //       Cookies.set("userInfo", JSON.stringify(user));
  //     });
  //   } else {
  //     Cookies.remove("auth");
  //     router.push("/login");
  //   }
  // }, [router, parseUserData?.email]);
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          {children}
        </GoogleOAuthProvider>
      </SnackbarProvider>
    </StateProvider>
  );
}
