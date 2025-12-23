let spriteSheetStop, spriteSheetWalk, spriteSheetJump, spriteSheetAttack;
let framesStop = [];
let framesWalk = [];
let framesJump = [];
let framesAttack = [];

let spriteSheetStop2, spriteSheetWalk2, spriteSheetJump2, spriteSheetAttack2, spriteSheetFly2, spriteSheetDown2;
let framesStop2 = [];
let framesWalk2 = [];
let framesJump2 = [];
let framesAttack2 = [];
let framesFly2 = [];
let framesDown2 = [];

const NUM_FRAMES_STOP = 3;
const FRAME_DURATION_STOP = 200;
const NUM_FRAMES_WALK = 6;
const FRAME_DURATION_WALK = 100;
const NUM_FRAMES_JUMP = 3;
const FRAME_DURATION_JUMP = 300;
const NUM_FRAMES_ATTACK = 7;
const FRAME_DURATION_ATTACK = 80;

const NUM_FRAMES_STOP2 = 10;
const FRAME_DURATION_STOP2 = 100;
const NUM_FRAMES_WALK2 = 6;
const FRAME_DURATION_WALK2 = 100;
const NUM_FRAMES_JUMP2 = 5;
const FRAME_DURATION_JUMP2 = 200;
const NUM_FRAMES_ATTACK2 = 10;
const FRAME_DURATION_ATTACK2 = 100;
const NUM_FRAMES_FLY2 = 3;
const FRAME_DURATION_FLY2 = 150;
const NUM_FRAMES_DOWN2 = 4;
const FRAME_DURATION_DOWN2 = 100;

const PROXIMITY_DISTANCE = 150;
const CHARACTER_SCALE = 1.8;
const CHARACTER2_SCALE = 1.5;
const MOVE_SPEED = 3;
const JUMP_HEIGHT = 80;
const JUMP_HEIGHT2 = 80;
const HURT_DELAY = 400;

let characterX = 0;
let characterY = 0;
let characterDirection = 1;
let isWalking = false;
let isJumping = false;
let isAttacking = false;
let upKeyPressed = false;
let currentFrameStop = 0;
let currentFrameWalk = 0;
let currentFrameJump = 0;
let currentFrameAttack = 0;
let lastUpdateStop = 0;
let lastUpdateWalk = 0;
let lastUpdateJump = 0;
let lastUpdateAttack = 0;

let character2X = 200;
let character2Y = 0;
let character2Direction = -1;
let isWalking2 = false;
let isJumping2 = false;
let isAttacking2 = false;
let isFlying2 = false;
let isHurt2 = false;
let isPendingHurt = false;
let hurtTriggerTime = 0;
let currentFrameStop2 = 0;
let currentFrameWalk2 = 0;
let currentFrameJump2 = 0;
let currentFrameAttack2 = 0;
let currentFrameFly2 = 0;
let currentFrameDown2 = 0;
let lastUpdateStop2 = 0;
let lastUpdateWalk2 = 0;
let lastUpdateJump2 = 0;
let lastUpdateAttack2 = 0;
let lastUpdateFly2 = 0;
let lastUpdateDown2 = 0;

let correctCount = 0;
let isDefeated = false;

let nameInput;
let char2Dialog = "";
let currentQuestionText = "";
let currentAnswer = "";
let currentCorrectFeedback = "";
let currentIncorrectFeedback = "";
let currentHint = "";
let hasGreeted = false;
let retryButton;
let nextButton;
let questionTable;

let bgImg;

