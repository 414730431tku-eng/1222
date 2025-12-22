let spriteSheetStop, spriteSheetWalk, spriteSheetJump;
let framesStop = [];
let framesWalk = [];
let framesJump = [];
let spriteSheetStop2;
let framesStop2 = [];
let spriteSheetWalk2;
let framesWalk2 = [];
let spriteSheetJump2;
let framesJump2 = [];
let spriteSheetAttack2;
let framesAttack2 = [];
let spriteSheetFly2;
let framesFly2 = [];
let spriteSheetDown2;
let framesDown2 = [];
const NUM_FRAMES_STOP = 3;
const FRAME_DURATION_STOP = 200; // ms per frame for stop sprite

const NUM_FRAMES_STOP2 = 10; // 角色2 stop 精靈共有 10 幀
const FRAME_DURATION_STOP2 = 100; // ms per frame for 角色2 stop

const NUM_FRAMES_WALK2 = 6; // 角色2 walk 精靈共有 6 幀
const FRAME_DURATION_WALK2 = 100; // ms per frame for 角色2 walk
const NUM_FRAMES_JUMP2 = 5; // 角色2 jump 精靈共有 5 幀
const FRAME_DURATION_JUMP2 = 200; // ms per frame for 角色2 jump（調慢）
const NUM_FRAMES_ATTACK2 = 10; // 角色2 attack 精靈共有 10 幀
const FRAME_DURATION_ATTACK2 = 100; // ms per frame for 角色2 attack
const NUM_FRAMES_FLY2 = 3; // 角色2 fly 精靈共有 3 幀
const FRAME_DURATION_FLY2 = 150; // ms per frame for 角色2 fly
const NUM_FRAMES_DOWN2 = 4; // 角色2 down 精靈共有 4 幀
const FRAME_DURATION_DOWN2 = 100; // ms per frame for 角色2 down
const PROXIMITY_DISTANCE = 150; // 角色1靠近角色2的距離閾值
const NUM_FRAMES_WALK = 6;
const FRAME_DURATION_WALK = 100; // ms per frame for walk sprite

const NUM_FRAMES_JUMP = 3;
const FRAME_DURATION_JUMP = 300; // ms per frame for jump sprite

// Animation control
let playing = true; // 自動播放
let currentFrameStop = 0;
let currentFrameWalk = 0;
let currentFrameJump = 0;
let lastUpdateStop = 0;
let lastUpdateWalk = 0;
let lastUpdateJump = 0;
let currentFrameStop2 = 0;
let lastUpdateStop2 = 0;
let currentFrameWalk2 = 0;
let lastUpdateWalk2 = 0;
let isWalking2 = false;
let character2X = 0; // 角色2 X 偏移
let character2Direction = 1; // 1 右, -1 左
let currentFrameJump2 = 0;
let lastUpdateJump2 = 0;
let isJumping2 = false;
let character2Y = 0; // 角色2 Y 偏移（跳躍）
const JUMP_HEIGHT2 = 80; // 角色2 跳躍高度
let currentFrameAttack2 = 0;
let lastUpdateAttack2 = 0;
let isAttacking2 = false;
let currentFrameFly2 = 0;
let lastUpdateFly2 = 0;
let isFlying2 = false;
let currentFrameDown2 = 0;
let lastUpdateDown2 = 0;
let isHurt2 = false;
let isPendingHurt = false;
let hurtTriggerTime = 0;
const HURT_DELAY = 400; // 倒下延遲時間 (ms)

// 狀態管理
let isWalking = false; // 是否正在走路
let isJumping = false; // 是否正在跳跳
let upKeyPressed = false; // 追蹤上鍵是否被按住
let characterX = 0; // 角色 X 位置，0 表示畫布中央
let characterY = 0; // 角色 Y 位置，0 表示畫布中央
let characterDirection = 1; // 1 表示向右，-1 表示向左
const keys = {}; // 追蹤按鍵狀態

// 人物縮放倍率（1 = 原始大小，2 = 2 倍）
const CHARACTER_SCALE = 1.8; // 可自行調整放大倍數
const CHARACTER2_SCALE = 1.5; // 角色2 顯示放大倍率

