"use strict";

// Person B — Betim
// Obstacles and collision detection.

// Public functions:
// resetObstacles() — reset obstacle state and spawn timing.
// updateObstacles(deltaTime) — coordinate obstacle state updates.
// renderObstacles() — synchronize obstacle elements with state.
// hasCollision() — return true or false.

// Obstacle settings
let spawnTimer = 0;

const spawnInterval = 2;
const obstacleSpeed = 200;


// Creates a new obstacle, adds it to the game, and stores it in the obstacles array.
function createObstacle() {

    const obstacle = {
        x: WORLD_WIDTH,
        y: 0,
        width: 30,
        height: 40,
        counted: false,
        element: null
    };

    const box = document.createElement("div");

    box.classList.add("obstacle");

    const container = document.getElementById("obstacles");

    container.appendChild(box);

    obstacle.element = box;

    box.style.left =
        (obstacle.x / WORLD_WIDTH) * 100 + "%";

    box.style.bottom =
        (obstacle.y / WORLD_HEIGHT) * 100 + "%";

    box.style.width =
        (obstacle.width / WORLD_WIDTH) * 100 + "%";

    box.style.height =
        (obstacle.height / WORLD_HEIGHT) * 100 + "%";

    gameState.obstacles.push(obstacle);
}


// Removes all obstacles and resets the timer when the game restarts.
function resetObstacles() {

    gameState.obstacles.forEach(function(obstacle) {
        obstacle.element.remove();
    });

    gameState.obstacles = [];

    spawnTimer = 0;
}


// Creates obstacles every 2 seconds, moves them left, and removes them when they leave the screen.
function updateObstacles(deltaTime) {

    spawnTimer += deltaTime;

    if (spawnTimer >= spawnInterval) {
        createObstacle();
        spawnTimer -= spawnInterval;
    }

    gameState.obstacles.forEach(function(obstacle) {

        obstacle.x -= obstacleSpeed * deltaTime;

        obstacle.element.style.left =
            (obstacle.x / WORLD_WIDTH) * 100 + "%";

    });

    gameState.obstacles = gameState.obstacles.filter(function(obstacle) {

        if (obstacle.x + obstacle.width < 0) {
            obstacle.element.remove();
            return false;
        }

        return true;
    });
}


// Checks if the player touches any obstacle using horizontal and vertical collision detection.
function hasCollision() {

    const player = gameState.player;

    for (const obstacle of gameState.obstacles) {

        const collisionX =
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x;

        const collisionY =
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y;

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