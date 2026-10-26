"use strict";

// Person B — Betim
// Obstacles and collision detection.

// Public functions:
// resetObstacles() — reset obstacle state and spawn timing.
// updateObstacles(deltaTime) — coordinate obstacle state updates.
// renderObstacles() — synchronize obstacle elements with state.
// hasCollision() — return true or false.

// Keep spawning, movement, and removal in focused helper functions.
// Use gameState.obstacles from shared.js.
// Render obstacle elements inside #obstacles.
// deltaTime is in seconds.
// Tahlia owns the animation loop.