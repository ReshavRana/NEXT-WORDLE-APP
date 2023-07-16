"use client";
import React, { useState } from "react";
import { WORDSIZE, secretword, NoOfTries } from "@/constants";
import InputDivWrapper from "@/components/inputDivWrapper";

const GuessInput = () => {
  const [wordTyped, setWordTyped] = useState(Array.from(" ".repeat(WORDSIZE)));
  let prevTr: Array<Array<string>> = [[]];
  const [wordStatus, setWordStatus] = useState(prevTr);

  const [prevTries, setprevTries] = useState(prevTr);
  const [triesUsed, setTriesUsed] = useState(0);
  const [gameOverStatus, setGameOverStatus] = useState("");

  const onClickHandler = () => {
    //reseting the game
    setGameOverStatus(" ");
    setTriesUsed(0);
    setWordStatus(prevTr);
    setprevTries(prevTr);
  };

  const checkWordStatus = (word: any, secret: any) => {
    let temp = Array.from(" ".repeat(WORDSIZE));
    const mp = new Map();
    for (let i = 0; i < WORDSIZE; i++) {
      if (word[i].toLowerCase() === secret[i].toLowerCase()) {
        temp[i] = "Green";
      } else {
        let freq = mp.get(secret[i]) || 0;

        mp.set(secret[i], freq + 1);
      }
    }
    for (let i = 0; i < WORDSIZE; i++) {
      if (temp[i] != "Green") {
        let freq: number = mp.get(word[i]);
        if (freq > 0) {
          freq--;
          mp.set(word[i], freq);

          temp[i] = "Yellow";
        } else {
          temp[i] = " ";
        }
      }
    }
    return temp;
  };

  const keyDownHandler = (e: any) => {
    const ind: any = wordTyped.indexOf(" ");
    console.log(ind, e.key);

    if (e.key == "Enter") {
      if (ind == -1) {
        setTriesUsed((t) => t + 1);
        //check the secret word
        if (wordTyped.join("") === secretword && triesUsed < NoOfTries) {
          setGameOverStatus("Won");
        } else if (triesUsed + 1 == NoOfTries) {
          setGameOverStatus("loss");
        }

        setprevTries((prev) => {
          const ar = [wordTyped, ...prev];
          return ar;
        });
        setWordStatus((prevStatus) => {
          const ar = [checkWordStatus(wordTyped, secretword), ...prevStatus];
          return ar;
        });
        console.log("status is ", wordStatus);

        setWordTyped((prev) => {
          const ar = Array.from(" ".repeat(WORDSIZE));
          ar[ind > 0 ? ind - 1 : WORDSIZE - 1] = " ";
          return ar;
        });
        console.log(prevTries.length);
      }
    } else if (e.key == "Backspace" && ind != 0) {
      setWordTyped((prev) => {
        const ar = [...prev];
        ar[ind > 0 ? ind - 1 : WORDSIZE - 1] = " ";
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
  if (gameOverStatus === "Won") {
    return (
      <>
        <div className="last-tries-wrapper">
          Congatulations you guessed the word {secretword} correctly, <br />
          you Won!!; <button onClick={onClickHandler} value={"newGame"} />
        </div>
      </>
    );
  }
  if (gameOverStatus == "loss") {
    return (
      <>
        <div className="last-tries-wrapper">
          OOPs!! your tries to guess the word {secretword} correctly is over
          <br />
          you lost!!; <button onClick={onClickHandler} value={"newGame"} />
        </div>
      </>
    );
  }
  return (
    <>
      <div tabIndex={0} className="guessInput-Div" onKeyDown={keyDownHandler}>
        <InputDivWrapper word={wordTyped} />
      </div>
      <div className="last-tries-wrapper">
        {prevTries.map((val: Array<string>, ind) => {
          console.log(val);
          return (
            <>
              <InputDivWrapper
                key={ind}
                word={val}
                statuses={wordStatus[ind]}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default GuessInput;
