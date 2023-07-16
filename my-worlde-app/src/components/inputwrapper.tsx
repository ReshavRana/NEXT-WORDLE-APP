import React, { useEffect, useState } from "react";
import InputDivWrapper from "./inputDivWrapper";

const InputWrapper = ({ secretWord }: any) => {
  console.log("inputWrapper secretWord ", secretWord);
  const dumarr = Array.from(" ".repeat(secretWord.length));
  const [wordTyped, setWordTyped] = useState([""]);

  const keyDownHandler = (e: any) => {
    if (wordTyped.length === 1) {
      setWordTyped(dumarr);
    }
    const ind: any = wordTyped.indexOf(" ");
    console.log(ind, e.key);

    if (e.key == "Enter") {
      if (ind == -1) {
        //check the secret word

        setWordTyped((prev) => {
          const ar = Array.from(" ".repeat(secretWord.length));
          ar[ind > 0 ? ind - 1 : secretWord.length - 1] = " ";
          return ar;
        });
      }
    } else if (e.key == "Backspace" && ind != 0) {
      setWordTyped((prev) => {
        const ar = [...prev];
        ar[ind > 0 ? ind - 1 : secretWord.length - 1] = " ";
        return ar;
      });
    } else if (ind !== -1 && e.key != "Backspace" && e.key.length == 1) {
      setWordTyped((prev) => {
        const ar = [...prev];
        ar[ind] = e.key;
        return ar;
      });
    } else {
      console.log("already full");
    }

    console.log("array is ", wordTyped);
  };

  let inpDivWrap;
  useEffect(() => {
    inpDivWrap = <InputDivWrapper word={wordTyped} />;
  }, [wordTyped]);

  return (
    <div tabIndex={0} className="guessInput-Div" onKeyDown={keyDownHandler}>
      {inpDivWrap}
    </div>
  );
};

export default InputWrapper;
