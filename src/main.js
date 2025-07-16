
const players = [
  { name: "유저1", currentBid: 1000, highestBidder: "없음" },
  { name: "유저2", currentBid: 1200, highestBidder: "없음" },
  { name: "유저3", currentBid: 900, highestBidder: "없음" },
];

window.login = function () {
  const nickname = document.getElementById("nickname-input").value;
  if (!nickname) {
    alert("닉네임을 입력하세요.");
    return;
  }
  sessionStorage.setItem("nickname", nickname);
  document.getElementById("auction-area").style.display = "block";
  populatePlayers();
};

function populatePlayers() {
  const select = document.getElementById("player-select");
  select.innerHTML = "";
  players.forEach((player, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = player.name;
    select.appendChild(option);
  });
  updateDisplay(0);
  select.addEventListener("change", () => updateDisplay(select.value));
}

function updateDisplay(index) {
  const player = players[index];
  document.getElementById("current-bid").textContent = player.currentBid;
  document.getElementById("highest-bidder").textContent = player.highestBidder;
}

window.placeBid = function () {
  const index = document.getElementById("player-select").value;
  const player = players[index];
  const bidAmount = parseInt(document.getElementById("bid-input").value);
  const bidderName = sessionStorage.getItem("nickname") || "익명";

  if (!bidAmount || bidAmount <= player.currentBid) {
    alert("현재 입찰가보다 높은 금액을 입력해야 합니다.");
    return;
  }

  player.currentBid = bidAmount;
  player.highestBidder = bidderName;
  updateDisplay(index);
  document.getElementById("bid-input").value = "";
};
