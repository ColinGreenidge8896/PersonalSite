import { useRef, useCallback } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";
import type { PhysicsBody } from "./textPhysics.types";

function getWordAtPoint(x: number, y: number): { word: string; rect: DOMRect; node: Text; startOffset: number; endOffset: number } | null {
  // Try caretPositionFromPoint (Firefox) then caretRangeFromPoint (Chrome/Safari)
  let textNode: Text | null = null;
  let offset = 0;

  if ("caretPositionFromPoint" in document) {
    const pos = (document as any).caretPositionFromPoint(x, y);
    if (pos && pos.offsetNode?.nodeType === Node.TEXT_NODE) {
      textNode = pos.offsetNode as Text;
      offset = pos.offset;
    }
  }

  if (!textNode && document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(x, y);
    if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
      textNode = range.startContainer as Text;
      offset = range.startOffset;
    }
  }

  if (!textNode || !textNode.textContent) return null;

  const text = textNode.textContent;

  // Find word boundaries around the offset
  let start = offset;
  let end = offset;
  while (start > 0 && !/\s/.test(text[start - 1])) start--;
  while (end < text.length && !/\s/.test(text[end])) end++;

  const word = text.slice(start, end).trim();
  if (!word) return null;

  // Get the bounding rect of this word
  const range = document.createRange();
  range.setStart(textNode, start);
  range.setEnd(textNode, end);
  const rect = range.getBoundingClientRect();

  return { word, rect, node: textNode, startOffset: start, endOffset: end };
}

function getComputedFont(element: Element): string {
  const style = getComputedStyle(element);
  const weight = style.fontWeight;
  const size = style.fontSize;
  const family = style.fontFamily;
  const styleVal = style.fontStyle === "normal" ? "" : style.fontStyle + " ";
  return `${styleVal}${weight} ${size} ${family}`;
}

function getComputedColor(element: Element): string {
  return getComputedStyle(element).color;
}

export function useWordPluck() {
  const idCounterRef = useRef(0);

  const pluckWord = useCallback(
    (e: MouseEvent): PhysicsBody | null => {
      const target = e.target as Element;
      if (!target) return null;

      // Don't pluck from the toggle button or canvas
      if (target.closest("[data-physics-ignore]")) return null;

      const hit = getWordAtPoint(e.clientX, e.clientY);
      if (!hit) return null;

      const { word, rect, node, startOffset, endOffset } = hit;
      const parent = node.parentElement;
      if (!parent) return null;

      const font = getComputedFont(parent);
      const color = getComputedColor(parent);

      // Use Pretext to measure dimensions
      const fontSize = parseFloat(getComputedStyle(parent).fontSize);
      const lineHeight = fontSize * 1.2;
      const prepared = prepareWithSegments(word, font);
      const result = layoutWithLines(prepared, Infinity, lineHeight);
      const measuredWidth = result.lines[0]?.width ?? rect.width;
      const measuredHeight = result.height || rect.height;

      // Hide the word in the DOM by wrapping in an invisible span
      const text = node.textContent!;
      const before = text.slice(0, startOffset);
      const after = text.slice(endOffset);

      const beforeNode = document.createTextNode(before);
      const hiddenSpan = document.createElement("span");
      hiddenSpan.textContent = word;
      hiddenSpan.style.visibility = "hidden";
      hiddenSpan.dataset.physicsPlucked = "true";
      const afterNode = document.createTextNode(after);

      const parentNode = node.parentNode!;
      parentNode.insertBefore(beforeNode, node);
      parentNode.insertBefore(hiddenSpan, node);
      parentNode.insertBefore(afterNode, node);
      parentNode.removeChild(node);

      const id = `body-${idCounterRef.current++}`;
      return {
        id,
        text: word,
        font,
        color,
        width: measuredWidth,
        height: measuredHeight,
        x: rect.left,
        y: rect.top,
        vx: 0,
        vy: 0,
        rotation: (Math.random() - 0.5) * 0.15,
        angularVel: 0,
        grabbed: false,
      };
    },
    []
  );

  const restoreAll = useCallback(() => {
    // Find all plucked spans and restore them by merging back into adjacent text nodes
    const spans = document.querySelectorAll("[data-physics-plucked]");
    spans.forEach((span) => {
      span.removeAttribute("style");
      span.removeAttribute("data-physics-plucked");
      // Unwrap: replace span with its text content
      const textNode = document.createTextNode(span.textContent || "");
      span.parentNode?.replaceChild(textNode, span);
      // Normalize merges adjacent text nodes back together
      textNode.parentNode?.normalize();
    });
  }, []);

  return { pluckWord, restoreAll };
}
