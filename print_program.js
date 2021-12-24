var print = document.getElementById('print');
print.addEventListener('click', () => {
    var div = document.createElement('div');
    div.id = "print-program";
    div.style.height = '850px';
    div.style.width = '1100px';
    div.style.display = "flex";
    div.style.flexDirection = "row";
    var pages = program.querySelectorAll('.program-page');
    for (let i = 0; i < pages.length; i++) {
        var page = document.getElementById(pages[i].id).cloneNode(true);
        page.style.visibility = "visible";
        div.appendChild(page);
    }
    document.body.appendChild(div);
    html2canvas(document.getElementById('print-program')).then((canvas) => {
        var img = canvas.toDataURL("image/jpeg");
        var pdf = new jsPDF({
            orientation: 'landscape',
            unit: "pt",
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(img, 'JPEG', 0, 0, canvas.width, canvas.height);
        var name = title.innerHTML || 'Program';
        pdf.save(name + '.pdf');
    });
    document.body.removeChild(div);
});