import { Atom } from "lucide-react";

interface TextPhysicsToggleProps {
  active: boolean;
  onToggle: () => void;
}

export function TextPhysicsToggle({ active, onToggle }: TextPhysicsToggleProps) {
  return (
    <button
      className={`physics-toggle ${active ? "physics-toggle--active" : ""}`}
      onClick={onToggle}
      title={active ? "Exit physics mode" : "Enter physics mode — click words to fling them!"}
      data-physics-ignore
      aria-label="Toggle text physics mode"
    >
      <Atom size={20} />
    </button>
  );
}
