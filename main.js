
const PASSWORD = "qlalfqjsgh2025!";
let players = [
  { name: "선수1", currentBid: 0, highestBidder: "" },
  { name: "선수2", currentBid: 0, highestBidder: "" }
];
let budget = 1000;
let teamInfo = {};

function login() {
  const nickname = document.getElementById("nickname").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!nickname || !password) return showError("모두 입력하세요.");
  if (password !== PASSWORD) return showError("비밀번호 오류.");
  sessionStorage.setItem("nickname", nickname);
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("auction-screen").classList.remove("hidden");
  document.getElementById("user-nickname").textContent = nickname;
  renderPlayers();
}

function showError(msg) {
  document.getElementById("login-error").textContent = msg;
}

function renderPlayers() {
  const section = document.getElementById("player-section");
  section.innerHTML = "";
  players.forEach((p, idx) => {
    const div = document.createElement("div");
    div.className = "player";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>입찰가: <span id="bid-${idx}">${p.currentBid}</span> G</p>
      <p>최고 입찰자: <span id="bidder-${idx}">${p.highestBidder}</span></p>
      <input type="number" id="input-${idx}" placeholder="입찰 금액 입력" />
      <button onclick="placeBid(${idx})">입찰</button>
    `;
    section.appendChild(div);
  });
}

function placeBid(index) {
  const amount = parseInt(document.getElementById(`input-${index}`).value);
  const bidder = sessionStorage.getItem("nickname") || "익명";
  if (!amount || amount <= players[index].currentBid) {
    return alert("입찰가는 더 높아야 함");
  }
  if (budget && amount > budget) {
    return alert("예산 초과");
  }
  players[index].currentBid = amount;
  players[index].highestBidder = bidder;
  document.getElementById(`bid-${index}`).textContent = amount;
  document.getElementById(`bidder-${index}`).textContent = bidder;
}

function toggleSettings() {
  document.getElementById("settings-panel").classList.toggle("hidden");
}

function applySettings() {
  try {
    const teamText = document.getElementById("teamConfig").value;
    const playerText = document.getElementById("playerConfig").value;
    const newBudget = parseInt(document.getElementById("budgetInput").value);
    if (newBudget >= 0) budget = newBudget;
    if (teamText) teamInfo = JSON.parse(teamText);
    if (playerText) players = JSON.parse(playerText);
    renderPlayers();
    alert("설정이 반영되었습니다.");
  } catch (e) {
    alert("입력 오류. JSON 형식 확인.");
  }
}
