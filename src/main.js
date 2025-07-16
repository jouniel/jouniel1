
let currentBid = 1000;
let highestBidder = "없음";

window.placeBid = function () {
  const input = document.getElementById("bid-input");
  const bidderName = sessionStorage.getItem("nickname") || "익명";
  const bidAmount = parseInt(input.value);

  if (!bidAmount || bidAmount <= currentBid) {
    alert("현재 입찰가보다 높은 금액을 입력해야 합니다.");
    return;
  }

  currentBid = bidAmount;
  highestBidder = bidderName;

  document.getElementById("current-bid").innerText = currentBid;
  document.getElementById("highest-bidder").innerText = highestBidder;
  input.value = "";
};
