"use client";

import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-black absolute top-0 left-0  w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-7 max-w-lg">
        <h1 className="text-5xl text-center text-red-500">
          Something went wrong! {error.message}
        </h1>
        <Button className="gap-x-3" onClick={() => reset()}>
          <RotateCw />
          <p>Try Again</p>
        </Button>
      </div>
    </div>
  );
}
