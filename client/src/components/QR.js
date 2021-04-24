// utilizing qrcode npm vs qrcode.react npm, better documentation and still supports react development

//canvasElement
// Type: DOMElement
// Canvas where to draw QR Code.

import QRCode from "qrcode";
import React from "react";
import axios from "axios";

export default class Qrcode extends React.Component {
  generateQR() {

    let apiurl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

    axios.get(apiurl + "&i=" + this.props.selected.imdbID).then(({ data }) => {

      let imdbID = this.props.selected.imdbID;

      let str = "http://www.imdb.com/title/" + imdbID + "/?ref_=fn_al_tt_1";
      QRCode.toCanvas(document.getElementById("canvas"), str, function (error) {
        if (error) console.error(error);
      });
    });
  }

  render() {
    this.generateQR();
    return (
      <div align="left">
          {/* <button className="close" onClick={this.generateQR}>Share</button> */}
          <p></p>
          <canvas id="canvas" />
        
      </div>
    );
  }
}
