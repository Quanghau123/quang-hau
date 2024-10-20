const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

// Hàm khởi tạo kích thước canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Gọi hàm resizeCanvas khi cửa sổ thay đổi kích thước
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Khởi động canvas với kích thước hiện tại

// Đối tượng hoa
class Flower {
    constructor(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.speedX = speedX; // Tốc độ di chuyển ngang
        this.speedY = speedY; // Tốc độ rơi xuống
        this.petalCount = 6;
        this.petalRadius = 20;
        this.flowerRadius = 50;
    }

    // Hàm vẽ bông hoa
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

        // Nhụy hoa
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }

    // Cập nhật vị trí của hoa
    update() {
        this.x += this.speedX; // Di chuyển hoa ngang
        this.y += this.speedY; // Di chuyển hoa xuống dưới

        // Nếu hoa ra khỏi màn hình, đặt lại vị trí ở phía trên bên phải
        if (this.y > canvas.height || this.x < -50) {
            this.y = Math.random() * -100; // Đặt hoa lại ở phía trên màn hình
            this.x = canvas.width + 50; // Đặt lại ở bên phải màn hình
        }

        this.draw(); // Vẽ lại hoa
    }
}

// Tạo nhiều bông hoa từ góc trái
const flowers = [];
for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvas.width * 0.2; // Khởi tạo từ góc trái phía trên
    const y = Math.random() * canvas.height;
    const speedX = Math.random() * 2 + 1; // Tạo tốc độ ngang ngẫu nhiên
    const speedY = Math.random() * 2 + 1; // Tạo tốc độ dọc ngẫu nhiên
    flowers.push(new Flower(x, y, speedX, speedY));
}

// Tạo hoa mới để rơi từ góc trên bên phải
class FlowerTopRight extends Flower {
    constructor() {
        const x = Math.random() * canvas.width + canvas.width; // Bắt đầu từ bên phải
        const y = Math.random() * 100; // Từ trên
        const speedX = -Math.random() * 2 - 1; // Di chuyển sang trái
        const speedY = Math.random() * 2 + 1; // Rơi xuống
        super(x, y, speedX, speedY);
    }
}

// Tạo nhiều bông hoa từ góc trên bên phải
for (let i = 0; i < 5; i++) {
    flowers.push(new FlowerTopRight());
}

// Tạo hoa mới để rơi từ góc trên bên trái
class FlowerTopLeft extends Flower {
    constructor() {
        const x = Math.random() * -100; // Bắt đầu từ bên trái
        const y = Math.random() * 100; // Từ trên
        const speedX = Math.random() * 2 + 1; // Di chuyển sang phải
        const speedY = Math.random() * 2 + 1; // Rơi xuống
        super(x, y, speedX, speedY);
    }
}

// Tạo nhiều bông hoa từ góc trên bên trái
for (let i = 0; i < 5; i++) {
    flowers.push(new FlowerTopLeft());
}

// Vòng lặp để tạo hiệu ứng hoa rơi
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas
    flowers.forEach(flower => flower.update()); // Cập nhật và vẽ các hoa

    // Di chuyển hình ảnh qua lại ở dưới
    const catImage = document.getElementById('catImage');
    const catSpeed = 2; // Tốc độ di chuyển
    let catPosition = parseFloat(catImage.style.left) || 0;

    if (catPosition > canvas.width) {
        catPosition = -100; // Đặt lại vị trí bên trái ngoài màn hình
    } else {
        catPosition += catSpeed; // Di chuyển sang phải
    }

    catImage.style.left = catPosition + 'px'; // Cập nhật vị trí hình ảnh

    // Di chuyển hình ảnh qua lại ở trên
    const catImageTop = document.getElementById('catImageTop');
    let catTopPosition = parseFloat(catImageTop.style.right) || 0;

    if (catTopPosition > canvas.width) {
        catTopPosition = -100; // Đặt lại vị trí bên trái ngoài màn hình
    } else {
        catTopPosition += catSpeed; // Di chuyển sang trái
    }

    catImageTop.style.right = catTopPosition + 'px'; // Cập nhật vị trí hình ảnh

    requestAnimationFrame(animate); // Lặp lại quá trình
}

// Bắt đầu hiệu ứng
animate();
