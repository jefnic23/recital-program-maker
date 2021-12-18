const title = document.getElementById("title");
const subtitle = document.getElementById('subtitle');
const performances = document.getElementById('performances');
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
    subtitle.innerHTML = subtitle_input.value.replace(/\r?\n/, "<br/>");
})

enter_performance.addEventListener("click", () => {
    var pieces = piece_input.value.split(/\r?\n/) || 'Untitled';
    var composers = composer_input.value.split(/\r?\n/) || "Anon.";
    var div = document.createElement("div");
    performances.appendChild(div);
    div.className = 'performance';
    div.setAttribute("onclick", "this.remove()");
    for (let i = 0; i < pieces.length; i++) {
        var filler = ' . ';
        var piece = "<b>" + pieces[i].trim() + "</b>" || 'Untitled';
        var composer = composers[i].trim() || "Anon.";
        var text = piece + filler + composer;
        var p = document.createElement("p");
        div.appendChild(p);
        p.className = "test";
        p.innerHTML = text;
        var text_width = Math.ceil(p.clientWidth);
        while (text_width < 450) {
            filler += ' . ';
            text = piece + filler + composer;
            p.innerHTML = text;
            text_width = Math.ceil(p.clientWidth);
            if (text_width > 450) {
                filler = filler.slice(0, -3);
                text = piece + filler + composer;
                p.innerHTML = text;
                break;
            }
        }
        p.className = "piece";
    }
    var p = document.createElement("p");
    div.appendChild(p);
    p.className = "performer";
    p.innerHTML = "<i>" + performer_input.value.trim() + "</i>";
    piece_input.value = '';
    composer_input.value = '';
    performer_input.value = '';
})