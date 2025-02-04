'use client';

import React from "react";
import Image from "next/image";

type AuthImageProps = {
  src: string;
  alt: string;
};

export const AuthImage: React.FC<AuthImageProps> = ({ src, alt }) => {
  return (
    <div className="lg:flex-1 hidden lg:flex items-center justify-center w-full h-full">
      <Image src={src} alt={alt} width={500} height={500} className="object-cover rounded-lg" />
    </div>
  );
};
