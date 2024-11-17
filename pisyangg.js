const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fruits = [];
let score = 0;

// Buah dan efek slice
const fruitImages = [
    "🍎", // Apel
    "🍉", // Semangka
    "🍌", // Pisang
    "🍇", // Anggur
];

// Fungsi membuat buah
function createFruit() {
    const fruit = {
        x: Math.random() * canvas.width,
        y: canvas.height + 50,
        size: 50,
        speed: Math.random() * 4 + 2,
        directionX: Math.random() * 4 - 2,
        type: fruitImages[Math.floor(Math.random() * fruitImages.length)],
        sliced: false,
    };
    fruits.push(fruit);
}

// Fungsi memperbarui posisi buah
function updateFruits() {
    for (let i = fruits.length - 1; i >= 0; i--) {
        const fruit = fruits[i];
        fruit.y -= fruit.speed;
        fruit.x += fruit.directionX;

        // Jika buah keluar layar, hapus
        if (fruit.y + fruit.size < 0 || fruit.x < -50 || fruit.x > canvas.width + 50) {
            fruits.splice(i, 1);
        }
    }
}

// Fungsi menggambar buah
function drawFruits() {
    fruits.forEach((fruit) => {
        ctx.font = `${fruit.size}px Arial`;
        ctx.fillText(fruit.type, fruit.x, fruit.y);
    });
}

// Tangkap gerakan kursor untuk slice
canvas.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    fruits.forEach((fruit, index) => {
        if (
            !fruit.sliced &&
            Math.abs(mouseX - fruit.x) < fruit.size / 2 &&
            Math.abs(mouseY - fruit.y) < fruit.size / 2
        ) {
            fruit.sliced = true;
            fruits.splice(index, 1); // Hapus buah
            score += 1; // Tambah skor
            document.getElementById("score").innerText = score;

            // Tambahkan efek potongan
            drawSliceEffect(fruit.x, fruit.y);
        }
    });
});

// Fungsi menggambar efek slice
function drawSliceEffect(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fill();
    ctx.closePath();

    setTimeout(() => {
        ctx.clearRect(x - 35, y - 35, 70, 70);
    }, 100);
}

// Game loop utama
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Perbarui dan gambar buah
    updateFruits();
    drawFruits();

    // Tambahkan buah secara acak
    if (Math.random() < 0.03) {
        createFruit();
    }

    requestAnimationFrame(gameLoop);
}

// Mulai permainan
gameLoop();
