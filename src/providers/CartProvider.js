import React, {useState, useCallback, useMemo} from "react";

export const CartContext = React.createContext([]);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /**
   * add product to cart
   * @type {Function}
   */
  const addToCart = useCallback(
    (id, name, price) => {
      const cartItem = cart.find(item => item.id === id);
      if (!cartItem) {
        setCart([...cart, {count: 1, id, name, price}])
      } else {
        cartItem.count ++;
        setCart([...cart])
      }
    },
    [cart]
  );

  /**
   * Remove all items of a product
   * @type {Function}
   */
  const removeItems = useCallback(
    id => {
      setCart(cart.filter(item => item.id !== id))
    },
    [cart]
  );

  /**
   * increment products count
   * @type {Function}
   */
  const addOneItem = useCallback(
    id => {
      const cartItem = cart.find(item => item.id === id);
      cartItem.count ++;
      setCart([...cart])
    },
    [cart]
  );

  /**
   * decrement products count
   * @type {Function}
   */
  const removeOneItem = useCallback(
    id => {
      const cartItem = cart.find(item => item.id === id);
      cartItem.count --;
      cartItem.count === 0 ?
      setCart(cart.filter(item => item.id !== id)) :
      setCart([...cart]);
    },
    [cart]
  );

  /**
   * memo count all items in the cart
   * @type {function(): (*|number)}
   */
  const memoTotalItems = useMemo(
    () => {
      if (cart.length === 0) return 0;
      return cart.reduce( (acc, cur) => {
        return acc + cur.count;
      }, 0)
    },
    [cart]
  );

  /**
   * memo count total sum of items
   * @type {Function}
   */
  const memoTotalSum = useMemo(
    () => {
      if (cart.length === 0) return 0;
      return cart.reduce( (acc, cur) => {
        return acc + cur.count * cur.price
      }, 0)
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addOneItem,
        removeItems,
        removeOneItem,
        memoTotalItems,
        memoTotalSum
      }}
    >
      {children}
    </CartContext.Provider>
  );
}