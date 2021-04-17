import React from 'react';
// import GNI from './GNI.png';

function Search({ handleInput, search }) {
    return (
        <>
            <div className='element'>
                {/* <img id='GNI' src={GNI} alt='Girls' Night In Neon' /> */}
            </div>
            <section className="searchbox-wrap">
                <input
                    type="text"
                    placeholder="What would you like to watch?"
                    className="searchbox"
                    onChange={handleInput}
                    onKeyPress={search}
                />
            </section>
        </>
    )
}

export default Search;