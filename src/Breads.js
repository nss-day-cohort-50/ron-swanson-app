import { useEffect, useState } from 'react';
import './App.css';

export const Breads = () => {
  const [breads, updateBreads] = useState([])

  useEffect(
    () => {
      fetch(`http://localhost:8088/breads`)
        .then(response => response.json())
        .then((apiBreadData) => {
          console.log("Got breads response from API")
          updateBreads(apiBreadData)
        })
    },
    []
  )

  useEffect(
    () => {
      console.log("Bread state changed", breads)
    },
    [breads]
  )


  return (
    <>
        <article className="option breads">
          {
            breads.map(
              (breadObject) => <button
                onClick={
                  () => {
                  }
                }
                key={`bread--${breadObject.id}`}>
                {breadObject.type}
              </button>
            )
          }
        </article>
    </>
  );
}
