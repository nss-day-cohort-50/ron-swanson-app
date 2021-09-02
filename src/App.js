import { useEffect, useState } from 'react';
import { Toppings } from './Toppings';
import './App.css';

export const App = () => {
  const [breads, updateBreads] = useState([])
  const [meats, changeMeats] = useState([])
  const [toppings, syncToppings] = useState([])
  const [orders, populateOrders] = useState([])
  const [order, updateOrder] = useState({})
  const [monthlySales, addSales] = useState(0)
  const [chosenOptions, updateOptions] = useState({
    bread: "foo",
    meat: "bar",
    topping: "chickenMonkey"
  })


  useEffect(
    () => {
      console.log("Toppings state changed", toppings)
    },
    [toppings]
  )

  useEffect(
    () => {
      // REDUCE IT
      const costOfAllOrders = orders.reduce(
        (sum, currentOrder) => {
          return sum + currentOrder.bread.price + currentOrder.meat.price + currentOrder.topping.price
        }
        , 0
      )

      addSales(costOfAllOrders)
    },
    [orders]
  )

  const orderFetcher = () => {
    fetch(`http://localhost:8088/orders?_expand=bread&_expand=meat&_expand=topping`)
      .then(response => response.json())
      .then((data) => {
        console.log("Got orders response from API")
        populateOrders(data)
      })
  }

  useEffect(
    () => {
      fetch(`http://localhost:8088/breads`)
        .then(response => response.json())
        .then((apiBreadData) => {
          console.log("Got breads response from API")
          updateBreads(apiBreadData)
        })

      fetch(`http://localhost:8088/toppings`)
        .then(response => response.json())
        .then((data) => {
          console.log("Got toppings response from API")
          syncToppings(data)
        })

      fetch(`http://localhost:8088/meats`)
        .then(response => response.json())
        .then((apiMeatData) => {
          console.log("Got meats response from API")
          changeMeats(apiMeatData)
        })

      orderFetcher()
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
      console.log("Meat state changed", meats)
    },
    [meats]
  )

  const buildOrderObject = (idToModify, neueValue) => {
    const newOrder = { ...order }
    newOrder[idToModify] = neueValue
    updateOrder(newOrder)
  }

  const updateOrderState = (propToModify, newValue) => {
    const newObject = { ...chosenOptions }  // Copy of state
    newObject[propToModify] = newValue
    updateOptions(newObject)              // Update state with copy
  }


  return (
    <>
      {console.log(`JSX rendered`)}

      <h1>Welcome to Ron Swanson's Burgers</h1>

      <main className="options">
        <article className="option breads">
          {
            breads.map(
              (breadObject) => <button
                onClick={
                  () => {
                    updateOrderState("bread", breadObject.type)
                    buildOrderObject("breadId", breadObject.id)
                  }
                }
                key={`bread--${breadObject.id}`}>
                {breadObject.type}
              </button>
            )
          }
        </article>

        <article className="option meats">
          {
            meats.map(
              (meatObject) => <button
                onClick={() => {
                  updateOrderState("meat", meatObject.type)
                  buildOrderObject("meatId", meatObject.id)
                }}
                key={`meat--${meatObject.id}`}>
                {meatObject.type}
              </button>
            )
          }
        </article>

        <Toppings toppingsCollection={toppings} createFunc={buildOrderObject} updateFunction={updateOrderState} />
      </main>

      <article>
        <h2>Chosen Options</h2>
        <p>Bread: {chosenOptions.bread}</p>
        <p>Meat: {chosenOptions.meat}</p>
        <p>Topping: {chosenOptions.topping}</p>
      </article>

      <button onClick={
        () => {
          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
          }

          fetch(`http://localhost:8088/orders`, fetchOptions)
            .then(() => {
              orderFetcher()
            })
        }
      }>Place Order</button>

      <h2>All Orders</h2>

      <div>🚀🚀🚀🚀🚀🚀 Monthly sales: 💲{ monthlySales.toFixed(2) }</div>
      <article className="orderList">
        {
          orders.map(order => {
            return <div>
              Order #{order.id}:
              {order.bread.type} {order.meat.type} {order.topping.name} sandwich
              costs ${(order.bread.price + order.meat.price + order.topping.price).toFixed(2)}
            </div>
          })
        }
      </article>
    </>
  );
}
