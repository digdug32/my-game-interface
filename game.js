const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
let ball = { x: 400, y: 300, radius: 20, speed: 2 };

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    ball.x += (Math.random() - 0.5) * ball.speed * 2;
    ball.y += (Math.random() - 0.5) * ball.speed * 2;

    if (ball.x < ball.radius) ball.x = ball.radius;
    if (ball.x > canvas.width - ball.radius) ball.x = canvas.width - ball.radius;
    if (ball.y < ball.radius) ball.y = ball.radius;
    if (ball.y > canvas.height - ball.radius) ball.y = canvas.height - ball.radius;
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const distance = Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2);
    if (distance < ball.radius) {
        score++;
        ball.speed += 0.5;
        updateScore();
    }
});

function gameLoop() {
    moveBall();
    drawBall();
    requestAnimationFrame(gameLoop);
}

updateScore();
gameLoop();