function preload() {
  questionTable = loadTable('questions.csv', 'csv', 'header');
  bgImg = loadImage('background/moon/0.png');
  spriteSheetStop = loadImage('角色1/stop/stop all.png');
  spriteSheetWalk = loadImage('角色1/walk/walk all.png');
  spriteSheetJump = loadImage('角色1/jump/jump all.png');
  spriteSheetAttack = loadImage('角色1/attack/attack all.png');
  spriteSheetStop2 = loadImage('角色2/stop/stop all.png');
  spriteSheetWalk2 = loadImage('角色2/walk/walk all.png');
  spriteSheetJump2 = loadImage('角色2/jump/jump all.png');
  spriteSheetAttack2 = loadImage('角色2/attack/attack all.png');
  spriteSheetFly2 = loadImage('角色2/fly/fly all.png');
  spriteSheetDown2 = loadImage('角色2/down/down all.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  
  lastUpdateStop = millis();
  lastUpdateWalk = millis();
  lastUpdateStop2 = millis();
  lastUpdateDown2 = millis();

  if (spriteSheetStop) {
    const frameW = spriteSheetStop.width / NUM_FRAMES_STOP;
    const frameH = spriteSheetStop.height;
    for (let i = 0; i < NUM_FRAMES_STOP; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesStop[i] = spriteSheetStop.get(sx, 0, sw, frameH);
    }
  }

  if (spriteSheetWalk) {
    const frameW = spriteSheetWalk.width / NUM_FRAMES_WALK;
    const frameH = spriteSheetWalk.height;
    for (let i = 0; i < NUM_FRAMES_WALK; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesWalk[i] = spriteSheetWalk.get(sx, 0, sw, frameH);
    }
  }

  if (spriteSheetJump) {
    const frameW = spriteSheetJump.width / NUM_FRAMES_JUMP;
    const frameH = spriteSheetJump.height;
    for (let i = 0; i < NUM_FRAMES_JUMP; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesJump[i] = spriteSheetJump.get(sx, 0, sw, frameH);
    }
  }

  if (spriteSheetAttack) {
    const frameW = spriteSheetAttack.width / NUM_FRAMES_ATTACK;
    const frameH = spriteSheetAttack.height;
    for (let i = 0; i < NUM_FRAMES_ATTACK; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesAttack[i] = spriteSheetAttack.get(sx, 0, sw, frameH);
    }
  }

  if (spriteSheetStop2) {
    const frameW = spriteSheetStop2.width / NUM_FRAMES_STOP2;
    const frameH = spriteSheetStop2.height;
    for (let i = 0; i < NUM_FRAMES_STOP2; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesStop2[i] = spriteSheetStop2.get(sx, 0, sw, frameH);
    }
  }

  if (spriteSheetWalk2) {
    const frameW = spriteSheetWalk2.width / NUM_FRAMES_WALK2;
    const frameH = spriteSheetWalk2.height;
    for (let i = 0; i < NUM_FRAMES_WALK2; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesWalk2[i] = spriteSheetWalk2.get(sx, 0, sw, frameH);
    }
  }

  if (spriteSheetJump2) {
    const frameW = spriteSheetJump2.width / NUM_FRAMES_JUMP2;
    const frameH = spriteSheetJump2.height;
    for (let i = 0; i < NUM_FRAMES_JUMP2; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesJump2[i] = spriteSheetJump2.get(sx, 0, sw, frameH);
    }
  }

  if (spriteSheetAttack2) {
    const frameW = spriteSheetAttack2.width / NUM_FRAMES_ATTACK2;
    const frameH = spriteSheetAttack2.height;
    for (let i = 0; i < NUM_FRAMES_ATTACK2; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesAttack2[i] = spriteSheetAttack2.get(sx, 0, sw, frameH);
    }
  }

  if (spriteSheetFly2) {
    const frameW = spriteSheetFly2.width / NUM_FRAMES_FLY2;
    const frameH = spriteSheetFly2.height;
    for (let i = 0; i < NUM_FRAMES_FLY2; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesFly2[i] = spriteSheetFly2.get(sx, 0, sw, frameH);
    }
  }

  if (spriteSheetDown2) {
    const frameW = spriteSheetDown2.width / NUM_FRAMES_DOWN2;
    const frameH = spriteSheetDown2.height;
    for (let i = 0; i < NUM_FRAMES_DOWN2; i++) {
      const sx = Math.round(i * frameW);
      const sw = Math.round(frameW);
      framesDown2[i] = spriteSheetDown2.get(sx, 0, sw, frameH);
    }
  }

  nameInput = createInput('');
  nameInput.position(-1000, -1000);
  nameInput.size(150);
  nameInput.style('font-size', '16px');
  nameInput.style('border', 'none');
  nameInput.style('background', 'transparent');
  nameInput.style('outline', 'none');
  nameInput.style('border-radius', '5px');
  nameInput.style('padding', '5px');
  nameInput.hide();
  nameInput.changed(submitName);
  
  retryButton = createButton('再作答一次');
  retryButton.hide();
  retryButton.mousePressed(retryQuestion);

  nextButton = createButton('下一題');
  nextButton.hide();
  nextButton.mousePressed(nextQuestion);

  getNewQuestion();
}

function keyPressed() {
  if (keyCode === 32 && !isAttacking) {
    isAttacking = true;
    lastUpdateAttack = millis();
    currentFrameAttack = 0;
    return false;
  }
  if (keyCode === 39) {
    isWalking = true;
    characterDirection = 1;
    lastUpdateWalk = millis();
    currentFrameWalk = 0;
    return false;
  }
  if (keyCode === 37) {
    isWalking = true;
    characterDirection = -1;
    lastUpdateWalk = millis();
    currentFrameWalk = 0;
    return false;
  }
  if (keyCode === 38 && !upKeyPressed) {
    upKeyPressed = true;
    isJumping = true;
    lastUpdateJump = millis();
    currentFrameJump = 0;
    return false;
  }

  if (keyCode === 68) {
    isWalking2 = true;
    character2Direction = 1;
    lastUpdateWalk2 = millis();
    currentFrameWalk2 = 0;
    return false;
  }
  if (keyCode === 65) {
    isWalking2 = true;
    character2Direction = -1;
    lastUpdateWalk2 = millis();
    currentFrameWalk2 = 0;
    return false;
  }
  if (keyCode === 87 && !isJumping2) {
    isJumping2 = true;
    isWalking2 = false;
    lastUpdateJump2 = millis();
    currentFrameJump2 = 0;
    character2Y = 0;
    return false;
  }
  if (keyCode === 81 && !isAttacking2) {
    isAttacking2 = true;
    isWalking2 = false;
    lastUpdateAttack2 = millis();
    currentFrameAttack2 = 0;
    return false;
  }
}

function keyReleased() {
  if (keyCode === 39 || keyCode === 37) {
    isWalking = false;
    currentFrameStop = 0;
    lastUpdateStop = millis();
    return false;
  }
  if (keyCode === 38) {
    upKeyPressed = false;
    return false;
  }
  if (keyCode === 68 || keyCode === 65) {
    isWalking2 = false;
    currentFrameStop2 = 0;
    lastUpdateStop2 = millis();
    return false;
  }
}

function draw() {
  background(0);

  if (bgImg) {
    // 讓背景高度適應視窗高度，並保持比例計算寬度
    // 放大 1.3 倍
    let bgScale = 1.3;
    let bgH = height * bgScale;
    let bgW = bgImg.width * (bgH / bgImg.height);
    
    let startIndex = floor((characterX - width/2) / bgW) - 1;
    let endIndex = ceil((characterX + width/2) / bgW) + 1;
    
    for (let i = startIndex; i <= endIndex; i++) {
      let x = width/2 + i * bgW - characterX;
      let y = 0;
      image(bgImg, x, y, bgW, bgH);
    }
  }

  const now = millis();
  
  updateCharacter1Animation(now);
  updateCharacter2Animation(now);
  
  const distance = abs(characterX - character2X);
  
  if (isAttacking && distance < PROXIMITY_DISTANCE && !isHurt2 && !isPendingHurt) {
    isPendingHurt = true;
    hurtTriggerTime = millis();
  }

  if (isPendingHurt) {
    if (distance >= PROXIMITY_DISTANCE) {
      isPendingHurt = false;
    } else if (millis() - hurtTriggerTime > HURT_DELAY) {
      isHurt2 = true;
      isPendingHurt = false;
      currentFrameDown2 = 0;
      lastUpdateDown2 = millis();
    }
  }

  if (isHurt2 && distance >= PROXIMITY_DISTANCE) {
    isHurt2 = false;
  }

  if (!isDefeated && !isHurt2 && !isPendingHurt && distance < PROXIMITY_DISTANCE && !isAttacking2 && !isJumping2 && !isWalking2) {
    isFlying2 = true;
  } else {
    isFlying2 = false;
    if (hasGreeted || nameInput.style('display') !== 'none') {
      hasGreeted = false;
      char2Dialog = currentQuestionText;
      nameInput.hide();
      retryButton.hide();
      nextButton.hide();
      nameInput.value('');
    }
  }
  
  if (!isDefeated) {
    if (characterX < character2X) {
      character2Direction = -1;
    } else {
      character2Direction = 1;
    }
  }
  
  drawCharacter2();
  drawCharacter1();
}

function updateCharacter1Animation(now) {
  if (isAttacking && framesAttack.length > 0) {
    const elapsed = now - lastUpdateAttack;
    if (elapsed >= FRAME_DURATION_ATTACK) {
      const steps = floor(elapsed / FRAME_DURATION_ATTACK);
      currentFrameAttack = (currentFrameAttack + steps) % framesAttack.length;
      lastUpdateAttack += steps * FRAME_DURATION_ATTACK;
    }
    if (currentFrameAttack >= NUM_FRAMES_ATTACK - 1) {
      isAttacking = false;
      currentFrameAttack = 0;
    }
  } else if (isJumping && framesJump.length > 0) {
    const elapsed = now - lastUpdateJump;
    if (elapsed >= FRAME_DURATION_JUMP) {
      const steps = floor(elapsed / FRAME_DURATION_JUMP);
      currentFrameJump = (currentFrameJump + steps) % framesJump.length;
      lastUpdateJump += steps * FRAME_DURATION_JUMP;
    }
    const progress = currentFrameJump / NUM_FRAMES_JUMP;
    characterY = -JUMP_HEIGHT * sin(progress * PI);
    if (currentFrameJump >= NUM_FRAMES_JUMP - 1) {
      isJumping = false;
      currentFrameJump = 0;
      characterY = 0;
    }
  } else if (isWalking && framesWalk.length > 0) {
    const elapsed = now - lastUpdateWalk;
    if (elapsed >= FRAME_DURATION_WALK) {
      const steps = floor(elapsed / FRAME_DURATION_WALK);
      currentFrameWalk = (currentFrameWalk + steps) % framesWalk.length;
      lastUpdateWalk += steps * FRAME_DURATION_WALK;
    }
    characterX += MOVE_SPEED * CHARACTER_SCALE * characterDirection;
    characterY = 0;
  } else if (framesStop.length > 0) {
    const elapsed = now - lastUpdateStop;
    if (elapsed >= FRAME_DURATION_STOP) {
      const steps = floor(elapsed / FRAME_DURATION_STOP);
      currentFrameStop = (currentFrameStop + steps) % framesStop.length;
      lastUpdateStop += steps * FRAME_DURATION_STOP;
    }
    characterY = 0;
  }
}

function updateCharacter2Animation(now) {
  if (isDefeated && framesDown2.length > 0) {
    const elapsed = now - lastUpdateDown2;
    if (elapsed >= FRAME_DURATION_DOWN2) {
      const steps = floor(elapsed / FRAME_DURATION_DOWN2);
      lastUpdateDown2 += steps * FRAME_DURATION_DOWN2;
      if (currentFrameDown2 < framesDown2.length - 1) {
        currentFrameDown2 = min(currentFrameDown2 + steps, framesDown2.length - 1);
      }
    }
    // 倒下後不再執行其他動畫
    return;
  } else if (isHurt2 && framesDown2.length > 0) {
    const elapsed = now - lastUpdateDown2;
    if (elapsed >= FRAME_DURATION_DOWN2) {
      const steps = floor(elapsed / FRAME_DURATION_DOWN2);
      lastUpdateDown2 += steps * FRAME_DURATION_DOWN2;
      if (currentFrameDown2 < framesDown2.length - 1) {
        currentFrameDown2 = min(currentFrameDown2 + steps, framesDown2.length - 1);
      }
    }
  } else if (isFlying2 && framesFly2.length > 0) {
    const elapsed = now - lastUpdateFly2;
    if (elapsed >= FRAME_DURATION_FLY2) {
      const steps = floor(elapsed / FRAME_DURATION_FLY2);
      currentFrameFly2 = (currentFrameFly2 + steps) % framesFly2.length;
      lastUpdateFly2 += steps * FRAME_DURATION_FLY2;
    }
  } else if (isAttacking2 && framesAttack2.length > 0) {
    const elapsed = now - lastUpdateAttack2;
    if (elapsed >= FRAME_DURATION_ATTACK2) {
      const steps = floor(elapsed / FRAME_DURATION_ATTACK2);
      currentFrameAttack2 = currentFrameAttack2 + steps;
      lastUpdateAttack2 += steps * FRAME_DURATION_ATTACK2;
    }
    if (currentFrameAttack2 >= NUM_FRAMES_ATTACK2 - 1) {
      isAttacking2 = false;
      currentFrameAttack2 = 0;
      lastUpdateStop2 = now;
    }
  } else if (isWalking2 && framesWalk2.length > 0) {
    const elapsed = now - lastUpdateWalk2;
    if (elapsed >= FRAME_DURATION_WALK2) {
      const steps = floor(elapsed / FRAME_DURATION_WALK2);
      currentFrameWalk2 = (currentFrameWalk2 + steps) % framesWalk2.length;
      lastUpdateWalk2 += steps * FRAME_DURATION_WALK2;
    }
    character2X += MOVE_SPEED * CHARACTER2_SCALE * character2Direction;
  } else if (isJumping2 && framesJump2.length > 0) {
    const elapsed = now - lastUpdateJump2;
    if (elapsed >= FRAME_DURATION_JUMP2) {
      const steps = floor(elapsed / FRAME_DURATION_JUMP2);
      currentFrameJump2 = currentFrameJump2 + steps;
      lastUpdateJump2 += steps * FRAME_DURATION_JUMP2;
    }
    const progress = currentFrameJump2 / NUM_FRAMES_JUMP2;
    character2Y = -JUMP_HEIGHT2 * sin(min(progress, 1) * PI);
    if (currentFrameJump2 >= NUM_FRAMES_JUMP2 - 1) {
      isJumping2 = false;
      currentFrameJump2 = 0;
      character2Y = 0;
      lastUpdateStop2 = now;
    }
  } else if (framesStop2.length > 0) {
    const elapsed = now - lastUpdateStop2;
    if (elapsed >= FRAME_DURATION_STOP2) {
      const steps = floor(elapsed / FRAME_DURATION_STOP2);
      currentFrameStop2 = (currentFrameStop2 + steps) % framesStop2.length;
      lastUpdateStop2 += steps * FRAME_DURATION_STOP2;
    }
  }
}

function drawCharacter1() {
  let frames, currentFrame;
  
  if (isAttacking && framesAttack.length > 0) {
    frames = framesAttack;
    currentFrame = currentFrameAttack;
  } else if (isJumping && framesJump.length > 0) {
    frames = framesJump;
    currentFrame = currentFrameJump;
  } else if (isWalking && framesWalk.length > 0) {
    frames = framesWalk;
    currentFrame = currentFrameWalk;
  } else if (framesStop.length > 0) {
    frames = framesStop;
    currentFrame = currentFrameStop;
  }
  
  if (frames && frames.length > 0) {
    const img = frames[currentFrame % frames.length];
    if (img) {
      const dw = img.width * CHARACTER_SCALE;
      const dh = img.height * CHARACTER_SCALE;
      
      push();
      translate(width / 2, height / 2 + 275 + characterY);
      scale(characterDirection, 1);
      image(img, -dw / 2, -dh / 2, dw, dh);
      pop();
    }
  }
}

function drawCharacter2() {
  let img2;
  
  if (isDefeated && framesDown2.length > 0) {
    img2 = framesDown2[currentFrameDown2];
  } else if (isHurt2 && framesDown2.length > 0) {
    img2 = framesDown2[currentFrameDown2];
  } else if (isFlying2 && framesFly2.length > 0) {
    img2 = framesFly2[currentFrameFly2];
  } else if (isAttacking2 && framesAttack2.length > 0) {
    img2 = framesAttack2[floor(constrain(currentFrameAttack2, 0, framesAttack2.length - 1))];
  } else if (isWalking2 && framesWalk2.length > 0) {
    img2 = framesWalk2[currentFrameWalk2];
  } else if (isJumping2 && framesJump2.length > 0) {
    img2 = framesJump2[floor(constrain(currentFrameJump2, 0, framesJump2.length - 1))];
  } else if (framesStop2.length > 0) {
    img2 = framesStop2[currentFrameStop2 % framesStop2.length];
  }
  
  if (img2) {
    const dw2 = img2.width * CHARACTER2_SCALE;
    const dh2 = img2.height * CHARACTER2_SCALE;
    
    let screenX = width / 2 + (character2X - characterX);
    let displayY = height / 2 + 300 + character2Y;
    if (isFlying2) {
      displayY -= 70;
    }
    
    push();
    translate(screenX, displayY);
    scale(character2Direction, 1);
    image(img2, -dw2 / 2, -dh2 / 2, dw2, dh2);
    pop();
    
    if (isFlying2) {
      drawDialog(screenX, displayY);
    }
  }
}

function drawDialog(screenX, displayY) {
  const dialogX = screenX;
  const dialogY = displayY - 150;
  const dialogFontSize = 16;
  const padding = 10;
  
  push();
  textSize(dialogFontSize);
  const textW = textWidth(char2Dialog);
  pop();
  
  let boxW = textW + padding * 2;
  let boxH = dialogFontSize + padding * 2;
  
  if (hasGreeted) {
    boxH += 40;
  }
  
  push();
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(dialogX - boxW / 2, dialogY - boxH / 2, boxW, boxH);
  
  fill(0);
  noStroke();
  textSize(dialogFontSize);
  textAlign(CENTER, CENTER);
  const textY = hasGreeted ? dialogY - 20 : dialogY;
  text(char2Dialog, dialogX, textY);
  pop();
  
  if (!hasGreeted) {
    nameInput.show();
    const char1X = width / 2;
    const char1Y = height / 2 + 275 + characterY;
    
    const boxW = 180;
    const boxH = 40;
    const boxX = char1X - boxW / 2;
    const boxY = char1Y - 160;
    
    push();
    stroke('#ced4da');
    strokeWeight(2);
    fill(255);
    rect(boxX, boxY, boxW, boxH, 5);
    fill(0);
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);
    text("請作答:", boxX + 10, boxY + boxH / 2);
    pop();
    
    nameInput.size(100);
    nameInput.position(boxX + 70, boxY + 7);
    if (nameInput.elt !== document.activeElement) {
      nameInput.elt.focus();
    }
  } else {
    const buttonY = dialogY + 5;
    retryButton.position(dialogX - retryButton.width / 2, buttonY);
    nextButton.position(dialogX - nextButton.width / 2, buttonY);
  }
}

