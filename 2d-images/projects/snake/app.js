const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const audioNotification = document.getElementById('audioNotification');


//recebe o nome do arquivo svg, posição do canvas e o contexto 2d do canvas. Faz o fetch do arquivo e armazena em um cache para não precisar baixar novamente. Desenha a imagem do SVG no canvas a partir do contexto
function drawSVG(svgName, x, y, context) {
  if (!drawSVG.cache) {
    drawSVG.cache = {};
  }
  if (!drawSVG.cache[svgName]) {
    drawSVG.cache[svgName] = fetch(svgName)
      .then((response) => response.text())
      .then((svgText) => {
        const svg = new DOMParser().parseFromString(svgText, 'image/svg+xml');
        return svg.documentElement;
      });
  }
  drawSVG.cache[svgName].then((svg) => {
    context.drawImage(svg, x, y);
  });
}

//define os dados do círculo em forma de objeto
const circle = {
  circleSpeed: 10,
  circleX: 50,
  circleY: 50,
  circleRadius: 50
};

//define os dados do score
const score = {
  points: 0,
  x: 10,
  y: 30,
  font: '30px Arial',
  fill: 'black'
};

//define uma area de colisão
const collisionArea = {
  x: 500,
  y: 500,
  width: 200,
  height: 200,
  fill: 'gray',
  collision: false,
  soundPlayed: false
};

// Função para desenhar a área de colisão
function drawArea() {
  context.beginPath();
  context.rect(collisionArea.x, collisionArea.y, collisionArea.width, collisionArea.height);
  context.fillStyle = collisionArea.fill;
  context.fill();
  context.closePath();
}

function adjustCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Redesenhar o conteúdo do canvas após o ajuste
  drawCircle();
}

// Função para desenhar o círculo
function drawCircle() {
  context.beginPath();
  context.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
  context.fillStyle = 'blue';
  context.fill();
  context.closePath();
}

// Função para atualizar a posição do círculo com base nas teclas pressionadas
function updateCirclePosition() {
  if (keys.ArrowUp) {
    circleY -= circleSpeed;
  }
  if (keys.ArrowDown) {
    circleY += circleSpeed;
  }
  if (keys.ArrowLeft) {
    circleX -= circleSpeed;
  }
  if (keys.ArrowRight) {
    circleX += circleSpeed;
  }
  //se o círculo sair da tela, ele volta para o lado oposto
  if (circleX > canvas.width) {
    circleX = 0;
  }
  if (circleX < 0) {
    circleX = canvas.width;
  }
  if (circleY > canvas.height) {
    circleY = 0;
  }
  if (circleY < 0) {
    circleY = canvas.height;
  }
}

const keys = {};

// Capturar teclas pressionadas
window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

// Capturar teclas liberadas
window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});


// Testa a colisão entre o circulo e a área de colisão
function testCollision() {
  if (circleX + circleRadius > collisionArea.x &&
    circleX - circleRadius < collisionArea.x + collisionArea.width &&
    circleY + circleRadius > collisionArea.y &&
    circleY - circleRadius < collisionArea.y + collisionArea.height) {
    collisionArea.fill = 'red';
    collisionArea.collision = true;
    if (!collisionArea.soundPlayed) {
      audioNotification.play();
      collisionArea.soundPlayed = true;
      score.points++;
    }
  } else {
    collisionArea.fill = 'gray';
    collisionArea.collision = false;
    collisionArea.soundPlayed = false;
  }
}

// desenha o score
function drawScore() {
  context.font = score.font;
  context.fillStyle = score.fill;
  context.fillText('Score: ' + score.points, score.x, score.y);
}

// Função de animação usando requestAnimationFrame
function animate() {
  updateCirclePosition();
  testCollision();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
  drawArea();
  drawCircle();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', adjustCanvasSize);
adjustCanvasSize();
// Chamar a função de animação para iniciar
animate();
