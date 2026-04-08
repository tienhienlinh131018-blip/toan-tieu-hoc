import { rand, formatAns, buildSectionTitle, buildGrid, distributeExactCount, shuffle } from '../utils.js';

// Chương 1: Phép cộng trừ có nhớ trong phạm vi 100
function gen_2_1() {
    let html = buildSectionTitle("Chương 1: Phép cộng, trừ (có nhớ) trong phạm vi 100");
    let c1 = '';
    let qIdx = 1;

    let counts = distributeExactCount([1, 1]); // 50% Tính ngang, 50% tính dọc
    let ngangCount = counts[0];
    let docCount = counts[1];

    // Tính nhẩm (Ngang) - Gom thành các Nhóm (A, B, C, D)
    for (let i = 0; i < ngangCount; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j); // A, B, C, D
            let isAdd = Math.random() > 0.5;
            let c, a, b;
            if (isAdd) {
                let a_ones = rand(3, 9); let b_ones = rand(10 - a_ones, 9);
                let a_tens = rand(1, 7); let b_tens = rand(1, 8 - a_tens);
                a = a_tens * 10 + a_ones; b = b_tens * 10 + b_ones; c = a + b;
                subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} + ${b} = ${formatAns(c)}</div>`;
            } else {
                let a_ones = rand(0, 8); let b_ones = rand(a_ones + 1, 9);
                let a_tens = rand(3, 9); let b_tens = rand(1, a_tens - 1);
                a = a_tens * 10 + a_ones; b = b_tens * 10 + b_ones; c = a - b;
                subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} - ${b} = ${formatAns(c)}</div>`;
            }
        }
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Tính</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div>
        </div>`;
    }
    
    html += buildGrid(4, c1);
    
    // Đặt tính rồi tính (Dọc) - Gom nhóm
    let c2 = '';
    for (let i = 0; i < docCount; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let isAdd = Math.random() > 0.5;
            let c, a, b;
            if (isAdd) {
                let a_o = rand(2, 9), b_o = rand(10 - a_o, 9);
                let a_t = rand(1, 6), b_t = rand(1, 7 - a_t);
                a = a_t * 10 + a_o; b = b_t * 10 + b_o; c = a + b;
            } else {
                let a_o = rand(0, 7), b_o = rand(a_o + 1, 9);
                let a_t = rand(4, 9), b_t = rand(1, a_t - 1);
                a = a_t * 10 + a_o; b = b_t * 10 + b_o; c = a - b;
            }
            
            subItems += `<div class="q-col">
                <div style="position: absolute; left: -25px; top: 0px; font-size: 1.2rem; color:#64748b; font-weight:700;">${label}.</div>
                <div class="val-a">${a}</div>
                <div class="val-op">${isAdd ? '+' : '-'}</div>
                <div class="val-b">${b}</div>
                <div class="line"></div>
                <div class="answer">${c}</div>
            </div>`;
        }
        
        c2 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 2rem; border-top: 2px dashed #e2e8f0; padding-top: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 2rem;">Câu ${qIdx++}: Đặt tính rồi tính</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div>
        </div>`;
    }
    html += buildGrid(4, c2);

    return html;
}

