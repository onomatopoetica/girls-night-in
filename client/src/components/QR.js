// utilizing qrcode npm vs qrcode.react npm, better documentation and still supports react development

//canvasElement
// Type: DOMElement
// Canvas where to draw QR Code.



import QRCode from 'qrcode'
import React from 'react'
import axios from 'axios'
import id from '../App.js'

export default class Qrcode extends React.Component {
     
     generateQR() {

          console.log(id);
           
          let apiurl = 'http://www.omdbapi.com/?apikey=6d71121d';
          axios.get(apiurl + '&i=' + id).then(({data}) => {
               console.log(data);

          let imdbID = data.imdbID;

          console.log(imdbID);

          let str = 'http://www.imdb.com/title/' + imdbID +'/?ref_=fn_al_tt_1'
          QRCode.toCanvas(document.getElementById('canvas'), str, function(error) {
               if (error) console.error(error)
          })})
     }

     render() {
          this.generateQR();
     return (
          <div align="center">
               <canvas id="canvas" />
               <button onClick={this.generateQr}>
                    Share
               </button>
          </div>
     )}
}
