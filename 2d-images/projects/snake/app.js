const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const audioNotification = document.getElementById('audioNotification');
const keys = {};
const svgCache = {};

//recebe o nome do arquivo svg, posição do canvas e o contexto 2d do canvas. Faz o fetch do arquivo e armazena em um cache para não precisar baixar novamente. Desenha a imagem do SVG no canvas a partir do contexto
function drawSVG(svgName, x, y, context) {
  if (!svgCache[svgName]) {
    svgCache[svgName] = fetch(svgName)
      .then((response) => response.text())
      .then((svgText) => {
        const svg = new DOMParser().parseFromString(svgText, 'image/svg+xml');
        return svg.documentElement;
      });
  }
  svgCache[svgName].then((svg) => {
    context.drawImage(svg, x, y);
  });
}

//define os dados do círculo em forma de objeto
const circle = {
  speed: 10,
  x: 50,
  y: 50,
  radius: 50,
  draw : function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  },
  //verifica se o círculo está dentro da área de colisão
  testCollision: function (collisionArea) {
    if (this.x + this.radius > collisionArea.x &&
      this.x - this.radius < collisionArea.x + collisionArea.width &&
      this.y + this.radius > collisionArea.y &&
      this.y - this.radius < collisionArea.y + collisionArea.height) {
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
};



//define os dados do score
const score = {
  points: 0,
  x: 10,
  y: 30,
  font: '30px Arial',
  fill: 'black',
  draw: function (ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.fill;
    ctx.fillText(`Pontos: ${this.points}`, this.x, this.y);
  }  
};

//define uma area de colisão
const collisionArea = {
  x: 500,
  y: 500,
  width: 200,
  height: 200,
  fill: 'gray',
  collision: false,
  soundPlayed: false,
  draw: function (ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.closePath();
  }
};

// Função para desenhar a área de colisão

function adjustCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


// Função para atualizar a posição do círculo com base nas teclas pressionadas
function updateCirclePosition(circle, canvas, keys) {
  if (keys.ArrowUp) {
    circle.y -= circle.speed;
  }
  if (keys.ArrowDown) {
    circle.y += circle.speed;
  }
  if (keys.ArrowLeft) {
    circle.x -= circle.speed;
  }
  if (keys.ArrowRight) {
    circle.x += circle.speed;
  }

  // Limitar a posição do círculo para não sair do canvas
  if (circle.x - circle.radius < 0) {
    circle.x = circle.radius;
  }
  if (circle.x + circle.radius > canvas.width) {
    circle.x = canvas.width - circle.radius;
  }
  if (circle.y - circle.radius < 0) {
    circle.y = circle.radius;
  }
  if (circle.y + circle.radius > canvas.height) {
    circle.y = canvas.height - circle.radius;
  } 
}



// Capturar teclas pressionadas
window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

// Capturar teclas liberadas
window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});


//armazena todos os objetos a serem desenhados
const drawables = [circle, score, collisionArea];


// Função de animação usando requestAnimationFrame
function animate() {
  updateCirclePosition(circle, canvas, keys);
  testCollision();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawables.forEach((drawable) => {
    drawable.draw(context);
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', adjustCanvasSize);
adjustCanvasSize();
// Chamar a função de animação para iniciar
animate();
