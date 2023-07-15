"use client";
import React from "react";
import InputDiv from "./inputDiv";
const inputDivWrapper = ({
  word,
  statuses = Array.from("".repeat(word.length)),
}: any) => {
  return (
    <div className="inputDivWrapper">
      {word.map((val: any, ind: number) => {
        return <InputDiv key={ind} letter={val} status={statuses[ind] || ""} />;
      })}
    </div>
  );
};

export default inputDivWrapper;
