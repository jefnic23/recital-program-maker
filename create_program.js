const title = document.getElementById("title");
const subtitle = document.getElementById('subtitle');
const performers = document.getElementById('performers');
const title_input = document.getElementById('titleInput');
const subtitle_input = document.getElementById('subtitleInput');
const piece_input = document.getElementById("pieceInput");
const composer_input = document.getElementById("composerInput");
const performer_input = document.getElementById("performerInput");
const enter_performance = document.getElementById("enterPerformance");

title_input.addEventListener("input", () => {
    title.innerHTML = title_input.value;
})

subtitle_input.addEventListener("input", () => {
    subtitle.innerHTML = subtitle_input.value.replace(/\\/g, "<br/>");
})

enter_performance.addEventListener("click", () => {
    var pieces = piece_input.value.split(/\\/g) || 'Untitled';
    var composers = composer_input.value.split(/\\/g) || "Anon.";
    for (let i = 0; i < pieces.length; i++) {
        var filler = ' . ';
        var piece = pieces[i] || 'Untitled';
        var composer = composers[i] || "Anon.";
        var text = piece + filler + composer;
        var text_width = getTextWidth(text, getCanvasFontSize(performers));
        while (text_width < 450) {
            filler += ' . ';
            text = piece + filler + composer;
            text_width = getTextWidth(text, getCanvasFontSize(performers));
            if (text_width >= 450) {
                break;
            }
        }
        performers.innerHTML = text + "<br/>";
    }
})

function getTextWidth(text, font) {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}
  
function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFontSize(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '12px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Helvetica';
    return `${fontWeight} ${fontSize} ${fontFamily}`;
}