// utilizing qrcode npm vs qrcode.react npm, better documentation and still supports react development

//canvasElement
// Type: DOMElement
// Canvas where to draw QR Code.

import QRCode from 'qrcode'
export class Qrcode extends Component {
generateQR() {
     let imdbID = 'call api in here'
     let str = 'http://www.imdb.com/title/' + imdbID +'/?ref_=fn_al_tt_1'
     QRCode.toCanvas(document.getElementById('canvas'), str, function(error) {
          if (error) console.error(error)
     })
}
render() {
return (
<div align="center">
     <canvas id="canvas" />
     <button onClick={this.generateQr}>
          Share
     </button>
</div>
)}}