// 箭頭鍵的 keyCode
const RIGHT_KEY_CODE = 39;
const LEFT_KEY_CODE = 37;
const UP_KEY_CODE = 38;
const MOVE_SPEED = 3; // 每幀移動像素
const JUMP_HEIGHT = 80; // 最大跳躍高度
// Attack
const SPACE_KEY_CODE = 32;
const NUM_FRAMES_ATTACK = 7;
const FRAME_DURATION_ATTACK = 80; // ms per frame for attack
const ATTACK_MOVE = 6; // 每幀攻擊時移動像素 (會乘以 CHARACTER_SCALE)

let spriteSheetAttack;
let framesAttack = [];
let currentFrameAttack = 0;
let lastUpdateAttack = 0;
let isAttacking = false;
// 延遲回到 stop 的設定
let stopReturnPending = false;
let stopReturnEndTime = 0;
const STOP_RETURN_DELAY = 800; // ms，恢復到 stop 前的延遲
let lastAction = 'stop'; // 'attack' | 'jump' | 'stop'

// Interaction
let nameInput;
let char2Dialog = "請問你叫什麼名字";
let questionTable;
let currentQuestionText = "請問你叫什麼名字";
let currentAnswer = "";
let currentCorrectFeedback = "";
let currentIncorrectFeedback = "";
let currentHint = "";
let hasGreeted = false;
let retryButton;
let nextButton;

