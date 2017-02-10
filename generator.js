"use strict";

window.onload = () => {

    let img = new Image();
    let x, y, w, h, d;
    let mouseX, mouseY, isDragging = false;
    let canvas = document.getElementById("achievement");
    let ctx = canvas.getContext("2d");
    canvas.height = 640;
    canvas.width = 640;
    let offsetX = canvas.width / 2;
    let offsetY = canvas.height / 2;

    function drawBackground() {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(-1, -1, 641, 641);
    }

    function drawMainImage() {
        if (img.src !== "" && (img.wight < 160 || img.height < 160)) {
            document.getElementById("image").value = "";
            alert("The image must be at least 160x160 pixels.");
        } else {
            ctx.drawImage(img, x, y, w, h);
            if (img.src !== "") {
                document.getElementById("options").style.display = "block";
            }
        }
    }

    function drawCovers() {
        ctx.fillRect(-1, -1, 641, 215);
        ctx.fillRect(-1, -1, 22, 641);
        ctx.fillRect(-1, 410, 641, 230);
        ctx.fillRect(624, -1, 22, 641);
    }

    function drawOuterBorder() {
        ctx.lineWidth = "5";
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(16.5, 16.5, 607, 607); 
    }

    function drawInnerBorder() {
        ctx.lineWidth = "5";
        ctx.strokeStyle = "#c2c2c2";
        ctx.strokeRect(21.5, 214.5, 597, 195);
    }

    function drawDisclaimer() {
        if (document.getElementById("disclaimer").checked) {
            let disclaimer = new Image();
            disclaimer.src = "disclaimer.png";
            disclaimer.onload = () => {
                ctx.drawImage(disclaimer, 385, 407);
            }    
        }
    }

    function drawTopText() {
        ctx.fillStyle = "#000000";
        ctx.font = "30px leagueGothic";
        let text = "Real Life Achievement Unlocked".toUpperCase();
        let xText = centerText(text);
        ctx.fillText(text, xText, 50);
    }

    function drawTitleText() {
        ctx.fillStyle = "#000000";
        ctx.font = "60px leagueGothic";
        let text = document.getElementById("title").value.toUpperCase();
        if (text !== "") {
            let fittingText;    
            let lastFittingChar = 0;
            for (let i = 0; i < text.length; i++) {
                if (!isTooLong(text.substring(0, i))) {
                    lastFittingChar = i;
                }
                fittingText = text.substring(0, lastFittingChar+1);
            }
            let xText = centerText(fittingText);
            ctx.fillText(fittingText, xText, 150);
        }
    }

    function drawWatermark() {
        ctx.fillStyle = "#fefefe";

        ctx.font = "110px leagueGothic";
        let text = "generated @";
        let xText = centerText(text);
        ctx.fillText(text, xText, 500);

        ctx.font = "156px leagueGothic";
        text = "www.alaric.us";
        xText = centerText(text);
        ctx.fillText(text, xText, 619);
    }

    function drawDescriptionText() {
        ctx.fillStyle = "#000000";
        ctx.font = "40px leagueGothic";
        let text = document.getElementById("description").value;
        let position = 0;

        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) !== "\n" && isTooLong(text.substring(position, i))) {
                text = text.substring(0, i) + "\n" + text.slice(i);
                position = i;
            } else if (text.charAt(i) === "\n") {
                position = i;
            }
        }

        let lines = text.split("\n");    
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].length === 0) {
                lines.splice(i, 1);
            }
        }
        if (lines.length > 3) {
            lines.splice(3, lines.length - 3);
        }

        if (lines.length === 1) { ctx.fillText(lines[0], centerText(lines[0]), 520); }
        if (lines.length === 2) { ctx.fillText(lines[0], centerText(lines[0]), 487); ctx.fillText(lines[1], centerText(lines[1]), 553); }
        if (lines.length === 3) { ctx.fillText(lines[0], centerText(lines[0]), 460); ctx.fillText(lines[1], centerText(lines[1]), 525); ctx.fillText(lines[2], centerText(lines[2]), 590); }
    }

    function centerText(txt) {
        return (ctx.canvas.width - ctx.measureText(txt).width) / 2;
    }

    function isTooLong(txt) {
        return ctx.measureText(txt).width >= 500 ? true : false;
    }

    function drawAll() {
        drawBackground();
        ctx.translate(offsetX, offsetY);
        ctx.rotate(d * Math.PI / 180); 
        drawMainImage();
        ctx.rotate(-d * Math.PI / 180); 
        ctx.translate(-offsetX, -offsetY);
        drawCovers()  
        drawOuterBorder();
        drawInnerBorder();
        drawDisclaimer();
        drawTopText();
        drawTitleText();
        drawWatermark();
        drawDescriptionText();
    }

    let dlButton = document.getElementById("download");
    dlButton.addEventListener("click", (e) => {
        let dataURL = canvas.toDataURL("image/png");
        dlButton.href = dataURL;
    });

    let title = document.getElementById("title");
    title.addEventListener("input", (e) => {
        drawAll();
    });

    let description = document.getElementById("description");
    description.addEventListener("input", (e) => {
        drawAll();
    });

    let disclaimer = document.getElementById("disclaimer");
    disclaimer.addEventListener("change", (e) => {
        drawAll();
    });

    let zoom = document.getElementById("zoom");
    zoom.addEventListener("input", (e) => {
        let perc = zoom.value;
        document.getElementById("percent").innerHTML = perc + "%";
        w = img.width * perc / 100;
        h = img.height * perc / 100;
        x = w / -2;
        y = h / -2;
        drawAll();
    });

    let rotate = document.getElementById("rotation");
    rotate.addEventListener("input", (e) => {
        d = rotate.value;
        document.getElementById("degree").innerHTML = d + "&deg";
        drawAll();
    });

    let reloadzoom = document.getElementById("reloadzoom");
    reloadzoom.addEventListener("click", (e) => {
        document.getElementById("zoom").value = 100;
        document.getElementById("percent").innerHTML = "100%";
        w = img.width;
        h = img.height;
        x = w / -2;
        y = h / -2;
        drawAll();
    });

    let reloadrotation = document.getElementById("reloadrotation");
    reloadrotation.addEventListener("click", (e) => {
        document.getElementById("rotation").value = 0;
        d = 0;
        document.getElementById("degree").innerHTML = "0&deg";
        drawAll();
    });

    let image = document.getElementById("image");
    image.addEventListener("change", () => {
        let file = new FileReader();
        file.addEventListener("loadend", (arg) => {
            img.onload = () => {
                w = img.width;
                h = img.height;
                x = w / -2;
                y = h / -2;
                drawAll();
            }
            img.src = file.result;
        });
        file.readAsDataURL(image.files[0]);
    });

    canvas.addEventListener("mousedown", (e) => {
        e.preventDefault();
        if (e.layerX > x+offsetX && e.layerX < x+w+offsetX && e.layerY > y+offsetY && e.layerY < y+h+offsetY) {
            mouseX = e.layerX;
            mouseY = e.layerY;
            isDragging = true;
        }
    }, false);

    canvas.addEventListener("mousemove", (e) => {
        e.preventDefault();
        if (isDragging) {  
            x += e.layerX - mouseX;
            y += e.layerY - mouseY;
            mouseX = e.layerX;
            mouseY = e.layerY;
            canvas.style.cursor = "default";
            drawAll();
        }
    }, false);

    canvas.addEventListener("mouseup", (e) => {
        e.preventDefault();
        isDragging = false;
        drawAll();
    }, false);

    canvas.addEventListener("mouseout", (e) => {
        e.preventDefault();
        isDragging = false;
        drawAll();
    }, false);

    drawAll(); 
};