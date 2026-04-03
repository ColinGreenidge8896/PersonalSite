import { useRef, useEffect, useCallback } from "react";
import { usePhysicsEngine } from "./usePhysicsEngine";
import { useWordPluck } from "./useWordPluck";

export function TextPhysicsSandbox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const { addBody, grabBody, moveGrabbed, releaseGrabbed } =
    usePhysicsEngine(canvasRef);
  const { pluckWord, restoreAll } = useWordPluck();

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      // First try to grab an existing body on the canvas
      if (grabBody(e.clientX, e.clientY)) {
        isDraggingRef.current = true;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Otherwise try to pluck a word from the page
      const body = pluckWord(e);
      if (body) {
        addBody(body);
        // Immediately grab the new body so the user can fling it
        body.grabbed = true;
        grabBody(body.x + body.width / 2, body.y + body.height / 2);
        isDraggingRef.current = true;
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [addBody, grabBody, pluckWord]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      moveGrabbed(e.clientX, e.clientY);
    },
    [moveGrabbed]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    releaseGrabbed();
  }, [releaseGrabbed]);

  // Touch support
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (grabBody(touch.clientX, touch.clientY)) {
        isDraggingRef.current = true;
        e.preventDefault();
        return;
      }
      const body = pluckWord({
        clientX: touch.clientX,
        clientY: touch.clientY,
        target: document.elementFromPoint(touch.clientX, touch.clientY),
      } as unknown as MouseEvent);
      if (body) {
        addBody(body);
        body.grabbed = true;
        grabBody(body.x + body.width / 2, body.y + body.height / 2);
        isDraggingRef.current = true;
        e.preventDefault();
      }
    },
    [addBody, grabBody, pluckWord]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const touch = e.touches[0];
      if (touch) moveGrabbed(touch.clientX, touch.clientY);
    },
    [moveGrabbed]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    releaseGrabbed();
  }, [releaseGrabbed]);

  useEffect(() => {
    // Use capture phase so we intercept clicks before page elements
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("touchstart", handleTouchStart, { capture: true, passive: false });
    document.addEventListener("touchmove", handleTouchMove, { capture: true, passive: false });
    document.addEventListener("touchend", handleTouchEnd, true);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown, true);
      document.removeEventListener("mousemove", handleMouseMove, true);
      document.removeEventListener("mouseup", handleMouseUp, true);
      document.removeEventListener("touchstart", handleTouchStart, true);
      document.removeEventListener("touchmove", handleTouchMove, true);
      document.removeEventListener("touchend", handleTouchEnd, true);
      restoreAll();
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd, restoreAll]);

  return (
    <>
      <div className="physics-hint" data-physics-ignore>
        Click any word to pluck it off the page — drag and fling!
      </div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        data-physics-ignore
      />
    </>
  );
}
