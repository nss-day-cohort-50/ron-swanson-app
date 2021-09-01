export const Toppings = ({ updateFunction, toppingsCollection, createFunc }) => {

    return (
        <article className="option toppings">
            {
                toppingsCollection.map(
                    (topping) => <button
                        onClick={() => {
                            updateFunction("topping", topping.name)
                            createFunc("toppingId", topping.id)
                        }}
                        key={`topping--${topping.id}`}>
                        {topping.name}
                    </button>
                )
            }
        </article>
    )
}