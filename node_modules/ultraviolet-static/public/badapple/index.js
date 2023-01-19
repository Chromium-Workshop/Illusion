async function get_frames(url) {
    const response = await fetch(url);
    var data = await response.arrayBuffer();
    main(new Uint8Array(data));
}

get_frames('frames.dat');

const bits_per_pixel = 2;
const width = 48;
const height = 36;
const bits_per_frame = bits_per_pixel * width * height;
const bytes_per_frame = bits_per_frame / 8;
const pixel_per_byte = 8 / bits_per_pixel;

var audio_elem;

function main(frames){
    audio_elem = document.getElementById('audio');
    setInterval(draw, 50, frames);
}

function draw(frames){
    if (audio_elem.paused){
        return;
    }
    var current_frame = Math.floor((audio_elem.currentTime / audio_elem.duration) * frames.length / bytes_per_frame);
    let frame_index = bytes_per_frame * current_frame;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let index =  (i*width + j);
            let cc = document.getElementById(`${i}-${j}`);
            let offset = Math.floor( index/ pixel_per_byte);
            let val =  frames[frame_index + offset] >> ((-index % 4)*2 + 6);
            val = val & 3;
            if (val == 0){
                cc.checked = false;
                cc.style.opacity = 1.0;
            }
            else{
                cc.checked = true;
                cc.style.opacity = val / 3;
            }
        }
    }
}