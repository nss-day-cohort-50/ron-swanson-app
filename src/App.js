import { useEffect, useState } from 'react';
import './App.css';

export const App = () => {
  const [ breads, updateBreads ] = useState([])
  const [ meats, changeMeats ] = useState([])
  const [ toppings, syncToppings ] = useState([])
  const [ chosenOptions, updateOptions ] = useState({
    bread: "NaN",
    meat: "Null",
    topping: "Undefined"
  })

  useEffect(
    () => {
      fetch(`http://localhost:8088/breads`)
          .then(response => response.json())
          .then((apiBreadData) => {
              console.log("Got breads response from API")
              updateBreads(apiBreadData)
          })

      fetch(`http://localhost:8088/meats`)
          .then(response => response.json())
          .then((apiMeatData) => {
              console.log("Got meats response from API")
              changeMeats(apiMeatData)
          })

      fetch(`http://localhost:8088/toppings`)
          .then(response => response.json())
          .then((data) => {
              console.log("Got toppings response from API")
              syncToppings(data)
          })
    },
    []
  )

  useEffect(
    () => {
      console.log("Options updated", chosenOptions)
    },
    [chosenOptions]
  )

  useEffect(
    () => {
      console.log("Bread state changed", breads)
    },
    [breads]
  )

  useEffect(
    () => {
      console.log("Toppings state changed", toppings)
    },
    [toppings]
  )

  useEffect(
    () => {
      console.log("Meat state changed", meats)
    },
    [meats]
  )


  return (
    <>
      {console.log("JSX rendered")}
      <h1>Welcome to Ron Swanson's Burgers</h1>

      <main className="options">
        <article className="option breads">
        {
          breads.map(
            (breadObject) => {
              return <button
                    onClick={
                      () => {
                        const newObject = {...chosenOptions}  // Copy of state
                        newObject.bread = breadObject.type    // Update the copy to look how I want
                        updateOptions(newObject)              // Update state with copy
                      }
                    }
                    key={`bread--${breadObject.id}`}>
                { breadObject.type }
              </button>
            }
          )
        }
        </article>

        <article className="option meats">
        {
          meats.map(
            (meatObject) => {
              return <button
                  onClick={
                    () => {
                      const newObject = {...chosenOptions}  // Copy of state
                      newObject.meat = meatObject.type    // Update the copy to look how I want
                      updateOptions(newObject)              // Update state with copy
                    }
                  }
                  key={`meat--${meatObject.id}`}>
                { meatObject.type }
              </button>
            }
          )
        }
        </article>

        <article className="option toppings">
        {
          toppings.map(
            (topping) => {
              return <button
                onClick={
                  () => {
                    const newObject = {...chosenOptions}  // Copy of state
                    newObject.topping = topping.name    // Update the copy to look how I want
                    updateOptions(newObject)              // Update state with copy
                  }
                }
                key={`topping--${topping.id}`}>
                { topping.name }
              </button>
            }
          )
        }
        </article>
      </main>

      <article>
        <h2>Chosen Options</h2>
        <p>Bread: {chosenOptions.bread}</p>
        <p>Meat: {chosenOptions.meat}</p>
        <p>Topping: {chosenOptions.topping}</p>
      </article>
    </>
  );
}
