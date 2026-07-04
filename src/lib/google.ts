import { GOOGLE_CLIENT_ID } from "./constants"

interface GoogleCredentialResponse {
  credential: string
}

declare global {
  interface Window {
    // Razorpay and google declared in razorpay.ts
  }
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description: string
  theme?: { color?: string }
  handler: (response: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }) => void
  modal?: { ondismiss?: () => void }
  prefill?: { name?: string; email?: string }
}

function waitForGoogle(): Promise<NonNullable<Window["google"]>> {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval)
        resolve(window.google)
      } else if (attempts++ > 50) {
        clearInterval(interval)
        reject(new Error("Google Identity Services failed to load"))
      }
    }, 100)
  })
}

export async function renderGoogleButton(
  parent: HTMLElement,
  onCredential: (idToken: string) => void,
) {
  const google = await waitForGoogle()
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => onCredential(response.credential),
  })
  google.accounts.id.renderButton(parent, {
    theme: "outline",
    size: "large",
    width: 320,
    text: "continue_with",
    shape: "pill",
    logo_alignment: "center",
  })
}
