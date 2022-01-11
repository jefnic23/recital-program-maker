var print = document.getElementById('print');
print.addEventListener('click', () => {
    var div = document.createElement('div');
    div.id = "print-program";
    div.style.height = '1700px';
    div.style.width = '1100px';
    var front = document.createElement('div');
    front.id = "frontPage";
    front.style.display = "flex";
    var back = document.createElement('div');
    back.id = "backPage";
    back.style.display = "flex";
    var pages = program.querySelectorAll('.program-page');
    for (let i = 0; i < pages.length; i++) {
        var page1 = document.getElementById(pages[i].id).cloneNode(true);
        var page2 = document.getElementById(pages[i].id).cloneNode(true);
        page1.style.visibility = "visible";
        page2.style.visibility = "visible";
        page1.style.borderRight = "1px solid #bbb";
        if (i === 0) {
            front.appendChild(page1);
            front.appendChild(page2);
            div.append(front);
        } else {
            back.appendChild(page1);
            back.appendChild(page2);
            div.append(back);
        }
    }
    document.body.appendChild(div);

    var pdf = new jspdf.jsPDF({
        orientation: 'landscape',
        unit: "in",
        format: [11, 8.5]
    });
    html2canvas(document.getElementById('frontPage'), {scale: 4}).then((canvas) => {
        var img = canvas.toDataURL("image/jpeg");
        pdf.addImage(img, 'JPEG', 0, 0, 11, 8.5);
    });
    html2canvas(document.getElementById('backPage'), {scale: 4}).then((canvas) => {
        var img = canvas.toDataURL("image/jpeg");
        pdf.addPage();
        pdf.addImage(img, 'JPEG', 0, 0, 11, 8.5);
        var name = title.innerHTML || 'Program';
        // pdf.save(name + '.pdf');
    });
    // document.body.removeChild(div);
});