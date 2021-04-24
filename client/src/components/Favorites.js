import React from 'react'
import Qrcode from './QR'

// function Popup({ selected, closePopup, favorite, generateQR }) {
//     return (
//         <section className="popup">
//             <div className="content">
//                 <h2>{selected.Title} <span>({selected.Year})</span></h2>
//                 <p className="rating">Rating: {selected.imdbRating}</p>
//                 <div className="plot">
//                     <img src={selected.Poster} alt='movie poster' />
//                     <p>{selected.Plot}</p>
//                 </div>
                
//                 <button className="popupBtn" onClick={closePopup}>Close</button>
//                 <p></p>
//                 <button className="popupBtn" onClick={favorite}>Favorite</button>
//                 <p></p>
//                 <Qrcode selected={selected}/>
//             </div>
//         </section>
//     )
// }

// export default Popup

const favoriteMovie = (selected, closePopup) => {
    return (
        <div>
            <div className="content">
                <h1>Favorites Page</h1>
                <button className="popupBtn" onClick={closePopup}>Close</button>
                <p></p>
                <h2>{selected.Title} <span>({selected.Year})</span></h2>
                <p className="rating">Rating: {selected.imdbRating}</p>

                <div className="plot">
                    <img src={selected.Poster} alt='movie poster' />
                    <p>{selected.Plot}</p>
                </div>
                
                <Qrcode selected={selected}/>
            </div>
        </div>
    )
}

export default favoriteMovie