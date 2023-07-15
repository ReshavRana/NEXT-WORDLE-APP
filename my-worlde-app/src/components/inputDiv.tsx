import React from "react";

const inputDiv = (props: any) => {
  return <div className={"inputDiv " + props.status}>{props.letter}</div>;
};

export default inputDiv;
