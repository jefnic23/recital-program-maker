const program = document.getElementById('program');
const selector = document.getElementById('selector');
const title = document.getElementById("title");
const title_font_family = document.getElementById('titleFontFamily');
const title_font_size = document.getElementById('titleFontSize');
const subtitle = document.getElementById('subtitle');
const performances = document.getElementById('performances');
const title_input = document.getElementById('titleInput');
const subtitle_input = document.getElementById('subtitleInput');
const piece_input = document.getElementById("pieceInput");
const composer_input = document.getElementById("composerInput");
const performer_input = document.getElementById("performerInput");
const enter_performance = document.getElementById("enterPerformance");
const font_link_base = "http://fonts.googleapis.com/css?family=";

// # of program pages; if > 2 make booklet mode
var pages = 1;

// create mini page views for toggling
function clonePage(number) {
    var page = document.getElementById(`page${number}`);
    var page_clone = page.cloneNode(true);
    selector.appendChild(page_clone);
    page_clone.classList.add("mini-page");
    page_clone.id = `page${number}Clone`;
}

clonePage(pages);

function updateClone(number) {
    var page = document.getElementById(`page${number}`);
    var old_clone = document.getElementById(`page${number}Clone`);
    var new_clone = page.cloneNode(true);
    new_clone.classList.add("mini-page");
    new_clone.id = `page${number}Clone`;
    old_clone.replaceWith(new_clone);
}

// get page height to check if multiple pages are needed
var title_height = title.offsetHeight;
var subtitle_height = subtitle.offsetHeight;
var performances_height = performances.offsetHeight;
var total_height = 68 + title_height + subtitle_height + performances_height;

function getHeight(title_height, subtitle_height, performances_height) {
    total_height = 68 + title_height + subtitle_height + performances_height;
}

// create and set title
for (let i = 0; i < fonts.length; i++) {
    var option = document.createElement('option');
    option.value = fonts[i];
    option.innerHTML = fonts[i];
    title_font_family.appendChild(option);
}

var link = document.createElement('link');
document.getElementsByTagName('head')[0].appendChild(link);
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute("href", font_link_base + "ABeeZee");

function changeTitleFont(value) {
    link.setAttribute("href", font_link_base + value.split(" ").join("+"))
    title.style.fontFamily = value;
    title_height = title.offsetHeight;
    getHeight(title_height, subtitle_height, performances_height);
    updateClone(pages);
}

for (let i = 12; i < 72; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    title_font_size.appendChild(option);
}

function changeTitleSize(value) {
    title.style.fontSize = value + "px";
    title_height = title.offsetHeight;
    getHeight(title_height, subtitle_height, performances_height);
    updateClone(pages);
}

title_input.addEventListener("input", () => {
    title.innerHTML = title_input.value;
    title_height = title.offsetHeight;
    getHeight(title_height, subtitle_height, performances_height);
    updateClone(pages);
})

// create subtitle(s)
subtitle_input.addEventListener("input", () => {
    subtitle.innerHTML = subtitle_input.value.replace(/\r?\n/, "<br/>");
    subtitle_height = subtitle.offsetHeight;
    getHeight(title_height, subtitle_height, performances_height);
    updateClone(pages);
})

// create performance info
function removePerformance(el) {
    el.remove();
    updateClone(pages);
}

enter_performance.addEventListener("click", () => {
    var pieces = piece_input.value.split(/\r?\n/) || 'Untitled';
    var composers = composer_input.value.split(/\r?\n/) || "Anon.";
    var div = document.createElement("div");
    performances.appendChild(div);
    div.className = 'performance';
    div.setAttribute("onclick", "removePerformance(this)");
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
    performances_height = performances.offsetHeight;
    getHeight(title_height, subtitle_height, performances_height);
    updateClone(pages);
    if (total_height > 750) {
        pages += 1;
        var new_page = document.createElement('div');
        program.appendChild(new_page);
        new_page.className = "program-page layer";
        new_page.id = `page${pages}`;
        clonePage(pages);

        var last_performance = performances.lastChild.cloneNode(true);
        
    }
})