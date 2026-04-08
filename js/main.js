// main.js
import { grade1Topics } from './grades/grade1.js';
import { grade2Topics } from './grades/grade2.js';
// (Sẽ import các lớp khác khi hoàn thiện)

const TOPICS_DB = {
    '1': grade1Topics,
    '2': grade2Topics,
    '3': [], // Placeholder cho Lớp 3
    '4': [], // Placeholder cho Lớp 4
    '5': []  // Placeholder cho Lớp 5
};

let currentGrade = '1';
let currentTopicId = null;
let answersVisible = false;

// Khởi tạo DOM Elements
const qCountInput = document.getElementById('q-count');
const toggleAns = document.getElementById('toggle-ans');
const testPaper = document.getElementById('test-paper');
const dynamicContent = document.getElementById('dynamic-content');
const paperTitle = document.getElementById('paper-title');
const chapterList = document.getElementById('chapter-list');
const gradeTabs = document.querySelectorAll('.grade-tab');

// 1. Quản lý UI chung
let debounceTimer;
qCountInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) return;
        if (currentTopicId !== null) generateCurrentTest();
    }, 400);
});

toggleAns.addEventListener('change', (e) => {
    answersVisible = e.target.checked;
    if (answersVisible) {
        testPaper.classList.add('show-answers');
    } else {
        testPaper.classList.remove('show-answers');
    }
});

const btnRegen = document.getElementById('btn-regen');
if (btnRegen) {
    btnRegen.addEventListener('click', () => {
        if (currentTopicId !== null) generateCurrentTest();
    });
}

// Chuyển khối lớp
gradeTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        gradeTabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        currentGrade = e.target.dataset.grade;
        // Đổi màu chủ đề (CSS Variable)
        document.documentElement.style.setProperty('--current-brand', `var(--brand-${currentGrade})`);
        
        renderChapterList();
    });
});

// 2. Render MENU Bài Tập
function renderChapterList() {
    chapterList.innerHTML = '';
    const topics = TOPICS_DB[currentGrade];
    
    if(!topics || topics.length === 0) {
        chapterList.innerHTML = `<p style="padding:10px; color:#94a3b8; font-style:italic;">Dữ liệu của khối lớp này đang được cập nhật...</p>`;
        dynamicContent.innerHTML = `<div class="welcome-screen"><h3>Đang thi công 🚧</h3><p>Giáo trình của lớp này sẽ sớm được tải lên hệ thống.</p></div>`;
        paperTitle.innerText = `Toán Lớp ${currentGrade}`;
        return;
    }

    topics.forEach((topic, index) => {
        const btn = document.createElement('button');
        btn.className = 'chapter-btn';
        btn.innerText = topic.title;
        btn.addEventListener('click', () => {
            // Xóa active cũ
            document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Generate test
            currentTopicId = index;
            paperTitle.innerText = topic.title.toUpperCase();
            generateCurrentTest();
        });
        chapterList.appendChild(btn);
    });
    
    // Auto click topic đầu tiên
    if(topics.length > 0) {
        chapterList.firstChild.click();
    }
}

// 3. Render Đề
function generateCurrentTest() {
    if(currentTopicId === null) return;
    const topic = TOPICS_DB[currentGrade][currentTopicId];
    
    // Ráp mã HTML sinh ra từ hàm
    dynamicContent.innerHTML = topic.generate();
    
    // Giữ trạng thái đáp án
    if(answersVisible) testPaper.classList.add('show-answers');
}

// Khởi chạy hệ thống mặc định
window.addEventListener('DOMContentLoaded', () => {
    renderChapterList();
});
