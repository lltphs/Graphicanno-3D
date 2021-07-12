class Vector3D {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  add(vector) {
    return new Vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z)
  }

  scalarMultiple(real) {
    return new Vector3D(real * this.x, real * this.y, real * this.z)
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z
  }

  floor() {
    return new Vector3D(
      Math.floor(this.x),
      Math.floor(this.y),
      Math.floor(this.z)
    )
  }
}

class Vector2D {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(vector) {
    return new Vector2D(this.x + vector.x, this.y + vector.y)
  }

  scalarMultiple(real) {
    return new Vector2D(real * this.x, real * this.y)
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y
  }

  floor() {
    return new Vector2D(Math.floor(this.x), Math.floor(this.y))
  }
}

class VirtualSlice {
  //ax + by + cz = d  ~> [a, b, c] * [x, y, z] = d ~> normalVector * X = d
  //origin is where (x, y) = (0, 0) on virtual slice lies on the real volume, format (x, y, z)
  //u, v is 2 unit vector, parallel with 2 normal edge Ox and Oy of the slice (on the volume), format (x, y, z)
  //		   ________________________
  //		   |                      |
  //		   |                      |
  //		   |                      |
  //	  v  |    Virtual Slice     |
  //	  ^  |                      |
  //	  |  |                      |
  //		   origin_________________|
  //		   --> u

  //Always start at 1x + 1y +0z = 0
  //And origin positioned at (0, 0, 0)
  //And u, v go from origin toward Ox, Oy
  constructor() {
  }

  addVolume(volume) {
    this.n = new Vector3D(0, 0, 1)
    this.u = new Vector3D(1, 0, 0)
    this.v = new Vector3D(0, 1, 0)
    this.origin = new Vector3D(
      Math.floor(volume.xLength / 2),
      Math.floor(volume.yLength / 2),
      0
    )
    this.dMove = 1
    this.dRot = 0.1
    this.norm = 1 / Math.sqrt(1 + Math.pow(this.dRot, 2))

    // The shape of volume define the shape of slice,
    // The image will be a square with its side equal the root of sum square of volume 3 dimension
    this.imSize = Math.ceil(
      2 * Math.sqrt(
        volume.xLength * volume.xLength +
          volume.yLength * volume.yLength +
          volume.zLength * volume.zLength
      )
    )

    // The volume lies in the center of the canvas vOrigin mean virtual origin on the canvas
    let xVOrigin = Math.floor(this.imSize / 2)
    let yVOrigin = Math.floor(this.imSize / 2)
    this.vOrigin = new Vector2D(xVOrigin, yVOrigin)

    this.volume = volume

    let imageArrayData = new Uint8ClampedArray(
      this.imSize * this.imSize * 4
    ).map((x, i) => (i % 4 === 3 ? 255 : 0))
    this.imData = new ImageData(imageArrayData, this.imSize, this.imSize)

    this.canvas = document.getElementById('vs')
    this.ctx = this.canvas.getContext('2d')
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.canvas.width = this.imSize
    this.canvas.height = this.imSize

    let bound = this.canvas.getBoundingClientRect()
    this.left = bound.left
    this.top = bound.top

    this.update()
  }

  goStraight(direction) {
    this.origin = this.origin.add(this.n.scalarMultiple(this.dMove * direction))
  }

  rotateHorizonal(direction) {
    let temp = this.u
      .add(this.n.scalarMultiple(this.dRot * direction))
      .scalarMultiple(this.norm)
    this.n = this.n
      .add(this.u.scalarMultiple(-this.dRot * direction))
      .scalarMultiple(this.norm)
    this.u = temp
  }

  rotateVertical(direction) {
    let temp = this.v
      .add(this.n.scalarMultiple(this.dRot * direction))
      .scalarMultiple(this.norm)
    this.n = this.n
      .add(this.v.scalarMultiple(-this.dRot * direction))
      .scalarMultiple(this.norm)
    this.v = temp
  }

  update() {
    for (let x = 0; x < this.imSize; x++) {
      for (let y = 0; y < this.imSize; y++) {
        let volCo = this.origin
          .add(
            this.u
              .scalarMultiple(x - this.vOrigin.x)
              .add(this.v.scalarMultiple(y - this.vOrigin.y))
          )
          .floor()
        if (
          volCo.x >= 0 &&
          volCo.x < this.volume.xLength &&
          volCo.y >= 0 &&
          volCo.y < this.volume.yLength &&
          volCo.z >= 0 &&
          volCo.z < this.volume.zLength
        ) {
          this.imData.data[x * 4 + y * this.imSize * 4] =
            255 *
            this.volume.data[
              volCo.x +
                volCo.y * this.volume.xLength +
                volCo.z * this.volume.xLength * this.volume.yLength
            ]
          this.imData.data[1 + x * 4 + y * this.imSize * 4] =
            255 *
            this.volume.data[
              volCo.x +
                volCo.y * this.volume.xLength +
                volCo.z * this.volume.xLength * this.volume.yLength
            ]
          this.imData.data[2 + x * 4 + y * this.imSize * 4] =
            255 *
            this.volume.data[
              volCo.x +
                volCo.y * this.volume.xLength +
                volCo.z * this.volume.xLength * this.volume.yLength
            ]
        } else {
          this.imData.data[x * 4 + y * this.imSize * 4] = 0
          this.imData.data[1 + x * 4 + y * this.imSize * 4] = 0
          this.imData.data[2 + x * 4 + y * this.imSize * 4] = 0
        }
      }
    }
    this.ctx.putImageData(this.imData, 0, 0)
  }
}

const slice = new VirtualSlice();

export default slice