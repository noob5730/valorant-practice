// 에이밍 훈련 기능
let aimScore = 0;
const startAimTrainingButton = document.getElementById("startAimTraining");
const gameArea = document.getElementById("gameArea");
const aimScoreDisplay = document.getElementById("aimScore");

startAimTrainingButton.addEventListener("click", startAimTraining);

function startAimTraining() {
    aimScore = 0;
    aimScoreDisplay.textContent = aimScore;
    gameArea.style.display = "block";
    spawnTarget(gameArea, handleAimClick);
}

function spawnTarget(area, clickHandler) {
    const target = document.createElement("div");
    target.classList.add("target");
    target.style.top = `${Math.random() * 90}%`;
    target.style.left = `${Math.random() * 90}%`;
    target.addEventListener("click", clickHandler);
    area.innerHTML = "";
    area.appendChild(target);
}

function handleAimClick(event) {
    aimScore++;
    aimScoreDisplay.textContent = aimScore;
    spawnTarget(gameArea, handleAimClick);
}

// 정확도 훈련 기능
let accuracyScore = 0;
let totalClicks = 0;
const startAccuracyTrainingButton = document.getElementById("startAccuracyTraining");
const accuracyArea = document.getElementById("accuracyArea");
const accuracyDisplay = document.getElementById("accuracy");

startAccuracyTrainingButton.addEventListener("click", startAccuracyTraining);

function startAccuracyTraining() {
    accuracyScore = 0;
    totalClicks = 0;
    accuracyDisplay.textContent = "0%";
    accuracyArea.style.display = "block";
    spawnTarget(accuracyArea, handleAccuracyClick);
}

function handleAccuracyClick(event) {
    accuracyScore++;
    totalClicks++;
    updateAccuracy();
    spawnTarget(accuracyArea, handleAccuracyClick);
}

accuracyArea.addEventListener("click", () => {
    totalClicks++;
    updateAccuracy();
});

function updateAccuracy() {
    const accuracyPercentage = ((accuracyScore / totalClicks) * 100).toFixed(2);
    accuracyDisplay.textContent = `${accuracyPercentage}%`;
}

// 팀워크 훈련 기능
let currentScenario = 0;

const scenarios = [
    {
        situation: "적들이 B 사이트에 몰려있고, 폭탄을 설치하려고 합니다. 팀원들이 당신에게 폭탄 설치 상황을 요청했습니다.",
        choices: [
            "A 사이트에서 기다리며 적이 올 때까지 대기하자.",
            "B 사이트로 가서 팀원들과 함께 폭탄을 설치해보자.",
            "적을 무시하고 다른 사이트로 우회하여 방어 위치를 잡자."
        ],
        results: [
            "적이 B 사이트로 몰려와서 팀원이 위험해졌습니다. 좀 더 공격적인 접근이 필요했습니다.",
            "좋은 선택입니다! 팀원들과 함께 폭탄을 설치할 수 있었고, 안전하게 방어를 시작했습니다.",
            "우회 전략이 실패했습니다. 팀이 공격을 당하며 폭탄 설치에 실패했습니다."
        ]
    },
    {
        situation: "게임 중 팀원 간 의견 차이로 말싸움이 벌어졌습니다. 한 명은 공격적으로 하자고 주장하고, 다른 한 명은 방어적으로 하자고 말합니다.",
        choices: [
            "양쪽 의견을 수용하고, 중간에서 조율하여 모두가 동의할 수 있는 전략을 제안한다.",
            "상대방을 무시하고 내가 하고 싶은 대로 플레이한다.",
            "상황이 불안정해졌으니 모두에게 진정하자고 설득하며 냉정을 찾게 한다."
        ],
        results: [
            "팀원들이 조율된 전략에 동의하며, 팀워크를 유지한 채 플레이를 이어갔습니다.",
            "분열된 플레이로 인해 팀워크가 무너졌고, 결과적으로 패배로 이어졌습니다.",
            "팀원들이 진정하며 다시 협력할 수 있게 되어, 다음 라운드에 좋은 결과를 냈습니다."
        ]
    }
];

function loadScenario() {
    const situationText = document.getElementById("situationText");
    const choiceButtons = document.getElementsByClassName("choiceButton");
    
    situationText.textContent = scenarios[currentScenario].situation;
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].textContent = scenarios[currentScenario].choices[i];
    }
}

function selectChoice(choiceIndex) {
    const resultText = document.getElementById("resultText");
    const result = scenarios[currentScenario].results[choiceIndex - 1];
    
    resultText.textContent = result;
    document.getElementById("result").style.display = "block";
}

function nextScenario() {
    currentScenario = (currentScenario + 1) % scenarios.length;
    document.getElementById("result").style.display = "none";
    loadScenario();
}

window.onload = loadScenario;
