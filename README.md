# mayerfeld-jumping-game
A simple browser jumping game built with HTML, CSS, and JavaScript for the Mayerfeld JS2 group assignment.

## Run locally

Clone the repository and open `index.html` in a browser,
or launch it using VS Code's Live Server extension.
No installation or build step is required.

## How to play

- Select Start to begin.
- Press Space to jump over crabs.
- Each crab passed earns one point.
- A collision ends the game.
- Select Restart to reset the player, obstacles, and score.

## Project structure

- `JS/shared.js`: shared state and logical world dimensions.
- `JS/player.js`: jumping, gravity, landing, and player rendering.
- `JS/obstacles.js`: spawning, movement, rendering, and collisions.
- `JS/game.js`: controls, animation loop, scoring, and game lifecycle.
- `Assets/`: character, obstacle, and background artwork.

## Planned improvements

- Randomized obstacle spawn intervals.
- Overhead shark obstacles with fair spacing.

## Artwork credits

Character, shark, and crab artwork by [OpenMoji](https://openmoji.org/),
licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Ocean background by Subin Duangdee via [Vecteezy](https://www.vecteezy.com/free-vector/ocean).