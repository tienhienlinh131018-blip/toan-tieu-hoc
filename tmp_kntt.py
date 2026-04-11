import os

file_content = """import { rand, formatAns, buildSectionTitle, buildGrid, distributeExactCount, shuffle } from '../utils.js';

// ============================================
// HỌC KỲ 1 (Tóm lược làm xương sống móng)
// ============================================

function gen_2_1() {
    let html = buildSectionTitle("Ôn tập kiến thức Lớp 1 (Phạm vi 100)");
    let c1 = ''; let qIdx = 1;
    let counts = distributeExactCount([1, 1]); 
    for (let i = 0; i < counts[0]; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let isAdd = Math.random() > 0.5;
            let c, a, b;
            if (isAdd) {
                let a_t=rand(1,8), a_o=rand(0,8); let b_t=rand(0,9-a_t), b_o=rand(0,9-a_o);
                a=a_t*10+a_o; b=b_t*10+b_o; c=a+b;
            } else {
                let a_t=rand(2,9), a_o=rand(2,9); let b_t=rand(1,a_t), b_o=rand(1,a_o);
                a=a_t*10+a_o; b=b_t*10+b_o; c=a-b;
            }
            subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} ${isAdd?'+':'-'} ${b} = ${formatAns(c)}</div>`;
        }
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Tính nhẩm</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    html += buildGrid(4, c1);
    return html;
}
function gen_2_review_1() {
    let html = buildSectionTitle("⭐ ĐỀ ÔN TẬP CHUNG HỌC KỲ 1");
    let c = ''; let qIdx = 1;
    let counts = distributeExactCount([5, 5]); 
    let mcCount = counts[0], esCount = counts[1];
    
    for(let i=0; i<mcCount; i++) {
        let a = rand(25, 45); let b = rand(15, 35); let ans = a+b;
        let opts = shuffle([ans, ans+10, ans-5, ans+5]);
        let optStr = opts.map((v, idx) => `<div><span class="mc-label ${(v===ans)?'mc-ans':''}">${String.fromCharCode(65+idx)}</span>. ${v}</div>`).join('');
        c += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. Kết quả của phép tính ${a} + ${b} là:</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); padding-left: 1.5rem; font-weight: 600; font-size: 1.25rem;">${optStr}</div></div>`;
    }
    return html + buildGrid(4, c);
}

// ============================================
// HỌC KỲ 2: CHỦ ĐỀ 8 -> 14 (Chuẩn KNTT Lớp 2)
// ============================================

// --- CHỦ ĐỀ 8 ---
function gen_c8_1() {
    let html = buildSectionTitle("Chủ đề 8: Phép nhân, Thừa số, Tích");
    let c1 = ''; let qIdx = 1;
    let counts = distributeExactCount([1, 1]); 
    
    for (let i = 0; i < counts[0]; i++) {
        let a = rand(2, 5), b = rand(2, 9);
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}: Trong phép tính ${a} x ${b} = ${a*b}, các số ${a} và ${b} gọi là gì?</div>
            <div style="font-size: 1.2rem; padding-left: 10px;">Trả lời: ${formatAns("Thừa số")}</div></div>`;
    }
    for (let i = 0; i < counts[1]; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let base = Math.random() > 0.5 ? 2 : 5; let mult = rand(2, 10);
            subItems += `<div style="font-size: 1.4rem;"><b>${String.fromCharCode(65+j)}.</b> ${base} x ${mult} = ${formatAns(base*mult)}</div>`;
        }
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}: Tính tích</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    return html + buildGrid(4, c1);
}

function gen_c8_2() {
    let html = buildSectionTitle("Chủ đề 8: Phép chia, Số bị chia, Số chia, Thương");
    let c1 = ''; let qIdx = 1;
    let counts = distributeExactCount([1, 1]); 
    
    for (let i = 0; i < counts[0]; i++) {
        let b = Math.random() > 0.5 ? 2 : 5; let ans = rand(2, 10); let a = b * ans;
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}: Trong phép tính ${a} : ${b} = ${ans}, số ${a} gọi là gì?</div>
            <div style="font-size: 1.2rem; padding-left: 10px;">Trả lời: ${formatAns("Số bị chia")}</div></div>`;
    }
    for (let i = 0; i < counts[1]; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let base = Math.random() > 0.5 ? 2 : 5; let mult = rand(2, 10);
            subItems += `<div style="font-size: 1.4rem;"><b>${String.fromCharCode(65+j)}.</b> ${base*mult} : ${base} = ${formatAns(mult)}</div>`;
        }
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}: Tính thương</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    return html + buildGrid(4, c1);
}

function gen_c8_ltc() {
    let html = buildSectionTitle("Chủ đề 8: Luyện tập chung (Nhân, Chia)");
    let c1 = gen_c8_1().replace(/Chủ đề 8: P.*?<\\/div>/, '').replace(/Câu \\d+:/g, 'Câu Luyện Tập:');
    let c2 = gen_c8_2().replace(/Chủ đề 8: P.*?<\\/div>/, '').replace(/Câu \\d+:/g, 'Câu Luyện Tập:');
    return buildSectionTitle("Chủ đề 8: Luyện tập chung Nhân và Chia") + '<div style="margin-top:20px;"></div>' + gen_c8_1() + gen_c8_2();
}

// --- CHỦ ĐỀ 9 ---
function gen_c9_1() {
    let html = buildSectionTitle("Chủ đề 9: Làm quen với hình khối");
    let c1 = ''; let qIdx = 1;
    let total = distributeExactCount([1])[0];
    for(let i=0; i<total; i++) {
        let type = rand(0,2);
        let qText, ans, opts = [];
        if(type === 0) {
            ans = "Khối trụ"; qText = "Hộp sữa ông Thọ có hình dạng của khối gì?"; opts = [ans, "Khối cầu", "Khối lập phương", "Khối hộp chữ nhật"];
        } else if (type === 1) {
            ans = "Khối cầu"; qText = "Quả bóng đá có hình dạng của khối gì?"; opts = [ans, "Khối trụ", "Khối lập phương", "Khối hộp chữ nhật"];
        } else {
            ans = "4 đoạn thẳng"; qText = "Một đường gấp khúc MNPQ có mấy đoạn thẳng?"; opts = [ans, "3 đoạn thẳng", "2 đoạn thẳng", "5 đoạn thẳng"];
        }
        opts = shuffle(opts);
        let optHTML = opts.map((v, idx) => `<div><span class="mc-label ${(v===ans)?'mc-ans':''}">${String.fromCharCode(65+idx)}</span>. ${v}</div>`).join('');
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. ${qText}</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); padding-left: 1.5rem; font-weight: 600; font-size: 1.25rem;">${optHTML}</div></div>`;
    }
    return html + buildGrid(4, c1);
}

// --- CHỦ ĐỀ 10 ---
function gen_c10_1() {
    let html = buildSectionTitle("Chủ đề 10: Các số trong phạm vi 1000");
    let c1 = ''; let qIdx = 1;
    let counts = distributeExactCount([1, 1]);
    for(let i=0; i<counts[0]; i++) {
        let h = rand(1,9), t=rand(1,9), o=rand(1,9); let ans = h*100 + t*10 + o;
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. Số gồm ${h} trăm, ${t} chục và ${o} đơn vị được viết là:</div>
            <div style="font-size: 1.2rem; padding-left: 10px;">Trả lời: ${formatAns(ans)}</div></div>`;
    }
    let subItems = '';
    for(let j=0; j<4; j++) {
        let a = rand(100, 999); let b = rand(100, 999);
        if (Math.random() > 0.8) b = a;
        let sign = (a > b) ? '>' : (a < b ? '<' : '=');
        subItems += `<div style="font-size: 1.5rem; text-align: center;"><b>${String.fromCharCode(65+j)}.</b><br> ${a} ${formatAns(sign)} ${b}</div>`;
    }
    c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
        <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Điền dấu &gt;, &lt;, =</div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    return html + buildGrid(4, c1);
}

// --- CHỦ ĐỀ 11 ---
function gen_c11_1() {
    let html = buildSectionTitle("Chủ đề 11: Độ dài & Tiền Việt Nam");
    let c1 = ''; let qIdx = 1;
    let total = distributeExactCount([1])[0];
    for(let i=0; i<total; i++) {
        let type = rand(0,1);
        if(type === 0) {
            let v1 = rand(15, 30), v2 = rand(30, 60);
            c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
                <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. Quãng đường từ nhà An qua bưu điện dài ${v1}km. Quãng đường từ bưu điện đến trường dài ${v2}km. Tính tổng quãng đường từ nhà An đến trường?</div>
                <div style="font-size: 1.2rem; padding-left: 10px;">Trả lời: ${formatAns(v1+v2)} km</div></div>`;
        } else {
            let v1 = rand(1,5) * 1000; let v2 = rand(6,10) * 1000;
            c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
                <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. Mẹ mua mớ rau hết ${v1} đồng. Mẹ đưa cho người bán ${v2} đồng. Người bán phải thối lại bao nhiêu tiền?</div>
                <div style="font-size: 1.2rem; padding-left: 10px;">Trả lời: ${formatAns(v2-v1)} đồng</div></div>`;
        }
    }
    return html + buildGrid(4, c1);
}

// --- CHỦ ĐỀ 12 ---
function gen_c12_1() {
    let html = buildSectionTitle("Chủ đề 12: Cộng trừ (Không nhớ) P.V 1000");
    let c1 = ''; let qIdx = 1;
    let counts = distributeExactCount([1, 1]); 
    let subItems1 = '';
    for(let j=0; j<4; j++) {
        let label = String.fromCharCode(65+j); let isAdd = Math.random() > 0.5; let c, a, b;
        if (isAdd) {
            a = rand(1,4)*100 + rand(1,4)*10 + rand(1,4); b = rand(1,5)*100 + rand(1,5)*10 + rand(1,5); c = a+b;
            subItems1 += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} + ${b} = ${formatAns(c)}</div>`;
        } else {
            a = rand(5,9)*100 + rand(5,9)*10 + rand(5,9); b = rand(1,Math.floor(a/100)-1)*100 + rand(1,Math.floor(a/10)-1)*10 + rand(1,a%10-1); c = a-b;
            subItems1 += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} - ${b} = ${formatAns(c)}</div>`;
        }
    }
    c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;"><div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}: Tính (Không nhớ)</div><div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems1}</div></div>`;
    return html + buildGrid(4, c1);
}

function gen_c12_2() {
    let html = buildSectionTitle("Chủ đề 12: Cộng trừ (Có nhớ) P.V 1000");
    let c2 = ''; let qIdx = 1;
    let counts = distributeExactCount([1])[0]; 
    for (let i = 0; i < counts; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let a_o=rand(5,9), b_o=rand(10-a_o, 9); let a_t=rand(5,9), b_t=rand(10-a_t, 9); let a_h=rand(1,4), b_h=rand(1,8-a_h);
            let a = a_h*100+a_t*10+a_o; let b = b_h*100+b_t*10+b_o; 
            subItems += `<div class="q-col">
                <div style="position: absolute; left: -25px; top: 0px; font-size: 1.2rem; color:#64748b; font-weight:700;">${label}.</div>
                <div class="val-a">${a}</div><div class="val-op">+</div><div class="val-b">${b}</div>
                <div class="line"></div><div class="answer">${a+b}</div></div>`;
        }
        c2 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 2rem; padding-top: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 2rem;">Câu ${qIdx++}: Đặt tính (Có nhớ)</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    return html + buildGrid(4, c2);
}

// --- CHỦ ĐỀ 13 ---
function gen_c13_1() {
    let html = buildSectionTitle("Chủ đề 13: Thống kê & Xác Suất");
    let c1 = ''; let qIdx = 1;
    let total = distributeExactCount([1])[0];
    for(let i=0; i<total; i++) {
        let r = rand(0, 2);
        let qText = ''; let ans = '';
        if (r === 0) {
            qText = "Trong hộp có 10 viên bi màu xanh. Việc An bốc được 1 viên bi màu xanh là sự kiện gì?"; ans = "Chắc chắn";
        } else if (r === 1) {
            qText = "Trong hộp có 5 bi xanh và 5 bi đỏ. Việc Nam bốc được 1 viên bi đỏ là sự kiện gì?"; ans = "Có thể";
        } else {
            qText = "Buổi sáng, Mặt Trời mọc ở hướng Tây là sự kiện gì?"; ans = "Không thể";
        }
        let opts = shuffle(["Chắc chắn", "Có thể", "Không thể"]);
        let optHTML = opts.map((v, idx) => `<div><span class="mc-label ${(v===ans)?'mc-ans':''}">${String.fromCharCode(65+idx)}</span>. ${v}</div>`).join('');
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. ${qText}</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); padding-left: 1.5rem; font-weight: 600; font-size: 1.25rem;">${optHTML}</div></div>`;
    }
    return html + buildGrid(4, c1);
}

// --- CHỦ ĐỀ 14 ---
function gen_c14() {
    let html = buildSectionTitle("🌟 ĐỀ ÔN TẬP CHUNG CUỐI NĂM LỚP 2");
    let c = ''; let qIdx = 1;
    let counts = distributeExactCount([5, 5]); 
    for(let i=0; i<counts[0]; i++) {
        let bCode = rand(2,5), ans = bCode*5;
        let opts = shuffle([ans, ans+5, ans-2, ans+10]);
        let optStr = opts.map((v, idx) => `<div><span class="mc-label ${(v===ans)?'mc-ans':''}">${String.fromCharCode(65+idx)}</span>. ${v}</div>`).join('');
        c += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. Phép tính ${bCode} x 5 có giá trị là:</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); padding-left: 1.5rem; font-weight: 600; font-size: 1.25rem;">${optStr}</div></div>`;
    }
    for(let i=0; i<counts[1]; i++) {
        let v1 = rand(300,500), v2 = rand(100,250), ans = v1+v2;
        c += `<div class="word-problem" style="margin-bottom: 2.5rem; grid-column: span 4;">
            <div class="wp-text" style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}. Sáng bán được ${v1} lít sữa. Chiều bán được ${v2} lít sữa. Hỏi cả ngày bán được bao nhiêu lít?</div>
            <div class="wp-workspace" style="padding-left: 1.5rem;">
                <div style="font-size: 1.25rem; font-weight: 600; font-style: italic; margin-bottom: 0.8rem;">Bài giải:</div>
                <div class="wp-answer-detail" style="line-height: 2.2; font-size: 1.2rem;">
                    <div style="border-bottom: 2px dotted #cbd5e1; min-height: 3rem;">${formatAns(`Số lít sữa cả ngày bán được là:`)}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; min-height: 3rem;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;${v1} + ${v2} = ${ans} (lít)`)}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; min-height: 3rem;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đáp số: ${ans} lít`)}</div>
                </div></div></div>`;
    }
    return html + buildGrid(4, c);
}

function ltc(title, genFns) {
    let r = buildSectionTitle(title);
    genFns.forEach(fn => { r += '<div style="margin-top:15px;"></div>' + fn(); });
    // Cleanup generated individual titles
    r = r.replace(/<div class="section-title">.*?<\\/div>/g, '');
    return buildSectionTitle(title) + r;
}

export const grade2Topics = [
    { title: "--- ÔN HỌC KỲ 1 ---", generate: gen_2_review_1 },
    { title: "CĐ8 - Bài 39+40: Phép nhân, thừa số, tích", generate: gen_c8_1 },
    { title: "CĐ8 - Bài 42+43: Phép chia, SBC, SC, Thương", generate: gen_c8_2 },
    { title: "CĐ8 - Luyện tập chung", generate: () => ltc("Chủ đề 8: Luyện tập chung", [gen_c8_1, gen_c8_2]) },
    { title: "CĐ9 - Bài 46: Khối trụ, khối cầu", generate: gen_c9_1 },
    { title: "CĐ9 - Luyện tập chung", generate: gen_c9_1 },
    { title: "CĐ10 - Bài 48+52: Các số trong P.V 1000", generate: gen_c10_1 },
    { title: "CĐ10 - Luyện tập chung", generate: gen_c10_1 },
    { title: "CĐ11 - Bài 54-56: Mét, km & Tiền VN", generate: gen_c11_1 },
    { title: "CĐ11 - Luyện tập chung", generate: gen_c11_1 },
    { title: "CĐ12 - Bài 57: Cộng trừ (Ko nhớ) 1000", generate: gen_c12_1 },
    { title: "CĐ12 - Bài 58: Cộng trừ (Có nhớ) 1000", generate: gen_c12_2 },
    { title: "CĐ12 - Luyện tập chung", generate: () => ltc("Chủ đề 12: Luyện tập chung", [gen_c12_1, gen_c12_2]) },
    { title: "CĐ13 - Bài 66+67: Xác suất & Thống kê", generate: gen_c13_1 },
    { title: "CĐ13 - Luyện tập chung", generate: gen_c13_1 },
    { title: "CĐ14 - Ôn tập cuối năm toàn diện", generate: gen_c14 }
];
"""

with open(r"C:\Users\Admin\.gemini\antigravity\scratch\primary-math-app\js\grades\grade2.js", "w", encoding="utf-8") as f:
    f.write(file_content)
print("Complete")
