import { nanoid } from 'nanoid' ;
import Confetti from 'react-confetti' ;
import { useState, useEffect } from 'react' ;
import { useWindowSize } from 'react-use' ;
import Intro from './components/Intro' ;
import Spinner from './shared/Spinner' ;
import Questions from './components/Questions' ;


function App() {
    const {width, height} = useWindowSize() ;
    const [start, setStart] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [checkedQuestion, setCheckedQuestion] = useState(false);
    const [score, setScore] = useState(0);
    const [playAgain, setPlayAgain] = useState(1);
    

    // Handle clicking start the quiz button, if so render the questions component
    function startQuiz() {
        setStart(true);
    }

    // Any answer get clicked will stored its value to the selectedAnswer's question object
    function selectingAnswers(id, selectedAnswer) {
        setQuestions( prevQuestions => {
            return prevQuestions.map( question => {
                if(question.id === id) {
                    return {
                        ...question,
                        selectedAnswer: selectedAnswer,
                        checked: true
                    };
                } else {
                    return question;
                }
            });
        });
    }

    // Handeling the click check answers as well as play again
    function checkAnswers() {
        // Handle playing again
        if(checkedQuestion) {
            setQuestions([]);
            setIsLoading(true);
            setCheckedQuestion(false);
            setPlayAgain( prevSetPlayAgain => prevSetPlayAgain + 1 );
            return ;

        } else {
            // Check if all questions are checked, if so
            setCheckedQuestion( () => {
                return questions.every( question => question.checked );
            });
            // Then let me know how many answers are correct
            setScore( () => {
                return questions.filter( question => question.correctAnswer === question.selectedAnswer).length;
            });
        }
    }

    // Fetching the data from the database and stop displaying the Spinner component 
    async function fetchQuestions() {
        const response = await fetch('https://opentdb.com/api.php?amount=5&category=18');
        const data = await response.json();
        setQuestions( () => {
            return data.results.map( (item, index) => {
                return {
                    id: nanoid(),
                    question: item.question,
                    correctAnswer: item.correct_answer,
                    incorrectAnswers: item.incorrect_answers,
                    category: `category${ index + 1 }`,
                    selectedAnswer: '',
                    checked: false
                }
            });
        });

        setIsLoading(false);
    }
    
    // Whenever the user click play again fetch a new data from the database again
    useEffect( () => {
        fetchQuestions();

    }, [playAgain]);
    
    
    return (
        <div className='container'>
            { checkedQuestion && <Confetti width={ width } height={ height } /> }
            {
                !start 
                ? <Intro 
                    description='Dive into the world of IT with our interactive quiz and test your knowledge!'
                    start={ start } 
                    startQuiz={ startQuiz } 
                />
                
                : isLoading ? <Spinner />
                : <Questions 
                    questions={ questions } 
                    handleSelectingAnswers={ selectingAnswers } 
                    checkedQuestion={ checkedQuestion } 
                    handleCheckAnswers={ checkAnswers } 
                    score={ score }
                />
            }
        </div>
    );
}


export default App ;
