<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.18.0/matter.min.js" integrity="sha512-5T245ZTH0m0RfONiFm2NF0zcYcmAuNzcGyPSQ18j8Bs5Pbfhp5HP1hosrR8XRt5M3kSRqzjNMYpm2+it/AUX/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.jsdelivr.net/npm/pathseg@1.2.1/pathseg.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/poly-decomp@0.3.0/build/decomp.min.js"></script>

<script>

let urls = [
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec872c125b79024df0c_1.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec70446d7a8ab0c61db_2.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec8ff3869a8dd8c7b1b_3.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec8322a610d1bfc2c04_4.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec8b163cdd4bf9baea1_5.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec86f3f8a09cbe384a0_6.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec8ff3869a8dd8c7a9c_7.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec8d1741339d2ec6958_8.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec83df087063a4a2dcb_9.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec813e253ab8c56586c_10.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec81889806c6aac0b90_11.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec8ea65da4b89bc8145_12.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec813e253ab8c565837_13.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec83df087063a4a2e3a_14.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec8b163cdd4bf9bafd4_15.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec858fb2bfe773482c2_16.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec813e253ab8c565889_17.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec9ea65da4b89bc8275_18.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec9a27aaa43e9f6aff3_19.svg",
    "https://uploads-ssl.webflow.com/647dedc7374f5d687a88e5e7/649eeec983eee0cf357efc51_20.svg",
    ];




const THICCNESS = 60;
const SVG_PATH_SELECTOR = "#matter-path";
const SVG_WIDTH_IN_PX = 100;
const SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH = 0.3;

const matterContainer = document.querySelector("#matter-container");

// Функція, яка перевіряє, чи користувач доскролив до елемента "matterContainer"
function checkIfVisible() {
  const rect = matterContainer.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  
  if (rect.top <= windowHeight / 2) {
    // Користувач доскролив до елемента "matterContainer"
    createObject(urls);
    window.removeEventListener("scroll", checkIfVisible); // Видаляємо обробник події прокрутки
  }
}

// Додаємо обробник події прокрутки
window.addEventListener("scroll", checkIfVisible);

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Body = Matter.Body,
  Svg = Matter.Svg,
  Vector = Matter.Vector,
  Vertices = Matter.Vertices;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: matterContainer,
  engine: engine,
  options: {
    width: matterContainer.clientWidth,
    height: matterContainer.clientHeight,
    background: "transparent",
    wireframes: false,
    showAngleIndicator: false
  }
});


// createObject(urls);

var ground = Bodies.rectangle(
  matterContainer.clientWidth / 2,
  matterContainer.clientHeight + THICCNESS / 2,
  27184,
  THICCNESS,
  { isStatic: true }
);

let leftWall = Bodies.rectangle(
  0 - THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  {
    isStatic: true
  }
);

let rightWall = Bodies.rectangle(
  matterContainer.clientWidth + THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  { isStatic: true }
);

// add all of the bodies to the world
Composite.add(engine.world, [ground, leftWall, rightWall]);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

Composite.add(engine.world, mouseConstraint);

// allow scroll through the canvas
mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
console.log(Composite.allBodies(engine.world));

function createObject(urls) {
  let numberOfElements = 20; // Кількість елементів для всіх пристроїв

  // Зменшення кількості елементів для пристроїв з шириною екрана 991 піксель і менше
  if (window.innerWidth <= 991.98) {
    numberOfElements = 7; // Змініть кількість елементів за потребою
  }  if (window.innerWidth <= 767.98) {
    numberOfElements = 5; // Змініть кількість елементів за потребою
  } if (window.innerWidth <= 479.98) {
    numberOfElements = 3; // Змініть кількість елементів за потребою
  }

  // Виберіть випадкові URL-адреси зображень для створення обмеженої кількості елементів
  let selectedUrls = urls.slice(0, numberOfElements);

  selectedUrls.forEach(function(url) {
    let randomX = Math.random() * window.innerWidth;
    let randomY = Math.random() * window.innerHeight;
    let boxWidth = 240;
    let boxHeight = 72;
    let borderRadius = 48;

    let box = Bodies.rectangle(randomX, randomY, boxWidth, boxHeight, {
      render: {
        sprite: {
          texture: url
        },
        chamfer: {
          radius: borderRadius
        }
      }
    });

    Composite.add(engine.world, box);
  });
}

/* function createObject(urls) {
  urls.forEach(function(url) {
    let randomX = Math.random() * window.innerWidth; // Випадкова координата X
    let randomY = Math.random() * window.innerHeight; // Випадкова координата Y

    let boxWidth = 240; // Ширина прямокутника
    let boxHeight = 72; // Висота прямокутника
    let borderRadius = 48; // Радіус закруглення кутів

    let box = Bodies.rectangle(randomX, randomY, boxWidth, boxHeight, {
      render: {
        sprite: {
          texture: url
        },
        chamfer: {
          radius: borderRadius
        }
      }
    });

    Composite.add(engine.world, box);
  });
} */



/* function createObject(urls) {
  urls.forEach(function(url) {
    let randomX = Math.random() * window.innerWidth; // Випадкова координата X
    let randomY = Math.random() * window.innerHeight; // Випадкова координата Y

    let boxWidth = 240; // Ширина прямокутника
    let boxHeight = 72; // Висота прямокутника

    let box = Bodies.rectangle(randomX, randomY, boxWidth, boxHeight, {
      render: {
        sprite: {
          texture: url
        }
      }
    });
    Composite.add(engine.world, box);
  });
} */





/* function scaleBodies() {
  const allBodies = Composite.allBodies(engine.world);

  allBodies.forEach((body) => {
    if (body.isStatic === true) return; // don't scale walls and ground
    const { min, max } = body.bounds;
    const bodyWidth = max.x - min.x;
    let scaleFactor =
      (matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) /
      bodyWidth;

    Body.scale(body, scaleFactor, scaleFactor);
  });
} */

function handleResize(matterContainer) {
  // set canvas size to new values
  render.canvas.width = matterContainer.clientWidth;
  render.canvas.height = matterContainer.clientHeight;

  // reposition ground
  Body.setPosition(
    ground,
    Vector.create(
      matterContainer.clientWidth / 2,
      matterContainer.clientHeight + THICCNESS / 2
    )
  );

  // reposition right wall
  Body.setPosition(
    rightWall,
    Vector.create(
      matterContainer.clientWidth + THICCNESS / 2,
      matterContainer.clientHeight / 2
    )
  );

  scaleBodies();
}

window.addEventListener("resize", () => handleResize(matterContainer));

</script>