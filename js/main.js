import { generateQ, checkAnswer } from "./game.js";
import { updateUI, showResult, updateButtons } from "./UI.js";

let currentQ;
let timerInterval;let timeLeft = 5;
let isPaused = false;
let remainingTime = 5000; // 毫秒
let startTime;


function newQ() {
    clearInterval(timerInterval);   //✅ 先清掉舊timer

    let mode = document.getElementById("mode").value;

    currentQ = generateQ(mode);

    updateUI(currentQ);
    updateButtons(mode);
    startTimer(currentQ);

    isPaused = false;
    remainingTime = 5000;
    document.getElementById("btn_pause").innerText = "⏸";
}

function answer(action) {

    clearInterval(timerInterval);

    let correct = checkAnswer(action);

    showResult(correct, currentQ);

    setTimeout(newQ, 800);
}


function startTimer(question) {

    clearTimeout(timerInterval);

    const bar = document.getElementById("timerBar");

    isPaused = false;
    remainingTime = 5000;

    // reset
    bar.style.transition = "none";
    bar.style.width = "100%";
    bar.style.background = "linear-gradient(to right, #00ffcc, #00ccff)";
    bar.offsetWidth;

    startTime = Date.now();

    // 開始動畫
    bar.style.transition = "width 5s linear";
    bar.style.width = "0%";

    timerInterval = setTimeout(() => {
        showResult(false, question);
        setTimeout(newQ, 800);
    }, remainingTime);
}

function togglePause() {

    const bar = document.getElementById("timerBar");

    if (!isPaused) {
        // ✅ 暫停
        isPaused = true;

        clearTimeout(timerInterval);

        // 剩餘時間
        let elapsed = Date.now() - startTime;
        remainingTime -= elapsed;

        // 停住 bar
        let currentWidth = getComputedStyle(bar).width;
        bar.style.transition = "none";
        bar.style.width = currentWidth;

        document.getElementById("btn_pause").innerText = "▶";

    } else {
        // ✅ 繼續
        isPaused = false;

        startTime = Date.now();

        // 動畫繼續
        bar.style.transition = `width ${remainingTime}ms linear`;
        bar.style.width = "0%";

        timerInterval = setTimeout(() => {
            showResult(false, currentQ);
            setTimeout(newQ, 800);
        }, remainingTime);

        document.getElementById("btn_pause").innerText = "⏸";
    }
}


// ✅ 綁按鈕
document.getElementById("btn_raise").onclick = () => answer("raise");
document.getElementById("btn_call").onclick = () => answer("call");
document.getElementById("btn_fold").onclick = () => answer("fold");
document.getElementById("btn_pause").onclick = togglePause;


// ✅ mode 切換
document.getElementById("mode").onchange = newQ;

// ✅ 開始
newQ();
