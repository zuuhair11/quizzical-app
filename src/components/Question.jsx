import { decode } from 'html-entities' ;


function Question({ question, handleSelectingAnswers, checkedQuestion, increment }) {
    // Putting the answers in a random order
    const answers = [question.correctAnswer, ...question.incorrectAnswers].sort();


    return (
        <div className='card-question'>
            <h3>{ decode(question.question) }</h3>

            <ul className='answers'>
                {answers.map( (answer, index) => {
                    return (
                        <li key={ index }>
                            <input 
                                type='radio' 
                                className={ checkedQuestion ? (question.correctAnswer === answer ? 'correct' : question.selectedAnswer === answer ? 'wrong' : 'left') : undefined }
                                name={ question.category } 
                                id={ `${answer}_${increment}` } 
                                value={ question.selectedAnswer ? question.selectedAnswer : answer } 
                                checked={ question.selectedAnswer === answer }
                                onChange={ () => handleSelectingAnswers(question.id, answer) } 
                            />
                            <label 
                                htmlFor={ `${answer}_${increment}` } 
                            >
                                { decode(answer) } 
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


export default Question ;
