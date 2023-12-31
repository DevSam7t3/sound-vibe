"use client";

import Image from "next/image";

import { loader } from "@/assets";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex justify-center items-center">
      <Image width={200} height={200} src={loader} alt="Loading" />
    </div>
  );
}
