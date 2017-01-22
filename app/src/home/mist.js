// Helper functions


// My [].fill polyfill
if (!Array.prototype.fill) {
  /* eslint-disable no-extend-native */
  Array.prototype.fill = (value) => {
    for (let i = 0; i < this.length; i += 1) {
      this[i] = value;
    }
    return this;
  };
  /* eslint-enable no-extend-native */
}

function random(low, high) {
  return (Math.random() * (high - low)) + low;
}

function randint(low, high) {
  return Math.floor(random(low, high));
}


/** Implements basic particle physics (moving and bouncing) */
class Particle {
  /**
   * Create a new particle in a simulation.
   * Particles have positions and velocities, and remember which renderer they're bound to.
   * @param {ParticleRenderer} renderer - the ParticleRender that the particle belongs to.
   * @param {number} x - the initial X position of the particle
   * @param {number} y - the initial Y position of the particle
   * @param {number} vx - the initial X velocity of the particle
   * @param {number} vy - the initial Y velocity of the particle
   */
  constructor(renderer, x, y, vx, vy) {
    this.renderer = renderer;
    this.x = x;    // X position on canvas
    this.y = y;    // Y position on canvas
    this.vx = vx;  // X velocity
    this.vy = vy;  // Y velocity
  }

  /** Advance the simulation by one step */
  step() {
    // Bounce particles when they hit the edges of the canvas
    if (this.x < 0 || this.x >= this.renderer.width()) {
      this.bounceX();
    }
    if (this.y < 0 || this.y >= this.renderer.height()) {
      this.bounceY();
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  /** Cause the current particle to bounce in the X direction */
  bounceX() {
    this.vx = -1 * this.vx;
  }

  /** Cause the current particle to bounce in the Y direction */
  bounceY() {
    this.vy = -1 * this.vy;
  }
}


/** Orchestrates and renders particles */
class ParticleRenderer {
  /**
   * Create a new particle renderer.
   * @param {CanvasRenderingContext2D} ctx - the rendering context of the canvas to draw on
   * @param {number} particleCount - the number of particles to maintain in the simulation
   */
  constructor(ctx, particleCount) {
    this.ctx = ctx;
    this.particleCount = particleCount;

    this.particles = new Array(this.particleCount).fill(0).map(() => new Particle(
      this,
      randint(0, this.width()),   // X position
      randint(0, this.height()),  // Y position
      randint(0, 5),              // X velocity
      randint(0, 5),              // Y velocity
    ));
  }

  /**
   * Get the width of the canvas coordinate system.
   * @return {number} the width of the canvas
   */
  width() {
    return this.ctx.canvas.width;
  }

  /**
   * Get the height of the canvas coordinate system
   * @return {number} the height of the canvas
   */
  height() {
    return this.ctx.canvas.height;
  }
}


window.addEventListener('resize', () => {
  const canvas = document.getElementById('mist');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;

  ctx.fillStyle = 'white';
  ctx.font = `${canvas.height}px Arial`;
  ctx.fillText('Hi', 10, canvas.height);


  // Make everything faded with a gradient

  ctx.globalCompositeOperation = 'destination-in';

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));

window.addEventListener('load', () => {
  const canvas = document.getElementById('mist');
  const ctx = canvas.getContext('2d');
  window.particleSim = new ParticleRenderer(ctx, 10);
});
