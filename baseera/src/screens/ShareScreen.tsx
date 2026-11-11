import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { analysisStore, type MediaAttachment } from '../store'

const scopeTags = [
  { id: 'bias', label: 'Cognitive Bias', icon: 'psychology' },
  { id: 'fact', label: 'Fact Audits', icon: 'fact_check' },
  { id: 'synth', label: 'Synthetic Media', icon: 'auto_fix' },
]

export default function ShareScreen() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [uploadedFile, setUploadedFile] = useState<MediaAttachment | null>(null)
  const [inserted, setInserted] = useState(false)
  const [activeScopes, setActiveScopes] = useState<string[]>(['bias', 'fact', 'synth'])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleScope = (id: string) => {
    setActiveScopes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleFile = (file: File) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      setUploadedFile({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        previewUrl: file.type.startsWith('image/') ? base64 : undefined,
        base64,
      })
      setInserted(true)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData?.files && e.clipboardData.files.length > 0) {
        e.preventDefault()
        handleFile(e.clipboardData.files[0])
        return
      }
      const text = e.clipboardData?.getData('text')
      if (text && !inserted) {
        setUrl(text)
        setUploadedFile(null)
        setInserted(true)
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [inserted])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    } else {
      const text = e.dataTransfer.getData('text')
      if (text) {
        setUrl(text)
        setUploadedFile(null)
        setInserted(true)
      }
    }
  }

  const handlePasteButtonClick = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText()
        if (text) {
          setUrl(text)
          setUploadedFile(null)
          setInserted(true)
          return
        }
      }
    } catch {
      // Clipboard read blocked, fallback to prompt
    }
    const entered = window.prompt('Paste URL or text to analyze:')
    if (entered) {
      setUrl(entered)
      setUploadedFile(null)
      setInserted(true)
    }
  }

  const handleClearStaged = (e: React.MouseEvent) => {
    e.stopPropagation()
    setUrl('')
    setUploadedFile(null)
    setInserted(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const hasContent = !!(url.trim() || uploadedFile)

  const handleAnalyze = () => {
    if (!hasContent) return
    let content = url.trim()
    if (!content && uploadedFile) {
      content = `Analyzing uploaded media file: "${uploadedFile.name}"`
    }

    analysisStore.setContent(content)
    analysisStore.setMedia(uploadedFile)
    navigate('/processing')
  }

  return (
    <div className="flex flex-col min-h-dvh w-full bg-surface animate-fade-in">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*,text/*,.pdf"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0])
          }
        }}
      />

      <header className="px-space-xs pt-safe flex items-center h-16 gap-space-xs bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <button
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
        >
          <span className="material-symbols-outlined text-[24px] text-on-surface">arrow_back</span>
        </button>
        <h1 className="font-bold text-headline-sm text-on-surface tracking-tight">Content Submission</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-margin pb-10 flex flex-col gap-space-lg pt-4">

        <div
          className={`relative rounded-3xl p-space-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2 border-dashed
            ${isDragging
              ? 'border-primary-container bg-primary-fixed/20 scale-[0.99]'
              : inserted
                ? 'border-outline-variant bg-surface-container-low shadow-sm'
                : 'border-outline-variant/60 bg-surface-container-lowest hover:border-primary-container/60 hover:bg-surface-container-low'
            }`}
          style={{ minHeight: '190px' }}
          onClick={() => {
            if (!inserted) fileInputRef.current?.click()
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          id="dropzone-area"
        >
          {inserted ? (
            <div className="w-full flex flex-col items-center gap-space-sm animate-fade-in">
              {uploadedFile?.previewUrl ? (
                <div className="relative w-full max-h-48 rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center shadow-inner">
                  <img
                    src={uploadedFile.previewUrl}
                    alt={uploadedFile.name}
                    className="max-h-48 w-auto object-contain rounded-2xl"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-caption-sm px-2.5 py-1 rounded-full">
                    <span>{formatSize(uploadedFile.size)}</span>
                  </div>
                </div>
              ) : uploadedFile ? (
                <div className="w-full bg-surface rounded-2xl p-4 flex items-center gap-3 border border-outline-variant/40 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center shrink-0 text-primary-container">
                    <span className="material-symbols-outlined text-[24px]">description</span>
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="font-bold text-body-md text-on-surface truncate">{uploadedFile.name}</p>
                    <p className="text-caption-sm text-secondary">{formatSize(uploadedFile.size)} · {uploadedFile.type}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-surface rounded-2xl p-4 flex items-center gap-3 border border-outline-variant/40 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center shrink-0 text-primary-container">
                    <span className="material-symbols-outlined text-[24px]">link</span>
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="font-bold text-body-md text-on-surface truncate">{url}</p>
                    <p className="text-caption-sm text-secondary">Web link entered</p>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="mt-1 flex items-center gap-1 text-caption-lg text-error hover:underline py-1 px-3 rounded-full hover:bg-error/10 transition-colors"
                onClick={handleClearStaged}
                id="clear-staged-btn"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
                Clear content
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-space-xs pointer-events-none select-none">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-primary-container mb-1 shadow-sm">
                <span className="material-symbols-outlined text-[28px]">upload_file</span>
              </div>
              <p className="font-bold text-body-md-bold text-on-surface">
                Drag and drop content here
              </p>
              <p className="text-caption-sm text-secondary max-w-[240px]">
                Supports links, screenshots, images, or documents
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-caption-lg font-semibold text-secondary">
            {inserted && uploadedFile ? 'Context or focus notes (optional):' : 'Direct link or text snippet:'}
          </label>
          <input
            className="w-full h-12 rounded-2xl border-2 border-outline-variant px-4 text-body-md text-on-surface bg-surface focus:border-primary-container outline-none transition-colors"
            placeholder={
              inserted && uploadedFile
                ? 'E.g., examine claim in top caption'
                : 'Paste a URL or article text...'
            }
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              if (e.target.value && !inserted && !uploadedFile) {
                setInserted(true)
              }
            }}
            id="url-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          <button
            type="button"
            className="h-12 flex items-center justify-center gap-2 rounded-2xl bg-surface border-2 border-primary-container text-primary-container font-bold text-body-md hover:bg-secondary-container/40 active:bg-secondary-container transition-colors"
            id="btn-paste-link"
            onClick={handlePasteButtonClick}
          >
            <span className="material-symbols-outlined text-[20px]">content_paste</span>
            <span>Paste Link</span>
          </button>
          <button
            type="button"
            className="h-12 flex items-center justify-center gap-2 rounded-2xl bg-surface border-2 border-primary-container text-primary-container font-bold text-body-md hover:bg-secondary-container/40 active:bg-secondary-container transition-colors"
            id="btn-upload-media"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
            <span>Upload Media</span>
          </button>
        </div>

        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <label className="font-bold text-body-md-bold text-on-surface">Evaluation Scope</label>
            <span className="text-caption-sm text-secondary">{activeScopes.length} selected</span>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            {scopeTags.map((tag) => {
              const isActive = activeScopes.includes(tag.id)
              return (
                <button
                  type="button"
                  key={tag.id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption-lg font-semibold transition-all
                    ${isActive
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-secondary-container text-secondary'
                    }`}
                  onClick={() => toggleScope(tag.id)}
                >
                  <span className="material-symbols-outlined text-[15px]">{tag.icon}</span>
                  <span>{tag.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="button"
            disabled={!hasContent}
            className={`w-full h-12 rounded-2xl font-bold text-body-md flex items-center justify-center gap-2 shadow-sm transition-all
              ${hasContent
                ? 'bg-primary text-on-primary hover:bg-primary/90'
                : 'bg-surface-container-high text-secondary/60 cursor-not-allowed'
              }`}
            onClick={handleAnalyze}
            id="analyze-action-btn"
          >
            <span>Run Analysis</span>
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <p className="text-caption-sm text-secondary text-center">
            Evaluates framing, urgency, and source citations
          </p>
        </div>

      </main>
    </div>
  )
}
