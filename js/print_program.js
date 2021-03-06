const print = document.getElementById('print');
print.addEventListener('click', () => {
    printProgram();
});

const print_preview = document.getElementById('printPreview');
const preview = document.getElementById('preview');
preview.onclick = () => {
    on();
};

function printProgram(prev=false) {
    // if new page doesn't meet threshold, add x items from previous page to new page
    var pages = program.querySelectorAll('.program-page');
    var div = document.createElement('div');
    div.id = "print-program";
    div.style.height = '1700px';
    div.style.width = '1100px';
    var front = document.createElement('div');
    front.id = "frontPage";
    front.style.display = "flex";

    if (pages.length > 1) {
        var back = document.createElement('div');
        back.id = "backPage";
        back.style.display = "flex";
    }
    
    if (pages.length === 1) {
        var page1 = pages[0].cloneNode(true);
        var page2 = pages[0].cloneNode(true);
        page1.style.visibility = "visible";
        page1.style.position = "relative";
        page2.style.visibility = "visible";
        page2.style.position = "relative";
        front.appendChild(page1);
        front.appendChild(page2);
        div.append(front);
    } else if (pages.length === 2) {
        for (let i = 0; i < pages.length; i++) {
            var page1 = pages[i].cloneNode(true);
            var page2 = pages[i].cloneNode(true);
            page1.style.visibility = "visible";
            page1.style.position = "relative";
            page2.style.visibility = "visible";
            page2.style.position = "relative";
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
    } else if (pages.length === 3) {
        var page1 = pages[0].cloneNode(true);
        var page2 = pages[1].cloneNode(true);
        var page3 = pages[2].cloneNode(true);
        var blank_page = document.createElement('div');
        page1.style.visibility = "visible";
        page1.style.position = "relative";
        page2.style.visibility = "visible";
        page2.style.position = "relative";
        page3.style.visibility = "visible";
        page3.style.position = "relative";
        blank_page.className = "program-page layer";
        blank_page.style.position = "relative";
        front.appendChild(blank_page);
        front.appendChild(page1);
        div.append(front);
        back.appendChild(page2);
        back.appendChild(page3);
        div.append(back);
    } else if (pages.length === 4) {
        var page1 = pages[0].cloneNode(true);
        var page2 = pages[1].cloneNode(true);
        var page3 = pages[2].cloneNode(true);
        var page4 = pages[3].cloneNode(true);
        page1.style.visibility = "visible";
        page1.style.position = "relative";
        page2.style.visibility = "visible";
        page2.style.position = "relative";
        page3.style.visibility = "visible";
        page3.style.position = "relative";
        page4.style.visibility = "visible";
        page4.style.position = "relative";
        front.appendChild(page4);
        front.appendChild(page1);
        div.append(front);
        back.appendChild(page2);
        back.appendChild(page3);
        div.append(back);
    }
    document.body.appendChild(div);

    var pdf = new jspdf.jsPDF({
        orientation: 'landscape',
        unit: "in",
        format: [11, 8.5]
    });
    html2canvas(document.getElementById('frontPage'), {scale: 4}).then((canvas) => {
        if (prev) {
            print_preview.appendChild(canvas);
        }
        var img = canvas.toDataURL("image/jpeg");
        pdf.addImage(img, 'JPEG', 0, 0, 11, 8.5);
        pdf.setDrawColor("#bbb");
        pdf.setLineWidth(0.01);
        pdf.setLineDashPattern([0.1, 0.1], 0);
        pdf.line(5.5, 0, 5.5, 8.5);
        if (pages.length === 1 && !prev) {
            // pdf.autoPrint({variant: 'non-conform'});
            window.open(pdf.output('bloburl'), '_blank');
        }
    });
    if (pages.length > 1) {
        html2canvas(document.getElementById('backPage'), {scale: 4}).then((canvas) => {
            if (prev) {
                print_preview.appendChild(canvas);
            }
            var img = canvas.toDataURL("image/jpeg");
            pdf.addPage();
            pdf.addImage(img, 'JPEG', 0, 0, 11, 8.5);
            pdf.setDrawColor("#bbb");
            pdf.setLineWidth(0.01);
            pdf.setLineDashPattern([0.1, 0.1], 0);
            pdf.line(5.5, 0, 5.5, 8.5);
            if (!prev) {
                // pdf.autoPrint({variant: 'non-conform'});
                window.open(pdf.output('bloburl'), '_blank');
            }
        });
    }
    document.body.removeChild(div);
    if (prev) {
        document.getElementById("overlay").style.display = "block";
    }
}

function on() {
    printProgram(prev=true);
}

function off() {
    document.getElementById("overlay").style.display = "none";
    print_preview.innerHTML = '';
}