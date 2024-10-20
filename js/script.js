const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');
const backgroundMusic = document.getElementById('backgroundMusic');
const openCardButton = document.getElementById('openCardButton');

// Hàm khởi tạo kích thước canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Gọi hàm resizeCanvas khi cửa sổ thay đổi kích thước
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Đối tượng hoa
class Flower {
    constructor(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.petalCount = 6;
        this.petalRadius = 20;
        this.flowerRadius = 50;
    }

    draw() {
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.flowerRadius, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < this.petalCount; i++) {
            const angle = (Math.PI * 2 / this.petalCount) * i;
            const petalX = this.x + Math.cos(angle) * this.flowerRadius;
            const petalY = this.y + Math.sin(angle) * this.flowerRadius;

            ctx.fillStyle = 'pink';
            ctx.beginPath();
            ctx.arc(petalX, petalY, this.petalRadius, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height || this.x < -50) {
            this.y = Math.random() * -100;
            this.x = canvas.width + 50;
        }

        this.draw();
    }
}

const flowers = [];
for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvas.width * 0.2;
    const y = Math.random() * canvas.height;
    const speedX = Math.random() * 2 + 1;
    const speedY = Math.random() * 2 + 1;
    flowers.push(new Flower(x, y, speedX, speedY));
}

class FlowerTopRight extends Flower {
    constructor() {
        const x = Math.random() * canvas.width + canvas.width;
        const y = Math.random() * 100;
        const speedX = -Math.random() * 2 - 1;
        const speedY = Math.random() * 2 + 1;
        super(x, y, speedX, speedY);
    }
}

for (let i = 0; i < 5; i++) {
    flowers.push(new FlowerTopRight());
}

class FlowerTopLeft extends Flower {
    constructor() {
        const x = Math.random() * -100;
        const y = Math.random() * 100;
        const speedX = Math.random() * 2 + 1;
        const speedY = Math.random() * 2 + 1;
        super(x, y, speedX, speedY);
    }
}

for (let i = 0; i < 5; i++) {
    flowers.push(new FlowerTopLeft());
}

// Hiệu ứng hoa rơi và di chuyển ảnh
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flowers.forEach(flower => flower.update());

    const catImage = document.getElementById('catImage');
    const catSpeed = 2;
    let catPosition = parseFloat(catImage.style.left) || 0;

    if (catPosition > canvas.width) {
        catPosition = -100;
    } else {
        catPosition += catSpeed;
    }

    catImage.style.left = catPosition + 'px';

    const catImageTop = document.getElementById('catImageTop');
    let catTopPosition = parseFloat(catImageTop.style.right) || 0;

    if (catTopPosition > canvas.width) {
        catTopPosition = -100;
    } else {
        catTopPosition += catSpeed;
    }

    catImageTop.style.right = catTopPosition + 'px';

    requestAnimationFrame(animate);
}

// Bắt đầu hiệu ứng
animate();

// Xử lý sự kiện nhấn nút mở thiệp
openCardButton.addEventListener('click', function() {
    message.classList.remove('hidden');
    message.style.opacity = 1;
    backgroundMusic.play();
    openCardButton.style.display = 'none'; // Ẩn nút sau khi nhấn
});
