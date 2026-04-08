import { rand, formatAns, buildSectionTitle, buildGrid, distributeExactCount, shuffle } from '../utils.js';

// Các hàm sinh bài báo cáo cho Lớp 1
// Chương 1: Đếm và Nhận biết số đến 10
function gen_1_1() {
    let html = buildSectionTitle("Chương 1: Các số trong phạm vi 10");
    let c1 = '';
    let qIdx = 1;
    
    // Đếm đối tượng
    let emojiMap = [
        {char: '🍎', name: 'quả táo'},
        {char: '🐱', name: 'con mèo'},
        {char: '🚗', name: 'chiếc xe ô tô'},
        {char: '⚽', name: 'quả bóng'},
        {char: '🌟', name: 'ngôi sao'},
        {char: '🍉', name: 'quả dưa hấu'}
    ];
    
    let counts = distributeExactCount([1, 1]); // Chia 1 phần cho đếm, 1 phần cho điền dấu
    let objCount = Math.max(1, counts[0] + counts[1] - 1); 
    // Đảm bảo phần điền dấu chiếm 1 câu, phần đếm chiếm phần còn lại.
    
    // Câu 1, Câu 2... Đếm vật
    for(let i=0; i<objCount; i++) {
        let count = rand(2, 9);
        let item = emojiMap[rand(0, emojiMap.length-1)];
        let objectsHtml = Array(count).fill(item.char).join(' ');
        
        c1 += `<div class="q-item" style="grid-column: span 2; margin-bottom: 1.5rem;">
            <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}: Có bao nhiêu ${item.name}?</div>
            <div style="font-size: 2rem; letter-spacing: 5px; margin-bottom: 1rem; min-height: 3rem;">${objectsHtml}</div>
            <div style="font-size: 1.2rem;">Trả lời: ................. ${formatAns(count)}</div>
        </div>`;
    }
    
    // Câu tiếp theo: Điền dấu
    let compHtml = '';
    for(let i=0; i<4; i++) { // Luôn sinh 4 phép so sánh trong 1 câu hỏi
        let a = rand(1, 9);
        let b = rand(1, 9);
        // Thêm cơ hội sinh ra dấu =
        if (Math.random() > 0.8) b = a;
        let sign = (a > b) ? '>' : (a < b ? '<' : '=');
        
        compHtml += `<div style="text-align: center; font-size: 1.6rem; margin-bottom: 1rem;">
            <div style="margin-bottom: 10px;">${a} &nbsp;&nbsp; ........ &nbsp;&nbsp; ${b}</div>
            <div style="min-height: 2rem;">${formatAns(sign)}</div>
        </div>`;
    }
    
    c1 += `<div class="q-item" style="grid-column: span 4; margin-top: 1rem; border-top: 2px dashed #e2e8f0; padding-top: 2rem;">
        <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 2rem;">Câu ${qIdx++}: Điền dấu &gt;, &lt;, = vào chỗ chấm</div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
            ${compHtml}
        </div>
    </div>`;
    
    html += buildGrid(4, c1);
    return html;
}

// Chương 2: Phép cộng trừ trong phạm vi 10
function gen_1_2() {
    let html = buildSectionTitle("Chương 2: Phép tính trong phạm vi 10");
    let c2 = '';
    let qIdx1 = 1;
    
    let counts = distributeExactCount([2, 1]); // Tỉ lệ xấp xỉ 2 tính ngang : 1 tính dọc
    let countNgang = counts[0];
    let countDoc = counts[1];
    
    // Phép tính ngang
    for(let i=0; i<countNgang; i++) {
        let isAdd = Math.random() > 0.5;
        let c, a, b;
        let numPrefix = `<span style="font-size: 1.1rem; color: #64748b; font-weight: 700; display: inline-block; width: 35px;">${qIdx1++})</span>`;
        if(isAdd) {
            c = rand(2, 10);
            a = rand(1, c-1);
            b = c - a;
            c2 += `<div class="q-item" style="grid-column: span 1; font-size: 1.5rem; display: flex; align-items: center;">${numPrefix}${a} + ${b} = ${formatAns(c)}</div>`;
        } else {
            a = rand(2, 10);
            b = rand(1, a-1);
            c = a - b;
            c2 += `<div class="q-item" style="grid-column: span 1; font-size: 1.5rem; display: flex; align-items: center;">${numPrefix}${a} - ${b} = ${formatAns(c)}</div>`;
        }
    }
    html += buildGrid(4, c2);
    
    // Đặt tính
    html += buildSectionTitle("Đặt tính rồi tính:");
    let c3 = '';
    let qIdx2 = 1;
    for(let i=0; i<countDoc; i++) {
        let isAdd = Math.random() > 0.5;
        let c, a, b;
        if(isAdd) {
            c = rand(3, 9); a = rand(1, c-1); b = c - a;
        } else {
            a = rand(3, 9); b = rand(1, a-1); c = a - b;
        }
        c3 += `<div class="q-col">
            <div style="position: absolute; left: -30px; top: 0px; font-size: 1.1rem; color:#64748b; font-weight:700;">${qIdx2++})</div>
            <div class="val-a">${a}</div>
            <div class="val-op">${isAdd ? '+' : '-'}</div>
            <div class="val-b">${b}</div>
            <div class="line"></div>
            <div class="answer">${c}</div>
        </div>`;
    }
    html += buildGrid(4, c3);
    
    return html;
}

