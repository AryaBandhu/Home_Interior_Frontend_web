import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThreeBackground } from "@/components/three-background"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { authApi } from "@/lib/api"
import { renderGoogleButton } from "@/lib/google"

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const buttonRef = useRef<HTMLDivElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [gsiError, setGsiError] = useState(false)

  const from = (location.state as { from?: string } | null)?.from || "/dashboard"

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    let mounted = true

    async function handleCredential(idToken: string) {
      setSubmitting(true)
      try {
        const res = await authApi.googleLogin(idToken)
        if (!mounted) return
        login(res.user, res.tokens)
        const name = res.user.username || res.user.email?.split("@")[0] || "there"
        toast.success(res.is_new_user ? `Welcome, ${name}! 🎉 You have 3 free credits.` : `Welcome back, ${name}! 👋`)
        navigate(from, { replace: true })
      } catch (err) {
        console.error("Google login error:", err)
        if (!mounted) return
        toast.error("Sign-in failed. Please try again.")
        setSubmitting(false)
      }
    }

    if (buttonRef.current) {
      renderGoogleButton(buttonRef.current, handleCredential).catch((err) => {
        console.error("GSI load error:", err)
        if (mounted) setGsiError(true)
      })
    }

    return () => { mounted = false }
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      <ThreeBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background pointer-events-none" />

      <header className="relative z-10 flex h-16 items-center justify-between px-4 sm:px-6">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="relative mx-auto mb-5 flex size-16 items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-fuchsia-600 rounded-2xl blur-lg opacity-50 animate-pulse" />
              <span className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white shadow-xl">
                <Sparkles className="size-8" />
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome to <span className="gradient-text">RoomAI</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Sign in to start redesigning your space with AI.</p>
          </div>

          <Card className="border-orange-500/20 shadow-2xl shadow-orange-500/10 backdrop-blur-sm bg-card/90">
            <CardContent className="flex flex-col items-center gap-6 p-8">
              {submitting ? (
                <div className="flex flex-col items-center gap-3 py-6 text-muted-foreground">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-fuchsia-500/30 rounded-full blur-lg animate-pulse" />
                    <Loader2 className="relative size-8 animate-spin text-orange-500" />
                  </div>
                  <p className="text-sm">Signing you in…</p>
                </div>
              ) : (
                <>
                  <div ref={buttonRef} className="flex min-h-[44px] justify-center w-full" />
                  {gsiError && (
                    <p className="text-center text-sm text-destructive">
                      Could not load Google Sign-In. Please disable any ad blockers and refresh.
                    </p>
                  )}
                  <div className="w-full rounded-xl bg-gradient-to-r from-orange-500/10 to-fuchsia-500/10 border border-orange-500/20 p-4 text-center">
                    <p className="text-sm font-medium">🎉 New users get <span className="text-orange-500 font-bold">3 free credits</span></p>
                    <p className="text-xs text-muted-foreground mt-1">No credit card required</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link to="/terms" className="text-orange-500 hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>.
          </p>
          <p className="mt-3 text-center text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">← Back to home</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
