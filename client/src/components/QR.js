import QRCode from "qrcode";
import React from "react";
import axios from "axios";

export default class Qrcode extends React.Component {
  generateQR() {

    let apiurl = `https://www.omdbapi.com/?apikey=28764646`;

    axios.get(apiurl + "&i=" + this.props.selected.imdbID).then(({ data }) => {

      let imdbID = this.props.selected.imdbID;

      let str = "https://www.imdb.com/title/" + imdbID + "/?ref_=fn_al_tt_1";
      QRCode.toCanvas(document.getElementById("canvas"), str, function (error) {
        if (error) console.error(error);
      });
    });
  }

  render() {
    this.generateQR();
    return (
      <div align="center">
        <p></p>
        <canvas id="canvas" />

      </div>
    );
  }
}
