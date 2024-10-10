export default function Cart({ cart }) {
    return (
        <div>
            <form className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Products
                </h2>
                <hr />
                <div>
                    {cart.map((item, index) => {
                        return (
                            <div key={index} className="grid grid-cols-4 mt-2">
                                <div>
                                    <img className="h-12 w-12" src={Constants.Storage + item.img} />
                                </div>
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    <TextInput
                                        id="qty"
                                        className="w-36"
                                        min={1}
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateCart(e.target.value)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </form>
            <div className="flex">
                <button>
                    Keep Shoping
                </button>
                <button>
                    Pay
                </button>
            </div>
        </div>
    )
}