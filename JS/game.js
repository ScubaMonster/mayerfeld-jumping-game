"use strict";

// Person C — Tahlia
// Game lifecycle, controls, scoring, and interface.

// Public functions:
// startGame() — coordinate starting or restarting a session.
// gameLoop(timestamp) — coordinate each animation frame.
// updateScore() — count newly passed obstacles.
// endGame() — transition the session to game over.
// setupGameControls() — register event listeners once.

// Keep state changes and interface rendering in separate helpers.
// Call updatePlayer(deltaTime), then renderPlayer().
// Call updateObstacles(deltaTime), then renderObstacles().
// Call hasCollision() to determine whether play should end.

// Convert animation timestamps to deltaTime in seconds.
// Maintain only one animation loop.