// Chương 2: Bảng nhân và chia 2, 5
function gen_2_2() {
    let html = buildSectionTitle("Chương 2: Phép nhân và phép chia (Bảng 2, 5)");
    let c1 = '';
    let qIdx = 1;

    let total = distributeExactCount([1])[0]; // Tính theo tổng số lượng bài người dùng muốn
    
    // Mix nhân chia gom nhóm A B C D
    for (let i = 0; i < total; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let base = Math.random() > 0.5 ? 2 : 5;
            let isMultiply = Math.random() > 0.5;
            let multiple = rand(2, 10);
            
            if (isMultiply) {
                let options = Math.random() > 0.5 ? `${base} x ${multiple}` : `${multiple} x ${base}`;
                let ans = base * multiple;
                subItems += `<div style="font-size: 1.5rem; white-space: nowrap;"><b>${label}.</b> ${options} = ${formatAns(ans)}</div>`;
            } else {
                let totalVal = base * multiple;
                subItems += `<div style="font-size: 1.5rem; white-space: nowrap;"><b>${label}.</b> ${totalVal} : ${base} = ${formatAns(multiple)}</div>`;
            }
        }
        
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Tính nhẩm</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div>
        </div>`;
    }
    
    html += buildGrid(4, c1);
    return html;
}

// Đề Ôn Tập Chung
function gen_2_review() {
    let html = buildSectionTitle("Phần I: Trắc Nghiệm (Khoanh vào chữ cái đặt trước câu trả lời đúng)");
    let c1 = '';
    let qIdx = 1;
    
    let counts = distributeExactCount([6, 4]); // 60% Trắc nghiệm, 40% Tự luận
    let mcCount = counts[0];
    let essayCount = counts[1];
    
    // Trắc nghiệm
    for(let i=0; i<mcCount; i++) {
        let type = rand(1, 3);
        let questionText, correctAns;
        let pOptions = [];
        
        if (type === 1) {
            // Hình học: Đường gấp khúc
            let segments = [rand(2, 6), rand(2, 6), rand(2, 6)];
            correctAns = segments[0] + segments[1] + segments[2];
            questionText = `Độ dài đường gấp khúc gồm 3 đoạn có chiều dài lần lượt là ${segments[0]}cm, ${segments[1]}cm và ${segments[2]}cm là:`;
            pOptions = [correctAns, correctAns + 2, correctAns - 1, rand(10, 20)];
        } else if (type === 2) {
            // Tìm x
            let a = rand(15, 45);
            let b = rand(50, 95);
            correctAns = b - a;
            questionText = `Tìm x biết: x + ${a} = ${b}`;
            pOptions = [correctAns, correctAns + 10, b + a, correctAns - 5];
        } else {
            // Toán nhân chia
            let base = Math.random() > 0.5 ? 2 : 5;
            let mult = rand(4, 9);
            correctAns = base * mult;
            questionText = `Kết quả của phép nhân <b>${base} x ${mult}</b> là:`;
            pOptions = [correctAns, base * (mult+1), base * (mult-1), correctAns + 10];
        }
        
        // Tạo unique options (để tránh trùng lặp)
        pOptions = [...new Set(pOptions)];
        while(pOptions.length < 4) {
            let fallback = correctAns + rand(-5, 5);
            if (!pOptions.includes(fallback) && fallback > 0) pOptions.push(fallback);
        }
        pOptions = shuffle(pOptions);
        
        let optHTML = pOptions.map((v, idx) => {
            let label = String.fromCharCode(65+idx);
            let isCorrect = (v === correctAns);
            return `<div><span class="mc-label ${isCorrect ? 'mc-ans' : ''}">${label}</span>. ${v}${type === 1 ? 'cm' : ''}</div>`;
        }).join('');
        
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. ${questionText}</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); padding-left: 1.5rem; font-weight: 600; font-size: 1.25rem;">${optHTML}</div>
        </div>`;
    }
    html += buildGrid(4, c1);
    
    html += buildSectionTitle("Phần II: Tự Luận");
    let c2 = '';
    
    // Tự luận (Toán đố)
    for(let i=0; i<essayCount; i++) {
        let isAdd = Math.random() > 0.5;
        let v1, v2, ans;
        let problemText, questionPart;
        
        if (isAdd) {
            v1 = rand(25, 45); // e.g. 36
            v2 = rand(15, 35); // e.g. 28
            ans = v1 + v2;  // e.g. 64
            problemText = `Đội Một trồng được ${v1} cây, đội Hai trồng được ${v2} cây.`;
            questionPart = `Hỏi cả hai đội trồng được tất cả bao nhiêu cây?`;
        } else {
            v1 = rand(55, 95); 
            v2 = rand(18, 45);
            ans = v1 - v2;
            problemText = `Một cửa hàng có ${v1} chiếc xe đạp, đã bán được ${v2} chiếc.`;
            questionPart = `Hỏi cửa hàng còn lại bao nhiêu chiếc xe đạp?`;
        }
        
        let unit = isAdd ? 'cây' : 'xe đạp';
        
        c2 += `<div class="word-problem" style="margin-bottom: 2.5rem;">
            <div class="wp-text" style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}. ${problemText} ${questionPart}</div>
            <div class="wp-workspace" style="padding-left: 1.5rem;">
                <div style="font-size: 1.25rem; font-weight: 600; font-style: italic; margin-bottom: 0.8rem;">Bài giải:</div>
                <div class="wp-answer-detail" style="line-height: 2.2; font-size: 1.2rem;">
                    <div style="border-bottom: 2px dotted #cbd5e1; width: 100%; min-height: 3rem; display: flex; align-items: end;">${formatAns(`Số ${unit} ${isAdd ? 'cả hai đội trồng được' : 'cửa hàng còn lại'} là:`)}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; width: 100%; min-height: 3rem; display: flex; align-items: end;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${v1} ${isAdd?'+':'-'} ${v2} = ${ans} (${unit})`)}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; width: 100%; min-height: 3rem; display: flex; align-items: end;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đáp số: ${ans} ${unit}`)}</div>
                </div>
            </div>
        </div>`;
    }
    html += c2;
    
    return html;
}

export const grade2Topics = [
    { title: "Chương 1: Phép tính có nhớ (P.V 100)", generate: gen_2_1 },
    { title: "Chương 2: Phép nhân chia 2, 5", generate: gen_2_2 },
    { title: "Ôn Tập Học Kỳ 1 (Lớp 2)", generate: gen_2_review }
];
