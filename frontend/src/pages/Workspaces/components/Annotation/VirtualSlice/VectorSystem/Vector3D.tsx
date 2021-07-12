export class Vector3D {
  x: number
  y: number
  z: number
  
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  add(vector: Vector3D) {
    return new Vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z)
  }

  scalarMul(real: number) {
    return new Vector3D(real * this.x, real * this.y, real * this.z)
  }

  dot(vector: Vector3D) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z
  }

  crossProd(vector: Vector3D) {
    return new Vector3D(
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x
    );
  }

  round() {
    return new Vector3D(
      Math.round(this.x),
      Math.round(this.y),
      Math.round(this.z)
    )
  }
}