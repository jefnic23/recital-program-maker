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

for (let i = 12; i <= 72; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    title_font_size.appendChild(option);
}

// create title
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

enter_performance.addEventListener("click", () => {
    createPerformance();
});

// need to make tabs that toggle page visibility
// function togglePage(page) {

// }
