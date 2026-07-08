import { Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 group", className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white shadow-lg group-hover:shadow-orange-500/40 transition-shadow">
        <Sparkles className="size-5" />
      </span>
      <span className="font-bold text-xl tracking-tight gradient-text">
        RoomCraft
      </span>
    </Link>
  )
}
