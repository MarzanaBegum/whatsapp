"use client";
import { useStateProvider } from "@/context/StateContext";
import api from "@/utils/ApiRoutes";
import { useRouter } from "next/navigation";
import { useEffect} from "react";
import Cookies from "js-cookie";
import ChatPage from "@/components/Chat/ChatPage";

export default function Home() {
  const router = useRouter();
  const [{ userInfo, currentChatUser, messages }, dispatch] =
    useStateProvider();

  useEffect(() => {
    if (userInfo && userInfo?.email) {
      api
        .get(`/auth/user${userInfo?.email}`)
        .then((res) => {
          const user = {
            _id: res.data?._id,
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

  useEffect(() => {
    const getMessages = async () => {
      const result = await api.get(
        `/messages/get-message/${userInfo?._id}/${currentChatUser._id}`
      );
      dispatch({ type: "SET_MESSAGES", payload: result.data });
    };
    if (currentChatUser) {
      getMessages();
    }
  }, [currentChatUser]);
  
  return (
    <main className="">
      <ChatPage />
    </main>
  );
}
