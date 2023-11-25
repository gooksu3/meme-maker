const canvas=document.querySelector("canvas");
const color=document.querySelector("#color");
const saveBtn=document.querySelector("#save");
const colorOptions=Array.from(document.getElementsByClassName("color-option"));
const fontKind=document.getElementById("combo_font")
const modeBtn=document.getElementById("mode-btn");
const destroyBtn=document.getElementById("destroy-btn");
const eraserBtn=document.getElementById("eraser-btn");
const fileInput=document.getElementById("file");
const textInput=document.getElementById("text");
const fontSizeInput=document.querySelector("#font-box input");
const fontUpBtn=document.getElementsByClassName("text-box__font-btn")[0];
const fontDownBtn=document.getElementsByClassName("text-box__font-btn")[1];
const comboFont=document.getElementById("combo_font");
const ctx=canvas.getContext("2d");
const boldBtn=document.querySelector(".toggle-btn.bold");
const fillBtn=document.querySelector(".toggle-btn.fill-stroke")
canvas.width=800;
canvas.height=800;
const lineWidth=document.querySelector("#line-width");
ctx.lineCap="round";
const CANVAS_WIDTH=800;
const CANVAS_HIEGHT=800;

ctx.lineWidth=lineWidth.value;

let isPainting=false;
let isFilling=false;
// font
arrayFonts=['NanumGothic.ttf', 'NanumGothicBold.ttf', 'NanumGothicExtraBold.ttf', 'NanumGothicLight.ttf']
arrayFonts.forEach(function(font){
    const option=document.createElement("option");
    const fontName=font.replace('.ttf',"")
    option.innerText=fontName;
    comboFont.append(option);
})

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY)
}
function startPainting(event){
    isPainting=true;
}
function cancelPainting(event){
    isPainting=false;
    ctx.beginPath();
}
function onLineWidthChange(event){
    ctx.lineWidth=event.target.value
}
function onColorChange(event){
    let colorSelected="";
    if(event.type==="change"){
        colorSelected=event.target.value;
    }else if(event.type==="click"){
        colorSelected=event.target.dataset.color;
    }
    ctx.strokeStyle=colorSelected;
    ctx.fillStyle=colorSelected;
    color.value=colorSelected;
}
function onModeClick(event){
    if(isFilling){
        isFilling=false;
        modeBtn.innerText="🫗Fill";
    }else{
        isFilling=true;
        isPainting=false;
        modeBtn.innerText="✏️Drow";
    }
}
function onCanvasClick(event){
    if (isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HIEGHT);
    }
}
function onDestroyClick(event){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HIEGHT);
}
function onEraserClick(event){
    ctx.strokeStyle="white";
    isFilling=false;
    modeBtn.innerText="🫗Fill";
}
function onFileChange(event){
    const file=event.target.files[0];
    const url=URL.createObjectURL(file)
    const image=new Image();
    image.src=url;
    image.onload=function(){
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HIEGHT);
        fileInput.value=null;
    }
}
function onDoubleClick(event){
    const text=textInput.value;
    if(text!==""){
        ctx.save();
        ctx.lineWidth=1;
        const fontSelected=fontKind.options[Number(fontKind.selectedIndex)].innerText;
        let f=new FontFace(fontSelected,`url(./fonts/${fontSelected}.ttf")`)
        f.load().then(() => {
            // Ready to use the font in a canvas context
        });
        if (boldBtn.innerText!=="Bold"){
            ctx.font=`${Number(fontSizeInput.value)*10}px ${fontSelected}`
        }
        else{
            console.dir(boldBtn)
            ctx.font=`bold ${Number(fontSizeInput.value)*10}px ${fontSelected}`
        }
        if (fillBtn.innerText==="Fill"){
            ctx.fillText(text,event.offsetX,event.offsetY);
        }else{
            ctx.strokeText(text,event.offsetX,event.offsetY);
        }
        ctx.restore()
    } 
}
function onBoldClick(event){
    event.target.classList.toggle("toggle");
    if (event.target.innerText==="Bold"){
        event.target.innerText="NoBold"
    }else{
        event.target.innerText="Bold"
    }
}
function onSaveClick(event){
    const url=canvas.toDataURL();
    const a=document.createElement("a")
    a.href=url
    a.download="myDrawing.png"
    a.click();
}
function onFontSizeUpClick(event){
    let fontSize=Number(fontSizeInput.value);
    fontSize=fontSize+1;
    fontSizeInput.value=fontSize;   
}
function onFontSizeDownClick(event){
    let fontSize=Number(fontSizeInput.value);
    if (fontSize!==1){
        fontSize=fontSize-1;
        fontSizeInput.value=fontSize; 
    }
}
function onFillStrokeClick(event){
    fillBtn.classList.toggle("toggle");
    if (fillBtn.innerText==="Stroke"){
        fillBtn.innerText="Fill";
    }else{
        fillBtn.innerText="Stroke";
    }
}

canvas.addEventListener("mousemove",onMove)
// 위와 동일함.
// canvas.onmousemove=function(){
// }
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("click",onCanvasClick);
canvas.addEventListener("mouseleave",cancelPainting);
lineWidth.addEventListener("change",onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color=>color.addEventListener('click',onColorChange));
modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click",onEraserClick);
fileInput.addEventListener("change",onFileChange);
canvas.addEventListener("dblclick",onDoubleClick);
saveBtn.addEventListener("click",onSaveClick);
fontUpBtn.addEventListener("click",onFontSizeUpClick);
fontDownBtn.addEventListener("click",onFontSizeDownClick);
boldBtn.addEventListener("click",onBoldClick);
fillBtn.addEventListener("click",onFillStrokeClick)