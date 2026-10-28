"use strict";

// Logical game dimensions, independent of the browser's screen size.
const WORLD_WIDTH = 800;
const WORLD_HEIGHT = 300;

// Shared state: define this object only in this file.
const gameState = {
    status: "ready",
    score: 0,

    player: {
        x: 64,
        y: 0,
        width: 60,
        height: 72,
        velocityY: 0,
        grounded: true
    },

    obstacles: []
};