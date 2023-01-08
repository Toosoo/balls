let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Events = Matter.Events;
let engine = Engine.create();
let render = Render.create({
  element: document.body,
  engine: engine,
});
engine.enableSleeping = true;
engine.gravity.scale = 0.001;
render.canvas.width = window.innerWidth;
render.canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  location.reload();
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
});
let gravityBtn = document.getElementById("gravityBtn");

function createBall() {
  setInterval(() => {
    if (gravityBtn.classList.contains("gravity-on")) {
      let ball = Bodies.circle(window.innerWidth - 50, 50, 20, { restitution: 1 });
      Composite.add(engine.world, [ball]);
    }
  }, 100);
}
createBall();
gravityBtn.addEventListener("click", () => {
  engine.gravity.scale = 0.00001;
  gravityBtn.classList.remove("gravity-on");
});

let ground = Bodies.rectangle(window.innerWidth - 50, window.innerHeight / 2, 200, 30, { isStatic: true });
let ceil = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth + 100, 60, { isStatic: true });
let floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth + 100, 60, { isStatic: true });
let leftWall = Bodies.rectangle(0, window.innerHeight / 2, 50, window.innerHeight + 100, { isStatic: true });
let rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 50, window.innerHeight + 100, { isStatic: true });
Matter.Body.rotate(ground, Math.PI * -0.08);
let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: { visible: false },
  },
});

Composite.add(engine.world, [ground, floor, mouseConstraint, leftWall, rightWall, ceil]);
Render.run(render);
let runner = Runner.create();
Runner.run(runner, engine);
