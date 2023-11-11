/* eslint-disable react/display-name */
import React, { InputHTMLAttributes } from "react";

type InputFieldType = {
  label?: string;
};

const InputField = React.forwardRef(
  (
    {
      label,
      className,
      ...props
    }: InputHTMLAttributes<HTMLInputElement> & InputFieldType,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div className="w-full">
        <label
          className="block text-teal-light text-md"
          htmlFor=""
        >
          {label}
        </label>
        <div className="pt-[5px]"></div>
        <input
          ref={ref}
          className={`bg-input-background text-sm focus:outline-none rounded-lg px-2 h-10 text-white border-none ${className}`}
          type="text"
          {...props}
        />
      </div>
    );
  }
);

export default InputField;
