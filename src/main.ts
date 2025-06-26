// import './style.css'

import ready from "./docReady.js";
import mouse from "./mouse.js";

const MAX_DT = 0.03;
const DEG = Math.PI * 2 / 360;

ready().then(() => {

  const rot = {
    elem: document.querySelector("#main-cuboid .rotation") as HTMLElement,
    q: new window.Quaternion.fromAxisAngle([1,1,0], Math.PI * 0.25)
  }
  rot.elem.style.transform = "matrix3d(" + rot.q.toMatrix4() + ")";

  const faceContentSects = document.getElementsByClassName("face-content") as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < faceContentSects.length; i++) {
    const elem = faceContentSects[i];
    elem.innerHTML = i.toString();
    Object.assign(elem.style, {
      display: "grid",
      justifyItems: "center",
      alignItems: "center",
      fontSize: "77px"
    })
  }

  //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values

  // Logic
  let now = performance.now();
  const mouseRotationAxis = [0, 1];
  let angularVel = 0;
  const angularDamping = DEG;
  setInterval(() => {
    const before = now;
    now = performance.now();
    // dt in ms
    const dt = Math.min((now - before) * 0.001, MAX_DT);

    // Update angular velocity
    angularVel -= angularDamping * dt;
    if (angularVel < 0) angularVel = 0;

    // Calculate rotation stuff if mouse is moving
    if (mouse.buttons === 1 && mouse.isMoving()) {
      mouseRotationAxis[0] = mouse.vy;
      mouseRotationAxis[1] = -mouse.vx;
      angularVel = Math.sqrt(mouse.vx**2 + mouse.vy**2) * 0.2 * DEG;
    } else if (mouse.buttons === 1) {
      angularVel = angularVel * 0.9;
    }
  });

  const animation = () => {
    const rotationAxis = [...mouseRotationAxis, 0];

    const newQ = new window.Quaternion.fromAxisAngle(rotationAxis, angularVel);
    rot.q = rot.q.mul(newQ);
    rot.elem.style.transform = "matrix3d(" + rot.q.toMatrix4() + ")";

    requestAnimationFrame(animation);
  };
  requestAnimationFrame(animation);
});