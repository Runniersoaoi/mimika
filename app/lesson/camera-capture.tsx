"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Camera, ImagePlus } from "lucide-react";

type Props = {
  expectedText: string;
  onCaptureDone: () => void;
};

export default function CameraCapture({ expectedText, onCaptureDone }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showTimer, setShowTimer] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  const startTimerAndCapture = () => {
    setShowTimer(true);
    setTimer(10);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setShowTimer(false);
          capture(); // Captura después de 10 segundos
        }
        return prev - 1;
      });
    }, 1000);
  };

  const capture = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setLoading(true);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {
        const res = await fetch("https://api-mimika.onrender.com/predict/", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Error en backend:", res.status, text);
          setPrediction("Error al procesar");
        } else {
          const data = await res.json();
          setPrediction(data.prediction);

          if (
            data.prediction.trim().toLowerCase() ===
            expectedText.trim().toLowerCase()
          ) {
            onCaptureDone();
          }
        }
      } catch (err) {
        console.error("Error de red:", err);
        setPrediction("Error de red");
      } finally {
        setLoading(false);
      }
    }, "image/jpeg");
  };

  return (
    <div className="space-y-4 max-w-md mx-auto text-center">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full aspect-video bg-black"
        />
      </div>

      <canvas ref={canvasRef} width={520} height={480} className="hidden" />

      <div className="flex justify-center gap-2 pt-4 flex-col md:flex-row">
        <Button onClick={startCamera}>
          <Camera className="w-4 h-4 mr-2" />
          Iniciar Cámara
        </Button>
        <Button onClick={startTimerAndCapture} disabled={loading || showTimer}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <ImagePlus className="w-4 h-4 mr-2" />
              Capturar y Predecir
            </>
          )}
        </Button>
      </div>

      {showTimer && (
        <div className="text-2xl font-bold text-red-600 animate-pulse">
          Capturando en: {timer}s
        </div>
      )}

      <div className="mt-4 text-lg font-semibold">
        Predicción:{" "}
        <span className="text-primary">{prediction || "Sin datos aún"}</span>
      </div>
    </div>
  );
}
