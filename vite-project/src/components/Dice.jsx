import React from "react";

export default function Dice({id, number, saved, handleSave}) {
    return (
        <div 
        className={saved ? "dice saved" : "dice"}
        onClick={() => handleSave(id)}
        >
          {number}
          
        </div>
    )
}