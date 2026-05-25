export function updateUI(q) {
    document.getElementById("position").innerText =
        q.position + " (" + q.mode + ")";

    document.getElementById("hand").innerText = q.hand;
    document.getElementById("result").innerText = "";
}

export function showResult(correct, q) {
    document.getElementById("result").innerText =
        correct ? "✅ Correct!" :
        "✘ " + q.position + " should " + q.correct + " " + q.hand;
}

export function updateButtons(mode) {
    if (mode === "open") {
        document.getElementById("btn_raise").innerText = "Open";
        document.getElementById("btn_call").style.display = "none";
    } else {
        document.getElementById("btn_raise").innerText = "Raise";
        document.getElementById("btn_call").style.display = "inline-block";
    }
}