"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, ImageIcon, Loader2, ArrowRight, Sparkles, Scan, Barcode, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ScanPage() {
  const router = useRouter()
  const [captureMode, setCaptureMode] = useState<"camera" | "upload">("camera")
  const [scanMode, setScanMode] = useState<"food" | "barcode" | "ingredients">("food")
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      // Fallback to upload mode if camera access fails
      setCaptureMode("upload")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const captureImage = () => {
    if (videoRef.current) {
      setIsCapturing(true)

      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const imageDataUrl = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageDataUrl)
        stopCamera()
      }

      setIsCapturing(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetCapture = () => {
    setCapturedImage(null)
    if (captureMode === "camera") {
      startCamera()
    }
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      router.push("/dashboard/scan/results")
    }, 2000)
  }

  // Start camera when component mounts and capture mode is camera
  useState(() => {
    if (captureMode === "camera") {
      startCamera()
    }

    // Cleanup function to stop camera when component unmounts
    return () => {
      stopCamera()
    }
  })

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scan Food</h1>
        <p className="text-muted-foreground">Analyze your meal's nutritional content with Edge AI</p>
      </div>

      <Card className="one-ui-card">
        <CardHeader>
          <CardTitle>Capture Food Image</CardTitle>
          <CardDescription>Take a clear photo of your meal or packaged food</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="food" value={scanMode} onValueChange={(value) => setScanMode(value as any)}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="food" className="rounded-full">
                <Scan className="mr-2 h-4 w-4" />
                Food
              </TabsTrigger>
              <TabsTrigger value="barcode" className="rounded-full">
                <Barcode className="mr-2 h-4 w-4" />
                Barcode
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="rounded-full">
                <FileText className="mr-2 h-4 w-4" />
                Ingredients
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {!capturedImage ? (
            <>
              <div className="flex gap-2 mb-4">
                <Button
                  variant={captureMode === "camera" ? "default" : "outline"}
                  className={captureMode === "camera" ? "one-ui-button" : "rounded-full"}
                  onClick={() => {
                    setCaptureMode("camera")
                    startCamera()
                  }}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Camera
                </Button>
                <Button
                  variant={captureMode === "upload" ? "default" : "outline"}
                  className={captureMode === "upload" ? "one-ui-button" : "rounded-full"}
                  onClick={() => {
                    setCaptureMode("upload")
                    stopCamera()
                  }}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>

              {captureMode === "camera" ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
                  <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
                  {scanMode === "barcode" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-1/4 border-2 border-primary rounded-lg opacity-70"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="aspect-[4/3] flex items-center justify-center rounded-3xl border-2 border-dashed cursor-pointer bg-muted"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center p-6">
                    <ImageIcon className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Click to upload an image</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG or HEIC up to 10MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured food"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {!capturedImage ? (
            captureMode === "camera" && (
              <Button onClick={captureImage} disabled={isCapturing} className="w-full one-ui-button">
                {isCapturing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Capturing...
                  </>
                ) : (
                  <>Capture Photo</>
                )}
              </Button>
            )
          ) : (
            <>
              <Button onClick={analyzeImage} disabled={isAnalyzing} className="w-full one-ui-button">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {scanMode === "food"
                      ? "Analyze Food"
                      : scanMode === "barcode"
                        ? "Scan Barcode"
                        : "Extract Ingredients"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetCapture} className="w-full rounded-full">
                Take Another Photo
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <Card className="one-ui-card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Edge AI Processing</h3>
              <p className="text-sm text-muted-foreground">
                {scanMode === "food"
                  ? "Our on-device AI identifies foods and analyzes nutritional content without sending data to the cloud."
                  : scanMode === "barcode"
                    ? "Scan product barcodes to instantly retrieve nutritional information from our offline database."
                    : "Extract and analyze ingredient lists from packaged foods using our on-device OCR technology."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
