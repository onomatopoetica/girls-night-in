import React from 'react';


function Search({ handleInput, search }) {
    return (
        <>
            <div className='element'>

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