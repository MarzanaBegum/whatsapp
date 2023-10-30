'use client';
import Image from "next/image";

const LoginScreen = () => {
  const handleGoogleLogin = () => {
    console.log("clicked..")
  };
  return (
    <div className="bg-panel-header-background w-screen flex h-screen flex-col justify-center items-center gap-6">
      <div className="flex gap-2 items-center">
        <Image src="/whatsapp.gif" alt="whatsapp" width={300} height={300} priority/>
        <h2 className="text-white text-7xl">Whatsapp</h2>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="flex gap-2 items-center bg-search-input-container-background p-5 rounded-md"
      >
        <Image src="/google-icon.svg" alt="google" width={30} height={30}/>
        <span className="text-white text-2xl">Login with Google</span>
      </button>
    </div>
  );
};

export default LoginScreen;
