export const Toppings = ({ updateFunction, toppingsCollection }) => {

    return (
        <article className="option toppings">
            {
                toppingsCollection.map(
                    (topping) => <button
                        onClick={() => updateFunction("topping", topping.name)}
                        key={`topping--${topping.id}`}>
                        {topping.name}
                    </button>
                )
            }
        </article>
    )
}