"use client";
import React, { useEffect } from "react";
import InputDiv from "./inputDiv";
const InputDivWrapper = ({
  word,
  statuses = Array.from("".repeat(word.length)),
}: any) => {
  //   console.log("rerender inpdiv ", word);

  return (
    <div className="inputDivWrapper">
      {word.map((val: any, ind: number) => {
        // console.log(val, " values ");
        return <InputDiv key={ind} letter={val} status={statuses[ind] || ""} />;
      })}
    </div>
  );
};

export default InputDivWrapper;
