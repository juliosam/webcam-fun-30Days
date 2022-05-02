const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream);
    video.srcObject = localMediaStream;
    video.play();
        })
    .catch(err=>{
        console.error('OH NO!!', err);
    })
}

function paintToCanvas(){
    // const width = video.videoWidth;
    // const height = video.videoHeight;

    // console.log(width, height)

    return setInterval(()=>{
        ctx.drawImage(video, 0, 0, 200, 150);

        let pixels = ctx.getImageData(0,0, 200, 150);

        pixels = triEffect(pixels);
        ctx.globalAlpha = 0.1;
        ctx.putImageData(pixels, 0, 0)
    
    },16);   
    }

function takePhoto(){
    snap.currentTime = 0 ;
    snap.play()

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsomer Man">`;
    strip.insertBefore(link, strip.firstChild);
    console.log(data);
}

function redEffect(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i + 0] = pixels.data[i+0]+100;
        pixels.data[i + 1] = pixels.data[i+1]-50;
        pixels.data[i + 2] = pixels.data[i+2]*0.5;
    }
    return pixels
}

function triEffect(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i -150] = pixels.data[i+0];
        pixels.data[i + 500] = pixels.data[i+1];
        pixels.data[i - 550] = pixels.data[i+2];
    }
    return pixels
}

getVideo()

video.addEventListener('canplay', paintToCanvas)