import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LuCalendarClock } from "react-icons/lu"

function CartPage({ cartItems, onRemoveItem, onUpdateQuantity, onEmptyCart, onAddToCart }) {
  const navigate = useNavigate()
  const [selectedAddress, setSelectedAddress] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderId] = useState("1234567890")
  const [removedItems, setRemovedItems] = useState([])

  const orderTotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  const tax = orderTotal * 0.1 // 10% tax
  const delivery = 50 // $50 delivery fee
  const total = orderTotal + tax + delivery
  const creditLimitExceeded = total > 10000

  

  useEffect(() => {
    // Ensure removedItems only contains items that are not in the current cart
    setRemovedItems((prevItems) =>
      prevItems.filter((item) => !cartItems.some((cartItem) => cartItem.id === item.id))
    );
  }, [cartItems]);
  
  const handleRemoveItem = useCallback(
    (itemId) => {
      const removedItem = cartItems.find((item) => item.id === itemId);
      if (removedItem) {
        setRemovedItems((prevItems) => [...prevItems, removedItem]);
      }
      onRemoveItem(itemId);
    },
    [cartItems, onRemoveItem]
  );
  
  const handlePlaceOrder = useCallback(() => {
    if (creditLimitExceeded || cartItems.length === 0) return
    setShowSuccess(true)
    window.scrollTo(0, 0)
    // Store current cart items as removed items
    setRemovedItems((prevItems) => [...prevItems, ...cartItems])
    // Remove all items from the cart
    cartItems.forEach((item) => onRemoveItem(item.id))
    // Empty the cart
    onEmptyCart()
  }, [creditLimitExceeded, cartItems, onRemoveItem, onEmptyCart])


  const renderSuggestions = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Previously selected items</h2>
      <p className="text-gray-600 mb-8">You might want to add these items back to your cart:</p>
      <div className="grid grid-cols-4 gap-6">
        {removedItems.slice(0, 4).map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-contain mb-4" />
            <h3 className="text-sm font-medium mb-2">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">From ${item.price}</p>
            <p className="text-sm text-red-500 mb-4">{Math.floor(Math.random() * 50) + 10} in stock</p>
            <button
              onClick={() => onAddToCart(item)}
              className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 text-sm"
            >
              <span>Add</span>
              <span>+</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#2E7D32] text-white p-8 rounded-lg mb-8">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white p-2">
              <svg className="w-6 h-6 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Your order #{orderId} is placed successfully.</h2>
              <p className="text-white/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet viverra velit. Pellentesque
                scelerisque sit amet ex a faucibus. Morbi dictum dui metus, at ullamcorper orci volutpat id. Fusce
                bibendum eros eu est scelerisque gravida quis vitae ante.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="ml-auto bg-white text-[#2E7D32] w-48 mt-5 px-4 py-2 rounded hover:bg-white/90"
            >
              Back to Home
            </button>
          </div>
        </div>
        {renderSuggestions()}
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some items to your cart to proceed.</p>
        {renderSuggestions()}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Credit Limit Exceeded Banner */}
      {creditLimitExceeded && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white p-2">
              <svg className="w-6 h-6 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Credit Limit Exceeded!</h2>
              <p className="text-white/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet viverra velit. Pellentesque
                scelerisque sit amet ex a faucibus. Morbi dictum dui metus, at ullamcorper orci volutpat id. Fusce
                bibendum eros eu est scelerisque gravida quis vitae ante.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="mt-5 bg-white text-black px-8  py-2 w-48 rounded hover:bg-white/90"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-8">Items in your cart</h1>

      <div className="flex gap-8">
        <div className="flex-grow">
          <div className="rounded-lg shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-center p-4">Item</th>
                  <th className="text-center p-4">Price/unit</th>
                  <th className="text-center p-4">Qty</th>
                  <th className="text-center p-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">128GB</p>
                          <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 text-sm mt-1">
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">${item.price}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex items-center border border-[#C6C6C6] bg-white rounded-full overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-12 text-center border-gray-200 py-1">{item.quantity || 1}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Select Address */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Select Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setSelectedAddress(1)}
                className={`bg-white p-6 rounded-lg shadow-md border-2 cursor-pointer ${
                  selectedAddress === 1 ? "border-boost-orange" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="relative">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === 1}
                      onChange={() => setSelectedAddress(1)}
                      className="opacity-0 absolute w-4 h-4"
                    />
                    <div
                      className={`w-4 h-4 mt-1 rounded-full border-2 ${
                        selectedAddress === 1 ? "border-boost-orange bg-boost-orange" : "border-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="font-medium">Lorem Ipsum</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet
                    </p>
                    <p className="text-sm text-gray-600 mt-2">1234567890</p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setSelectedAddress(2)}
                className={`bg-white p-6 rounded-lg shadow-md border-2 cursor-pointer ${
                  selectedAddress === 2 ? "border-boost-orange" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="relative">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === 2}
                      onChange={() => setSelectedAddress(2)}
                      className="opacity-0 absolute w-4 h-4"
                    />
                    <div
                      className={`w-4 h-4 mt-1 rounded-full border-2 ${
                        selectedAddress === 2 ? "border-boost-orange bg-boost-orange" : "border-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="font-medium">Lorem Ipsum 2</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Notes */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Delivery Notes</h2>
            <textarea
              className="w-full h-32 p-4 border rounded-lg border-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-boost-orange focus:border-boost-orange"
              placeholder="Enter any delivery instructions..."
            ></textarea>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button className="w-32 px-6 py-2 bg-[#dcdcdc] rounded-lg">Cancel</button>
            <button className="w-32 px-6 py-2 bg-[#3d3d3d] text-white rounded-lg">Add</button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-100">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-[#454545]">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#454545]">Order total</span>
                <span className="font-bold text-[#454545]">${orderTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#454545]">Tax</span>
                <span className="font-bold text-[#454545]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#454545]">Delivery</span>
                <span className="font-bold text-[#454545]">${delivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-3 border-t">
                <span className="text-[#454545]">Total</span>
                <span className="font-bold text-[#454545]">${total.toFixed(2)}</span>
              </div>
              <hr className="my-4 border-gray-300" />
            </div>
            <div className="mt-6 flex items-center text-gray-600 text-sm">
              <LuCalendarClock className="mr-2 text-2xl" />
              <span>Estimated delivery for your order is by 02/12/2025</span>
              <button className="ml-2 text-boost-orange border-b-2 border-boost-orange">reschedule</button>
            </div>

            <button
              onClick={handlePlaceOrder}
              className={`w-full mt-6 py-3 rounded-lg ${creditLimitExceeded || cartItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-boost-orange text-white hover:bg-boost-orange/90"}`}
              disabled={creditLimitExceeded || cartItems.length === 0}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

