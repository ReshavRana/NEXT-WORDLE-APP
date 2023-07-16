import React, { useEffect, useState } from "react";
import axios from "axios";
import GuessInput from "@/components/guessInput";

const LandingPage = () => {
  const [secretword, setSecretword] = useState("notSet12");

  const url = "https://api.api-ninjas.com/v1/randomword";
  const config = {
    headers: {
      "X-Api-Key": "wBogMf69HImnHdOKBCjkgA==R6rNS05e0n4yDNfW",
    },
  };

  const newWordGen = async () => {
    setSecretword("Loading12");

    await getWord();
  };
  const getWord = async () => {
    await axios.get(url, config).then((res: any) => {
      setSecretword(res.data.word);
    });
  };

  if (secretword === "notSet12")
    return (
      <>
        <div>
          Ready to play?{" "}
          <button
            className="button"
            onClick={async () => {
              setSecretword("Loading12");
              await getWord();
            }}
          >
            press me
          </button>
        </div>
      </>
    );
  if (secretword === "Loading12") {
    return (
      <>
        <h1> Just Pretend This is A beautiful Loading page</h1>
      </>
    );
  }

  return (
    <>
      <GuessInput
        secretword={secretword}
        WORDSIZE={secretword.length}
        getNewWord={newWordGen}
      />
    </>
  );
};

export default LandingPage;
