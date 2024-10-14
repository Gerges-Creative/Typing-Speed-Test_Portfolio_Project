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
  ---- [03] Pressing Enter Checks The Word Immediatly => DONE
  ---- [04] Choose Array Of Words For Every Level => DONE
  ---- [05] Add 3 Seconds For The First Word => DONE
  ---- [06] Write Game Instruction With Dynamic Values => DONE
  ---- [07] Break The Logic To More Functions => Working on it.
  ---- [08] Every Time You Choose A Level The Game Refreshes To Start That Level => DONE
  ---- [09] Compare The Words To The Letter => Don't know how yet.
  ---- [10] A Press Button To Start A New Game Without The Need To Reload The Page. => Don't know how yet.
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
  "World",
  "Cat",
  "Dog",
  "Bird",
  "Apple",
  "Bye",
  "Java",
  "Ant",
  "Toy",
  "Node"
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
    "Playing",
    "Seconds",
    "Language",
    "Friends"
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
    "Hypothetical",
    "Sacrilegious",
    "Paraphernalia",
    "Minuscule",
    "Orangutan",
    "Computers"
  ];

  // This Will Contain The Words Of The Chosen Level
  let currentWords = [];
  
  // Setting Levels
  const lvls = {
    "Easy": 5,
    "Normal": 4,
    "Hard": 4
  };
  
  // Global Variables
  // Default Level
  let currentLevel;
  let currentLevelSeconds;
  // Variable To Hold The Interval
  let interval;
  // Variable To Check If It's The First Word
  let isFirstWord = true;
  // Flag To Check If The Game Is Over
  let gameOver = false;

  // Catch Selectors
  let startButton = document.querySelector(".start");
  let lvlNameSpan = document.querySelectorAll("span.lvl"); // this one
  let secondsSpan = document.querySelectorAll("span.seconds"); // this one
  let theWord = document.querySelector(".the-word");
  let upcomingWords = document.querySelector(".upcoming-words");
  let input = document.querySelector(".input");
  let timeLeftSpan = document.querySelector(".time span");
  let scoreGot = document.querySelector(".score .got");
  let scoreTotal = document.querySelectorAll("span.total"); // this one
  let finishMessage = document.querySelector(".finish");
  let scoresContainer = document.querySelector(".scores-container");
  
  // Function To Assign Level Names And Seconds
  function assignLevelNames(level, seconds) {
    lvlNameSpan.forEach(span => {
      span.innerHTML = level;
    });
    secondsSpan.forEach(span => {
      span.innerHTML = seconds;
    });
  }

  // Function To Assign Total Score Which Will Be Reference To The Total Words
  function total(total) {
    scoreTotal.forEach(span => {
      span.innerHTML = total;
    });
  }

  // Detect Chosen Level
  document.addEventListener('DOMContentLoaded', function () {
    const selectBox = document.getElementById('levelSelect');

    // Load The Saved Difficulty From Local Storage If It Exists
    const savedDifficulty = localStorage.getItem("selectedDifficulty");
    if (savedDifficulty) {
      selectBox.value = savedDifficulty;
    }
    // Check and handle the initial value on page load
    const initialSelectedValue = selectBox.value;
    handleLevelChange(initialSelectedValue);
    // Event Listener For When The User Changes Difficulty
    selectBox.addEventListener('change', function () {
        const selectedValue = selectBox.value;
        handleLevelChange(selectedValue);
        // Save Difficulty To Local Storage
        localStorage.setItem("selectedDifficulty", selectedValue)
        // Refresh the page after selecting a new level
        if (isFirstWord === false) {
          location.reload();
        }
    });
  });

  // Change The Difficulty Level
  // Setting Level Name + Seconds + Score
  function handleLevelChange(level) {
    currentLevel = level;
    currentLevelSeconds = lvls[level]

    assignLevelNames(level, currentLevelSeconds);
    timeLeftSpan.innerHTML = currentLevelSeconds;

    if (level === 'Easy') {
      total(easyWords.length);
      currentWords = easyWords.slice();
    } else if (level === 'Normal') {
      total(normalWords.length);
      currentWords = normalWords.slice();
    } else if (level === 'Hard') {
      total(hardWords.length);
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
    // Reset Game Over Flag
    gameOver = false;
    // Generate Word Function
    genWords();
  }
  
  function genWords() {
    // Clear The Previous Interval If It Exists
    if (interval) clearInterval(interval);

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
  
  // Check The Word
  function checkWord() {
    // Prevent Multiple Game Over Messages Through Pressing Enter
    if (gameOver) return;

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
        // Clear the interval when the game is finished
        clearInterval(interval);
        // Set Game Over Flag
        gameOver = true;
        // Displays The Score Immediately After The Game Finishes
        displayScores();
      }
    } else {
      let span = document.createElement("span");
      span.className = 'bad';
      let spanText = document.createTextNode("Game Over");
      span.appendChild(spanText);
      finishMessage.appendChild(span);
      // Save Score To Local Storage
      saveScore(scoreGot.innerHTML, currentLevel);
      // Clear the interval when the game is over
      clearInterval(interval);
      // Set Game Over Flag
      gameOver = true;
      // Displays The Score Immediately After The Game Finishes
      displayScores();
    }
  }
  
  function startPlay() {
    if (isFirstWord) {
      timeLeftSpan.innerHTML = currentLevelSeconds + 3;
      isFirstWord = false;
    } else {
      timeLeftSpan.innerHTML = currentLevelSeconds;
    }

    interval = setInterval(() => {
      timeLeftSpan.innerHTML--;
      if (timeLeftSpan.innerHTML === "0") {
        // Stop Timer
        clearInterval(interval);
        checkWord();
      }
    }, 1000);
  }

  // Event Listener For Enter Press Key
  input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      clearInterval(interval);
      checkWord();
    }
  });

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
  
    scores.forEach(entry => {
      let scoreEntry = document.createElement('div');
     scoreEntry.className = 'score-entry';
      scoreEntry.textContent = `Level: ${entry.level}, Score: ${entry.score}, Date: ${entry.date}`;
      scoresContainer.appendChild(scoreEntry);
    });
  }

  document.addEventListener('DOMContentLoaded', displayScores);