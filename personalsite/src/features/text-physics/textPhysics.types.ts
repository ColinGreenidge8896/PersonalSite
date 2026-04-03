export interface PhysicsBody {
  id: string;
  text: string;
  font: string;
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  angularVel: number;
  grabbed: boolean;
}

export interface Vec2 {
  x: number;
  y: number;
}
