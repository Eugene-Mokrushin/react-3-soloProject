import React from 'react'
import Dice from './components/Dice'
import { nanoid } from "nanoid"
import './dist/css/index.css'

const numberOfDices = 10;


function App() {
  const [dices, setDices] = React.useState([])

  const [round, setRound] = React.useState(0)

  React.useEffect(() => {
    localStorage.setItem('dices', JSON.stringify(dices))
    console.log(round)
  }, [round])

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem('dices')).length === 0) {
      setDices(prevState => {
        const newDices = []
        for (let index = 0; index != numberOfDices; index++) {
          newDices.push(createNewDice())
        }

        return newDices
      })
    } else {
      setDices(JSON.parse(localStorage.getItem('dices')))
    }
  }, [])

  function createNewDice() {
    return {
      id: nanoid(),
      number: Math.floor(1 + Math.random() * (6)),
      saved: false
    }
  }

  function setSave(id) {
    setDices(prevState => {
      const dices = []
      prevState.forEach(dice => {
        let sample;
        if (dice.id === id) {
          sample = {
            ...dice,
            saved: !dice.saved
          }
        } else {
          sample = dice
        }
        dices.push(sample)
      });

      return dices
    })
  }

  function rollDices() {
    const newDices = []

    dices.forEach(dice => {
      if (dice.saved) {
        newDices.push(dice)
      } else {
        const newNumDice = {
          ...dice,
          number: Math.floor(1 + Math.random() * (6))
        }
        newDices.push(newNumDice)
      }
    });
    setRound(prevState => prevState + 1)
    setDices(newDices)
  }





  const allDices = dices.map(dice => {
    return (
      <Dice
        key={dice.id}
        id={dice.id}
        number={dice.number}
        saved={dice.saved}
        handleSave={setSave}
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
        <button className="roll-btn" onClick={rollDices}>Roll</button>
      </main>
    </div>
  )
}

export default App
