import { rand, formatAns, buildSectionTitle, buildGrid, distributeExactCount, shuffle } from '../utils.js';

// Chương 1: Ôn tập lớp 1
function gen_2_1() {
    let html = buildSectionTitle("Chương 1: Ôn tập kiến thức Lớp 1 (Phạm vi 100)");
    let c1 = ''; let qIdx = 1;
    let counts = distributeExactCount([1, 1]); 
    let ngangCount = counts[0]; let docCount = counts[1];

    for (let i = 0; i < ngangCount; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let isAdd = Math.random() > 0.5;
            let c, a, b;
            if (isAdd) {
                let a_t = rand(1,8), a_o = rand(0,8);
                let b_t = rand(0,9-a_t), b_o = rand(0,9-a_o);
                a = a_t*10+a_o; b = b_t*10+b_o; c = a+b;
            } else {
                let a_t = rand(2,9), a_o = rand(2,9);
                let b_t = rand(1,a_t), b_o = rand(1,a_o);
                a = a_t*10+a_o; b = b_t*10+b_o; c = a-b;
            }
            subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} ${isAdd?'+':'-'} ${b} = ${formatAns(c)}</div>`;
        }
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Tính nhẩm</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    
    // So sánh
    let c2 = '';
    for (let i = 0; i < docCount; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let a = rand(10, 99); let b = rand(10, 99);
            if (Math.random() > 0.8) b = a;
            let sign = (a > b) ? '>' : (a < b ? '<' : '=');
            subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} ${formatAns(sign)} ${b}</div>`;
        }
        c2 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 2rem; border-top: 2px dashed #e2e8f0; padding-top: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Điền dấu &gt;, &lt;, =</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    html += buildGrid(4, c1) + buildGrid(4, c2);
    return html;
}

// Chương 2: Phép cộng trừ qua 10 trong phạm vi 20
function gen_2_2() {
    let html = buildSectionTitle("Chương 2: Phép cộng, trừ qua 10 trong phạm vi 20");
    let c1 = ''; let qIdx = 1;
    let counts = distributeExactCount([1, 1]); 

    for (let i = 0; i < counts[0]; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let a = rand(5, 9); let b = rand(11-a, 9);
            subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} + ${b} = ${formatAns(a+b)}</div>`;
        }
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Tính nhẩm</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    
    let c2 = '';
    for (let i = 0; i < counts[1]; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let a = rand(11, 18); let b = rand(a % 10 + 1, 9);
            subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} - ${b} = ${formatAns(a-b)}</div>`;
        }
        c2 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 2rem; border-top: 2px dashed #e2e8f0; padding-top: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Tính nhẩm phép trừ</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    return html + buildGrid(4, c1) + buildGrid(4, c2);
}

// Chương 3: Khối lượng, Dung tích
function gen_2_3() {
    let html = buildSectionTitle("Chương 3: Khối lượng (kg), Dung tích (l)");
    let c1 = ''; let qIdx = 1;
    let total = distributeExactCount([1])[0];
    
    for(let i=0; i<total; i++) {
        let isAdd = Math.random() > 0.5;
        let pText, u = isAdd? 'kg':'l';
        let v1 = rand(15, 30), v2 = rand(5, 15);
        if(isAdd) {
            pText = `Chó Mực cân nặng ${v1}kg. Chó Vàng nặng hơn Chó Mực ${v2}kg. Hỏi Chó Vàng cân nặng bao nhiêu kg?`;
        } else {
            pText = `Can thứ nhất chứa ${v1}l dầu. Can thứ hai chứa ít hơn can thứ nhất ${v2}l dầu. Hỏi can thứ hai chứa bao nhiêu lít dầu?`;
        }
        let ans = isAdd ? v1+v2 : v1-v2;
        
        c1 += `<div class="word-problem" style="margin-bottom: 2.5rem; grid-column: span 4;">
            <div class="wp-text" style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}. ${pText}</div>
            <div class="wp-workspace" style="padding-left: 1.5rem;">
                <div style="font-size: 1.25rem; font-weight: 600; font-style: italic; margin-bottom: 0.8rem;">Bài giải:</div>
                <div class="wp-answer-detail" style="line-height: 2.2; font-size: 1.2rem;">
                    <div style="border-bottom: 2px dotted #cbd5e1; width: 100%; min-height: 3rem; display: flex; align-items: end;">${formatAns(`Số ${u} ${isAdd?'chó Vàng nặng':'can thứ hai chứa'} là:`)}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; width: 100%; min-height: 3rem; display: flex; align-items: end;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${v1} ${isAdd?'+':'-'} ${v2} = ${ans} (${u})`)}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; width: 100%; min-height: 3rem; display: flex; align-items: end;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đáp số: ${ans} ${u}`)}</div>
                </div></div></div>`;
    }
    return html + buildGrid(4, c1);
}

