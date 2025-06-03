const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const box = 20; // size of each square
const canvasSize = 400;
let snake = [{ x: 160, y: 200 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;
let game;

document.addEventListener("keydown", changeDirection);

function draw() {
  // Background
  ctx.fillStyle = "#1f2937"; // Tailwind bg-gray-800
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? "#10b981" : "#6ee7b7"; // Tailwind green-500 & green-300
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  // Draw food
  ctx.fillStyle = "#ef4444"; // Tailwind red-500
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let head = { ...snake[0] };
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Game over conditions
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    collision(head, snake)
  ) {
    clearInterval(game);
    scoreDisplay.textContent = `Game Over! Final Score: ${score}`;
    return;
  }

  // Check if food is eaten
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    food = generateFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };
}

function collision(head, array) {
  return array.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

function changeDirection(event) {
  const key = event.key;
  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function restartGame() {
  snake = [{ x: 160, y: 200 }];
  direction = "RIGHT";
  food = generateFood();
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  clearInterval(game);
  game = setInterval(draw, 150);
}

// Start game
game = setInterval(draw, 150);
