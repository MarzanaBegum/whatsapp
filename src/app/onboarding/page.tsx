import Image from "next/image";
import React from "react";

const OnBoardingScreen = () => {
  return (
    <div className="bg-panel-header-background w-screen flex h-screen flex-col justify-center items-center gap-6">
      <div className="flex gap-2 items-center">
        <Image
          src="/whatsapp.gif"
          alt="whatsapp"
          width={300}
          height={300}
          priority
        />
        <h2 className="text-white text-7xl">Whatsapp</h2>
      </div>
      <h2 className="text-white text-2xl">Create your profile</h2>
    </div>
  );
};

export default OnBoardingScreen;
