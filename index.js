const player01 = document.getElementById("player1");
const player02 = document.getElementById("player2");

document
  .getElementById("setPlayer01")
  .addEventListener("click", function jogador01() {
    const playerJogando01 = player01.value;
    const nomeJogando01 = document.querySelector(".player1Nome");
    nomeJogando01.textContent = playerJogando01;
    if (playerJogando01 !== "") {
      console.log(playerJogando01);
      document.querySelector("#setPlayer01").style.display = "none";
      player01.disabled = true;
      player01.value = "";
      return playerJogando01;
    }
  });

document.getElementById("setPlayer02").addEventListener("click", () => {
  const playerJogando02 = player02.value;
  const nomeJogando02 = document.querySelector(".player2Nome");
  nomeJogando02.textContent = playerJogando02;
  if (playerJogando02 !== "") {
    console.log(playerJogando02);
    document.querySelector("#setPlayer02").style.display = "none";
    player02.disabled = true;
    player02.value = "";
  }
});

const player1Nome = document.querySelector(".player1Nome");
const player2Nome = document.querySelector(".player2Nome");

let selected;

let currentPlayer = "X";

// Função para alternar o jogador atual
function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

document.getElementById("start").addEventListener("click", () => {
  if (
    player1Nome.textContent.length >= 1 &&
    player2Nome.textContent.length >= 1
  ) {
    const playerAtual = document.querySelector(".playerAtual");
    playerAtual.innerHTML = "ACABAMOS DE COMEÇAR";

    function init() {
      let positions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
      ];

      selected = [];

      let player = player1Nome.textContent;
      function toggleJogador() {
        player =
          player === player1Nome.textContent
            ? player2Nome.textContent
            : player1Nome.textContent;
      }

      const playerAtual = document.querySelector(".playerAtual");

      document.querySelectorAll(".item").forEach((button) => {
        button.addEventListener("click", () => {
          console.log(currentPlayer);
          // Verifica se o botão já foi marcado
          if (!button.textContent.trim()) {
            const index = parseInt(button.getAttribute("data-i"));
            // Atualiza o texto do botão com o símbolo do jogador atual
            button.textContent = currentPlayer;
            selected.push(index);

            if (checkWin(selected, currentPlayer)) {
              if (currentPlayer === "X") {
                playerAtual.innerHTML = `Parabéns jogador ${player} você ganhou!`;
                playerAtual.style.color = "green";
              } else {
                playerAtual.innerHTML = `Parabéns jogador ${player} você ganhou!`;
                playerAtual.style.color = "green";
              }
            } else {
              playerAtual.innerHTML = `Jogador da vez: ${player}`;
              togglePlayer();
              toggleJogador();
            }
          }
        });
      });

      function checkWin(selected, symbol) {
        for (const combo of positions) {
          // Verifica se todos os botões na combinação contêm o mesmo símbolo
          if (
            combo.every(
              (pos) =>
                selected.includes(pos) &&
                document.querySelector(`[data-i="${pos}"]`).textContent ===
                  symbol
            )
          ) {
            return true;
          }
        }
        return false;
      }
    }
    init();
  }
});

function reload() {
  location.reload();
}
