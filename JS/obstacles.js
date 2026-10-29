"use strict";

// Obstacle settings
let spawnTimer = 0;

const minSpawnInterval = 1.8;
const maxSpawnInterval = 3;
const obstacleSpeed = 200;

const OBSTACLE_TYPES = {
  crab: {
    y: 0,
    width: 45,
    height: 48,
    collisionInsetX: 0.15,
    collisionInsetY: 0.22
  },

  shark: {
    y: 100,
    width: 90,
    height: 45,
    collisionInsetX: 0.08,
    collisionInsetY: 0.12
  }
};

const PAIR_UNLOCK_SCORE = 5;
const PAIR_CHANCE = 0.2;
const PAIR_GAP = 150;

let spawnInterval = getRandomSpawnInterval();

// Chooses a random time between obstacle spawns.
function getRandomSpawnInterval() {
    return Math.random() * (maxSpawnInterval - minSpawnInterval) + minSpawnInterval;
}

// Creates and stores an obstacle using its type's settings.
function createObstacle(type = "crab", offsetX = 0) {
  const settings = OBSTACLE_TYPES[type];

  const obstacle = {
    type: type,
    x: WORLD_WIDTH + offsetX,
    y: settings.y,
    width: settings.width,
    height: settings.height,
    collisionInsetX: settings.collisionInsetX,
    collisionInsetY: settings.collisionInsetY,
    counted: false,
    element: null
  };

  gameState.obstacles.push(obstacle);
}

// Chooses a single obstacle or a paired encounter.
function chooseEncounter() {
  if (
    gameState.score >= PAIR_UNLOCK_SCORE &&
    Math.random() < PAIR_CHANCE
  ) {
    return [
      { type: "shark", offsetX: 0 },
      { type: "crab", offsetX: PAIR_GAP }
    ];
  }

  return [
    { type: chooseObstacleType(), offsetX: 0 }
  ];
}

// Creates the obstacles belonging to an encounter.
function spawnEncounter(encounter) {
  encounter.forEach(function (member) {
    createObstacle(member.type, member.offsetX);
  });
}

// Calculates the wait before the next encounter.
function getNextSpawnInterval(encounter) {
  const lastMember = encounter[encounter.length - 1];

  return (
    getRandomSpawnInterval() +
    lastMember.offsetX / obstacleSpeed
  );
}

// Chooses which obstacle to spawn.
function chooseObstacleType() {
  return Math.random() < 0.3 ? "shark" : "crab";
}

// Coordinates encounter spawning and timing.
function spawnObstacles(deltaTime) {
  spawnTimer += deltaTime;

  while (spawnTimer >= spawnInterval) {
    spawnTimer -= spawnInterval;

    const encounter = chooseEncounter();

    spawnEncounter(encounter);

    spawnInterval = getNextSpawnInterval(encounter);
  }
}


// Moves all obstacles from right to left.
function moveObstacles(deltaTime) {

    gameState.obstacles.forEach(function(obstacle) {
        obstacle.x -= obstacleSpeed * deltaTime;
    });
}


// Removes off-screen obstacles from the array.
function removeOffscreenObstacles() {

    gameState.obstacles = gameState.obstacles.filter(function(obstacle) {
        return obstacle.x + obstacle.width >= 0;
    });
}


// Updates obstacle data without changing the HTML.
function updateObstacles(deltaTime) {

    spawnObstacles(deltaTime);

    moveObstacles(deltaTime);

    removeOffscreenObstacles();
}


// Creates, positions, and removes obstacle HTML elements.
function renderObstacles() {

    const container = document.getElementById("obstacles");

    // Remove HTML elements that are no longer in the obstacle array.
    const activeElements = new Set(
        gameState.obstacles.map(function(obstacle) {
            return obstacle.element;
        })
    );

    container.querySelectorAll(".obstacle").forEach(function(element) {
        if (!activeElements.has(element)) {
            element.remove();
        }
    });

    gameState.obstacles.forEach(function(obstacle) {

        if (obstacle.element === null) {

            const box = document.createElement("div");

            box.classList.add("obstacle", `obstacle--${obstacle.type}`);

            container.appendChild(box);

            obstacle.element = box;
        }

        obstacle.element.style.left =
            (obstacle.x / WORLD_WIDTH) * 100 + "%";

        obstacle.element.style.bottom =
            (obstacle.y / WORLD_HEIGHT) * 100 + "%";

        obstacle.element.style.width =
            (obstacle.width / WORLD_WIDTH) * 100 + "%";

        obstacle.element.style.height =
            (obstacle.height / WORLD_HEIGHT) * 100 + "%";
    });
}


// Resets obstacle data and the spawn timer.
function resetObstacles() {

    gameState.obstacles = [];

    spawnTimer = 0;

    spawnInterval = getRandomSpawnInterval();
}

// Calculate collision bounds inside the artwork's transparent margins.
function getCollisionBounds(entity, horizontalInset, verticalInset) {
  const insetX = entity.width * horizontalInset;
  const insetY = entity.height * verticalInset;

  return {
    left: entity.x + insetX,
    right: entity.x + entity.width - insetX,
    bottom: entity.y + insetY,
    top: entity.y + entity.height - insetY
  };
}

// Checks whether the player touches an obstacle.
function hasCollision() {
  const player = getCollisionBounds(gameState.player, 0.12, 0.16);

  for (const obstacle of gameState.obstacles) {
    const bounds = getCollisionBounds(
      obstacle,
      obstacle.collisionInsetX,
      obstacle.collisionInsetY
    );

    const collisionX =
      player.left < bounds.right &&
      player.right > bounds.left;

    const collisionY =
      player.bottom < bounds.top &&
      player.top > bounds.bottom;

    if (collisionX && collisionY) {
      return true;
    }
  }

  return false;
}


// Keep spawning, movement, and removal in focused helper functions.
// Use gameState.obstacles from shared.js.
// Render obstacle elements inside #obstacles.
// deltaTime is in seconds.
// Tahlia owns the animation loop.