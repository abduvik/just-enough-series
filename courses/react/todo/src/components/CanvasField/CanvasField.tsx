import React, { memo, useEffect, useRef, useState } from "react";
import classes from "./CanvasField.module.scss";

type CanvasFieldProps = {
  value: string;
  onInput: (value: string) => void;
  className?: string;
  label?: string;
};

export const CanvasField = memo(
  ({ value, onInput, label, className }: CanvasFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasContext, setCanvasContext] =
      useState<CanvasRenderingContext2D | null>(null);

    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [previousCoordinates, setPreviousCoordinates] = useState<any>({
      x: 0,
      y: 0,
    });

    useEffect(() => {
      if (canvasRef.current) {
        const renderCtx = canvasRef.current.getContext("2d");
        if (renderCtx) {
          setCanvasContext(renderCtx);
        }
      }
    }, []);

    useEffect(() => {
      if (value) {
        const image = new Image();
        image.onload = () => {
          canvasContext?.drawImage(image, 0, 0);
        };
        image.src = value;
      }
    }, [value]);

    const mouseDown = () => setIsDrawing(true);
    const mouseUp = () => endDrawing();
    const mouseLeave = () => endDrawing();

    const endDrawing = () => {
      setPreviousCoordinates({
        x: 0,
        y: 0,
      });
      setIsDrawing(false);
      onInput(canvasRef.current?.toDataURL() || "");
    };

    const startDrawing = (
      event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
      if (isDrawing && canvasContext) {
        const offsetX =
          (event as any).target.offsetLeft +
          (event as any).target.offsetParent.offsetLeft;
        const offsetY =
          (event as any).target.offsetTop +
          (event as any).target.offsetParent.offsetTop;

        // get canvas scale
        const scaleX =
          (canvasRef.current as any)?.width /
          (canvasRef.current as any)?.clientWidth;
        const scaleY =
          (canvasRef.current as any)?.height /
          (canvasRef.current as any)?.clientHeight;

        if (previousCoordinates.x === 0 && previousCoordinates.y === 0) {
          setPreviousCoordinates({
            x: (event.clientX - offsetX) * scaleX,
            y: (event.clientY - offsetY) * scaleY,
          });
          return;
        }

        canvasContext.fillStyle = "blue";
        canvasContext.lineWidth = 8;
        const currentCoordinates = {
          x: (event.clientX - offsetX) * scaleX,
          y: (event.clientY - offsetY) * scaleY,
        };
        // @ts-ignore
        canvasContext.moveTo(previousCoordinates.x, previousCoordinates.y);
        canvasContext.lineTo(currentCoordinates.x, currentCoordinates.y);
        canvasContext.stroke();
        setPreviousCoordinates(currentCoordinates);
      }
    };

    return (
      <div className={className}>
        {label ? <label>{label}</label> : null}
        <canvas
          width="1024"
          height="768"
          className={classes.CanvasField}
          onMouseDown={mouseDown}
          onMouseMove={startDrawing}
          onMouseUp={mouseUp}
          onMouseLeave={mouseLeave}
          ref={canvasRef}
        />
      </div>
    );
  }
);
