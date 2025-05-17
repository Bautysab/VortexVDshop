import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  id: string
  title: string
  price: number
  discount: number
  image: string
  quantity: number
}

export type Notification = {
  id: string
  title: string
  message: string
  read: boolean
  date: string
}

type StoreState = {
  cart: CartItem[]
  notifications: Notification[]
  selectedCategory: string | null
  isCartOpen: boolean
  isNotificationsOpen: boolean
  isPaymentModalOpen: boolean
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  updateQuantity: (id: string, quantity: number) => void
  getCartTotal: () => number
  getCartCount: () => number
  toggleCart: () => void
  toggleNotifications: () => void
  togglePaymentModal: () => void
  markNotificationAsRead: (id: string) => void
  setSelectedCategory: (category: string | null) => void
  getUnreadNotificationsCount: () => number
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      notifications: [
        {
          id: "1",
          title: "Oferta especial",
          message: "¡50% de descuento en God of War! Oferta por tiempo limitado.",
          read: false,
          date: "2024-05-17T10:30:00Z",
        },
        {
          id: "2",
          title: "Nuevo lanzamiento",
          message: "The Last of Us Part II ya está disponible en nuestra tienda.",
          read: false,
          date: "2024-05-16T14:45:00Z",
        },
        {
          id: "3",
          title: "Actualización de cuenta",
          message: "Tu compra ha sido procesada correctamente.",
          read: false,
          date: "2024-05-15T09:15:00Z",
        },
      ],
      selectedCategory: null,
      isCartOpen: false,
      isNotificationsOpen: false,
      isPaymentModalOpen: false,

      addToCart: (item) => {
        const { cart } = get()
        const existingItem = cart.find((cartItem) => cartItem.id === item.id)

        if (existingItem) {
          set({
            cart: cart.map((cartItem) =>
              cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
            ),
          })
        } else {
          set({ cart: [...cart, { ...item, quantity: 1 }] })
        }
      },

      removeFromCart: (id) => {
        const { cart } = get()
        set({ cart: cart.filter((item) => item.id !== id) })
      },

      clearCart: () => set({ cart: [] }),

      updateQuantity: (id, quantity) => {
        const { cart } = get()
        set({
          cart: cart.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
        })
      },

      getCartTotal: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.price * (1 - item.discount / 100) * item.quantity, 0)
      },

      getCartCount: () => {
        const { cart } = get()
        return cart.reduce((count, item) => count + item.quantity, 0)
      },

      toggleCart: () =>
        set((state) => ({
          isCartOpen: !state.isCartOpen,
          isNotificationsOpen: false,
          isPaymentModalOpen: false,
        })),

      toggleNotifications: () =>
        set((state) => ({
          isNotificationsOpen: !state.isNotificationsOpen,
          isCartOpen: false,
          isPaymentModalOpen: false,
        })),

      togglePaymentModal: () =>
        set((state) => ({
          isPaymentModalOpen: !state.isPaymentModalOpen,
          isCartOpen: false,
          isNotificationsOpen: false,
        })),

      markNotificationAsRead: (id) => {
        const { notifications } = get()
        set({
          notifications: notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
        })
      },

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      getUnreadNotificationsCount: () => {
        const { notifications } = get()
        return notifications.filter((notification) => !notification.read).length
      },
    }),
    {
      name: "vortex-shop-storage",
    },
  ),
)
