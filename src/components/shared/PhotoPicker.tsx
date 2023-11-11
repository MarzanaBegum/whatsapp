import React from "react";
import ReactDOM from "react-dom";

const PhotoPicker = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const photoPickerElement = document.getElementById("photo-picker-element");

  if (!photoPickerElement) {
    console.error("Element with ID 'photo-picker-element' not found");
    return null;
  }
  const component = (
    <input type="file" hidden id="photo-picker" onChange={onChange} />
  );
  return ReactDOM.createPortal(component, photoPickerElement);
};

export default PhotoPicker;
