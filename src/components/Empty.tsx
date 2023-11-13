import Image from "next/image";
import React from "react";

const Empty = () => {
  return (
    <div className="bg-panel-header-background h-[100vh] w-full border-conversation-border border-l border-b-icon-green border-b-4 flex justify-center items-center">
      <Image src="/whatsapp.gif" alt="gif" width={200} height={200} priority />
    </div>
  );
};

export default Empty;
