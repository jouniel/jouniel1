
const app = document.getElementById('app');

const PASSWORD = "qlalfqjsgh2025!";
let loggedIn = false;
let nickname = "";

function renderLogin() {
  app.innerHTML = `
    <div class="login-container">
      <h2>주넬 제 1회 롤 대회 경매</h2>
      <input id="nick" placeholder="닉네임 입력" />
      <input id="pass" type="password" placeholder="비밀번호 입력" />
      <button onclick="login()">입장하기</button>
    </div>
  `;
}

function renderAuction() {
  const players = [
    { name: "페이커", score: 95, img: "https://via.placeholder.com/40" },
    { name: "데프트", score: 90, img: "https://via.placeholder.com/40" },
    { name: "케리아", score: 92, img: "https://via.placeholder.com/40" },
  ];
  app.innerHTML = `
    <div class="auction-container">
      <h2>환영합니다, ${nickname}님!</h2>
      <div class="team-card">
        <div class="team-name">Team ${nickname}</div>
        ${players.map(p => `
          <div class="player">
            <img src="${p.img}" alt="${p.name}" />
            <div>${p.name} (${p.score})</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.login = function() {
  const nick = document.getElementById('nick').value;
  const pass = document.getElementById('pass').value;
  if (pass === PASSWORD && nick.trim() !== "") {
    nickname = nick.trim();
    loggedIn = true;
    renderAuction();
  } else {
    alert("비밀번호 또는 닉네임이 잘못되었습니다.");
  }
};

renderLogin();
