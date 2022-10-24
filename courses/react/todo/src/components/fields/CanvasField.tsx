import { useEffect, useRef, useState } from "react";

export const CanvasField = ({ value, onInput }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [previousCoordinates, setPreviousCoordinates] = useState<any>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      if (renderCtx) {
        setContext(renderCtx);
      }
    }
  }, []);

  useEffect(() => {
    if (value) {
      const image = new Image();
      image.onload = () => {
        context?.drawImage(image, 0, 0);
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
    onInput(canvasRef.current?.toDataURL());
  };

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (isDrawing && context) {
      if (previousCoordinates.x === 0 && previousCoordinates.y === 0) {
        setPreviousCoordinates({
          x: event.clientX - (event.target as HTMLCanvasElement).offsetLeft,
          y: event.clientY - (event.target as HTMLCanvasElement).offsetTop,
        });
        return;
      }

      context.fillStyle = "blue";
      const currentCoordinates = {
        x: event.clientX - (event.target as HTMLCanvasElement).offsetLeft,
        y: event.clientY - (event.target as HTMLCanvasElement).offsetTop,
      };
      // @ts-ignore
      context.moveTo(previousCoordinates.x, previousCoordinates.y);
      context.lineTo(currentCoordinates.x, currentCoordinates.y);
      context.stroke();
      setPreviousCoordinates(currentCoordinates);
    }
  };

  return (
    <div>
      <canvas
        onMouseDown={mouseDown}
        onMouseMove={startDrawing}
        onMouseUp={mouseUp}
        onMouseLeave={mouseLeave}
        ref={canvasRef}
      />
    </div>
  );
};
