import { useState, useEffect } from "react"

const ProductCard = ({ product, onAddToCart, onUpdateQuantity, onRemoveItem, isAdded, quantity }) => {
  const [isInCart, setIsInCart] = useState(isAdded)
  const [currentQuantity, setCurrentQuantity] = useState(quantity)

  useEffect(() => {
    setIsInCart(isAdded && quantity > 0)
    setCurrentQuantity(quantity)
  }, [isAdded, quantity])

  const handleAddToCart = () => {
    onAddToCart(product)
    setIsInCart(true)
    setCurrentQuantity(1)
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      onRemoveItem(product.id)
      setIsInCart(false)
      setCurrentQuantity(0)
    } else {
      onUpdateQuantity(product.id, newQuantity)
      setCurrentQuantity(newQuantity)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 shadow-b-xl flex flex-col items-center text-center">
      <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-contain mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">From ${product.price}</p>
      <p className="text-sm text-red-500 mb-4">{product.stock} in stock</p>
      {isInCart ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="flex items-center border border-[#C6C6C6] bg-white rounded-full overflow-hidden">
            <button
              onClick={() => handleQuantityChange(currentQuantity - 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-300"
            >
              -
            </button>
            <span className="w-12 text-center border-gray-200 py-1">{currentQuantity}</span>
            <button
              onClick={() => handleQuantityChange(currentQuantity + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="w-1/2 bg-gray-100 text-gray-800 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-200 text-sm"
        >
          <span>+</span>
          <span>Add</span>
        </button>
      )}
    </div>
  )
}

export default ProductCard

