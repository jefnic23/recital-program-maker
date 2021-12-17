var title_canvas = document.getElementById("titleCanvas");
var subtitle_canvas = document.getElementById('subtitleCanvas');
var piece_canvas = document.getElementById("pieceCanvas");
var performer_canvas = document.getElementById("performerCanvas");

var title_context = title_canvas.getContext('2d');
var subtitle_context = subtitle_canvas.getContext('2d');
var piece_context = piece_canvas.getContext('2d');
var performer_context = performer_canvas.getContext('2d');

var canvas_x = 264;

title_context.font = "34pt Helvetica";
title_context.textAlign = "center";
var title_y = 113;
var title_text = '';
var title_input = document.getElementById('titleInput');
title_input.addEventListener('input', () => {
    title_context.clearRect(0, 0, title_canvas.width, title_canvas.height);
    title_text = title_input.value;
    title_context.fillText(title_text, canvas_x, title_y);
})

subtitle_context.font = "13pt Helvetica";
subtitle_context.textAlign = "center";
var subtitle_y = 138;
var subtitle_text = '';
var subtitle_input = document.getElementById('subtitleInput');
subtitle_input.addEventListener('input', () => {
    subtitle_context.clearRect(0, 0, subtitle_canvas.width, subtitle_canvas.height);
    subtitle_text = subtitle_input.value;
    subtitle_context.fillText(subtitle_text, canvas_x, subtitle_y);
})

piece_context.font = "10pt Helvetica"
performer_context.font = "italic 11pt Helvetica";
performer_context.textAlign = "center";
var piece_y = 190;
var performer_y = piece_y + 16;
var piece_input = document.getElementById("pieceInput");
var composer_input = document.getElementById("composerInput");
var performer_input = document.getElementById("performerInput");
var enter_performance = document.getElementById("enterPerformance");
enter_performance.addEventListener("click", () => {
    var pieces = piece_input.value.split("/");
    var composers = composer_input.value.split("/");
    for (let i = 0; i < pieces.length; i++) {
        var piece_filler = ' . ';
        var piece_text = pieces[i] + piece_filler + composers[i];
        var text_width = piece_context.measureText(piece_text).width;
        while (text_width < piece_canvas.width - 96) {
            piece_context.clearRect(0, piece_y-10, piece_canvas.width, performer_y);
            piece_context.fillJustifyText(piece_text, 48, piece_y, piece_canvas.width - 96)
            if (text_width >= piece_canvas.width - 96) {
                break;
            } else {
                piece_filler += ' . ';
                piece_text = pieces[i] + piece_filler + composers[i];
                text_width = piece_context.measureText(piece_text).width;
            }
        }
        piece_context.fillText(pieces[i], 48, piece_y);
        if (pieces.length > 1) {
            piece_y += 16;
            performer_y = piece_y + 2;
        } else {
            piece_y += 16;
        }
    }
    var performer_text = performer_input.value;
    performer_context.fillText(performer_text, canvas_x, performer_y);
    piece_y += 32;
    performer_y = piece_y + 16;
})