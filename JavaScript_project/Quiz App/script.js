const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars"
    }
    // Add more quiz questions here
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const nextBtn = document.getElementById('nextBtn');
  const resultElement = document.getElementById('result');

  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    optionsElement.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option-btn');
      button.addEventListener('click', () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
  }

  function checkAnswer(selectedOption) {
    const currentQuizData = quizData[currentQuestion];
    if (selectedOption === currentQuizData.answer) {
      score++;
      resultElement.textContent = 'Correct!';
    } else {
      resultElement.textContent = `Wrong! The correct answer is ${currentQuizData.answer}.`;
    }
    nextBtn.style.display = 'block';
  }

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
      nextBtn.style.display = 'none';
      resultElement.textContent = '';
    } else {
      showResults();
    }
  }

  function showResults() {
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    nextBtn.style.display = 'none';
    resultElement.textContent = `Quiz completed. Your score: ${score} out of ${quizData.length}.`;
  }

  loadQuestion();

  nextBtn.addEventListener('click', nextQuestion);