// Đề Ôn Tập Học Kỳ 1 (Lớp 1)
function gen_1_review() {
    let html = buildSectionTitle("Phần I: Trắc Nghiệm (Khoanh vào chữ cái đặt trước câu trả lời đúng)");
    let c1 = '';
    let qIdx = 1;
    
    let counts = distributeExactCount([6, 4]); // 60% Trắc nghiệm, 40% Tự luận
    let mcCount = counts[0];
    let essayCount = counts[1];
    
    // Trắc nghiệm phép tính
    for(let i=0; i<mcCount; i++) {
        let sum = rand(5, 10);
        let a = rand(2, sum-2); let b = sum - a;
        let options = [sum, sum+1, sum-1, sum+2].sort(() => Math.random() - 0.5);
        
        let optHTML = options.map((v, idx) => {
            let label = String.fromCharCode(65+idx);
            let isCorrect = (v === sum);
            return `<div><span class="mc-label ${isCorrect ? 'mc-ans' : ''}">${label}</span>. ${v}</div>`;
        }).join('');
        
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. Kết quả của phép tính <b>${a} + ${b}</b> là:</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); padding-left: 1.5rem; font-weight: 600;">${optHTML}</div>
        </div>`;
    }
    html += buildGrid(4, c1);
    
    html += buildSectionTitle("Phần II: Tự Luận");
    let c2 = '';
    
    // Bài toán có lời văn
    for(let i=0; i<essayCount; i++) {
        let a = rand(3, 6);
        let b = rand(2, 4);
        let ans = a + b;
        let pName = ['Hoa', 'Lan', 'Minh', 'Nam', 'Khánh'][rand(0, 4)];
        let pItem = ['bông hoa', 'quyển vở', 'viên bi', 'chiếc bút'][rand(0, 3)];
        
        let problemText = `Bạn ${pName} có ${a} ${pItem}. Mẹ mua thêm cho ${pName} ${b} ${pItem} nữa. Hỏi ${pName} có tất cả bao nhiêu ${pItem}?`;
        
        c2 += `<div class="word-problem" style="margin-bottom: 2.5rem;">
            <div class="wp-text" style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}. ${problemText}</div>
            <div class="wp-workspace" style="padding-left: 1.5rem;">
                <div style="font-size: 1.25rem; font-weight: 600; font-style: italic; margin-bottom: 0.8rem;">Bài giải:</div>
                <div class="wp-answer-detail" style="line-height: 2.2; font-size: 1.2rem;">
                    <div style="border-bottom: 2px dotted #cbd5e1; width: 100%; min-height: 3rem; display: flex; align-items: end;">${formatAns(`Số ${pItem} ${pName} có tất cả là:`)}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; width: 100%; min-height: 3rem; display: flex; align-items: end;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${a} + ${b} = ${ans} (${pItem})`)}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; width: 100%; min-height: 3rem; display: flex; align-items: end;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đáp số: ${ans} ${pItem}`)}</div>
                </div>
            </div>
        </div>`;
    }
    
    html += c2;
    
    return html;
}

// Liên kết dữ liệu để xuất ra main.js
export const grade1Topics = [
    { title: "Chương 1: Các số đếm từ 1 đến 10", generate: gen_1_1 },
    { title: "Chương 2: Phép cộng trừ (Phạm vi 10)", generate: gen_1_2 },
    { title: "Ôn Tập Chung Học Kỳ 1", generate: gen_1_review }
];
