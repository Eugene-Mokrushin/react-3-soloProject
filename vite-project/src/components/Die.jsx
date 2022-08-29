import React from "react";
import { nanoid } from "nanoid";

export default function Dice({ number, isHeld, holdDice }) {
  let dots = []
  for (let index = 0; index < number; index++) {
    dots.push(index)
  }

  let allDots
  if (number != 6 && number != 4 && number != 5) {
    allDots = dots.map(dot => {
      return (
        <div className="dot" key={nanoid()}></div>
      )
    })
  } else if (number === 4) {
    allDots = (
      <div className="four-d">
        <div className="column">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="column">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    )
  } else if (number === 6) {
    allDots = (
      <div className="six-d">
        <div className="column">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="column">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    )
  } else if (number === 5) {
    allDots = (
      <div className="five-d">
        <div className="column">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="column">
          <div className="dot"></div>
        </div>
        <div className="column">
          <div className="dot"></div>
          <div className="dot"></div>

        </div>
      </div>
    )
  }

  return (
    <div
      className={isHeld ? "dice saved" : "dice"}
      id={determineId(number)}
      onClick={holdDice}
    >
      {allDots}
    </div>
  )
}


function determineId(num) {
  switch (num) {
    case 1:
      return 'one'

    case 2:
      return 'two'

    case 3:
      return 'three'

    case 4:
      return 'four'

    case 5:
      return 'five'

    case 6:
      return 'six'

    default:
      break;
  }
}