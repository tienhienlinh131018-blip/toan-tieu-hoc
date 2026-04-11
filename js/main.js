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

const HISTORY_KEY = 'math_quiz_history';
const MAX_HISTORY = 20;

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

// History Elements
const btnHistory = document.getElementById('btn-history');
const historyModal = document.getElementById('history-modal');
const btnCloseHistory = document.getElementById('btn-close-history');
const historyList = document.getElementById('history-list');

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
    
    // Lưu vào Lịch sử
    saveToHistory(paperTitle.innerText, dynamicContent.innerHTML);
    
    // Giữ trạng thái đáp án
    if(answersVisible) testPaper.classList.add('show-answers');
}

// 4. Lịch Sử Đề (Thêm Mới)
function saveToHistory(title, contentHtml) {
    try {
        let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`;
        
        history.unshift({
            id: Date.now(),
            title: title + " (" + document.getElementById('q-count').value + " câu)",
            time: timeString,
            content: contentHtml
        });
        
        if(history.length > MAX_HISTORY) {
            history.pop();
        }
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) { console.error("Local storage error:", e); }
}

if(btnHistory) {
    btnHistory.addEventListener('click', () => {
        renderHistoryList();
        historyModal.classList.add('show');
    });
}
if(btnCloseHistory) {
    btnCloseHistory.addEventListener('click', () => historyModal.classList.remove('show'));
}
window.addEventListener('click', (e) => {
    if (e.target === historyModal) historyModal.classList.remove('show');
});

function renderHistoryList() {
    try {
        let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        historyList.innerHTML = '';
        if(history.length === 0) {
            historyList.innerHTML = '<li style="text-align:center; padding: 20px; color: #9CA3AF;">Hiện chưa có lịch sử đề nào.</li>';
            return;
        }
        history.forEach(item => {
            let li = document.createElement('li');
            li.className = 'history-item';
            li.innerHTML = `
                <div>
                    <div class="hist-title">${item.title}</div>
                    <div class="hist-time">${item.time}</div>
                </div>
            `;
            li.addEventListener('click', () => {
                paperTitle.innerText = item.title + " (Xem lại)";
                dynamicContent.innerHTML = item.content;
                document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
                historyModal.classList.remove('show');
            });
            historyList.appendChild(li);
        });
    } catch (e) { console.error("Error loading history", e); }
}

// Khởi chạy hệ thống mặc định
window.addEventListener('DOMContentLoaded', () => {
    renderChapterList();
});
