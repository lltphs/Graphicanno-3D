import { Vector2D } from "./VectorSystem/Vector2D"
import { Vector3D } from "./VectorSystem/Vector3D"

export default class VirtualSlice {
  u3D!: Vector3D
  v3D!: Vector3D
  O3D!: Vector3D
  dTheta!: number
  norm!: number
  sideLength!: number
  O2D!: Vector2D
  u2D!: Vector2D
  v2D!: Vector2D
  sliceInnerBrightness: number = 0.8
  sliceBoundBrightness: number = 0.95

  constructor(volume) {
    this.createOriginAndBasisVectorsIn3D(volume);
    this.createDThetaAndNorm();
    this.createSideLength(volume);
    this.createOriginAndBasisVectorsIn2D();
  }

  createSideLength(volume) {
    // The shape of volume define the shape of slice,
    // The image will be a square with its side equal the root of sum square of volume 3 dimension
    this.sideLength = Math.ceil(
      Math.sqrt(
        volume.xLength * volume.xLength +
          volume.yLength * volume.yLength +
          volume.zLength * volume.zLength
      )
    );
  }

  createOriginAndBasisVectorsIn2D() {
    this.u2D = new Vector2D(1, 0);
    this.v2D = new Vector2D(0, 1);
    this.O2D = new Vector2D(
      Math.floor(this.sideLength / 2),
      Math.floor(this.sideLength / 2)
    );
  }

  createDThetaAndNorm() {
    this.dTheta = 0.01 * Math.PI;
    this.norm = 1 / Math.sqrt(1 + Math.pow(this.dTheta, 2));
  }

  createOriginAndBasisVectorsIn3D(volume) {
    this.u3D = new Vector3D(1, 0, 0);
    this.v3D = new Vector3D(0, 1, 0);
    this.O3D = new Vector3D(
      Math.floor(volume.xLength / 2),
      Math.floor(volume.yLength / 2),
      Math.floor(volume.zLength / 2),
    );
  }

  get n3D() {
    return this.u3D.crossProd(this.v3D);
  }

  moveForward() {
    this.translate(1);
  }

  movebackward() {
    this.translate(-1);
  }

  rotateUp() {
    this.rotateVertically(1);
  }

  rotateDown() {
    this.rotateVertically(-1);
  }

  rotateLeft() {
    this.rotateHorizonally(1);
  }

  rotateRight() {
    this.rotateHorizonally(-1);
  }

  translate(direction) {
    this.O3D = this.O3D.add(this.n3D.scalarMul(direction));
  }

  rotateHorizonally(direction) {
    this.u3D = this.u3D.add(this.n3D.scalarMul(this.dTheta * direction)).scalarMul(this.norm);
  }

  rotateVertically(direction) {
    this.v3D = this.v3D.add(this.n3D.scalarMul(this.dTheta * direction)).scalarMul(this.norm);
  }
}