// Chương 4: Cộng trừ có nhớ 100
function gen_2_4() {
    let html = buildSectionTitle("Chương 4: Phép cộng, trừ (có nhớ) trong phạm vi 100");
    let c1 = ''; let qIdx = 1;
    let counts = distributeExactCount([1, 1]); 

    for (let i = 0; i < counts[0]; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let a_ones = rand(3, 9); let b_ones = rand(10 - a_ones, 9); 
            let a_tens = rand(1, 7); let b_tens = rand(1, 8 - a_tens);
            let a = a_tens * 10 + a_ones; let b = b_tens * 10 + b_ones; 
            subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} + ${b} = ${formatAns(a+b)}</div>`;
        }
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Tính</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    
    let c2 = '';
    for (let i = 0; i < counts[1]; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let a_o = rand(0, 7), b_o = rand(a_o + 1, 9);
            let a_t = rand(4, 9), b_t = rand(1, a_t - 1);
            let a = a_t * 10 + a_o; let b = b_t * 10 + b_o; 
            subItems += `<div class="q-col">
                <div style="position: absolute; left: -25px; top: 0px; font-size: 1.2rem; color:#64748b; font-weight:700;">${label}.</div>
                <div class="val-a">${a}</div><div class="val-op">-</div><div class="val-b">${b}</div>
                <div class="line"></div><div class="answer">${a-b}</div></div>`;
        }
        c2 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 2rem; border-top: 2px dashed #e2e8f0; padding-top: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 2rem;">Câu ${qIdx++}: Đặt tính rồi tính</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    return html + buildGrid(4, c1) + buildGrid(4, c2);
}

// Chương 5: Thời gian
function gen_2_5() {
    let html = buildSectionTitle("Chương 5: Trắc nghiệm Thời gian (Ngày, tháng, xem đồng hồ)");
    let c1 = ''; let qIdx = 1;
    let counts = distributeExactCount([1])[0]; 

    for (let i = 0; i < counts; i++) {
        let type = rand(0,1);
        let qText, ans, opts = [];
        if(type === 0) {
            let days = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
            let idx = rand(1, 4);
            ans = days[idx+1];
            qText = `Hôm qua là ${days[idx]} ngày 5. Hỏi ngày mai là thứ mấy?`;
            opts = [ans, days[idx+2], days[idx], days[idx-1]];
        } else {
            let h = rand(6, 11);
            ans = `${h} giờ 15 phút`;
            qText = `Kim phút chỉ vào số 3, kim giờ qua khỏi số ${h}. Đồng hồ chỉ mấy giờ?`;
            opts = [ans, `${h} giờ 30 phút`, `${h} giờ 5 phút`, `${h} giờ 45 phút`];
        }
        opts = shuffle(opts);
        let optHTML = opts.map((v, idx) => {
            let isC = (v === ans);
            return `<div><span class="mc-label ${isC ? 'mc-ans' : ''}">${String.fromCharCode(65+idx)}</span>. ${v}</div>`;
        }).join('');
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. ${qText}</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); padding-left: 1.5rem; font-weight: 600; font-size: 1.25rem;">${optHTML}</div></div>`;
    }
    return html + buildGrid(4, c1);
}

// Chương 6: Bảng nhân chia 2, 5
function gen_2_6() {
    let html = buildSectionTitle("Chương 6: Phép nhân và phép chia (Bảng 2, 5)");
    let c1 = ''; let qIdx = 1;
    let total = distributeExactCount([1])[0]; 
    for (let i = 0; i < total; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let base = Math.random() > 0.5 ? 2 : 5;
            let multiple = rand(2, 10);
            if (Math.random() > 0.5) {
                let options = Math.random() > 0.5 ? `${base} x ${multiple}` : `${multiple} x ${base}`;
                subItems += `<div style="font-size: 1.5rem; white-space: nowrap;"><b>${label}.</b> ${options} = ${formatAns(base*multiple)}</div>`;
            } else {
                subItems += `<div style="font-size: 1.5rem; white-space: nowrap;"><b>${label}.</b> ${base*multiple} : ${base} = ${formatAns(multiple)}</div>`;
            }
        }
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Tính nhẩm</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    return html + buildGrid(4, c1);
}

