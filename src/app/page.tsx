"use client";
import { useState } from "react";
import Button from "../components/button";

export default function Page() {
  const [clickedCount, setClickCount] = useState(1);
  const showCount = () => {
    console.log(clickedCount);
    setClickCount(clickedCount + 1);
  };
  return (
    <>
      <h1>Home Page</h1>
      <Button text="press me" func={showCount} />
    </>
  );
}
