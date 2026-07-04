import { Link } from "react-router-dom"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using RoomAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. We reserve the right to update these terms at any time, and your continued use constitutes acceptance.`,
  },
  {
    title: "Use of Service",
    content: `RoomAI provides AI-powered interior design generation services. You may use the service for personal and commercial purposes. You agree not to use the service for any unlawful purpose, to upload inappropriate or offensive content, to attempt to reverse-engineer our AI systems, or to resell access to the service without authorization.`,
  },
  {
    title: "User Accounts",
    content: `You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old to use RoomAI. You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.`,
  },
  {
    title: "Credits & Subscriptions",
    content: `New users receive 20 free credits upon registration. Each AI generation consumes 1 credit. Credits do not expire. Subscription plans provide unlimited generations for the duration of the subscription period. Subscriptions are non-refundable once activated. We reserve the right to modify pricing with 30 days notice.`,
  },
  {
    title: "Intellectual Property",
    content: `You retain ownership of the images you upload. The AI-generated redesigns are yours to use for personal and commercial purposes. RoomAI retains ownership of the platform, AI models, and underlying technology. You grant us a limited license to process your images solely for the purpose of generating redesigns.`,
  },
  {
    title: "Content Guidelines",
    content: `You may only upload images of real rooms and spaces. You must have the right to upload any images you submit. Do not upload images containing people's faces, private information, or content that violates any laws. We reserve the right to remove content that violates these guidelines.`,
  },
  {
    title: "Limitation of Liability",
    content: `RoomAI is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount you paid us in the 3 months preceding the claim. AI-generated designs are for visualization purposes only.`,
  },
  {
    title: "Termination",
    content: `We reserve the right to suspend or terminate your account for violations of these terms. You may delete your account at any time through your profile settings. Upon termination, your credits and generation history will be permanently deleted.`,
  },
  {
    title: "Governing Law",
    content: `These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Mumbai, Maharashtra. If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force.`,
  },
]

export function TermsPage() {
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
        <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Please read these Terms of Service carefully before using RoomAI. These terms govern your use of our AI-powered interior design platform.
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
            Questions about these terms? Contact us at{" "}
            <a href="mailto:legal@roomai.in" className="text-orange-500 hover:underline">legal@roomai.in</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <Logo />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
