/** @format */

import Image from "next/image";
import React from "react";
import clsx from "clsx";
interface Props {
  size?: "medium" | "small" | "large";
  src:string;
  alt: string;
  className?: string;
}
export default function Avatar({ size = "medium", src, alt, className }: Props) {
  let sizeStyles: string;
  switch (size) {
    case "small":
      sizeStyles = "w-[46px] h-[30px] md:w-[80px] md:h-[56px]";
      break;
    case "medium":
      sizeStyles = "w-[60px] h-[42px]";
      break;
    case "large":
      sizeStyles = "w-[110px] h-[92px]";
      break;
  }
  const getImageSize = () => {
    switch (size) {
      case "small":
        return { width: 80, height: 56 };
      case "medium":
        return { width: 60, height: 42 };
      case "large":
        return { width: 110, height: 92 };
      default:
        return { width: 60, height: 42 };
    }
  };

  const imageSize = getImageSize();

  return (
    <div className={clsx(sizeStyles, className, "relative overflow-hidden")}>
      <Image 
        src={src} 
        alt={alt} 
        width={imageSize.width}
        height={imageSize.height}
        quality={100}
        className="object-center w-full h-full" 
      />
    </div>
  );
}
