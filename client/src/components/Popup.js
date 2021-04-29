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

                <div className="buttonDiv">
                    <button id="close" className="popupBtn" onClick={closePopup}>Close</button>

                    <button id="favorite" className="popupBtn" onClick={favorite}>Favorite</button>

                    <button id="delete" className="delete" onClick={favoriteDelete}>Delete</button>
                </div>
                <div>
                    <Qrcode selected={selected} />
                    <h6 align="center">
                        Scan here to open movie page!
                </h6>
                </div>
            </div>
        </section>
    )
}

export default Popup