const program = document.getElementById('program');
const selector = document.getElementById('selector');
const title = document.getElementById("title");
const title_font_family = document.getElementById('titleFontFamily');
const title_font_size = document.getElementById('titleFontSize');
const subtitle = document.getElementById('subtitle');
const performances1 = document.getElementById('performances1');
const title_input = document.getElementById('titleInput');
const subtitle_input = document.getElementById('subtitleInput');
const piece_input = document.getElementById("pieceInput");
const composer_input = document.getElementById("composerInput");
const performer_input = document.getElementById("performerInput");
const enter_performance = document.getElementById("enterPerformance");
const font_link_base = "http://fonts.googleapis.com/css?family=";

// set ids on multiple pages
const performances2 = document.createElement('div');
const performances3 = document.createElement('div');
const performances4 = document.createElement('div');
const performances = [performances1, performances2, performances3, performances4]

// # of program pages; if > 2 make booklet mode
var num_pages = 1;
var current_page = 1;

// check if current page is overflowing
function checkOverflow(el) {
    var current_overflow = el.style.overflow;
    if (!current_overflow || current_overflow === "visible") {
        el.style.overflow = "hidden";
    }
    var is_overflow = el.clientHeight < el.scrollHeight;
    el.style.overflow = current_overflow;
    return is_overflow;
}

// create mini page views for toggling
function clonePage(number) {
    var page = document.getElementById(`page${number}`);
    var page_clone = page.cloneNode(true);
    selector.appendChild(page_clone);
    page_clone.classList.add("mini-page");
    page_clone.id = `page${number}Clone`;
}

clonePage(current_page);

function updateClone(number) {
    var page = document.getElementById(`page${number}`);
    var old_clone = document.getElementById(`page${number}Clone`);
    var new_clone = page.cloneNode(true);
    new_clone.classList.add("mini-page");
    new_clone.id = `page${number}Clone`;
    old_clone.replaceWith(new_clone);
    try {
        var nodes = document.getElementById(`page${number}Clone`).childNodes[7].childNodes;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].setAttribute('onclick', '');
        }
    }
    catch (err) {
        // ignore performers that haven't been entered yet
    }
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
    updateClone(current_page);
}

for (let i = 12; i < 72; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    title_font_size.appendChild(option);
}

function changeTitleSize(value) {
    title.style.fontSize = value + "px";
    updateClone(current_page);
}

title_input.addEventListener("input", () => {
    title.innerHTML = title_input.value;
    updateClone(current_page);
})

// create subtitle(s)
subtitle_input.addEventListener("input", () => {
    subtitle.innerHTML = subtitle_input.value.split(/\r?\n/).join("<br/>");
    updateClone(current_page);
})

// create performance info; change this to allow both editing and destruction
function removePerformance(el) {
    el.remove();
    updateClone(current_page);
}

enter_performance.addEventListener("click", () => {
    var pieces = piece_input.value.split(/\r?\n/) || 'Untitled';
    var composers = composer_input.value.split(/\r?\n/) || "Anon.";
    var div = document.createElement("div");
    performances[current_page-1].appendChild(div);
    div.className = 'performance';
    div.setAttribute("onclick", "removePerformance(this)");
    for (let i = 0; i < pieces.length; i++) {
        var filler = ' . ';
        var piece = pieces[i].trim() || 'Untitled';
        piece = "<b>" + piece + "</b>"
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
    var perf_name = performer_input.value.trim() || 'John/Jane Doe';
    p.innerHTML = "<i>" + perf_name + "</i>";
    piece_input.value = '';
    composer_input.value = '';
    performer_input.value = '';
    updateClone(current_page);
    if (checkOverflow(document.getElementById(`page${current_page}`))) {
        document.getElementById(`page${current_page}`).style.visibility = "hidden";
        current_page += 1;
        var new_page = document.createElement('div');
        program.appendChild(new_page);
        new_page.className = "program-page layer";
        new_page.id = `page${current_page}`;
        clonePage(current_page);

        var last_performance = performances[current_page-2].lastChild.cloneNode(true);
        new_page.append(performances[current_page-1]);
        performances[current_page-1].id = `performances${current_page}`;
        performances[current_page-1].append(last_performance);
        performances[current_page-2].lastChild.remove();
        // performances.style.height = "calc(100% - 100px)";
    }
})