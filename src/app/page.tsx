"use client";
import Chat from "@/components/Chat/Chat";
import { useStateProvider } from "@/context/StateContext";
import api from "@/utils/ApiRoutes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateProvider();

  useEffect(() => {
    if (userInfo && userInfo?.email) {
      api
        .get(`/auth/user${userInfo?.email}`)
        .then((res) => {
          const user = {
            name: res.data?.name,
            email: res.data?.email,
            picture: res.data?.picture,
            newUser: false,
          };
          dispatch({
            type: "SET_USER_INFO",
            payload: user,
          });
        })
        .catch((err) => {
          Cookies.remove("auth");
          Cookies.remove("userInfo");
          router.push("/login");
        });
    } else {
      Cookies.remove("auth");
      Cookies.remove("userInfo");
      router.push("/login");
    }
  }, [dispatch, router, userInfo]);

  return (
    <main className="">
      <Chat />
    </main>
  );
}
