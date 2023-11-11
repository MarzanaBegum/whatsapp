import Image from "next/image";
import React, { MouseEvent, useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

interface AvatarProps {
  type: "sm" | "lg" | "xl";
  image: string;
  setImage?: (image: string) => void;
}

const Avatar = ({ type, image, setImage = () => {} }: AvatarProps) => {
  const [hover, setHover] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      if (data) {
        data.click();
        document.body.onfocus = (e) => {
          setTimeout(() => {
            setGrabPhoto(false);
          }, 1000);
        };
      } else {
        console.error("Element with ID 'photo-picker' not found");
      }
    }
  }, [grabPhoto]);

  const contextMenuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: "Choose From Library",
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "Upload Photo",
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/default_avatar.png");
      },
    },
  ];

  const photoPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    if (files && files.length > 0) {
      const selectedFile: File = files[0];
      const reader = new FileReader();
      const data = document.createElement("img");
      reader.onload = (event: any) => {
        data.src = event.target.result;
        data.setAttribute("data-src", event.target.result);
      };
      reader.readAsDataURL(selectedFile);
      setTimeout(() => {
        setImage(data.src);
      }, 1000);
    }
  };

  const ShowContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setIsContextMenuOpen(true);
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
  };
  return (
    <>
      <div className="relative">
        {type === "sm" && (
          <div className="relative w-10 h-10">
            <Image
              src={`${image}`}
              alt="avatar"
              priority
              width={240}
              height={240}
              className="rounded-full"
            />
          </div>
        )}
        {type === "lg" && (
          <div className="relative w-16 h-16">
            <Image
              src={image}
              alt="avatar"
              priority
              width={240}
              height={240}
              className="rounded-full"
            />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative z-0 cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 rounded-full absolute top-0 left-0 flex justify-center items-center flex-col text-center ${
                hover ? "visible" : "hidden"
              }`}
              onClick={(e) => ShowContextMenu(e)}
              id="context-opener"
            >
              <Image
                src="/camera.svg"
                alt="camera"
                width={40}
                height={40}
                id="context-opener"
              />
              <span className="text-white" id="context-opener">
                Change <br /> Profile <br /> Photo
              </span>
            </div>
            <div className="w-60 h-60 flex items-center justify-center">
              <Image
                src={image}
                alt="avatar"
                priority
                width={240}
                height={240}
                className="rounded-full"
              />
            </div>
          </div>
        )}
      </div>
      {isContextMenuOpen && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCordinates}
          contextMenu={isContextMenuOpen}
          setContextMenu={setIsContextMenuOpen}
        />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary setImage={setImage} hideShowPhoto={setShowPhotoLibrary} />
      )}
      {showCapturePhoto && (
        <CapturePhoto setImage={setImage} hide={setShowCapturePhoto} />
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </>
  );
};

export default Avatar;