function preload() {
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
  questionTable = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  // 初始化時間
  lastUpdateStop = millis();
  lastUpdateWalk = millis();
  lastUpdateStop2 = millis();
  lastUpdateDown2 = millis();

  if (spriteSheetStop) {
    const frameWfStop = spriteSheetStop.width / NUM_FRAMES_STOP;
    const frameHStop = spriteSheetStop.height;
    for (let i = 0; i < NUM_FRAMES_STOP; i++) {
      const sx = Math.round(i * frameWfStop);
      const sw = Math.round(frameWfStop);
      framesStop[i] = spriteSheetStop.get(sx, 0, sw, frameHStop);
    }
    console.log('Stop frames loaded:', framesStop.length);
  } else {
    console.log('spriteSheetStop failed to load');
  }

  if (spriteSheetWalk) {
    const frameWfWalk = spriteSheetWalk.width / NUM_FRAMES_WALK;
    const frameHWalk = spriteSheetWalk.height;
    for (let i = 0; i < NUM_FRAMES_WALK; i++) {
      const sx = Math.round(i * frameWfWalk);
      const sw = Math.round(frameWfWalk);
      framesWalk[i] = spriteSheetWalk.get(sx, 0, sw, frameHWalk);
    }
    console.log('Walk frames loaded:', framesWalk.length, 'sprite width:', spriteSheetWalk.width);
  } else {
    console.log('spriteSheetWalk failed to load');
  }

  if (spriteSheetJump) {
    const frameWfJump = spriteSheetJump.width / NUM_FRAMES_JUMP;
    const frameHJump = spriteSheetJump.height;
    for (let i = 0; i < NUM_FRAMES_JUMP; i++) {
      const sx = Math.round(i * frameWfJump);
      const sw = Math.round(frameWfJump);
      framesJump[i] = spriteSheetJump.get(sx, 0, sw, frameHJump);
    }
    console.log('Jump frames loaded:', framesJump.length, 'sprite width:', spriteSheetJump.width);
  } else {
    console.log('spriteSheetJump failed to load');
  }

  if (spriteSheetAttack) {
    const frameWfAttack = spriteSheetAttack.width / NUM_FRAMES_ATTACK;
    const frameHAttack = spriteSheetAttack.height;
    for (let i = 0; i < NUM_FRAMES_ATTACK; i++) {
      const sx = Math.round(i * frameWfAttack);
      const sw = Math.round(frameWfAttack);
      framesAttack[i] = spriteSheetAttack.get(sx, 0, sw, frameHAttack);
    }
    console.log('Attack frames loaded:', framesAttack.length, 'sprite width:', spriteSheetAttack.width);
  } else {
    console.log('spriteSheetAttack failed to load');
  }

  if (spriteSheetStop2) {
    const frameWfStop2 = spriteSheetStop2.width / NUM_FRAMES_STOP2;
    const frameHStop2 = spriteSheetStop2.height;
    for (let i = 0; i < NUM_FRAMES_STOP2; i++) {
      const sx = Math.round(i * frameWfStop2);
      const sw = Math.round(frameWfStop2);
      framesStop2[i] = spriteSheetStop2.get(sx, 0, sw, frameHStop2);
    }
    console.log('角色2 Stop frames loaded:', framesStop2.length, 'sprite width:', spriteSheetStop2.width);
  } else {
    console.log('spriteSheetStop2 failed to load');
  }

  if (spriteSheetWalk2) {
    const frameWfWalk2 = spriteSheetWalk2.width / NUM_FRAMES_WALK2;
    const frameHWalk2 = spriteSheetWalk2.height;
    for (let i = 0; i < NUM_FRAMES_WALK2; i++) {
      const sx = Math.round(i * frameWfWalk2);
      const sw = Math.round(frameWfWalk2);
      framesWalk2[i] = spriteSheetWalk2.get(sx, 0, sw, frameHWalk2);
    }
    console.log('角色2 Walk frames loaded:', framesWalk2.length, 'sprite width:', spriteSheetWalk2.width);
  } else {
    console.log('spriteSheetWalk2 failed to load');
  }

  if (spriteSheetJump2) {
    const frameWfJump2 = spriteSheetJump2.width / NUM_FRAMES_JUMP2;
    const frameHJump2 = spriteSheetJump2.height;
    for (let i = 0; i < NUM_FRAMES_JUMP2; i++) {
      const sx = Math.round(i * frameWfJump2);
      const sw = Math.round(frameWfJump2);
      framesJump2[i] = spriteSheetJump2.get(sx, 0, sw, frameHJump2);
    }
    console.log('角色2 Jump frames loaded:', framesJump2.length, 'sprite width:', spriteSheetJump2.width);
  } else {
    console.log('spriteSheetJump2 failed to load');
  }

  if (spriteSheetAttack2) {
    const frameWfAttack2 = spriteSheetAttack2.width / NUM_FRAMES_ATTACK2;
    const frameHAttack2 = spriteSheetAttack2.height;
    for (let i = 0; i < NUM_FRAMES_ATTACK2; i++) {
      const sx = Math.round(i * frameWfAttack2);
      const sw = Math.round(frameWfAttack2);
      framesAttack2[i] = spriteSheetAttack2.get(sx, 0, sw, frameHAttack2);
    }
    console.log('角色2 Attack frames loaded:', framesAttack2.length, 'sprite width:', spriteSheetAttack2.width);
  } else {
    console.log('spriteSheetAttack2 failed to load');
  }

  if (spriteSheetFly2) {
    const frameWfFly2 = spriteSheetFly2.width / NUM_FRAMES_FLY2;
    const frameHFly2 = spriteSheetFly2.height;
    for (let i = 0; i < NUM_FRAMES_FLY2; i++) {
      const sx = Math.round(i * frameWfFly2);
      const sw = Math.round(frameWfFly2);
      framesFly2[i] = spriteSheetFly2.get(sx, 0, sw, frameHFly2);
    }
    console.log('角色2 Fly frames loaded:', framesFly2.length, 'sprite width:', spriteSheetFly2.width);
  } else {
    console.log('spriteSheetFly2 failed to load');
  }

  if (spriteSheetDown2) {
    const frameWfDown2 = spriteSheetDown2.width / NUM_FRAMES_DOWN2;
    const frameHDown2 = spriteSheetDown2.height;
    for (let i = 0; i < NUM_FRAMES_DOWN2; i++) {
      const sx = Math.round(i * frameWfDown2);
      const sw = Math.round(frameWfDown2);
      framesDown2[i] = spriteSheetDown2.get(sx, 0, sw, frameHDown2);
    }
    console.log('角色2 Down frames loaded:', framesDown2.length);
  } else {
    console.log('spriteSheetDown2 failed to load');
  }

  // 建立輸入框
  nameInput = createInput('');
  nameInput.position(-1000, -1000); // 初始隱藏
  nameInput.size(150);
  nameInput.style('font-size', '16px');
  nameInput.style('border', '2px solid #ced4da');
  nameInput.style('border-radius', '5px');
  nameInput.style('border', 'none'); // 移除輸入框自帶邊框
  nameInput.style('background', 'transparent'); // 背景透明
  nameInput.style('outline', 'none'); // 移除點擊時的框線
  nameInput.style('padding', '5px');
  nameInput.hide();
  nameInput.changed(submitName); // 按下 Enter 時觸發
  
  retryButton = createButton('再作答一次');
  retryButton.hide();
  retryButton.mousePressed(retryQuestion);

  nextButton = createButton('下一題');
  nextButton.hide();
  nextButton.mousePressed(nextQuestion);

  getNewQuestion(); // 初始載入一題
}

