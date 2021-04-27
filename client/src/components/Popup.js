import React from 'react'
import Qrcode from './QR'

function Popup({ selected, closePopup, favorite, favoriteDelete }) {
    return (
        <section className="popup">
            <div className="content">
                <h2>{selected.Title} <span>({selected.Year})</span></h2>
                <p className="rating">Rating: {selected.imdbRating}</p>
                <div className="plot">
                    <img src={selected.Poster} alt='movie poster' />
                    <p>{selected.Plot}</p>
                </div>

                <button className="popupBtn" onClick={closePopup}>Close</button>
                <p></p>
                <button className="popupBtn" onClick={favorite}>Favorite</button>
                <p></p>
                <button className="delete" onClick={favoriteDelete}>Delete</button>
                <p></p>
                <Qrcode selected={selected} />
            </div>
        </section>
    )
}

export default Popup