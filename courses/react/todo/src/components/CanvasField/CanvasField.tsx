import React, { memo, useEffect, MouseEvent, useRef, useState } from "react";
import classes from "./CanvasField.module.scss";

type CanvasFieldProps = {
  value: string;
  onInput: (value: string) => void;
  className?: string;
  label?: string;
};

type Coordinates = { x: number; y: number };

export const CanvasField = memo(
  ({ value, onInput, label, className }: CanvasFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContext = canvasRef.current?.getContext("2d");

    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [previousCoordinates, setPreviousCoordinates] = useState<Coordinates>(
      {
        x: 0,
        y: 0,
      }
    );

    useEffect(() => {
      if (value) {
        const image = new Image();
        image.onload = () => {
          canvasContext?.drawImage(image, 0, 0);
        };
        image.src = value;
      }
    }, [value, canvasContext]);

    const enableDrawing = () => setIsDrawing(true);

    const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
      if (!(isDrawing && canvasContext && canvasRef.current)) {
        return;
      }

      const canvasEl = canvasRef.current;
      const { x: offsetX, y: offsetY } = canvasEl.getBoundingClientRect();

      // get canvas scale
      const scaleX = canvasEl.width / canvasEl.clientWidth;
      const scaleY = canvasEl.height / canvasEl.clientHeight;
      const updatedCoordinates = {
        x: (event.clientX - offsetX) * scaleX,
        y: (event.clientY - offsetY) * scaleY,
      };

      if (previousCoordinates.x === 0 && previousCoordinates.y === 0) {
        setPreviousCoordinates(updatedCoordinates);
        return;
      }

      canvasContext.fillStyle = "blue";
      canvasContext.lineWidth = 8;
      canvasContext.moveTo(previousCoordinates.x, previousCoordinates.y);
      canvasContext.lineTo(updatedCoordinates.x, updatedCoordinates.y);
      canvasContext.stroke();
      setPreviousCoordinates(updatedCoordinates);
    };

    const endDrawing = () => {
      setPreviousCoordinates({
        x: 0,
        y: 0,
      });
      setIsDrawing(false);
      onInput(canvasRef.current?.toDataURL() || "");
    };

    return (
      <div className={className}>
        {label ? <label>{label}</label> : null}
        <canvas
          width="1024"
          height="768"
          className={classes.CanvasField}
          onMouseDown={enableDrawing}
          onMouseMove={startDrawing}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          ref={canvasRef}
        />
      </div>
    );
  }
);
