function Intro({ start, startQuiz, description }) {

    return (
        <section className='intro'>
            <h1 className='quiz-title'>Quizzical</h1>
            <p className='quiz-description'>{ description }</p>

            <button 
                className='quiz-start-button' 
                onClick={ () => !start && startQuiz() }
            >
                Start quiz
            </button>
        </section>
    );
}


export default Intro ;
