# mayerfeld-jumping-game
A simple browser jumping game built with HTML, CSS, and JavaScript for the Mayerfeld JS2 group assignment.

## Run locally

Clone the repository and open `index.html` in a browser,
or launch it using VS Code's Live Server extension.
No installation or build step is required.

## How to play

- Select Start to begin.
- Press Space to jump over crabs.
- Stay low and let sharks pass overhead.
- Each obstacle passed earns one point.
- After five points, occasional shark-and-crab pairs appear.
  Let the shark pass, then time your jump over the following crab.
- A collision ends the game.
- Select Restart to reset the player, obstacles, and score.

## Project structure

- `JS/shared.js`: shared state and logical world dimensions.
- `JS/player.js`: jumping, gravity, landing, and player rendering.
- `JS/obstacles.js`: spawning, movement, rendering, and collisions.
- `JS/game.js`: controls, animation loop, scoring, and game lifecycle.
- `Assets/`: character, obstacle, and background artwork.

## Artwork credits

Character, shark, and crab artwork by [OpenMoji](https://openmoji.org/),
licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Ocean background by Subin Duangdee via [Vecteezy](https://www.vecteezy.com/free-vector/ocean).