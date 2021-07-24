const Common     = require("./lib/common.js")
const Colormap   = require("./lib/colormap.js")
const Blackboard = require("./blackboard.js")

const colormap   = new Colormap('black')
colormap.setBlackRate(4.0)
const blackboard = new Blackboard()

const wall = document.getElementById("wall");

const getTime = typeof performance === 'function' ? performance.now : Date.now;
let lastUpdate = getTime();

function animate() {
  const now = getTime();
  const delta = (now - lastUpdate)

  if ( delta > Common.random(1000, 1200) ) {
    Common.time ( () => {
      blackboard.draw(wall, colormap)
    })
    lastUpdate = now;
  }

  requestAnimationFrame(animate);
}

animate();

//window.api.on((text) => {
//
//}, 'top')

window.api.on((data) => {
  console.log(data)
}, 'music')


//looks for key presses and logs them
document.body.addEventListener("keydown", function(e) {
  console.log(`key: ${e.key}`);

  switch(true) {
    case e.key == '0':
      colormap.set('black')
      break
    case e.key == '1':
      colormap.set('white')
      break
    case e.key == '2':
      colormap.set('blue-black')
      break
    case e.key == '3':
      colormap.set('aqua-black')
      break
    case e.key == '4':
      colormap.set('green-black')
      break
    case e.key == '5':
      colormap.set('yellow-black')
      break
    case e.key == '6':
      colormap.set('red-black')
      break
    case e.key == '7':
      colormap.set('rose-black')
      break
    case e.key == '8':
      colormap.set('purple-black')
      break
    case e.key == 'm':
      colormap.set('mix-black')
      break
    case e.key == 'p':
      window.api.send('竜とそばかすの姫_歌よ_Belle_中村佳穂.mp3', 'music')
      break

    case e.key == "b":
      {
        let b = Math.cbrt(colormap.getBlackRate())
        b += 0.1
        b = b ** 3
        colormap.setBlackRate(b)
      }
      break

    case e.key == "w":
      {

        let b = Math.cbrt(colormap.getBlackRate())
        b -= 0.1
        b = b >= 0 ? b ** 3 : 0
        colormap.setBlackRate(b)
      }
      break

    default:
      break
  }
});

document.body.addEventListener("keyup", function(e) {});
