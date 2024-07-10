# Typing Speed Test Game

## Introduction

Welcome to the Typing Speed Test Game! This project transforms the practice of typing into an engaging and fun game, aiming to help users improve their typing speed and accuracy. Whether you're a beginner just starting out or an advanced typist looking for a challenge, this game has something for everyone.

- **[Project Demo Video](#)**: [https://youtu.be/r00dhz494ac]
- **[Project Blog Article](#)**: [https://www.linkedin.com/posts/gerges-zechariah_alx-activity-7216937002976346112-3vuF?utm_source=share&utm_medium=member_desktop]
- **Author's LinkedIn**: [Gerges-Creative](#)

## Inspiration and Story

When I first learned about programming and started practicing it, I realized my slow typing speed was a significant obstacle. I spent more time finding the keys than actually coding. I wondered if there was a way to improve my typing speed and if the fast typists I saw in movies were real or just cinematic effects. My search led me to several websites dedicated to teaching touch typing, and I was particularly impressed by TypingClub. It took me from knowing nothing about typing to achieving 45 WPM in about two months.

Inspired by my experience, I wanted to create a fun and educational typing game. I love video games, so I thought turning typing practice into a game would make the learning process more enjoyable. This project is the result of that inspiration.

## Technical Overview

### Technologies Used

For this project, I chose to use HTML5, CSS3, and JavaScript without any additional frameworks. I made this decision to solidify my understanding of these core web technologies and to challenge myself to build a fully functional game from scratch.

### Features

- **Difficulty Levels**: The game includes three difficulty levels: Easy, Normal, and Hard, each with its own time limit and word list.
- **Immediate Word Check**: Pressing the Enter key checks the word immediately, even before the timer runs out.
- **Score Display**: A section displays your current and last scores, and a description explains how the game works.
- **Time Management**: The timer dynamically adjusts based on the selected difficulty level.

### Technical Challenges and Solutions

#### Immediate Word Check

One of the most challenging features was implementing the immediate word check with the Enter key. Initially, the logic for checking the word was part of a larger function responsible for starting the game. This made it difficult to add the Enter key functionality without cluttering the code.

To solve this, I refactored my code by breaking it into smaller functions, each with a specific responsibility. I created a separate function for checking the word, which resolved the issue. However, this introduced a new problem: multiple 'Game Over' messages would appear if the Enter key was pressed repeatedly after the game ended.

To fix this, I implemented a flag that prevents the function from executing once the game is over. This approach ensured that the word check function only runs when necessary, improving both functionality and user experience.

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/typing-speed-test-game.git
    cd typing-speed-test-game
    ```

2. **Open the Project**:
    Open the `index.html` file in your preferred browser.

No additional dependencies or installations are required as this is a purely front-end project.

## Usage

1. **Select Difficulty**: Choose from three difficulty levels: Easy, Normal, or Hard.
2. **Start the Game**: Click on the "Start Playing" button to begin.
3. **Type the Words**: Type the words displayed on the screen within the given time limit.
4. **Press Enter**: Hit the Enter key to check your word immediately.
5. **View Scores**: Your current score and last score will be displayed at the end of each game.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to create a pull request or open an issue.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Related Projects

- [TypingClub](https://www.typingclub.com/): A great platform for learning and practicing typing.
- [Monkeytype](https://monkeytype.com/): An online typing test that measures typing speed and accuracy.

## Licensing

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## About the Author

Hi, I’m Gerges Zechariah, a Software Engineer starting my journey in programming and technology through the great opportunity I had from ALX. I love reading and playing video games. I’m excited for what comes ahead and doing my best and hardest to be prepared for my career path in the future.