// Chương 7: Hình học
function gen_2_7() {
    let html = buildSectionTitle("Chương 7: Làm quen Hình học (Đường gấp khúc, Hình khối)");
    let c1 = ''; let qIdx = 1;
    let total = distributeExactCount([1])[0];
    
    for(let i=0; i<total; i++) {
        let type = rand(0,1);
        let qText, ans, opts = [];
        if(type === 0) {
            let d1 = rand(3,8), d2 = rand(3,8), d3 = rand(4,9);
            ans = d1+d2+d3;
            qText = `Một đường gấp khúc gồm 3 đoạn thẳng có độ dài lần lượt là ${d1}cm, ${d2}cm, ${d3}cm. Kết quả là độ dài đường gấp khúc bằng bao nhiêu?`;
            opts = [`${ans} cm`, `${ans+2} cm`, `${ans-1} cm`, `${ans-2} cm`];
        } else {
            ans = "4 cạnh";
            qText = `Hình tứ giác có bao nhiêu cạnh?`;
            opts = [ans, "3 cạnh", "5 cạnh", "6 cạnh"];
        }
        opts = shuffle(opts);
        let optHTML = opts.map((v, idx) => `<div><span class="mc-label ${(v===ans) ? 'mc-ans' : ''}">${String.fromCharCode(65+idx)}</span>. ${v}</div>`).join('');
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. ${qText}</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); padding-left: 1.5rem; font-weight: 600; font-size: 1.25rem;">${optHTML}</div></div>`;
    }
    return html + buildGrid(4, c1);
}

// Chương 8: Các số PV 1000
function gen_2_8() {
    let html = buildSectionTitle("Chương 8: Cấu tạo các số trong phạm vi 1000");
    let c1 = ''; let qIdx = 1;
    let total = distributeExactCount([1])[0];
    
    for(let i=0; i<total; i++) {
        let h = rand(1,9), t=rand(1,9), o=rand(1,9);
        let ans = h*100 + t*10 + o;
        let qText = `Số gồm ${h} trăm, ${t} chục và ${o} đơn vị được viết là:`;
        let opts = shuffle([ans, h*100+o*10+t, t*100+h*10+o, o*100+t*10+h]);
        let optHTML = opts.map((v, idx) => `<div><span class="mc-label ${(v===ans) ? 'mc-ans' : ''}">${String.fromCharCode(65+idx)}</span>. ${v}</div>`).join('');
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. ${qText}</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); padding-left: 1.5rem; font-weight: 600; font-size: 1.25rem;">${optHTML}</div></div>`;
    }
    return html + buildGrid(4, c1);
}

