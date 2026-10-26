"use strict";

// Person A — Aspa
// Character movement and appearance.

// Public functions:
// resetPlayer() — restore the initial player state.
// jump() — start a jump when running and grounded.
// updatePlayer(deltaTime) — coordinate the physics update.
// renderPlayer() — display the player's current state.

// Physics helpers:
// applyGravity(deltaTime) — update vertical velocity.
// movePlayer(deltaTime) — update vertical position.
// handleLanding() — resolve landing on the ground.

// Use gameState.player from shared.js.
// deltaTime is in seconds.
// Tahlia owns the animation loop.