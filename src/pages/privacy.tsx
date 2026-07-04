import { Link } from "react-router-dom"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, upload images, or contact us for support. This includes your email address, name, and profile information from Google Sign-In. We also collect the room images you upload for AI generation purposes.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to provide, maintain, and improve our services. Your uploaded images are used solely to generate AI redesigns and are not shared with third parties or used to train AI models. We may use your email to send service-related notifications.`,
  },
  {
    title: "Image Data & Privacy",
    content: `Your uploaded room images are processed by our AI system to generate redesigns. Images are stored securely and are only accessible to you. We do not use your images for training AI models, share them with advertisers, or make them publicly accessible. You can delete your generation history at any time.`,
  },
  {
    title: "Data Storage & Security",
    content: `We implement industry-standard security measures to protect your personal information. Your data is stored on secure servers. We use encryption for data transmission and storage. However, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: "Third-Party Services",
    content: `We use Google Sign-In for authentication and Razorpay for payment processing. These services have their own privacy policies. We use Google's Gemini AI API for image generation — your images are sent to Google's servers for processing in accordance with Google's API terms.`,
  },
  {
    title: "Cookies",
    content: `We use essential cookies to maintain your session and preferences (such as dark/light mode). We do not use tracking or advertising cookies. You can control cookie settings through your browser.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, update, or delete your personal information at any time through your profile settings. You may also request deletion of your account and all associated data by contacting us at privacy@roomai.in.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or through a notice on our platform. Your continued use of RoomAI after changes constitutes acceptance of the updated policy.`,
  },
]

export function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Badge className="mb-4 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400">
          Legal
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          At RoomAI, we take your privacy seriously. This policy explains how we collect, use, and protect your information when you use our service.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white text-xs font-bold">{i + 1}</span>
                {s.title}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-fuchsia-500/5 p-6">
          <p className="text-sm text-muted-foreground">
            Questions about this policy? Contact us at{" "}
            <a href="mailto:privacy@roomai.in" className="text-orange-500 hover:underline">privacy@roomai.in</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <Logo />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
