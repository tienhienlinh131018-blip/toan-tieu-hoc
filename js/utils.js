// utils.js
// Các hàm tiện ích dùng chung cho toàn bộ hệ thống

// Trả về số nguyên ngẫu nhiên từ min đến max (bao gồm cả max)
export function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Bọc đáp án để có thể ẩn/hiện theo css (trắc nghiệm điền khuyết)
export function formatAns(val) {
    return `<span class="answer-inline">${val}</span>`;
}

// Tạo tiêu đề bài toán
export function buildSectionTitle(title) {
    return `<div class="section-title">${title}</div>`;
}

// Khởi tạo layout dạng lưới
export function buildGrid(columns, content) {
    return `<div class="grid-wrap" style="grid-template-columns: repeat(${columns}, 1fr);">${content}</div>`;
}

// Phân bổ chính xác tổng số lượng câu hỏi thành các phần để giữ đúng tổng số mà người dùng đưa vào.
export function distributeExactCount(weights) {
    let el = document.getElementById('q-count');
    let total = el ? parseInt(el.value) : 10;
    if (isNaN(total) || total < 1) total = 10;
    
    let sumWeights = weights.reduce((a,b) => a+b, 0);
    let counts = [];
    let allocated = 0;
    
    for(let i=0; i<weights.length - 1; i++) {
        let count = Math.round(total * (weights[i] / sumWeights));
        counts.push(count);
        allocated += count;
    }
    
    let last = total - allocated;
    counts.push(Math.max(0, last)); // Đảm bảo phần dư hợp lệ
    return counts;
}

// Trộn mảng
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
