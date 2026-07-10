import { subscriptionApi } from "./api"
import type { User } from "./types"

declare global {
  interface Window {
    Razorpay?: any
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void
          prompt: () => void
        }
      }
    }
  }
}

let scriptPromise: Promise<boolean> | null = null

function loadRazorpayScript(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => {
      scriptPromise = null
      resolve(false)
    }
    document.body.appendChild(script)
  })
  return scriptPromise
}

interface CheckoutArgs {
  planId: number
  user: User | null
}

export async function startRazorpayCheckout({ planId, user }: CheckoutArgs) {
  const loaded = await loadRazorpayScript()
  if (!loaded) {
    throw new Error("Could not load the payment gateway. Please try again.")
  }

  const order = await subscriptionApi.createOrder(planId)

  return new Promise<void>((resolve, reject) => {
    const options = {
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: "Spacia",
      description: "Subscription Plan",
      order_id: order.order_id,
      prefill: {
        name: user ? `${user.first_name} ${user.last_name}`.trim() : "",
        email: user?.email ?? "",
      },
      theme: { color: "#6d5efc" },
      handler: async (response: {
        razorpay_payment_id: string
        razorpay_order_id: string
        razorpay_signature: string
      }) => {
        try {
          await subscriptionApi.verifyPayment({
            plan_id: planId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })
          resolve()
        } catch (err) {
          reject(err)
        }
      },
      modal: {
        ondismiss: () => reject(new Error("Payment cancelled")),
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on("payment.failed", (resp: { error: { description: string } }) => {
      reject(new Error(resp.error?.description ?? "Payment failed"))
    })
    rzp.open()
  })
}
