import { OpenRanges } from "../ranges/OpenRanges.js";

const Ranks = ["A","K","Q","J","T","9","8","7","6","5","4","3","2"];

let current = {};
let wrongCount = {};

export function randomHand() {
    let i = Math.floor(Math.random()*13);
    let j = Math.floor(Math.random()*13);

    if(i === j) return Ranks[i]+Ranks[j];
    if(i < j) return Ranks[i]+Ranks[j]+"s";
    return Ranks[j]+Ranks[i]+"o";
}

export function getWeightedHands(position, mode) {
    let output = [];

    for (let hand in OpenRanges[position]) {

        let key = position + "_" + hand + "_" + mode;
        let bonus = wrongCount[key] || 0;

        let weight = 1 + bonus * 3;

        for (let i = 0; i < weight; i++) {
            output.push(hand);
        }
    }

    return output;
}

export function generateQ(mode) {

    let positions = Object.keys(OpenRanges);
    let position = positions[Math.floor(Math.random()*positions.length)];

    let hand;

    if (Math.random() < 0.5) {
        let pool = getWeightedHands(position, mode);
        hand = pool[Math.floor(Math.random()*pool.length)];
    } else {
        hand = randomHand();
    }

    let correct =
        mode === "open"
            ? (OpenRanges[position][hand] ? "raise" : "fold")
            : (OpenRanges[position][hand] ? "call" : "fold");

    current = { position, hand, correct, mode };

    return current;
}

export function checkAnswer(action) {
    let key = current.position + "_" + current.hand + "_" + current.mode;

    if (action === current.correct) {
        wrongCount[key] = 0;
        return true;
    } else {
        wrongCount[key] = (wrongCount[key] || 0) + 1;
        return false;
    }

    localStorage.setItem("wrong", JSON.stringify(wrongCount));
    return action === current.correct;

}