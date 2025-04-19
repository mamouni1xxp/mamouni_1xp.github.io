document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById("enter-button");
    const enterSite = document.getElementById("enter-site");
    const content = document.getElementById("content");
    const music = document.getElementById("background-music");
    const video = document.getElementById("background-video");

    enterBtn.addEventListener("click", () => {
        // Play music and video
        music.play();
        video.play();

        // Hide splash and show content
        enterSite.style.display = "none";
        content.style.display = "block";

        // Optional fade-in
        content.style.opacity = 0;
        setTimeout(() => {
            content.style.transition = "opacity 1s ease";
            content.style.opacity = 1;
        }, 10);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("background-music");
  const volumeSlider = document.getElementById("volume-slider");
  const iconImg = document.getElementById("icon-img");
  const volumeControl = document.getElementById("volume-control");

  // Set initial volume
  music.volume = volumeSlider.value;

  // Try autoplay
  music.play().catch((e) => console.warn("Autoplay blocked:", e));

  // Volume slider input
  volumeSlider.addEventListener("input", () => {
    const volume = parseFloat(volumeSlider.value);
    music.muted = false;
    music.volume = volume;
    updateIcon(volume);
  });

  // 
  // volume
  function updateIcon(volume) {
    if (volume === 0) {
      iconImg.src = "https://img.icons8.com/ios-filled/50/ffffff/mute.png";
    } else if (volume < 0.5) {
      iconImg.src = "https://img.icons8.com/ios-filled/50/ffffff/low-volume.png";
    } else {
      iconImg.src = "https://img.icons8.com/ios-filled/50/ffffff/medium-volume.png";
    }
  }
});


///taypin text
const typingData = [ 
  { text: "mamouni_1xp", targetId: "typed-title", delay: 150 },
];

let current = 0;
let charIndex = 0;

function clearTargets() {
  typingData.forEach(item => {
    const target = document.getElementById(item.targetId);
    if (target) target.innerHTML = "";
  });
}

function typeNext() {
  if (current >= typingData.length) {
  
    setTimeout(() => {
      clearTargets();
      current = 0;
      charIndex = 0;
      typeNext();
    }, 1000);
    return;
  }

  const { text, targetId, delay } = typingData[current];
  const target = document.getElementById(targetId);

  if (charIndex < text.length) {
    const span = document.createElement("span");
    span.textContent = text.charAt(charIndex);
    span.style.color = "rgb(255, 10, 10)";  
    span.style.textShadow = "0 0 5px red, 0 0 55px red, 0 0 5px red"; // تأثير النيون
    target.appendChild(span);

    charIndex++;
    setTimeout(typeNext, delay);
  } else {
    current++;
    charIndex = 0;
    setTimeout(typeNext, 500);
  }
}

