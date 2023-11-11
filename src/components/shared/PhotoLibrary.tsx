import Image from "next/image";
import React, { FC, ReactElement } from "react";

type PhotoLibraryProps = {
  setImage: (image: string) => void;
  hideShowPhoto: (show: boolean) => void;
};

const PhotoLibrary: FC<PhotoLibraryProps> = ({
  setImage,
  hideShowPhoto,
}): ReactElement => {
  const avatars: string[] = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];

  return (
    <div className="w-full h-full max-w-[100vw] max-h-[100vh] fixed top-0 left-0 flex justify-center items-center">
      <div className="h-max w-max bg-gray-900 p-6 rounded-lg">
        <div
          className="flex justify-end cursor-pointer mb-[20px]"
          onClick={() => hideShowPhoto(false)}
        >
          <Image src="/icons/close-icon.svg" alt="closeIcon" width={16} height={16} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {avatars.map((image, i) => (
            <div
              key={`image ${i}`}
              onClick={() => {
                setImage(image);
                hideShowPhoto(false);
              }}
              className="cursor-pointer"
            >
              <Image src={image} alt="avatar" width={70} height={70} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLibrary;
