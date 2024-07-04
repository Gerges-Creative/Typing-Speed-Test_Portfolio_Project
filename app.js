/*
  Advices To Follow
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create More Advanced Features For The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date => DONE
  ---- [02] Choose Levels From Select Box => DONE
  ---- [03] Break The Logic To More Functions => Don't know how yet.
  ---- [04] Choose Array Of Words For Every Level => DONE
  ---- [05] Write Game Instruction With Dynamic Values => Will do it later.
  ---- [06] Add 3 Seconds For The First Word => Don't know how yet.
  ---- [07] Pressing Enter Checks The Word Immediatly.
*/

// Array Of Words For Each Level Easy, Normal, And Hard
const easyWords = [
  "Hello",
  "Coding",
  "Code",
  "Town",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Funny",
  "Rust",
  "world",
  "Cat",
  "Dog",
  "Bird",
  "Apple"
  ];

  const normalWords = [
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Styling",
    "Cascade",
    "Working",
    "Keyboard",
    "Playing"
  ];

const hardWords = [
    "Programming",
    "Javascript",
    "Destructuring",
    "Paradigm",
    "Documentation",
    "Dependencies",
    "Pneumonia",
    "Xylophone",
    "University",
    "Encyclopedia",
    "Hypothetical"
  ];

  // This Will Contain The Words Of The Chosen Level
  let currentWords = [];
  
  // Setting Levels
  const lvls = {
    "Easy": 6,
    "Normal": 4,
    "Hard": 3
  };
  
  // Default Level
  let currentLevel;
  let currentLevelSeconds;

  // Catch Selectors
  let startButton = document.querySelector(".start");
  let lvlNameSpan = document.querySelector(".message .lvl");
  let secondsSpan = document.querySelector(".message .seconds");
  let theWord = document.querySelector(".the-word");
  let upcomingWords = document.querySelector(".upcoming-words");
  let input = document.querySelector(".input");
  let timeLeftSpan = document.querySelector(".time span");
  let scoreGot = document.querySelector(".score .got");
  let scoreTotal = document.querySelector(".score .total");
  let finishMessage = document.querySelector(".finish");
  let container = document.querySelector(".container");
  
  // Detect Chosen Level
  document.addEventListener('DOMContentLoaded', function () {
    const selectBox = document.getElementById('levelSelect');

    // Check and handle the initial value on page load
    const initialSelectedValue = selectBox.value;
    handleLevelChange(initialSelectedValue);

    selectBox.addEventListener('change', function () {
        const selectedValue = selectBox.value;
        handleLevelChange(selectedValue);
    });
  });

  // Change The Difficulty Level
  // Setting Level Name + Seconds + Score
  function handleLevelChange(level) {
    currentLevel = level;
    currentLevelSeconds = lvls[level]

    lvlNameSpan.innerHTML = level;
    secondsSpan.innerHTML = currentLevelSeconds;
    timeLeftSpan.innerHTML = currentLevelSeconds;

    if (level === 'Easy') {
        console.log('Level Easy Selected');
        scoreTotal.innerHTML = easyWords.length;
        currentWords = easyWords.slice();
    } else if (level === 'Normal') {
        console.log('Level Normal Selected');
        scoreTotal.innerHTML = normalWords.length;
        currentWords = normalWords.slice();
    } else if (level === 'Hard') {
      console.log('Level Hard Selected');
      scoreTotal.innerHTML = hardWords.length;
      currentWords = hardWords.slice();
    }
  }
  
  // Disable Paste Event
  input.onpaste = function () {
    return false;
  }
  
  // Start Game
  startButton.onclick = function () {
    this.remove();
    input.focus();
    // Generate Word Function
    genWords();
  }
  
  function genWords() {
    // Get Random Word From Array
    let randomWord = currentWords[Math.floor(Math.random() * currentWords.length)];
    // Get Word Index
    let wordIndex = currentWords.indexOf(randomWord);
    // Remove WordFrom Array
    currentWords.splice(wordIndex, 1);
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // Empty Upcoming Words
    upcomingWords.innerHTML = '';
    // Generate Upcoming Words
    for (let i = 0; i < currentWords.length; i++) {
      // Create Div Element
      let div = document.createElement("div");
      let txt = document.createTextNode(currentWords[i]);
      div.appendChild(txt);
      upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
  }
  
  function startPlay() {
    timeLeftSpan.innerHTML = currentLevelSeconds;
    let start = setInterval(() => {
      timeLeftSpan.innerHTML--;
      if (timeLeftSpan.innerHTML === "0") {
        // Stop Timer
        clearInterval(start);
        // Compare Words
        if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
          // Empty Input Field
          input.value = '';
          // Increase Score
          scoreGot.innerHTML++;
          if (currentWords.length > 0) {
            // Call Generate Word Function
            genWords();
          } else {
            let span = document.createElement("span");
            span.className = 'good';
            let spanText = document.createTextNode("Congratz");
            span.appendChild(spanText);
            finishMessage.appendChild(span);
            // Remove Upcoming Words Box
            upcomingWords.remove();
            // Save Score To Local Storage
            saveScore(scoreGot.innerHTML, currentLevel);

          }
        } else {
          let span = document.createElement("span");
          span.className = 'bad';
          let spanText = document.createTextNode("Game Over");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Save Score To Local Storage
          saveScore(scoreGot.innerHTML, currentLevel);
        }
      }
    }, 1000);
  }

  function saveScore(score, level) {
    const today = new Date();
    const date = today.toLocaleDateString(); // Format: MM/DD/YYYY
    const scoreEntry = {
      date: date,
      level: level,
      score: score
    };

    let scores = JSON.parse(localStorage.getItem('typingGamesScores')) || [];
    scores.push(scoreEntry);
    localStorage.setItem('typingGameScores', JSON.stringify(scores));
  }

  function displayScores() {
    let scores = JSON.parse(localStorage.getItem('typingGameScores')) || [];

    let scoresContainer = document.createElement('div');
    scoresContainer.className = 'scores-container';
  
    scores.forEach(entry => {
      let scoreEntry = document.createElement('div');
     scoreEntry.className = 'score-entry';
      scoreEntry.textContent = `Level: ${entry.level}, Score: ${entry.score}, Date: ${entry.date}`;
      scoresContainer.appendChild(scoreEntry);
    });
  
    container.appendChild(scoresContainer);
  }

  document.addEventListener('DOMContentLoaded', displayScores);