document.addEventListener("DOMContentLoaded", typeNext)
//cursor 
document.addEventListener("mousemove", function (e) {
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const colors = ["#ff0000", "#00ffff", "#ff00ff", "#ffff00", "#00ff00", "#ffffff"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    star.style.background = color;
    star.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

    const offsetX = Math.floor(Math.random() * 60 - 30) + "px";
    const offsetY = Math.floor(Math.random() * 60 - 30) + "px";
    star.style.setProperty("--x", offsetX);
    star.style.setProperty("--y", offsetY);

    star.style.left = `${e.pageX}px`;
    star.style.top = `${e.pageY}px`;

    document.body.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 800);
  }
});
/////rain ///////
requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
  window.setTimeout(callback, 1000/60);
  };
  })();
  
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  
  var width = 0;
  var height = 0;
  
  window.onresize = function onresize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  window.onresize();
  
  var mouse = {
    X : 0,
    Y : 0
  }
  
  window.onmousemove = function onmousemove(event) {
    mouse.X = event.clientX;
    mouse.Y = event.clientY;
  }
  
  var particules = [];
  var gouttes = [];
  var nombrebase = 5;
  var nombreb = 2;
  
  var controls = {
    rain : 2,
    Object : "Nothing",
    alpha : 1,
    color : 200,
    auto : false,
    opacity : 1,
    saturation : 100,
    lightness : 50,
    back : 100,
    red : 0,
    green : 0,
    blue : 0,
    multi : false,
    speed : 2
  };
  
  function Rain(X, Y, nombre) {
    if (!nombre) {
      nombre = nombreb;
    }
    while (nombre--) {
      particules.push( 
      {
        vitesseX : (Math.random() * 0.25),
        vitesseY : (Math.random() * 9) + 1,
        X : X,
        Y : Y,
        alpha : 1,
        couleur : "hsla(" + controls.color + "," + controls.saturation + "%, " + controls.lightness + "%," + controls.opacity + ")",
      })
    }
  }
  
  function explosion(X, Y, couleur, nombre) {
    if (!nombre) {
      nombre = nombrebase;
    }
    while (nombre--) {
      gouttes.push( 
      {
        vitesseX : (Math.random() * 4-2 ),
        vitesseY : (Math.random() * -4 ),
        X : X,
        Y : Y,
        radius : 0.65 + Math.floor(Math.random() *1.6),
        alpha : 1,
        couleur : couleur
      })
    }
  }
  
  function rendu(ctx) {
  
    if (controls.multi == true) {
      controls.color = Math.random()*360;
    }
  
    ctx.save();
    ctx.fillStyle = 'rgba('+controls.red+','+controls.green+','+controls.blue+',' + controls.alpha + ')';
    ctx.fillRect(0, 0, width, height);
    
    var particuleslocales = particules;
    var goutteslocales = gouttes;
    var tau = Math.PI * 2;
  
    for (var i = 0, particulesactives; particulesactives = particuleslocales[i]; i++) {
        
      ctx.globalAlpha = particulesactives.alpha;
      ctx.fillStyle = particulesactives.couleur;
      ctx.fillRect(particulesactives.X, particulesactives.Y, particulesactives.vitesseY/4, particulesactives.vitesseY);
    }
  
    for (var i = 0, gouttesactives; gouttesactives = goutteslocales[i]; i++) {
        
      ctx.globalAlpha = gouttesactives.alpha;
      ctx.fillStyle = gouttesactives.couleur;
      
      ctx.beginPath();
      ctx.arc(gouttesactives.X, gouttesactives.Y, gouttesactives.radius, 0, tau);
      ctx.fill();
    }
      ctx.strokeStyle = "white";
      ctx.lineWidth   = 2;
  
      if (controls.Object == "Umbrella") {
        ctx.beginPath();
        ctx.arc(mouse.X, mouse.Y+10, 138, 1 * Math.PI, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "hsla(0,100%,100%,1)";
        ctx.stroke();
      }
      if (controls.Object == "Cup") {
        ctx.beginPath();
        ctx.arc(mouse.X, mouse.Y+10, 143, 1 * Math.PI, 2 * Math.PI, true);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "hsla(0,100%,100%,1)";
        ctx.stroke();
      }
      if (controls.Object == "Circle") {
        ctx.beginPath();
        ctx.arc(mouse.X, mouse.Y+10, 138, 1 * Math.PI, 3 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "hsla(0,100%,100%,1)";
        ctx.stroke();
      }
    ctx.restore();
    
    if (controls.auto) {
      controls.color += controls.speed;
      if (controls.color >=360) {
        controls.color = 0;
      }
    }
  }
  
  function update() {
  
    var particuleslocales = particules;
    var goutteslocales = gouttes;
    
    for (var i = 0, particulesactives; particulesactives = particuleslocales[i]; i++) {
      particulesactives.X += particulesactives.vitesseX;
      particulesactives.Y += particulesactives.vitesseY+5;
      if (particulesactives.Y > height-15) {
        particuleslocales.splice(i--, 1);
        explosion(particulesactives.X, particulesactives.Y, particulesactives.couleur);
      }
      var umbrella = (particulesactives.X - mouse.X)*(particulesactives.X - mouse.X) + (particulesactives.Y - mouse.Y)*(particulesactives.Y - mouse.Y);
        if (controls.Object == "Umbrella") {
          if (umbrella < 20000 && umbrella > 10000 && particulesactives.Y < mouse.Y) {
            explosion(particulesactives.X, particulesactives.Y, particulesactives.couleur);
            particuleslocales.splice(i--, 1);
          }
        }
        if (controls.Object == "Cup") {
          if (umbrella > 20000 && umbrella < 30000 && particulesactives.X+138 > mouse.X && particulesactives.X-138 < mouse.X && particulesactives.Y > mouse.Y) {
            explosion(particulesactives.X, particulesactives.Y, particulesactives.couleur);
            particuleslocales.splice(i--, 1);
          }
        }
        if (controls.Object == "Circle") {
          if (umbrella < 20000) {
            explosion(particulesactives.X, particulesactives.Y, particulesactives.couleur);
            particuleslocales.splice(i--, 1);
          }
        }
    }
  
    for (var i = 0, gouttesactives; gouttesactives = goutteslocales[i]; i++) {
      gouttesactives.X += gouttesactives.vitesseX;
      gouttesactives.Y += gouttesactives.vitesseY;
      gouttesactives.radius -= 0.075;
      if (gouttesactives.alpha > 0) {
        gouttesactives.alpha -= 0.005;
      } else {
        gouttesactives.alpha = 0;
      }
      if (gouttesactives.radius < 0) {
        goutteslocales.splice(i--, 1);
      }
    }
  
    var i = controls.rain;
    while (i--) {
      Rain(Math.floor((Math.random()*width)), -15);
    }
  }
  
  function Screenshot() {
    window.open(canvas.toDataURL());
  }
  
  window.onload = function() {
    var gui = new dat.GUI();
    gui.add(controls, 'rain', 1, 10).name("Rain intensity").step(1);
    gui.add(controls, 'alpha', 0.1, 1).name("Alpha").step(0.1);
    gui.add(controls, 'color', 0, 360).name("Color").step(1).listen();
    gui.add(controls, 'auto').name("Automatic color");
    gui.add(controls, 'speed', 1, 10).name("Speed color").step(1);
    gui.add(controls, 'multi').name("Multicolor");
    gui.add(controls, 'saturation', 0, 100).name("Saturation").step(1);
    gui.add(controls, 'lightness', 0, 100).name("Lightness").step(1);
    gui.add(controls, 'opacity', 0.0, 1).name("Opacity").step(0.1);
    gui.add(controls, 'Object', ['Nothing','Circle','Umbrella', 'Cup']);
    gui.add(window, 'Screenshot');
    var Background = gui.addFolder('Background color');
    Background.add(controls, 'red', 0, 255).step(1);
    Background.add(controls, 'green', 0, 255).step(1);
    Background.add(controls, 'blue', 0, 255).step(1);
  };
  
  (function boucle() {
    requestAnimFrame(boucle);
    update();
    rendu(ctx);
  })();