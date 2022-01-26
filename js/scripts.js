const program = document.getElementById('program');
const header = document.getElementById('header');
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
const edit_performance = document.getElementById('editPerformance');
const enter_perf_container = document.getElementById('enterPerformanceContainer');
const edit_perf_container = document.getElementById('editPerformanceContainer');
const switch_performers = document.getElementById("togglePerformers");
const footer_input = document.getElementById("footerInput");
const font_link_base = "https://fonts.googleapis.com/css?family=";

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

function changeTitleFont(value) {
    link.setAttribute("href", font_link_base + value.split(" ").join("+"))
    title.style.fontFamily = value;
}

function changeTitleSize(value) {
    title.style.fontSize = value + "px";
}

function buildPerformance(div) {
    var pieces = piece_input.value.split(/\r?\n/) || 'Untitled';
    var composers = composer_input.value.split(/\r?\n/) || "Anon.";
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
    if (switch_performers.checked) {
        div.prepend(p);
    } else {
        div.appendChild(p);
    }
    p.className = "performer";
    var perf_name = performer_input.value.split(/\r?\n/).join('<br>') || 'John/Jane Doe';
    p.innerHTML = "<i>" + perf_name + "</i>";

    piece_input.value = '';
    composer_input.value = '';
    performer_input.value = '';
    return div;
}

function createPerformance() {
    var container = document.createElement('div');
    container.className = "performance-container";
    getCurrentPerformances().appendChild(container);
    
    var move_div = document.createElement('div');
    move_div.className = "move-performance";
    var up_span = document.createElement('span');
    up_span.className = "arrow-up hvr-grow";
    up_span.setAttribute('onclick', "moveUp(this)")
    move_div.appendChild(up_span);
    var down_span = document.createElement('span');
    down_span.className = "arrow-down hvr-grow";
    down_span.setAttribute('onclick', "moveDown(this)")
    move_div.appendChild(down_span);
    container.appendChild(move_div);

    var div = document.createElement("div");
    div.className = 'performance';
    container.appendChild(div);
    buildPerformance(div=div);

    var edit_div = document.createElement('div');
    edit_div.className = "edit-performance";
    var edit_img = document.createElement('img');
    edit_img.setAttribute('src', "img/edit-solid.png");
    edit_img.setAttribute('onclick', 'editElement(this)');
    edit_img.className = "hvr-grow";
    edit_div.appendChild(edit_img);
    var delete_img = document.createElement('img');
    delete_img.setAttribute('src', 'img/trash-solid.png');
    delete_img.setAttribute('onclick', 'deleteElement(this)');
    delete_img.className = "hvr-grow";
    edit_div.appendChild(delete_img);
    container.appendChild(edit_div);

    newPage();
}

// move performer names above piece titles and composers
function switchPerformers() {
    var performer_list = document.getElementsByClassName('performer');
    if (switch_performers.checked) {
        for (let i=0; i < performer_list.length; i++) {
            var p = performer_list[i].parentElement;
            p.prepend(performer_list[i]);
        }
    } else {
        for (let i=0; i < performer_list.length; i++) {
            var p = performer_list[i].parentElement;
            p.append(performer_list[i]);
        }
    }
}

// move footer to new page
function moveFooter(performances, previous_page, new_page) {
    performances.append(previous_page.lastChild);
    new_page.appendChild(footer);
}

// if page is overflowing, move content to new page
function newPage(upload=false) {
    if (checkOverflow(getCurrentPage())) {
        getCurrentPerformances().classList.remove('last-page');

        var new_page = document.createElement('div');
        new_page.className = "program-page";
        var new_performances = document.createElement('div');
        new_performances.className = "performances last-page";
        new_page.appendChild(new_performances)
        program.appendChild(new_page);
        
        var previous_page = getPreviousPage();
        var current_page = getCurrentPage();
        moveFooter(new_performances, previous_page, new_page);

        if (upload) {
            current_page.style.visibility = "hidden";
        } else {
            previous_page.style.visibility = "hidden";
        }
        
    }
}

function getCurrentPage() {
    let page_list = document.getElementsByClassName('program-page');
    return page_list[page_list.length-1];
}

function getPreviousPage() {
    let page_list = document.getElementsByClassName('program-page');
    return page_list[page_list.length-2];
}

function getCurrentPerformances() {
    let performance_list = document.getElementsByClassName('performances');
    return performance_list[performance_list.length-1];
}

// moves performance container up
function moveUp(e) {
    var performance = e.parentNode.parentNode;
    var sibling = e.parentNode.parentNode.previousSibling;
    var container = performance.parentNode;
    if (sibling) {
        container.insertBefore(performance, sibling);
    }
}

// moves performance container down
function moveDown(e) {
    var performance = e.parentNode.parentNode;
    var sibling = performance.nextSibling;
    var container = performance.parentNode;
    var page = container.parentNode;
    if (sibling) {
        container.insertBefore(sibling, performance);
    }
}

// allows editing of performance info upon clicking edit icon
function editElement(e) {
    var performance = e.parentNode.previousSibling;
    var pieces = performance.querySelectorAll('.piece');
    var performers = performance.querySelectorAll('.performer');

    piece_input.value = '';
    composer_input.value = '';
    for (let i=0; i < pieces.length; i++) {
        var details = pieces[i].innerText.split(' . ');
        var piece = details[0];
        piece_input.value += piece;
        
        var composer = details[details.length-1];
        composer_input.value += composer.replace('. ', '');

        if (i != pieces.length - 1) {
            piece_input.value += '\n';
            composer_input.value += '\n';
        }
    }
    for (let i=0; i < performers.length; i++) {
        performer_input.value = performers[i].innerText;
    }
    enter_perf_container.style.display = "none";
    edit_perf_container.style.display = "inline-block";

    edit_performance.addEventListener('click', () => {
        performance.innerHTML = '';
        buildPerformance(container=performance);
        edit_perf_container.style.display = "none";
        enter_perf_container.style.display = "inline-block";
    });
}

// remove performance element upon clicking trash icon
function deleteElement(e) {
    e.parentNode.parentNode.remove();
}

function changeRowGap(val) {
    root.style.setProperty("--row-gap", val + "px");
}