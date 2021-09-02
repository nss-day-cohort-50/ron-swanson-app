import { useEffect, useState } from 'react';
import './App.css';

export const Meats = () => {
  const [meats, changeMeats] = useState([])

  useEffect(
    () => {
      fetch(`http://localhost:8088/meats`)
        .then(response => response.json())
        .then((apiMeatData) => {
          console.log("Got meats response from API")
          changeMeats(apiMeatData)
        })
    },
    []
  )

  useEffect(
    () => {
      console.log("Meat state changed", meats)
    },
    [meats]
  )

  return (
    <>
        <article className="option meats">
          {
            meats.map(
              (meatObject) => <button
                onClick={() => {
                }}
                key={`meat--${meatObject.id}`}>
                {meatObject.type}
              </button>
            )
          }
        </article>
    </>
  );
}
