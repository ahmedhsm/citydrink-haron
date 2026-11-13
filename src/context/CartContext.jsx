import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'city-drink-cart';

export const FREE_ITEM_THRESHOLD = 200;
export const FREE_ITEM_MAX_PRICE = 50;

function getRegularSubtotal(items) {
  return items.reduce(
    (sum, item) => (item.isFree ? sum : sum + item.price * item.quantity),
    0
  );
}

/**
 * Automatically strips any promotional free item if regular subtotal drops below 200 EGP.
 */
function enforceFreeItemEligibility(items) {
  return getRegularSubtotal(items) >= FREE_ITEM_THRESHOLD
    ? items
    : items.filter((item) => !item.isFree);
}

/**
 * Safely reads persisted cart items from localStorage and enforces promo eligibility.
 */
function loadInitialCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? enforceFreeItemEligibility(parsed) : [];
  } catch {
    return [];
  }
}

/**
 * Provides global shopping cart state, item quantity controls, promo gift state, and drawer visibility.
 */
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => !item.isFree && item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          !item.isFree && item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, isFree: false, quantity: 1 }];
    });
  }, []);

  const incrementQuantity = useCallback((productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        !item.isFree && item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decrementQuantity = useCallback((productId) => {
    setCartItems((prev) =>
      enforceFreeItemEligibility(
        prev.flatMap((item) => {
          if (item.isFree || item.id !== productId) return [item];
          if (item.quantity <= 1) return [];
          return [{ ...item, quantity: item.quantity - 1 }];
        })
      )
    );
  }, []);

  const removeFromCart = useCallback((productId, isFree = false) => {
    setCartItems((prev) =>
      enforceFreeItemEligibility(
        prev.filter(
          (item) => !(item.id === productId && Boolean(item.isFree) === Boolean(isFree))
        )
      )
    );
  }, []);

  const selectFreeItem = useCallback((product) => {
    setCartItems((prev) => {
      if (getRegularSubtotal(prev) < FREE_ITEM_THRESHOLD) {
        return prev.filter((item) => !item.isFree);
      }
      if (product.price > FREE_ITEM_MAX_PRICE) {
        return prev;
      }

      const regularItems = prev.filter((item) => !item.isFree);
      return [...regularItems, { ...product, price: 0, quantity: 1, isFree: true }];
    });
  }, []);

  const removeFreeItem = useCallback(() => {
    setCartItems((prev) => prev.filter((item) => !item.isFree));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const quantityById = useMemo(() => {
    const map = new Map();
    for (const item of cartItems) {
      if (!item.isFree) {
        map.set(item.id, item.quantity);
      }
    }
    return map;
  }, [cartItems]);

  const getItemQuantity = useCallback(
    (productId) => quantityById.get(productId) ?? 0,
    [quantityById]
  );

  const regularSubtotal = useMemo(() => getRegularSubtotal(cartItems), [cartItems]);
  const isFreeItemEligible = regularSubtotal >= FREE_ITEM_THRESHOLD;
  const selectedFreeItem = useMemo(
    () => cartItems.find((item) => item.isFree) ?? null,
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.isFree ? 0 : item.price * item.quantity),
        0
      ),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      isCartOpen,
      totalItems,
      totalPrice,
      regularSubtotal,
      isFreeItemEligible,
      selectedFreeItem,
      addToCart,
      incrementQuantity,
      decrementQuantity,
      removeFromCart,
      selectFreeItem,
      removeFreeItem,
      clearCart,
      getItemQuantity,
      openCart,
      closeCart,
    }),
    [
      cartItems,
      isCartOpen,
      totalItems,
      totalPrice,
      regularSubtotal,
      isFreeItemEligible,
      selectedFreeItem,
      addToCart,
      incrementQuantity,
      decrementQuantity,
      removeFromCart,
      selectFreeItem,
      removeFreeItem,
      clearCart,
      getItemQuantity,
      openCart,
      closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Custom hook to access City Drink cart state and actions.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
