'use client'

/*
  CART CONTEXT — TA FLEUR

  Gestion d'état du panier :
  - useReducer pour une logique claire et prévisible
  - localStorage pour la persistance entre sessions
  - openCart / closeCart pour le drawer

  En production : les mutations iront vers Shopify Storefront API
  (addLinesToCart, updateCartLines, removeCartLines).
  La structure CartItem est calquée sur les types Shopify Cart.
*/

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export interface CartItem {
  productId:    string
  slug:         string
  name:         string
  price:        number   // en centimes (prix FINAL incluant option roses)
  image:        string
  imageAlt:     string
  quantity:     number
  message?:     string
  variantLabel?: string  // ex : "50 roses" — affiché dans le panier
}

interface CartState {
  items:   CartItem[]
  isOpen:  boolean
}

type CartAction =
  | { type: 'ADD_ITEM';     payload: CartItem }
  | { type: 'REMOVE_ITEM';  payload: { productId: string } }
  | { type: 'UPDATE_QTY';   payload: { productId: string; quantity: number } }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'HYDRATE';      payload: CartItem[] }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   REDUCER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existing = state.items.findIndex(i => i.productId === action.payload.productId)
      if (existing !== -1) {
        // Incrémenter la quantité si déjà dans le panier
        const items = [...state.items]
        items[existing] = {
          ...items[existing],
          quantity: Math.min(10, items[existing].quantity + action.payload.quantity),
          message:  action.payload.message ?? items[existing].message,
        }
        return { ...state, items }
      }
      return { ...state, items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.productId !== action.payload.productId),
      }

    case 'UPDATE_QTY': {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.productId !== productId) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === productId ? { ...i, quantity: Math.min(10, quantity) } : i
        ),
      }
    }

    case 'CLEAR':   return { ...state, items: [] }
    case 'OPEN':    return { ...state, isOpen: true }
    case 'CLOSE':   return { ...state, isOpen: false }
    case 'HYDRATE': return { ...state, items: action.payload }
    default:        return state
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface CartContextValue {
  items:        CartItem[]
  isOpen:       boolean
  totalItems:   number   // somme des quantités
  subtotal:     number   // en centimes
  addItem:      (item: CartItem) => void
  removeItem:   (productId: string) => void
  updateQty:    (productId: string, quantity: number) => void
  clearCart:    () => void
  openCart:     () => void
  closeCart:    () => void
}

const CartContext = createContext<CartContextValue | null>(null)

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROVIDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const STORAGE_KEY = 'ta-fleur-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  /* Hydratation depuis localStorage au montage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: 'HYDRATE', payload: parsed })
        }
      }
    } catch {
      // localStorage indisponible (SSR ou mode privé)
    }
  }, [])

  /* Persistance à chaque changement */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // silencieux
    }
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal   = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const addItem    = useCallback((item: CartItem) => dispatch({ type: 'ADD_ITEM',    payload: item }), [])
  const removeItem = useCallback((id: string)     => dispatch({ type: 'REMOVE_ITEM', payload: { productId: id } }), [])
  const updateQty  = useCallback((id: string, q: number) => dispatch({ type: 'UPDATE_QTY', payload: { productId: id, quantity: q } }), [])
  const clearCart  = useCallback(()               => dispatch({ type: 'CLEAR' }), [])
  const openCart   = useCallback(()               => dispatch({ type: 'OPEN'  }), [])
  const closeCart  = useCallback(()               => dispatch({ type: 'CLOSE' }), [])

  return (
    <CartContext.Provider value={{
      items: state.items, isOpen: state.isOpen,
      totalItems, subtotal,
      addItem, removeItem, updateQty, clearCart,
      openCart, closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOOK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
