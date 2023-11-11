"use client";
import Avatar from "@/components/shared/Avatar";
import InputField from "@/components/shared/Input";
import { useStateProvider } from "@/context/StateContext";
import api from "@/utils/ApiRoutes";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  about: string;
};

const OnBoardingScreen = () => {
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState("/default_avatar.png");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  
  useEffect(() => {
    if (!userInfo?.newUser && !userInfo?.email) {
      router.push("/login");
    } else if (!userInfo?.newUser && userInfo?.email) {
      router.push("/");
    }
  }, [router, userInfo?.email, userInfo?.newUser]);

  const onSubmit: SubmitHandler<Inputs> = async (onboardData) => {
    try {
      setLoading(true);
      const userData = {
        name: onboardData.name,
        email: userInfo.email,
        about: onboardData.about,
        picture: image,
        status: true,
      };
      const { data } = await api.post("/auth/onboard-user", userData);
      setLoading(false);
      dispatch({
        type: "SET_USER_INFO",
        payload: {
          name: data && data.newUser.name,
          email: data && data.newUser.email,
          picture: data && data.newUser.picture,
          newUser: false,
        },
      });

      const expires = new Date(Date.now() + 10368e5);
      const token = data?.token;
      Cookies.set("auth", token, { expires });

      enqueueSnackbar("Signup Successfull", {
        style: { backgroundColor: "#d6f1da", color: "black" },
      });
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(
        error?.response ? error.response.data?.message : error.message,
        { variant: "error" }
      );
    }
  };

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
      <h2 className="text-white text-2xl">Create your profile</h2>
      <div className="flex gap-6 items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Display Name"
            {...register("name")}
            defaultValue={userInfo && userInfo.name}
          />
          {errors.name && (
            <p className="mt-2 text-sm first-letter:capitalize text-error">
              {errors.name?.message?.toString()}
            </p>
          )}
          <div className="mt-[5px]"></div>
          <InputField label="About" {...register("about")} />
          {errors.about && (
            <p className="mt-2 text-sm first-letter:capitalize text-error">
              {errors.about?.message?.toString()}
            </p>
          )}
          <button
            type="submit"
            className="bg-search-input-container-background py-2 px-4 text-white mt-4 cursor-pointer rounded-md"
          >
            {loading ? "loading..." : "Create Profile"}
          </button>
        </form>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
};

export default OnBoardingScreen;
