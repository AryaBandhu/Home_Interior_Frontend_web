import { useCallback, useRef, useState } from "react"
import { ImagePlus, UploadCloud, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ACCEPTED = ["image/jpeg", "image/png", "image/jpg"]
const MAX_SIZE = 10 * 1024 * 1024

export function ImageUploader({ file, onChange }: { file: File | null; onChange: (file: File | null) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = useCallback((selected: File | undefined) => {
    if (!selected) return
    if (!ACCEPTED.includes(selected.type)) { toast.error("Please upload a JPG or PNG image."); return }
    if (selected.size > MAX_SIZE) { toast.error("Image must be smaller than 10MB."); return }
    setPreview((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(selected) })
    onChange(selected)
  }, [onChange])

  const clear = () => {
    setPreview((prev) => { if (prev) URL.revokeObjectURL(prev); return null })
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  if (file && preview) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-orange-500/20">
        <img src={preview} alt="Uploaded room preview" className="max-h-[380px] w-full object-contain bg-muted" />
        <Button type="button" variant="secondary" size="icon-sm" onClick={clear} className="absolute right-3 top-3 shadow-lg" aria-label="Remove image">
          <X />
        </Button>
        <div className="flex items-center justify-between gap-2 border-t border-border bg-card px-4 py-3">
          <p className="truncate text-sm text-muted-foreground">{file.name}</p>
          <Button type="button" variant="ghost" size="sm" onClick={() => inputRef.current?.click()} className="text-orange-500 hover:text-orange-600">
            <ImagePlus className="size-4 mr-1" /> Replace
          </Button>
        </div>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]) }}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-all duration-200",
        dragging
          ? "border-orange-500 bg-gradient-to-br from-orange-500/10 to-fuchsia-500/10 scale-[1.01]"
          : "border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-fuchsia-500/5 hover:border-orange-500/40 hover:from-orange-500/8 hover:to-fuchsia-500/8",
      )}
    >
      <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-fuchsia-500/20 text-orange-500">
        <UploadCloud className="size-8" />
      </span>
      <div className="space-y-1">
        <p className="font-semibold">
          Drag & drop your room photo, or{" "}
          <span className="text-orange-500">browse</span>
        </p>
        <p className="text-sm text-muted-foreground">JPG or PNG, up to 10MB</p>
      </div>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
    </button>
  )
}
