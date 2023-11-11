"use client";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useStateProvider } from "@/context/StateContext";
import api from "@/utils/ApiRoutes";

const LoginScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [{ userInfo }, dispatch] = useStateProvider();

  useEffect(() => {
    if (userInfo?.email && !userInfo?.newUser) {
      router.push("/");
    }
  }, [router, userInfo?.email, userInfo?.newUser]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const accessToken = tokenResponse.access_token;
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const userInfo = {
          name: response.data.name,
          email: response.data.email,
          picture: response.data.picture,
          newUser: true,
        };
        const { data } = await api.get(`/auth/user${response.data.email}`);
        setLoading(false);

        if (data && data.message === "User not found") {
          dispatch({ type: "SET_USER_INFO", payload: userInfo });
          router.push("/onboarding");
        } else if (data && data?.email) {
          const user = {
            name: data?.name,
            email: data?.email,
            picture: data?.picture,
            newUser: false,
          };
          dispatch({
            type: "SET_USER_INFO",
            payload: user,
          });
          router.push("/");
        }
      } catch (err: any) {
        setLoading(false);
        enqueueSnackbar(
          err?.response ? err.response.data?.message : err.message,
          { variant: "error" }
        );
      }
    },
    onError: (error: any) => {
      setLoading(false);
      enqueueSnackbar(
        error?.response ? error.response.data?.message : error.message,
        { variant: "error" }
      );
    },
  });
  return (
    <div className="bg-panel-header-background w-screen flex h-screen flex-col justify-center items-center gap-6">
      <div className="flex gap-2 items-center">
        <Image
          src="/whatsapp.gif"
          alt="whatsapp"
          width={200}
          height={200}
          priority
        />
        <h2 className="text-white text-6xl">Whatsapp</h2>
      </div>
      <button
        onClick={() => handleGoogleLogin()}
        className="flex gap-2 items-center bg-search-input-container-background p-5 rounded-md"
      >
        <Image src="/icons/google-icon.svg" alt="google" width={30} height={30} />
        <span className="text-white text-2xl">
          {loading ? "loading..." : "Login with Google"}
        </span>
      </button>
    </div>
  );
};

export default LoginScreen;
