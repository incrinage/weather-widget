import React from "react";

export default function Tile(props) {
  return (
    <div className={`tile ${props.className}`}>
      {props.children}
    </div>
  );

}