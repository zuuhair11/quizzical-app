import Question from './Question' ;


function Questions({ questions, handleSelectingAnswers, checkedQuestion, handleCheckAnswers, score }) {
    // To avoid duplication of the id value and htmlFor, cause sometimes when I have
    // Two questions they both their answers has to be true or false 
    // Letting the id hold the value of the answer whether true or false, it's gonna let you only select one
    let increment = 0;
    
    const questionsElement = questions.map( question => {
        increment += 1;
        return (
            <Question 
                key={ question.id } 
                question={ question } 
                handleSelectingAnswers={ handleSelectingAnswers } 
                checkedQuestion={ checkedQuestion } 
                increment={ increment }
            />
        );
    });
    

    return (
        <section className='questions-container'>
            { questionsElement }
            
            <div className='action'>
                { checkedQuestion &&  <p className='score'>You scored { score }/5 correct answers</p> }
                <button
                    className='check-answers-button'
                    onClick={ handleCheckAnswers }
                >
                    { !checkedQuestion ? 'Check answers' : 'Play again' }
                </button>
            </div>
        </section>
    );
}


export default Questions ;
