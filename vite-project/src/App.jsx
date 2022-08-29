import React from 'react'
import Die from './components/Die'
import Confetti from 'react-confetti'
import { nanoid } from "nanoid"
import './dist/css/index.css'

const numberOfDices = 10;
let timerInterval

function App() {
  const [dices, setDices] = React.useState(allNewDice())
  const [timer, setTimer] = React.useState(0)
  const [numberOfRolls, setNumberOfRolls] = React.useState(0)
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dices.every(die => die.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      clearInterval(timerInterval)
    }
  }, [dices])


  function allNewDice() {
    let newDice = []
    for (let index = 0; index < numberOfDices; index++) {
      newDice.push(createNewDice())
    }
    return newDice
  }

  function createNewDice() {
    return {
      id: nanoid(),
      number: Math.floor(1 + Math.random() * (6)),
      isHeld: false
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      setTimer(prevState => prevState + 100)
    }, 100);
  }

  function holdDice(id) {
    timer === 0 ? startTimer() : null
    setDices(prevState => prevState.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  function rollDices() {
    if (tenzies) {
      setTenzies(false)
      setDices(allNewDice())
      setNumberOfRolls(0)
      setTimer(0)
    } else { 
      setDices(prevState => prevState.map(die => {
        return die.isHeld ? die : createNewDice()
      }))
      setNumberOfRolls(prevState => prevState + 1)
    }


  }


  const allDices = dices.map(dice => {
    return (
      <Die
        key={dice.id}
        number={dice.number}
        isHeld={dice.isHeld}
        holdDice={() => holdDice(dice.id)}
      />
    )
  })



  return (
    <div className="container">
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="descriprtion">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices">
          {allDices}
        </div>
        <div className="btn-wrapper">
          <span className='num-roll'>Roll: {numberOfRolls} </span>
          <button className="roll-btn" onClick={rollDices}>{tenzies ? "New Game" : 'Roll'}</button>
          <span className='time-win'>Time: {timer / 1000}</span>
        </div>
      </main>
      {tenzies && <Confetti />}
    </div>
  )
}

export default App
