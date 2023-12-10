import pop from "../../pop/index.js";
const { Texture, TileSprite, math } = pop;

const texture = new Texture("res/images/crash_test.png");

class CrashTestDummy extends TileSprite {
  constructor(bounds) {
    super(texture, 48, 48);
    this.frame.x = math.rand(4);
    this.pivot.x = 24;
    this.pivot.y = 24;

    this.dir = math.randf(Math.PI * 2);
    this.speed = math.rand(50, 150);

    this.clockwise = math.randOneIn(2);

    this.bounds = bounds;
  }

  update(dt) {
    const { pos, bounds, w, h, dir, speed } = this;

    this.rotation = this.dir + Math.PI / 4;

    pos.x += Math.cos(dir) * speed * dt;
    pos.y += Math.sin(dir) * speed * dt;

    this.dir += 0.8 * dt * (this.clockwise ? -1 : 1);

    if (math.randOneIn(30)) {
      this.clockwise = !this.clockwise;
    }

    // Bounce off the walls
    if (pos.x < 0 || pos.x > bounds.w - w) {
      this.dir = -this.dir + Math.PI;
    }
    if (pos.y < 0 || pos.y > bounds.h - h) {
      this.dir = -this.dir;
    }
  }
}

export default CrashTestDummy;