// Chương 9: Cộng trừ không nhớ PV 1000
function gen_2_9() {
    let html = buildSectionTitle("Chương 9: Phép tính không giới hạn trong phạm vi 1000");
    let c1 = ''; let qIdx = 1;
    let total = distributeExactCount([1])[0];
    
    for (let i = 0; i < total; i++) {
        let subItems = '';
        for(let j=0; j<4; j++) {
            let label = String.fromCharCode(65+j);
            let isAdd = Math.random() > 0.5;
            let c, a, b;
            if (isAdd) {
                let a_h = rand(1,4), b_h = rand(1,5);
                let a_t = rand(1,4), b_t = rand(1,5);
                let a_o = rand(1,4), b_o = rand(1,5);
                a = a_h*100+a_t*10+a_o; b = b_h*100+b_t*10+b_o; c = a+b;
                subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} + ${b} = ${formatAns(c)}</div>`;
            } else {
                let a_h = rand(5,9), b_h = rand(1, a_h-1);
                let a_t = rand(5,9), b_t = rand(1, a_t-1);
                let a_o = rand(5,9), b_o = rand(1, a_o-1);
                a = a_h*100+a_t*10+a_o; b = b_h*100+b_t*10+b_o; c = a-b;
                subItems += `<div style="font-size: 1.4rem;"><b>${label}.</b> ${a} - ${b} = ${formatAns(c)}</div>`;
            }
        }
        c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
            <div style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem;">Câu ${qIdx++}: Tính</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">${subItems}</div></div>`;
    }
    return html + buildGrid(4, c1);
}

// Chương 10: Đo độ dài nâng cao (km, m) & Tiền
function gen_2_10() {
    let html = buildSectionTitle("Chương 10: Đo độ dài km, m & Tiền Việt Nam");
    let c1 = ''; let qIdx = 1;
    let total = distributeExactCount([1])[0];
    
    for(let i=0; i<total; i++) {
        let type = rand(0,1);
        if(type === 0) {
            let v1 = rand(15, 45), v2 = rand(30, 80);
            c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
                <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. Quãng đường từ nhà An đến trường dài ${v2}m. An đã đi được ${v1}m. Hỏi An còn phải đi bao nhiêu mét nữa mới đến trường?</div>
                <div style="padding-left: 20px; font-weight: bold; font-size: 1.2rem;">Trả lời: ${formatAns(v2-v1)} m</div></div>`;
        } else {
            let v1 = rand(1,5) * 1000;
            let v2 = rand(6,10) * 1000;
            c1 += `<div class="q-item" style="grid-column: span 4; margin-bottom: 1.5rem;">
                <div style="margin-bottom: 0.8rem; font-size: 1.35rem; font-weight: 700;">Câu ${qIdx++}. Mẹ mua mớ rau hết ${v1} đồng. Mẹ đưa cho cô bán rau ${v2} đồng. Cô bán rau phải trả lại mẹ bao nhiêu học tiền?</div>
                <div style="padding-left: 20px; font-weight: bold; font-size: 1.2rem;">Trả lời: ${formatAns(v2-v1)} đồng</div></div>`;
        }
    }
    return html + buildGrid(4, c1);
}

// HK1 Review
function gen_2_review_1() {
    let html = buildSectionTitle("⭐ ĐỀ ÔN TẬP CHUNG HỌC KỲ 1 (LỚP 2)");
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
    
    for(let i=0; i<esCount; i++) {
        let isAdd = Math.random() > 0.5;
        let v1 = rand(45,75), v2 = rand(15,35), ans = isAdd? v1+v2 : v1-v2;
        let prob = isAdd ? `Thư viện có ${v1} quyển sách. Cô giáo mua thêm ${v2} quyển sách nữa. Hỏi có tất cả bao nhiêu sách?` : `Trên cây có ${v1} con chim. Có ${v2} con bay đi. Hỏi trên cây còn lại mấy con?`;
        c += `<div class="word-problem" style="margin-bottom: 2.5rem; grid-column: span 4;">
            <div class="wp-text" style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem;">Câu ${qIdx++}. ${prob}</div>
            <div class="wp-workspace" style="padding-left: 1.5rem;">
                <div style="font-size: 1.25rem; font-weight: 600; font-style: italic; margin-bottom: 0.8rem;">Bài giải:</div>
                <div class="wp-answer-detail" style="line-height: 2.2; font-size: 1.2rem;">
                    <div style="border-bottom: 2px dotted #cbd5e1; min-height: 3rem;">${formatAns('Số sách / số chim là:')}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; min-height: 3rem;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;${v1} ${isAdd?'+':'-'} ${v2} = ${ans}`)}</div>
                    <div style="border-bottom: 2px dotted #cbd5e1; min-height: 3rem;">${formatAns(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đáp số: ${ans}`)}</div>
                </div></div></div>`;
    }
    return html + buildGrid(4, c);
}

// HK2 Review
function gen_2_review_2() {
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

export const grade2Topics = [
    { title: "Chương 1: Ôn tập dữ liệu Lớp 1", generate: gen_2_1 },
    { title: "Chương 2: Phép cộng trừ qua 10", generate: gen_2_2 },
    { title: "Chương 3: Khối lượng (kg), Dung tích (l)", generate: gen_2_3 },
    { title: "Chương 4: Phép cộng trừ có nhớ (P.V 100)", generate: gen_2_4 },
    { title: "Chương 5: Thời Gian & Đồng hồ", generate: gen_2_5 },
    { title: "⭐ ÔN TẬP HỌC KỲ 1", generate: gen_2_review_1 },
    { title: "Chương 6: Phép nhân và Phép chia", generate: gen_2_6 },
    { title: "Chương 7: Hình phẳng học & Đo đạc", generate: gen_2_7 },
    { title: "Chương 8: Cấu tạo các số đến 1000", generate: gen_2_8 },
    { title: "Chương 9: Cộng trừ (P.V 1000)", generate: gen_2_9 },
    { title: "Chương 10: Độ dài (m, km) & Mệnh giá tiền", generate: gen_2_10 },
    { title: "🌟 LUYỆN TẬP CHUNG CUỐI NĂM", generate: gen_2_review_2 }
];
