import MyCanvas from "./canvasSetup.js";
import {
    clearBtn,
    cnnStatus,
    imgGrad,
    predContainer,
    predictBtn,
    predictionBars,
    uploadImgBtn, uploadImgInput,
    useCnn
} from "./domSelects.js";


document.addEventListener("DOMContentLoaded", function() {
    const canvas = new MyCanvas();

    clearBtn.addEventListener("click", () => {
        canvas.clearCanvas();
        resetBars();
    });

    predictBtn.addEventListener("click", async () => {
        const imgData = canvas.getDrawnImg();
        console.log(imgData.length);
        console.log(imgData);
        console.log(useCnn.checked);

        let predictions;
        if (useCnn.checked) {
            predictions = await eel.predict_digit_cnn(imgData)();
        } else {
            predictions = await eel.predict_digit(imgData)();
        }
        console.log(predictions);

        Array.from(predictionBars).map((bar, i) => {
            const predKey = bar.id.split("-")[1];
            const predValue = predictions[predKey];
            console.log(predValue);
            // bar.classList.add(`h-[${predValue}%]`);
            bar.style.height = `${predValue}%`;
        })

    });

    function resetBars () {
        Array.from(predictionBars).map((bar, i) => {
            bar.style.height = `0`;
        })
    }

    useCnn.addEventListener("change", (e) => {
        if (e.target.checked) {
            cnnStatus.innerText = "Using CNN";
            // predContainer.style.backgroundImage = "url('mutantTren.webp')";
            imgGrad.classList.add("apply-grad");
        } else {
            predContainer.style.backgroundImage = null;
            cnnStatus.innerText = "Neural Net";
            imgGrad.classList.remove("apply-grad");
        }
    });

})