function keyPressed() {
  // 如果正在輸入文字，忽略遊戲控制按鍵
  if (nameInput && nameInput.elt === document.activeElement) {
    return;
  }

  // 空白鍵觸發攻擊（只在非攻擊中時觸發）
  if (keyCode === SPACE_KEY_CODE && !isAttacking) {
    isAttacking = true;
    lastUpdateAttack = millis();
    currentFrameAttack = 0;
    lastAction = 'attack';
    return false;
  }
  if (keyCode === RIGHT_KEY_CODE) {
    isWalking = true;
    characterDirection = 1; // 向右
    lastUpdateWalk = millis();
    currentFrameWalk = 0;
    return false;
  } else if (keyCode === LEFT_KEY_CODE) {
    isWalking = true;
    characterDirection = -1; // 向左
    lastUpdateWalk = millis();
    currentFrameWalk = 0;
    return false;
  } else if (keyCode === UP_KEY_CODE && !upKeyPressed) {
    // 只在第一次按下時觸發跳躍
    upKeyPressed = true;
    isJumping = true;
    lastUpdateJump = millis();
    currentFrameJump = 0;
    lastAction = 'jump';
    return false;
  }

  // 角色2: 按 D 向右走
  if (keyCode === 68) { // D
    isWalking2 = true;
    character2Direction = 1;
    lastUpdateWalk2 = millis();
    currentFrameWalk2 = 0;
    return false;
  }
  // 角色2: 按 A 向左走
  if (keyCode === 65) { // A
    isWalking2 = true;
    character2Direction = -1;
    lastUpdateWalk2 = millis();
    currentFrameWalk2 = 0;
    return false;
  }
  // 角色2: 按 W 跳躍
  if (keyCode === 87) { // W
    if (!isJumping2 && framesJump2.length > 0) {
      isJumping2 = true;
      isWalking2 = false;
      lastUpdateJump2 = millis();
      currentFrameJump2 = 0;
      character2Y = 0;
    }
    return false;
  }
  // 角色2: 按 Q 攻擊
  if (keyCode === 81) { // Q
    if (!isAttacking2 && framesAttack2.length > 0) {
      isAttacking2 = true;
      isWalking2 = false;
      lastUpdateAttack2 = millis();
      currentFrameAttack2 = 0;
    }
    return false;
  }
}

function keyReleased() {
  if (keyCode === RIGHT_KEY_CODE || keyCode === LEFT_KEY_CODE) {
    isWalking = false;
    currentFrameStop = 0;
    lastUpdateStop = millis();
    return false;
  } else if (keyCode === UP_KEY_CODE) {
    upKeyPressed = false; // 重置上鍵狀態
    return false;
  }

  // 角色2: 放開 D 回到 stop
  if (keyCode === 68) { // D
    isWalking2 = false;
    currentFrameStop2 = 0;
    lastUpdateStop2 = millis();
    return false;
  }
  // 角色2: 放開 A 回到 stop
  if (keyCode === 65) { // A
    isWalking2 = false;
    currentFrameStop2 = 0;
    lastUpdateStop2 = millis();
    return false;
  }
}

