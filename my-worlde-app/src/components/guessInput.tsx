"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NoOfTries } from "@/constants";
import InputDivWrapper from "@/components/inputDivWrapper";
import InputWrapper from "./inputwrapper";

const GuessInput = ({ secretword, _, getNewWord }: any) => {
  // console.log("rerendered boix");
  let wordSize = secretword.length;
  const dumarr = Array.from(" ".repeat(wordSize));

  let prevTr: Array<Array<string>> = [[]];

  const [wordTyped, setWordTyped] = useState(dumarr);
  const [wordStatus, setWordStatus] = useState(prevTr);

  console.log(secretword, " this is the secr4et word now");

  const [prevTries, setprevTries] = useState(prevTr);
  const [triesUsed, setTriesUsed] = useState(0);
  const [gameOverStatus, setGameOverStatus] = useState("");
  // console.log(wordSize, " ", wordTyped, " this is the wordtyped word now");

  //for rerendering for sync
  useEffect(() => {
    setWordTyped(dumarr);
  }, [secretword]);

  const onClickHandler = () => {
    //reseting the game
    setGameOverStatus(" ");
    setTriesUsed(0);
    setWordStatus(prevTr);
    setprevTries(prevTr);
    getNewWord();
  };

  const checkWordStatus = (word: any, secret: any) => {
    let temp = dumarr;
    const mp = new Map();
    for (let i = 0; i < wordSize; i++) {
      if (word[i].toLowerCase() === secret[i].toLowerCase()) {
        temp[i] = "Green";
      } else {
        let freq = mp.get(secret[i]) || 0;

        mp.set(secret[i], freq + 1);
      }
    }
    for (let i = 0; i < wordSize; i++) {
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
          const ar = Array.from(" ".repeat(wordSize));
          ar[ind > 0 ? ind - 1 : wordSize - 1] = " ";
          return ar;
        });
        console.log(prevTries.length);
      }
    } else if (e.key == "Backspace" && ind != 0) {
      setWordTyped((prev) => {
        const ar = [...prev];
        ar[ind > 0 ? ind - 1 : wordSize - 1] = " ";
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
          <h2>Congrats you have guessed the word {secretword} correctly r</h2>
          <br />
          <h2>
            {"you Won!!;    "}
            <button className="button" onClick={onClickHandler}>
              {" "}
              NewGame{" "}
            </button>
          </h2>
        </div>
      </>
    );
  }
  if (gameOverStatus == "loss") {
    return (
      <>
        <div className="last-tries-wrapper">
          <h2>
            OOPs!! your tries to guess the word {secretword} correctly is over
          </h2>
          <br />
          <h2>
            you lost!!; <button onClick={onClickHandler}> NewGame </button>
          </h2>
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
