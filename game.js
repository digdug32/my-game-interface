const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, lift: -15, velocity: 0 };
let pipes = [];
let score = 0;
let gameOver = false;

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
    });
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        gameOver = true;
    }
}

function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= 2;
    });

    if (pipes.length && pipes[0].x < -pipes[0].width) {
        pipes.shift();
        score++;
    }

    if (pipes.length < 5 || pipes[pipes.length - 1].x < canvas.width - 200) {
        let pipeHeight = Math.random() * (canvas.height / 2);
        pipes.push({
            x: canvas.width,
            width: 20,
            top: pipeHeight,
            bottom: canvas.height - pipeHeight - 100
        });
    }
}

function checkCollision() {
    pipes.forEach(pipe => {
        if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)) {
            gameOver = true;
        }
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();
    drawScore();
    updateBird();
    updatePipes();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => {
    bird.velocity = bird.lift;
});

gameLoop();
