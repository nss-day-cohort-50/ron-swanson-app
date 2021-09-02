import { useEffect, useState } from 'react';
import './App.css';

export const Toppings = () => {
  const [toppings, syncToppings] = useState([])

  useEffect(
    () => {
      console.log("Toppings state changed", toppings)
    },
    [toppings]
  )

  useEffect(
    () => {
      fetch(`http://localhost:8088/toppings`)
        .then(response => response.json())
        .then((data) => {
          console.log("Got toppings response from API")
          syncToppings(data)
        })
    },
    []
  )
  return (
    <>
        <article className="option toppings">
          {
            toppings.map(
              (toppingObject) => <button
                onClick={() => {
                }}
                key={`topping--${toppingObject.id}`}>
                {toppingObject.name}
              </button>
            )
          }
        </article>

    </>
  );
}
