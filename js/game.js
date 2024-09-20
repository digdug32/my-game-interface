const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`Clicked at: ${x}, ${y}`);
    // Add your game logic here
});

// Example: Draw a simple circle
ctx.fillStyle = 'blue';
ctx.beginPath();
ctx.arc(400, 300, 50, 0, Math.PI * 2);
ctx.fill();
