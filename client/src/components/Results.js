import React from 'react';
import Result from './Result';

function Results({ results, openPopup }) {
    return (
        <section className="results">
            {results.map((result, index) => (
                <Result key={index} result={result} openPopup={openPopup} />
            ))}
        </section>
    )
}

export default Results;