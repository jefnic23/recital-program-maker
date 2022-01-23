function keyExists(obj, key) {
    return obj.hasOwnProperty(key);
}

function readUpload(event) {
    var f = event.target.files[0];
    if (f && f.type === "text/csv") {
        var r = new FileReader();
        r.onload = (e) => {
            var contents = e.target.result;
            var lines = contents.split('\n');
            var details = {
                title: '',
                subtitle: '',
                footer: '',
                performers: []
            };
            for (let i = 1; i < lines.length; i++) {
                if (lines[i]) {
                    var line = lines[i].split('\t');
                    details.title += line[0];

                    if (details.subtitle && line[1]) {
                        details.subtitle += '\n' + line[1];
                    } else {
                        details.subtitle += line[1]
                    }

                    if (details.footer && line[2]) {
                        details.footer += '\n' + line[2];
                    } else {
                        details.footer += line[2];
                    }
                    
                    var performer = line[5].replace(/[\r\n]+/gm, '');
                    if (keyExists(details.performers, performer)) {
                        details.performers[performer].pieces.push(line[3]);
                        details.performers[performer].composers.push(line[4]);
                        details.performers[performer].accompanist = line[6].replace(/[\r\n]+/gm, '');
                    } else {
                        var new_performance = {
                            pieces: [],
                            composers: [],
                            accompanist: ''
                        };
                        new_performance.pieces.push(line[3]);
                        new_performance.composers.push(line[4]);
                        new_performance.accompanist = line[6].replace(/[\r\n]+/gm, '');
                        details.performers[performer] = new_performance;
                    }
                }
            }
            title.innerHTML = details.title;
            title_input.value = title.innerHTML;
            subtitle.innerHTML = details.subtitle.split(/\r?\n/).join("<br/>");
            subtitle_input.value = subtitle.innerHTML;
            footer_text.innerHTML = details.footer.split(/\r?\n/).join("<br/>");
            footer_input.value = footer_text.innerHTML;
            for (performer in details.performers) {
                if (details.performers.hasOwnProperty(performer)) {
                    var div = document.createElement('div');
                    performances[current_page-1].appendChild(div);
                    div.className = 'performance';
                    var pieces = details.performers[performer].pieces;
                    var composers = details.performers[performer].composers;
                    for (let i = 0; i < pieces.length; i++) {
                        var filler = ' . ';
                        var piece = pieces[i].trim() || 'Untitled';
                        piece = "<b>" + piece + "</b>";
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
                    div.appendChild(p);
                    p.className = "performer";
                    var perf_name = performer || 'John/Jane Doe';
                    if (details.performers[performer].accompanist) {
                        perf_name = perf_name + '<br>' + details.performers[performer].accompanist;
                    }
                    p.innerHTML = "<i>" + perf_name + "</i>";
                    newPage(upload=true);
                }
            }
            // var performance_height = performances[current_page-1].offsetHeight + ((750 - performances[current_page-1].offsetHeight - footer.offsetHeight) / 2);
            // performances[current_page-1].style.height = `${performance_height}px`        
        }
        r.readAsText(f);   
    } else {
        window.alert('Please upload a .csv or .tsv file');
    }
}

document.getElementById('upload').addEventListener('change', readUpload);