import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Download, Loader2 } from "lucide-react"
import { generationApi, mediaUrl } from "@/lib/api"
import { downloadImage } from "@/lib/download"
import type { Generation } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

function formatDate(iso: string | null) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function HistoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [generation, setGeneration] = useState<Generation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    let active = true
    generationApi
      .detail(id)
      .then((data) => {
        if (active) setGeneration(data)
      })
      .catch(() => toast.error("Could not load generation details."))
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!generation) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 text-center">
        <p className="text-muted-foreground">Generation not found.</p>
        <Link to="/history">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to history
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        to="/history"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to history
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">
          {generation.design_style.name} {generation.room_type.name}
        </h1>
        <StatusBadge status={generation.status} />
      </div>

      {/* Metadata */}
      <Card className="mb-6">
        <CardContent className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Room Type</p>
            <p className="font-medium">{generation.room_type.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Design Style</p>
            <p className="font-medium">{generation.design_style.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Color Theme</p>
            <p className="font-medium">{generation.color_theme.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Room Size</p>
            <p className="font-medium">{generation.room_size.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="font-medium">{formatDate(generation.created_at)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="font-medium">{formatDate(generation.completed_at)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Samples</p>
            <p className="font-medium">{generation.num_samples}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="font-medium capitalize">{generation.status}</p>
          </div>
        </CardContent>
      </Card>

      {/* Input Image */}
      <h2 className="text-lg font-semibold mb-3">Input Image</h2>
      <div className="mb-8">
        <img
          src={mediaUrl(generation.input_image)}
          alt="Input room"
          className="max-h-80 rounded-xl border object-cover"
          crossOrigin="anonymous"
        />
      </div>

      {/* Generated Images */}
      {generation.images.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-3">Generated Designs</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {generation.images.map((img, i) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-xl border"
              >
                <img
                  src={mediaUrl(img.image)}
                  alt={`Generated design ${i + 1}`}
                  className="aspect-square w-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      downloadImage(
                        img.image,
                        `spacia-${generation.id}-${i + 1}.jpg`
                      )
                    }
                  >
                    <Download className="mr-1 h-4 w-4" /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {generation.error_message && (
        <Card className="mt-6 border-destructive/50">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">{generation.error_message}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
