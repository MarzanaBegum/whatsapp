import Image from "next/image";
import React, { FC, ReactElement, useEffect, useRef } from "react";

type CapturePhotoProps = {
  setImage: (image: string) => void;
  hide: (show: boolean) => void;
};

const CapturePhoto: FC<CapturePhotoProps> = ({
  setImage,
  hide,
}): ReactElement => {
  const videoRef: React.RefObject<HTMLVideoElement> =
    useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: any;

    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach((track: any) => track.stop());
    };
  }, []);

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    const videoElement = videoRef.current;
    if (videoElement) {
      canvas.getContext("2d")?.drawImage(videoElement, 0, 0, 300, 150);
      setImage(canvas.toDataURL("image/jpeg"));
      hide(false);
    }
  };
  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 p-4 rounded-lg flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <div
          className="flex justify-end cursor-pointer mb-[20px]"
          onClick={() => hide(false)}
        >
          <Image src="/icons/close-icon.svg" alt="closeIcon" width={16} height={16} />
        </div>
        <div className="flex justify-center">
          <video id="video" width="400" autoPlay ref={videoRef}></video>
        </div>
        <button
          className="bg-white h-16 w-16 p-2 rounded-full border-8 border-teal-light"
          onClick={handleCapture}
        ></button>
      </div>
    </div>
  );
};

export default CapturePhoto;
