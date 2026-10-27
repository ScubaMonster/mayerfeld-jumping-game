"use strict";

// Obstacle settings
let spawnTimer = 0;

const spawnInterval = 2;
const obstacleSpeed = 200;


// Creates and stores a new obstacle.
function createObstacle() {

    const obstacle = {
        x: WORLD_WIDTH,
        y: 0,
        width: 30,
        height: 40,
        counted: false,
        element: null
    };

    gameState.obstacles.push(obstacle);
}


// Creates obstacles at regular intervals.
function spawnObstacles(deltaTime) {

    spawnTimer += deltaTime;

    while (spawnTimer >= spawnInterval) {
        createObstacle();
        spawnTimer -= spawnInterval;
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

            box.classList.add("obstacle");

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
}


// Checks whether the player touches an obstacle.
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