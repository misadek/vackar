        const questions = [
            {
                question: "Jaký je součet vnitřních úhlů v trojúhelníku?",
                options: ["90°", "180°", "270°", "360°"],
                correctAnswer: 1,
                explanation: "Součet vnitřních úhlů v jakémkoliv trojúhelníku je vždy 180°."
            },
            {
                question: "Který z následujících vzorců platí pro obsah trojúhelníku?",
                options: ["S = a × b", "S = (a × v<sub>a</sub>) / 2", "S = πr²", "S = a² + b²"],
                correctAnswer: 1,
                explanation: "Obsah trojúhelníku se vypočítá jako polovina součinu délky strany a příslušné výšky: S = (a × v<sub>a</sub>) / 2."
            },
            {
                question: "Který trojúhelník má všechny strany stejně dlouhé?",
                options: ["Rovnoramenný", "Rovnostranný", "Pravoúhlý", "Tupoúhlý"],
                correctAnswer: 1,
                explanation: "Rovnostranný trojúhelník má všechny tři strany stejně dlouhé a všechny úhly 60°."
            },
            {
                question: "Jak se nazývá čtyřúhelník, který má obě dvojice protilehlých stran rovnoběžné?",
                options: ["Lichoběžník", "Kosočtverec", "Rovnoběžník", "Deltoid"],
                correctAnswer: 2,
                explanation: "Rovnoběžník má obě dvojice protilehlých stran rovnoběžné a stejně dlouhé."
            },
            {
                question: "Jaký je vzorec pro obvod kruhu?",
                options: ["o = πr²", "o = 2πr", "o = 4a", "o = a + b + c"],
                correctAnswer: 1,
                explanation: "Obvod kruhu (kružnice) se vypočítá podle vzorce o = 2πr, kde r je poloměr."
            },
            {
                question: "Která z následujících vlastností platí pro obdélník?",
                options: [
                    "Všechny strany jsou stejně dlouhé",
                    "Úhlopříčky jsou na sebe kolmé",
                    "Všechny vnitřní úhly jsou pravé",
                    "Nemá žádné rovnoběžné strany"
                ],
                correctAnswer: 2,
                explanation: "Obdélník má všechny vnitřní úhly pravé (90°), protilehlé strany stejně dlouhé a rovnoběžné a úhlopříčky stejně dlouhé."
            },
            {
                question: "Jak se nazývá úsečka spojující dva body na kružnici?",
                options: ["Tečna", "Tětiva", "Sečna", "Poloměr"],
                correctAnswer: 1,
                explanation: "Tětiva je úsečka spojující dva body na kružnici. Nejdelší tětivou je průměr."
            },
            {
                question: "Která věta platí pro pravoúhlý trojúhelník?",
                options: [
                    "Eukleidova věta",
                    "Pythagorova věta",
                    "Thaletova věta",
                    "Všechny uvedené"
                ],
                correctAnswer: 3,
                explanation: "Všechny uvedené věty platí pro pravoúhlý trojúhelník. Pythagorova: c² = a² + b², Eukleidovy o odvěsnách a výšce, Thaletova o trojúhelníku opsaném půlkružnicí."
            },
            {
                question: "Kolik stupňů má přímý úhel?",
                options: ["45°", "90°", "180°", "360°"],
                correctAnswer: 2,
                explanation: "Přímý úhel má 180° a vypadá jako přímka."
            },
            {
                question: "Jaký je vzorec pro obsah čtverce?",
                options: ["S = 4a", "S = a × b", "S = a²", "S = (a × v<sub>a</sub>) / 2"],
                correctAnswer: 2,
                explanation: "Obsah čtverce se vypočítá jako druhá mocnina délky strany: S = a²."
            }
        ];

        const testContainer = document.getElementById('testContainer');
        const resultContainer = document.getElementById('resultContainer');
        const currentQuestionEl = document.getElementById('currentQuestion');
        const totalQuestionsEl = document.getElementById('totalQuestions');
        const correctAnswersEl = document.getElementById('correctAnswers');
        const scorePercentageEl = document.getElementById('scorePercentage');
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        const finalScoreEl = document.getElementById('finalScore');
        const resultMessageEl = document.getElementById('resultMessage');
        const restartButton = document.getElementById('restartButton');

        let currentQuestionIndex = 0;
        let userAnswers = Array(questions.length).fill(null);
        let correctAnswersCount = 0;

        function initTest() {
            totalQuestionsEl.textContent = questions.length;
            renderQuestion();
        }

        function renderQuestion() {
            const question = questions[currentQuestionIndex];
            
            let questionHTML = `
                <div class="question-container">
                    <div class="question-number">${currentQuestionIndex + 1}</div>
                    <div class="question-text">${question.question}</div>
                    <div class="options-container">
            `;
            
            question.options.forEach((option, index) => {
                let optionClass = 'option';
                if (userAnswers[currentQuestionIndex] !== null && userAnswers[currentQuestionIndex] === index) {
                    optionClass += ' selected';
                }
                if (userAnswers[currentQuestionIndex] !== null) {
                    if (index === question.correctAnswer) {
                        optionClass += ' correct';
                    } else if (userAnswers[currentQuestionIndex] === index && index !== question.correctAnswer) {
                        optionClass += ' incorrect';
                    }
                }
                
                questionHTML += `
                    <div class="${optionClass}" data-index="${index}">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        ${option}
                    </div>
                `;
            });
            
            questionHTML += `</div></div>`;
            

            testContainer.insertBefore(createElementFromHTML(questionHTML), document.querySelector('.test-controls'));
            
            currentQuestionEl.textContent = currentQuestionIndex + 1;
            prevButton.disabled = currentQuestionIndex === 0;
            nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Dokončit' : 'Další';
            
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', () => selectOption(option));
            });
        }

        function createElementFromHTML(htmlString) {
            const div = document.createElement('div');
            div.innerHTML = htmlString.trim();
            return div.firstChild;
        }

        function selectOption(optionElement) {
            if (userAnswers[currentQuestionIndex] !== null) return;
            
            const selectedIndex = parseInt(optionElement.getAttribute('data-index'));
            userAnswers[currentQuestionIndex] = selectedIndex;
            
            const question = questions[currentQuestionIndex];
            if (selectedIndex === question.correctAnswer) {
                correctAnswersCount++;
                correctAnswersEl.textContent = correctAnswersCount;
                updateScore();
            }
            
            optionElement.classList.add('selected');
            
            document.querySelectorAll('.option').forEach(opt => {
                const optIndex = parseInt(opt.getAttribute('data-index'));
                if (optIndex === question.correctAnswer) {
                    opt.classList.add('correct');
                } else if (optIndex === selectedIndex && optIndex !== question.correctAnswer) {
                    opt.classList.add('incorrect');
                }
            });
        }

        function updateScore() {
            const percentage = Math.round((correctAnswersCount / questions.length) * 100);
            scorePercentageEl.textContent = `${percentage}%`;
        }

        function nextQuestion() {
            document.querySelector('.question-container').remove();
            
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                renderQuestion();
            } else {
                finishTest();
            }
        }

        function prevQuestion() {
            document.querySelector('.question-container').remove();
            currentQuestionIndex--;
            renderQuestion();
        }

