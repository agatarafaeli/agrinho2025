let urban = 50;
let rural = 50;
let turn = 0;
let gameOver = false;

let questions = [
  { q: "Construir um Shopping?", urbanYes: 15, ruralYes: -10 },
  { q: "Transformar fazenda em condomínio?", urbanYes: 10, ruralYes: -15 },
  { q: "Criar feira de produtos locais?", urbanYes: -5, ruralYes: 10 },
  { q: "Incentivar agricultura urbana?", urbanYes: 0, ruralYes: 10 },
  { q: "Abrir uma indústria?", urbanYes: 20, ruralYes: -15 },
  { q: "Criar parque ecológico?", urbanYes: -5, ruralYes: 10 },
  { q: "Construir estrada para cidade vizinha?", urbanYes: 10, ruralYes: -5 },
  { q: "Incentivar plantio de orgânicos?", urbanYes: -5, ruralYes: 10 },
  { q: "Privatizar terras rurais?", urbanYes: 15, ruralYes: -20 },
  { q: "Preservar floresta local?", urbanYes: -10, ruralYes: 15 },
];

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textFont('monospace');
}

function draw() {
  background(240);
  
  if (gameOver) {
    textSize(24);
    fill(0);
    if (urban <= 10 || rural <= 10)
      text("Colapso social ou ambiental!", width / 2, height / 2);
    else
      text("Você equilibrado a cidade e o campo!", width / 2, height / 2);
    return;
  }

  drawStats();

  if (turn < questions.length) {
    let q = questions[turn];
    textSize(18);
    fill(0);
    text(q.q, width / 2, height / 2 - 30);

    drawButtons("Sim (S)", "Não (N)");
  } else {
    gameOver = true;
  }
}

function drawStats() {
  fill(0);
  textSize(16);
  text("🌇 Urbano: " + urban, width / 4, 30);
  text("🌱 Rural: " + rural, (3 * width) / 4, 30);

  fill(100, 100, 250);
  rect(100, 50, urban * 2, 20);
  fill(100, 200, 100);
  rect(300, 50, rural * 2, 20);
}

function drawButtons(leftLabel, rightLabel) {
  fill(200);
  rect(100, 300, 150, 40);
  rect(350, 300, 150, 40);
  fill(0);
  textSize(16);
  text(leftLabel, 175, 320);
  text(rightLabel, 425, 320);
}

function keyPressed() {
  if (turn >= questions.length) return;

  let q = questions[turn];

  if (key === 's' || key === 'S') {
    urban += q.urbanYes;
    rural += q.ruralYes;
    nextTurn();
  } else if (key === 'n' || key === 'N') {
    urban -= q.urbanYes / 2;
    rural += q.ruralYes / 2;
    nextTurn();
  }
}

function nextTurn() {
  turn++;
  urban = constrain(urban, 0, 100);
  rural = constrain(rural, 0, 100);
  if (urban <= 10 || rural <= 10 || urban >= 90 || rural >= 90) {
    gameOver = true;
  }
}