function submitName() {
  const val = nameInput.value();
  if (val.trim() !== "") {
    if (val.trim() === currentAnswer.trim()) {
      char2Dialog = currentCorrectFeedback;
      correctCount++;
      if (correctCount >= 2) {
        isDefeated = true;
        currentFrameDown2 = 0;
        lastUpdateDown2 = millis();
        nextButton.hide();
        retryButton.hide();
      } else {
        nextButton.show();
      }
    } else {
      char2Dialog = currentIncorrectFeedback;
      retryButton.show();
    }
    hasGreeted = true;
    nameInput.hide();
    nameInput.value('');
  }
}

function retryQuestion() {
  char2Dialog = currentQuestionText;
  retryButton.hide();
  nameInput.show();
  hasGreeted = false;
}

function getNewQuestion() {
  if (questionTable.getRowCount() > 0) {
    let r = floor(random(questionTable.getRowCount()));
    currentQuestionText = questionTable.getString(r, 'question');
    currentAnswer = questionTable.getString(r, 'answer');
    currentCorrectFeedback = questionTable.getString(r, 'correct_feedback');
    currentIncorrectFeedback = questionTable.getString(r, 'incorrect_feedback');
    currentHint = questionTable.getString(r, 'hint');
    char2Dialog = currentQuestionText;
  }
}

function nextQuestion() {
  getNewQuestion();
  nextButton.hide();
  nameInput.show();
  hasGreeted = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
