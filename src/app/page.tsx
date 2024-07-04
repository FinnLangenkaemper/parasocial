"use client"

import { setCreatorData } from "@/scripts/populateDbRunner";
import { useState, useEffect } from "react";

export default function Home() {


  useEffect(() => {
    const interval = setInterval(() => {
      setCreatorData();
    }, 180 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []); 

  return (
    <div>
      Dashboard
    </div>
  );
}
