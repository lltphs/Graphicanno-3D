export class Vector2D {
  x: number
  y: number

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(vector: Vector2D) {
    return new Vector2D(this.x + vector.x, this.y + vector.y)
  }

  scalarMul(real: number) {
    return new Vector2D(real * this.x, real * this.y)
  }

  dot(vector: Vector2D) {
    return this.x * vector.x + this.y * vector.y
  }

  round() {
    return new Vector2D(
      Math.round(this.x),
      Math.round(this.y)
    );
  }
}