function draw() {
  // 全畫面背景色 #ffc2d1
  background('#ffc2d1');

  // 若精靈還沒處理好就跳過
  if (framesStop.length === 0 && framesWalk.length === 0 && framesJump.length === 0) {
    return;
  }

  const now = millis();
  
  // 只有在 playing 時才推進影格索引
  if (playing) {
    // 攻擊優先
    if (isAttacking && framesAttack.length > 0) {
      const elapsedAttack = now - lastUpdateAttack;
      if (elapsedAttack >= FRAME_DURATION_ATTACK) {
        const stepsAttack = floor(elapsedAttack / FRAME_DURATION_ATTACK);
        currentFrameAttack = (currentFrameAttack + stepsAttack) % framesAttack.length;
        lastUpdateAttack += stepsAttack * FRAME_DURATION_ATTACK;
      }
      // 攻擊期間不移動角色（僅顯示攻擊動畫，面向維持原來方向）
      // 攻擊播完後啟動延遲回到 stop（保留最後一幀）
      if (currentFrameAttack >= NUM_FRAMES_ATTACK - 1) {
        isAttacking = false;
        currentFrameAttack = NUM_FRAMES_ATTACK - 1; // 保留最後一幀
        stopReturnPending = true;
        stopReturnEndTime = now + STOP_RETURN_DELAY;
      }
    } else if (isJumping && framesJump.length > 0) {
      const elapsedJump = now - lastUpdateJump;
      if (elapsedJump >= FRAME_DURATION_JUMP) {
        const stepsJump = floor(elapsedJump / FRAME_DURATION_JUMP);
        currentFrameJump = (currentFrameJump + stepsJump) % framesJump.length;
        lastUpdateJump += stepsJump * FRAME_DURATION_JUMP;
      }
      
      // 計算跳躍的 Y 位置（拋物線運動）
      const jumpProgress = currentFrameJump / NUM_FRAMES_JUMP;
      // 使用正弦波計算平滑的上下運動
      characterY = -JUMP_HEIGHT * sin(jumpProgress * PI);
      
      // 跳躍動畫播完後啟動延遲回到 stop（保留最後一幀）
      if (currentFrameJump >= NUM_FRAMES_JUMP - 1) {
        isJumping = false;
        currentFrameJump = NUM_FRAMES_JUMP - 1; // 保留最後一幀
        stopReturnPending = true;
        stopReturnEndTime = now + STOP_RETURN_DELAY;
      }
      
    } else if (isWalking && framesWalk.length > 0) {
      const elapsedWalk = now - lastUpdateWalk;
      if (elapsedWalk >= FRAME_DURATION_WALK) {
        const stepsWalk = floor(elapsedWalk / FRAME_DURATION_WALK);
        currentFrameWalk = (currentFrameWalk + stepsWalk) % framesWalk.length;
        lastUpdateWalk += stepsWalk * FRAME_DURATION_WALK;
      }
      // 根據方向移動角色（移動速度會依縮放倍率放大）
      characterX += MOVE_SPEED * CHARACTER_SCALE * characterDirection;
      characterY = 0; // 走路時保持在地面
    } else if (!isWalking && !isJumping && framesStop.length > 0) {
      const elapsedStop = now - lastUpdateStop;
      if (elapsedStop >= FRAME_DURATION_STOP) {
        const stepsStop = floor(elapsedStop / FRAME_DURATION_STOP);
        currentFrameStop = (currentFrameStop + stepsStop) % framesStop.length;
        lastUpdateStop += stepsStop * FRAME_DURATION_STOP;
      }
      characterY = 0; // 停止時保持在地面
    }
  }

  // 根據狀態選擇要顯示的精靈
  let framesToDisplay = [];
  let currentFrame = 0;
  
  if (isAttacking && framesAttack.length > 0) {
    framesToDisplay = framesAttack;
    currentFrame = currentFrameAttack;
  } else if (isJumping && framesJump.length > 0) {
    framesToDisplay = framesJump;
    currentFrame = currentFrameJump;
  } else if (isWalking && framesWalk.length > 0) {
    framesToDisplay = framesWalk;
    currentFrame = currentFrameWalk;
  } else if (framesStop.length > 0) {
    framesToDisplay = framesStop;
    currentFrame = currentFrameStop;
  }

  // 畫布中央顯示精靈動畫
  if (framesToDisplay.length > 0) {
    const idxFrame = currentFrame % framesToDisplay.length;
    const imgFrame = framesToDisplay[idxFrame];
    if (!imgFrame) {
      return;
    }
    const dw = imgFrame.width * CHARACTER_SCALE;
    const dh = imgFrame.height * CHARACTER_SCALE;
    
    // 界限檢查：使用當前影格寬度來限制角色移動範圍
    const halfW = dw / 2;
    const minX = -width / 2 + halfW + 10;
    const maxX = width / 2 - halfW - 10;
    characterX = constrain(characterX, minX, maxX);

    // 根據方向翻轉圖片並繪製（於中心位置加上 vertical 偏移）
    push();
    translate(width / 2 + characterX, height / 2 + characterY);
    scale(characterDirection, 1); // 向左時水平翻轉
    image(imgFrame, -dw / 2, -dh / 2, dw, dh);
    pop();
  }

  // ----- 角色2 stop 動畫（獨立顯示） -----
  // 角色2: 顯示 stop 或 walk 動畫
  if (framesStop2.length > 0 || framesWalk2.length > 0 || framesAttack2.length > 0 || framesFly2.length > 0) {
    // 計算角色1與角色2的位置並自動調整角色2面向
    const char1ScreenX = width / 2 + characterX;
    const char2BaseX = width * 0.35 + character2X;
    const distanceToChar1 = abs(char1ScreenX - char2BaseX);
    
    // 檢測是否被攻擊（角色1攻擊且距離夠近）
    const isHit = isAttacking && distanceToChar1 < PROXIMITY_DISTANCE;
    const isClose = distanceToChar1 < PROXIMITY_DISTANCE;

    if (isHit && !isHurt2 && !isPendingHurt) {
      isPendingHurt = true;
      hurtTriggerTime = millis();
    }

    if (isPendingHurt) {
      if (!isClose) {
        isPendingHurt = false;
      } else if (millis() - hurtTriggerTime > HURT_DELAY) {
        isHurt2 = true;
        isPendingHurt = false;
        currentFrameDown2 = 0;
        lastUpdateDown2 = millis();
      }
    }

    if (isHurt2 && !isClose) {
      isHurt2 = false;
    }

    // 檢測是否應該開始 fly（角色1靠近時）
    if (!isHurt2 && !isPendingHurt && distanceToChar1 < PROXIMITY_DISTANCE && !isAttacking2 && !isJumping2 && !isWalking2 && framesFly2.length > 0) {
      isFlying2 = true;
    } else {
      isFlying2 = false;
      // 遠離時重置對話狀態
      if (hasGreeted || nameInput.style('display') !== 'none') {
        hasGreeted = false;
        char2Dialog = currentQuestionText;
        nameInput.hide();
        retryButton.hide();
        nextButton.hide();
        nameInput.value('');
      }
    }
    
    if (char1ScreenX < char2BaseX) {
      // 角色1在角色2的左邊，角色2面向左
      character2Direction = -1;
    } else {
      // 角色1在角色2的右邊，角色2面向右
      character2Direction = 1;
    }
    
    let img2 = null;

    if (playing) {
      if (isHurt2 && framesDown2.length > 0) {
        const elapsedDown2 = now - lastUpdateDown2;
        if (elapsedDown2 >= FRAME_DURATION_DOWN2) {
          const stepsDown2 = floor(elapsedDown2 / FRAME_DURATION_DOWN2);
          lastUpdateDown2 += stepsDown2 * FRAME_DURATION_DOWN2;
          // 播放一次，停在最後一幀
          if (currentFrameDown2 < framesDown2.length - 1) {
            currentFrameDown2 = min(currentFrameDown2 + stepsDown2, framesDown2.length - 1);
          }
        }
      } else if (isFlying2 && framesFly2.length > 0) {
        const elapsedFly2 = now - lastUpdateFly2;
        if (elapsedFly2 >= FRAME_DURATION_FLY2) {
          const stepsFly2 = floor(elapsedFly2 / FRAME_DURATION_FLY2);
          currentFrameFly2 = (currentFrameFly2 + stepsFly2) % framesFly2.length;
          lastUpdateFly2 += stepsFly2 * FRAME_DURATION_FLY2;
        }
      } else if (isAttacking2 && framesAttack2.length > 0) {
        const elapsedA2 = now - lastUpdateAttack2;
        if (elapsedA2 >= FRAME_DURATION_ATTACK2) {
          const stepsA2 = floor(elapsedA2 / FRAME_DURATION_ATTACK2);
          currentFrameAttack2 = (currentFrameAttack2 + stepsA2);
          lastUpdateAttack2 += stepsA2 * FRAME_DURATION_ATTACK2;
        }
        // 若播完最後一幀，回到 stop 狀態
        if (currentFrameAttack2 >= NUM_FRAMES_ATTACK2 - 1) {
          isAttacking2 = false;
          currentFrameAttack2 = 0;
          lastUpdateStop2 = now;
        }
      } else if (isWalking2 && framesWalk2.length > 0) {
        const elapsedW2 = now - lastUpdateWalk2;
        if (elapsedW2 >= FRAME_DURATION_WALK2) {
          const stepsW2 = floor(elapsedW2 / FRAME_DURATION_WALK2);
          currentFrameWalk2 = (currentFrameWalk2 + stepsW2) % framesWalk2.length;
          lastUpdateWalk2 += stepsW2 * FRAME_DURATION_WALK2;
        }
        // 移動角色2 向右（可使用 MOVE_SPEED）
        character2X += MOVE_SPEED * CHARACTER2_SCALE * character2Direction;
      } else if (isJumping2 && framesJump2.length > 0) {
        const elapsedJ2 = now - lastUpdateJump2;
        if (elapsedJ2 >= FRAME_DURATION_JUMP2) {
          const stepsJ2 = floor(elapsedJ2 / FRAME_DURATION_JUMP2);
          currentFrameJump2 = (currentFrameJump2 + stepsJ2);
          lastUpdateJump2 += stepsJ2 * FRAME_DURATION_JUMP2;
        }
        // 計算跳躍 Y 偏移（使用正弦平滑運動）
        const jumpProgress = currentFrameJump2 / NUM_FRAMES_JUMP2;
        character2Y = -JUMP_HEIGHT2 * sin(min(jumpProgress, 1) * PI);
        // 若播完最後一幀，回到 stop 狀態
        if (currentFrameJump2 >= NUM_FRAMES_JUMP2 - 1) {
          isJumping2 = false;
          currentFrameJump2 = 0;
          character2Y = 0;
          lastUpdateStop2 = now;
        }
      } else if (framesStop2.length > 0) {
        const elapsedStop2 = now - lastUpdateStop2;
        if (elapsedStop2 >= FRAME_DURATION_STOP2) {
          const steps2 = floor(elapsedStop2 / FRAME_DURATION_STOP2);
          currentFrameStop2 = (currentFrameStop2 + steps2) % framesStop2.length;
          lastUpdateStop2 += steps2 * FRAME_DURATION_STOP2;
        }
      }
    }

    // 根據狀態選擇要顯示的圖片
    if (isHurt2 && framesDown2.length > 0) {
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
      // 限制角色2 的水平範圍（以畫面座標限制，確保角色不超出畫布）
      const halfW2 = dw2 / 2;
      const minScreenX = halfW2 + 10; // 最左邊可見座標
      const maxScreenX = width - halfW2 - 10; // 最右邊可見座標
      // 計算欲顯示的畫面座標，並限制在畫布內
      let screenX = constrain(width * 0.35 + character2X, minScreenX, maxScreenX);
      // 更新 character2X 以反映被限制後的位置
      character2X = screenX - width * 0.35;
      
      // 若為 fly 狀態則提高 Y 位置
      let displayY = height / 2 + character2Y;
      if (isFlying2) {
        displayY -= 70; // fly 時提高 70 像素
      }

      push();
      translate(screenX, displayY);
      scale(character2Direction, 1);
      image(img2, -dw2 / 2, -dh2 / 2, dw2, dh2);
      pop();
      
      // 若為 fly 狀態則顯示對話框
      if (isFlying2) {
        const dialogText = char2Dialog;
        const dialogX = screenX;
        const dialogY = displayY - 80;
        const dialogFontSize = 16;
        const padding = 10;
        
        // 計算文字寬度
        push();
        textSize(dialogFontSize);
        const textW = textWidth(dialogText);
        pop();

        let boxW = textW + padding * 2;
        let boxH = dialogFontSize + padding * 2;

        // 如果已回答，加大對話框以容納按鈕
        if (hasGreeted) {
          boxH += 40; // 為按鈕增加額外高度
        }
        
        // 繪製方框背景
        push();
        fill(255);
        stroke(0);
        strokeWeight(2);
        rect(dialogX - boxW / 2, dialogY - boxH / 2, boxW, boxH);
        
        // 繪製文字
        fill(0);
        noStroke();
        textSize(dialogFontSize);
        textAlign(CENTER, CENTER);
        // 如果已回答，將文字向上移，為按鈕騰出空間
        const textY = hasGreeted ? dialogY - 20 : dialogY;
        text(dialogText, dialogX, textY);
        pop();

        // 根據狀態顯示輸入框或按鈕
        if (!hasGreeted) {
          nameInput.show();
          // 將輸入框定位在角色1上方
          const char1X = width / 2 + characterX;
          const char1Y = height / 2 + characterY;
          let char1Height = 100; // 預設高度
          if (framesToDisplay.length > 0) {
            const idxFrame = currentFrame % framesToDisplay.length;
            const imgFrame = framesToDisplay[idxFrame];
            if (imgFrame) {
              char1Height = imgFrame.height * CHARACTER_SCALE;
            }
          }
          
          // 定義外框尺寸與位置
          const boxW = 180;
          const boxH = 40;
          const boxX = char1X - boxW / 2;
          const boxY = char1Y - char1Height / 2 - 60; // 調整高度

          // 繪製外框（包含文字與輸入框）
          push();
          stroke('#ced4da');
          strokeWeight(2);
          fill(255);
          rect(boxX, boxY, boxW, boxH, 5); // 圓角矩形
          fill(0); noStroke(); textSize(16); textAlign(LEFT, CENTER);
          text("請作答:", boxX + 10, boxY + boxH / 2);
          pop();
          
          // 設定輸入框位置
          nameInput.size(100); // 調整寬度以容納文字
          nameInput.position(boxX + 70, boxY + 7);
        } else {
          // 答對或答錯後，按鈕會顯示
          // 按鈕的位置也需要設定
          // 將按鈕定位在對話框的下半部分
          const buttonY = dialogY + 5;
          retryButton.position(dialogX - retryButton.width / 2, buttonY);
          nextButton.position(dialogX - nextButton.width / 2, buttonY);
        }
      }
    }
  }

  // ===== 角色1 繪製在角色2 之上 =====
  // 重新繪製角色1（使其在最上層）
  if (framesToDisplay.length > 0) {
    const idxFrame = currentFrame % framesToDisplay.length;
    const imgFrame = framesToDisplay[idxFrame];
    if (imgFrame) {
      const dw = imgFrame.width * CHARACTER_SCALE;
      const dh = imgFrame.height * CHARACTER_SCALE;
      
      // 界限檢查：使用當前影格寬度來限制角色移動範圍
      const halfW = dw / 2;
      const minX = -width / 2 + halfW + 10;
      const maxX = width / 2 - halfW - 10;
      characterX = constrain(characterX, minX, maxX);

      // 根據方向翻轉圖片並繪製（於中心位置加上 vertical 偏移）
      push();
      translate(width / 2 + characterX, height / 2 + characterY);
      scale(characterDirection, 1); // 向左時水平翻轉
      image(imgFrame, -dw / 2, -dh / 2, dw, dh);
      pop();
    }
  }
}

function submitName() {
  const val = nameInput.value();
  if (val.trim() !== "") {
    if (val.trim() === currentAnswer.trim()) {
      char2Dialog = currentCorrectFeedback;
      nextButton.show();
    } else {
      char2Dialog = currentIncorrectFeedback;
      retryButton.show();
    }
    hasGreeted = true;
    nameInput.hide();
    nameInput.value('');
  }
}

function getNewQuestion() {
  if (questionTable.getRowCount() > 0) {
    // 隨機選取一題
    let r = floor(random(questionTable.getRowCount()));
    currentQuestionText = questionTable.getString(r, 0); // 題目
    currentAnswer = questionTable.getString(r, 1);
    currentCorrectFeedback = questionTable.getString(r, 2);
    currentIncorrectFeedback = questionTable.getString(r, 3);
    currentHint = questionTable.getString(r, 4);
    char2Dialog = currentQuestionText;
  }
}

function retryQuestion() {
  char2Dialog = currentQuestionText;
  retryButton.hide();
  nameInput.show();
  hasGreeted = false; // 重新標記為未回答
}

function nextQuestion() {
  getNewQuestion(); // 獲取新題目
  nextButton.hide();
  nameInput.show();
  hasGreeted = false; // 重新標記為未回答
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
