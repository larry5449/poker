import { generateQ, checkAnswer } from "./game.js";
import { updateUI, showResult, updateButtons } from "./UI.js";

let currentQ;

function newQ() {
    let mode = document.getElementById("mode").value;

    currentQ = generateQ(mode);

    updateUI(currentQ);
    updateButtons(mode);
}

function answer(action) {
    let correct = checkAnswer(action);

    showResult(correct, currentQ);

    setTimeout(newQ, 800);
}

// ✅ 綁按鈕
document.getElementById("btn_raise").onclick = () => answer("raise");
document.getElementById("btn_call").onclick = () => answer("call");
document.getElementById("btn_fold").onclick = () => answer("fold");

// ✅ mode 切換
document.getElementById("mode").onchange = newQ;

// ✅ 開始
newQ();
