import {myCanvas} from "./domSelects.js";

const HEIGHT = 28;
const WIDTH = 28;
const SCALE = 10;

class MyCanvas {
    constructor() {
        this.ctx = myCanvas.getContext("2d");
        this.isDrawing = false;
        this.setUpCanvas();
    }

    setUpCanvas() {
        myCanvas.width = WIDTH;
        myCanvas.height = HEIGHT;
        myCanvas.style.width = `${WIDTH * SCALE}px`;
        myCanvas.style.height = `${HEIGHT * SCALE}px`;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 1.2;

        myCanvas.addEventListener("mousedown", (e) => this.startDrawing(e));
        myCanvas.addEventListener("mousemove", (e) => this.draw(e));
        myCanvas.addEventListener("mouseup", (e) => this.stopDrawing(e));
        myCanvas.addEventListener("mouseout", (e) => this.stopDrawing(e));
    }

    startDrawing(e) {
        // console.log("Starting Drawing...");
        const {offsetX, offsetY} = e;
        const scaledX = offsetX / SCALE;
        const scaledY = offsetY / SCALE;
        this.ctx.beginPath();
        this.ctx.moveTo(scaledX, scaledY);
        this.isDrawing = true;
    }

    draw (e) {
        if (!this.isDrawing) return;
        const {offsetX, offsetY} = e;
        const scaledX = offsetX / SCALE;
        const scaledY = offsetY / SCALE;
        // console.log("Drawing...");

        this.ctx.lineTo(scaledX, scaledY);
        this.ctx.stroke();
    }

    stopDrawing (e) {
        // console.log("Stopped Drawing...");
        this.ctx.closePath();
        this.isDrawing = false;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    getDrawnImg () {
        const imageData = this.ctx.getImageData(0, 0, WIDTH, HEIGHT);
        const greyScaleData = []
        for (let i = 0; i < imageData.data.length; i+=4) {
            greyScaleData.push(imageData.data[i]);
        }
        return greyScaleData;
    }

    unsubscribe () {
        myCanvas.removeEventListener("mousemove", (e) => this.draw());
        myCanvas.removeEventListener("mouseup", (e) => this.stopDrawing());
        myCanvas.removeEventListener("mouseout", (e) => this.stopDrawing());
        myCanvas.removeEventListener("mousedown", (e) => this.startDrawing());
    }

}



export default MyCanvas;
