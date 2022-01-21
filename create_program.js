const program = document.getElementById('program');
const title = document.getElementById("title");
const title_font_family = document.getElementById('titleFontFamily');
const title_font_size = document.getElementById('titleFontSize');
const subtitle = document.getElementById('subtitle');
const footer = document.getElementById('footer');
const footer_text = document.getElementById('footerText');
const title_input = document.getElementById('titleInput');
const subtitle_input = document.getElementById('subtitleInput');
const piece_input = document.getElementById("pieceInput");
const composer_input = document.getElementById("composerInput");
const performer_input = document.getElementById("performerInput");
const enter_performance = document.getElementById("enterPerformance");
const footer_input = document.getElementById("footerInput");
const font_link_base = "http://fonts.googleapis.com/css?family=";

// set ids on multiple pages
const performances1 = document.getElementById('performances1');
const performances2 = document.createElement('div');
const performances3 = document.createElement('div');
const performances4 = document.createElement('div');
const performances = [performances1, performances2, performances3, performances4]

for (let i = 0; i < performances.length; i++) {
    performances[i].style.width = "450px";
    performances[i].style.display = "flex";
    performances[i].style.flexDirection = "column";
}

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

// move footer to new page
function moveFooter(performance, page) {
    performance.append(performances[current_page-2].lastChild);
    page.appendChild(footer);
}

// if page is overflowing, move content to new page
function newPage() {
    if (checkOverflow(document.getElementById(`page${current_page}`))) {
        var title_height = title.offsetHeight / 2;
        var subtitle_height = subtitle.offsetHeight;
        var performance_height = 750 - 69 - title_height - subtitle_height;
        document.getElementById(`page${current_page}`).style.visibility = "hidden";
        current_page += 1;
        var new_page = document.createElement('div');
        program.appendChild(new_page);
        new_page.className = "program-page layer";
        new_page.id = `page${current_page}`;
        new_page.append(performances[current_page-1]);
        performances[current_page-1].id = `performances${current_page}`;
        performances[current_page-2].style.height = `${performance_height}px`;
        moveFooter(performances[current_page-1], new_page);
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
link.setAttribute("href", font_link_base + "Lobster+Two");

function changeTitleFont(value) {
    link.setAttribute("href", font_link_base + value.split(" ").join("+"))
    title.style.fontFamily = value;
}

for (let i = 12; i <= 72; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    title_font_size.appendChild(option);
}

function changeTitleSize(value) {
    title.style.fontSize = value + "px";
}

title_font_family.value = "Lobster Two";
title.style.fontFamily = "Lobster Two";
title_font_size.value = "55";
title.style.fontSize = "55px";

title_input.addEventListener("input", () => {
    title.innerHTML = title_input.value;
    newPage();
})

// create subtitle(s)
subtitle_input.addEventListener("input", () => {
    subtitle.innerHTML = subtitle_input.value.split(/\r?\n/).join("<br/>");
    newPage();
})

// create footer(s)
footer_input.addEventListener("input", () => {
    footer_text.innerHTML = footer_input.value.split(/\r?\n/).join("<br/>");
    newPage();
})

// create performance info; change this to allow both editing and destruction
function removePerformance(el) {
    var original_text = el.innerHTML;
    var input = document.createElement('input');
    el.replaceWith(input);
    input.className = "form-control form-control-sm";
    // input.placeholder = original_text;
    input.select();
    // el.remove();
    // updateClone(current_page);
}

enter_performance.addEventListener("click", () => {
    var pieces = piece_input.value.split(/\r?\n/) || 'Untitled';
    var composers = composer_input.value.split(/\r?\n/) || "Anon.";
    var div = document.createElement("div");
    performances[current_page-1].appendChild(div);
    div.className = 'performance';
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
        // p.setAttribute("onclick", "removePerformance(this)");
        var text_width = Math.ceil(p.clientWidth);
        while (text_width < 450) {
            filler += ' . ';
            text = piece + filler + composer;
            p.innerHTML = text;
            text_width = Math.ceil(p.clientWidth);
            if (text_width >= 450) {
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
    newPage();
});

function togglePage(page) {

}