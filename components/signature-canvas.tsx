"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import SignaturePad from "signature_pad";

export type SignaturePadHandle = {
  clear: () => void;
  isEmpty: () => boolean;
  toDataURL: () => string;
};

type Props = {
  onChange: (empty: boolean) => void;
};

export const SignatureCanvas = forwardRef<SignaturePadHandle, Props>(
  function SignatureCanvas({ onChange }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const padRef = useRef<SignaturePad | null>(null);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        padRef.current?.clear();
        onChangeRef.current(true);
      },
      isEmpty: () => padRef.current?.isEmpty() ?? true,
      toDataURL: () => padRef.current?.toDataURL("image/png") ?? "",
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let pad: SignaturePad | null = null;

      const notify = () => {
        onChangeRef.current(pad?.isEmpty() ?? true);
      };

      const fit = () => {
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        if (!width || !height) return;

        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const bitmapWidth = Math.round(width * ratio);
        const bitmapHeight = Math.round(height * ratio);
        const data = pad?.toData() ?? [];

        if (canvas.width === bitmapWidth && canvas.height === bitmapHeight && pad) return;

        canvas.width = bitmapWidth;
        canvas.height = bitmapHeight;
        canvas.getContext("2d")?.scale(ratio, ratio);

        if (!pad) {
          pad = new SignaturePad(canvas, {
            minWidth: 0.8,
            maxWidth: 2.4,
            penColor: "#1c1917",
            backgroundColor: "rgb(255, 255, 255)",
          });
          pad.addEventListener("endStroke", notify);
          padRef.current = pad;
          return;
        }

        pad.fromData(data);
      };

      const observer = new ResizeObserver(fit);
      observer.observe(canvas);
      fit();

      return () => {
        observer.disconnect();
        pad?.removeEventListener("endStroke", notify);
        pad?.off();
        padRef.current = null;
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        aria-label="Zone de signature manuscrite"
        className="block h-52 w-full touch-none rounded-xl border border-stone-300 bg-white sm:h-56"
      />
    );
  },
);
