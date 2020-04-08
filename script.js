function snakey() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  document.addEventListener('keydown', keyPress)
  setInterval(game, 1000 / 10)

  const tileSize = 10
  stageSize = 50 * tileSize

  const stage = {
    color: '#515151',
    x: 0,
    y: 0,
    size: stageSize,
    width: stageSize,
    height: stageSize,
  }

  const player = {
    color: '#EFEFEF',
    x: 250,
    y: 250,
    height: tileSize,
    width: tileSize,
  }

  const food = {
    color: '#e6703e',
    x: foodPosition(),
    y: foodPosition(),
    height: tileSize,
    width: tileSize,
  }

  const vel = 1 * tileSize
  let velX = 0
  let velY = 0

  let defaultTailSize = 4
  let tailSize = defaultTailSize
  let snakeTrail = []

  function keyPress(event) {
    switch (event.keyCode) {
      case 37: // left
        if (velX === vel) {
          velX = vel
          velY = 0
          break
        } else {
          velX = -vel
          velY = 0
          break
        }
      case 38: // up
        if (velY === vel) {
          velX = 0
          velY = vel
          break
        } else {
          velX = 0
          velY = -vel
          break
        }
      case 39: // right
        if (velX === -vel) {
          velX = -vel
          velY = 0
          break
        } else {
          velX = vel
          velY = 0
          break
        }
      case 40: // down
        if (velY === -vel) {
          velX = 0
          velY = -vel
          break
        } else {
          velX = 0
          velY = vel
          break
        }
      default:
        break
    }
  }

  function draw(color, x, y, width, height) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
    ctx.strokeRect(x, y, width, height)
    ctx.strokeStyle = stage.color
    ctx.lineWidth = 1
  }

  function move() {
    if (player.x >= stage.width) {
      player.x = 0
    } else if (player.x < 0) {
      player.x = stage.width
    } else if (player.y >= stage.height) {
      player.y = 0
    } else if (player.y < 0) {
      player.y = stage.height
    }
    // SFX
    // if (velX != 0 || velY != 0) {
    //   playAudio(
    //     'audio-lib/movement/footsteps/sfx_movement_footsteps5.wav',
    //     0.05
    //   )
    // }
    player.x = player.x + velX
    player.y = player.y + velY
  }

  function foodPosition() {
    return Math.floor((Math.random() * stage.size) / tileSize) * tileSize
  }

  function drawFood() {
    foodPosition()
    draw(food.color, food.x, food.y, food.width, food.height)
  }

  function drawSnake() {
    for (let index = 0; index < snakeTrail.length; index++) {
      draw(
        player.color,
        snakeTrail[index].x,
        snakeTrail[index].y,
        player.width,
        player.height
      )
      if (
        snakeTrail[index].x === player.x &&
        snakeTrail[index].y === player.y
      ) {
        tailSize = defaultTailSize

        // playAudio(
        //   'audio-lib/general-sounds/Negative Sounds/sfx_sounds_damage1.wav',
        //   0.1
        // )
      }
    }
    snakeTrail.push({x: player.x, y: player.y})
    while (snakeTrail.length > tailSize) {
      snakeTrail.shift()
    }
  }

  function playAudio(path, volume, loop) {
    var audio = new Audio(path)
    audio.volume = volume
    if (loop) {
      audio.loop = loop
    }
    audio.play()
  }

  // SFX
  if (player.x === 250 && player.y === 250) {
    playAudio(
      'audio-lib/theme-music/2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios.com.mp3',
      0.1,
      true
    )
  }

  function game() {
    // STAGE
    draw(stage.color, stage.x, stage.y, stage.width, stage.height)

    // PLAYER
    drawSnake()

    // FOOD
    drawFood()
    move()
    if (player.x === food.x && player.y === food.y) {
      playAudio('audio-lib/general-sounds/Coins/sfx_coin_double7.wav', 0.2)
      food.x = foodPosition()
      food.y = foodPosition()
      tailSize++
      console.log(tailSize)
    }
  }

  game()
  //
}
