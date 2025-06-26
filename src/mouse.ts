class Mouse {
  _x;
  _y;
  _dx;
  _dy;
  _dt;
  _buttons = 0;

  constructor() {
    this._x = 0;
    this._y = 0;
    this._dx = 0;
    this._dy = 0;
    this._dt = 0;
    this._buttons;
  }

  get x() {return this._x || 0}
  get y() {return this._y || 0}
  get vx() {return this._dx || 0 / this._dt || 1}
  get vy() {return this._dy || 0 / this._dt || 1}
  get buttons() {return this._buttons || 0}

  isMoving() {
    return this._dx || this._dy;
  }
}
const mouse = new Mouse();

// Intermediate variables
let x = 0, y = 0, buttons = 0;
const setIntermediateVars = (e: MouseEvent) => {
  x = e.clientX;
  y = e.clientY;
  // Buttons prop
  // A number representing one or more buttons.
  // For more than one button pressed simultaneously,
  // the values are combined (e.g., 3 is primary + secondary).

  // 0 : No button or un-initialized
  // 1 : Primary button (usually the left button)
  // 2 : Secondary button (usually the right button)
  // 4 : Auxiliary button (usually the mouse wheel
  // button or middle button)
  // 8 : 4th button (typically the "Browser Back" button)
  // 16 : 5th button (typically the "Browser Forward" button)
  buttons = e.buttons;
}

document.addEventListener("mousedown", setIntermediateVars);
document.addEventListener("mouseup", setIntermediateVars);
document.addEventListener("mousemove", setIntermediateVars);

// Update mouse object
let before = performance.now();
setInterval(() => {
  const now = performance.now();

  mouse._dt = (now - before) * 0.001; // seconds

  // Update dx, dy only if it's possible
  if (mouse._x !== undefined) {
    mouse._dx = x - mouse._x;
    mouse._dy = y - mouse._y;
  }
  mouse._x = x;
  mouse._y = y;
  mouse._buttons = buttons;

  before = now;
});

export default mouse;