function finishTest() {
    testContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    const percentage = Math.round((correctAnswersCount / questions.length) * 100);
    finalScoreEl.textContent = `${percentage}%`;
    
    let message = "";
    let emoji = "😐";
    
    if (percentage >= 90) {
        message = "Výborně! Máte výborné znalosti planimetrie. Jste připraveni na složitější geometrické problémy!";
        emoji = "🎉";
    } else if (percentage >= 70) {
        message = "Dobrá práce! Vaše znalosti planimetrie jsou nadprůměrné, ale ještě je co vylepšovat.";
        emoji = "🙂";
    } else if (percentage >= 50) {
        message = "Průměrný výsledek. Doporučujeme projít si znovu základní pojmy a vlastnosti geometrických útvarů.";
        emoji = "😐";
    } else {
        message = "Vaše znalosti planimetrie jsou zatím nedostatečné. Doporučujeme začít s opakováním základů.";
        emoji = "😢";
    }
    
    resultMessageEl.textContent = message;
    
    // Přidej změnu emoji
    const resultIcon = document.querySelector('.result-icon');
    resultIcon.textContent = emoji;
}

        function restartTest() {
            currentQuestionIndex = 0;
            userAnswers = Array(questions.length).fill(null);
            correctAnswersCount = 0;
            
            correctAnswersEl.textContent = '0';
            scorePercentageEl.textContent = '0%';
            
            testContainer.style.display = 'block';
            resultContainer.style.display = 'none';
            
            renderQuestion();
        }

        nextButton.addEventListener('click', nextQuestion);
        prevButton.addEventListener('click', prevQuestion);
        restartButton.addEventListener('click', restartTest);

        initTest();