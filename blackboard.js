const Common     = require("./lib/common.js")

class Blackboard {
  constructor() {
    this.containerId = 'blackboard' 
    this.lotteryBox =["0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]

    //this.lotteryBox = [
    //  'あ', 'い', 'う', 'え', 'お', 
    //  'か', 'が', 'き', 'ぎ', 'く', 'ぐ', 'け', 'げ', 'こ', 'ご', 
    //  'さ', 'ざ', 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ', 'ぞ', 
    //  'た', 'だ', 'ち', 'ぢ', 'つ', 'づ', 'て', 'で', 'と', 'ど', 
    //  'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ば', 'ぱ', 'ひ', 'び', 
    //  'ぴ', 'ふ', 'ぶ', 'ぷ', 'へ', 'べ', 'ぺ', 'ほ', 'ぼ', 'ぽ', 
    //  'ま', 'み', 'む', 'め', 'も', 
    //  'や', 'ゆ', 'よ', 
    //  'ら', 'り', 'る', 'れ', 'ろ', 
    //  'わ', 'を', 'ん'
    //]
  }

  style() {
    const fontSize      = '10px'
    const lineHeight    = '12px'
    const letterSpacing = '3px'
    const fontFamily    = 'Monaco, "Ricty Discord", monospace, 游明朝,"Yu Mincho",YuMincho,"Hiragino Mincho ProN"'

    let str = ''
    str += '<style> *             { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } </style>'
    str += '<style> body          { cursor: none; } </style>'
    str += '<style> #blackboard   { background-color: black; } </style>'
    str += `<style> .default-text { font-size: ${fontSize}; line-height: ${lineHeight}; letter-spacing: ${letterSpacing}; font-family: ${fontFamily};}</style>`
    str += `<style> .test-text    { position: absolute; visibility: hidden; height: auto; width: auto; white-space: nowrap; } </style>`

    return str
  }

  container() {
    const str = `${this.style()} <div id="${this.containerId}" class= "default-text"> </div>`
    return str
  }

  innerHTML() {
    const h = document.getElementById(this.containerId);
    return h
  }

  draw(parent, colormap) {
    parent.textContent = '' // 空っぽにする

    parent.insertAdjacentHTML('beforeend', this.container())
    const container = this.innerHTML()

    let [charWidth, charHeight] = this.getCharSize(container)

    this.numX  = window.innerWidth  / charWidth  -1
    this.numY  = window.innerHeight / charHeight -1
    let str = ''
    const lotteryBox = this.lotteryBox
    for (let j = 0; j < this.numY; j++) {
      //let line  = text[j]
      //if( typeof line === 'undefined') continue

      str += `<p class="line">`
      for (let i = 0; i < this.numX; i++) {
        const color = colormap.choose()

        //let char  = line.charAt(i)
        //switch( char ) {
        //  case ' ': char = "&nbsp" ; break
        //  case '-': char = "&#8209"; break
        //  case  '': char = "&nbsp" ; break
        //}
        
        const char = Common.pickup(lotteryBox)

        str += `<span class="char" style="color: ${color};">${char}</span>`
      }
      str += `</p>`
    }
    container.insertAdjacentHTML('beforeend', str)
  }

  redraw(colormap) {
    const lotteryBox = this.lotteryBox
    const lines = document.querySelectorAll('.line')

    for (let j = 0; j < lines.length; j++) {
      const line  = lines[j]
      const chars = line.childNodes 

      for (let i = 0; i < chars.length; i++) {
        const char = chars[i]
        const f    = colormap.choose()
        const c    = Common.pickup(lotteryBox)

        char.innerHTML  = c
        char.style.fill = f
      }
    }
  }

  getCharSize(parent, classname = "default-text test-text") {
    const id = 'to-get-char-size'

    if ( this.lotteryBox[0].match(/[a-zA-Z0-9]/) ) {
      parent.insertAdjacentHTML('beforeend', `<p id="${id}" class="${classname}">t</p>`)
    } else  {
      parent.insertAdjacentHTML('beforeend', `<p id="${id}" class="${classname}">あ</p>`)
    }
    const elm = document.getElementById(id)

    const height = elm.clientHeight
    const width  = elm.clientWidth

    elm.remove()

    console.log(`Font Size: ${width} ${height}`)
    return [width, height]
  }
}

module.exports = Blackboard
