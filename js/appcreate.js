let btnrecord = document.getElementById('btn-start');
let video_record = document.querySelector('.box-create img');
var status_record = 0;


function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function (camera) {
        callback(camera);
    }).catch(function (error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

function stopRecordingCallback() {
    document.querySelector('h1').innerHTML = 'Gif recording stopped: ' + bytesToSize(recorder.getBlob().size);
    video_record.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

var recorder;

function opencamara() {
    captureCamera(function (camera) {
        document.querySelector('h1').innerHTML = 'Waiting for Gif Recorder to start...';
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 190,
            hidden: 140,
            onGifRecordingStarted: function () {
                document.querySelector('h1').innerHTML = 'Gif recording started.';
            },
            onGifPreview: function (gifURL) {
                video_record.src = gifURL;
            }
        });
        recorder.startRecording();
    });

}

function startRecord() {
    captureCamera(function (camera) {
        document.querySelector('h1').innerHTML = 'Waiting for Gif Recorder to start...';
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 190,
            hidden: 140,
            onGifRecordingStarted: function () {
                document.querySelector('h1').innerHTML = 'Gif recording started.';
            },
            onGifPreview: function (gifURL) {
                video_record.src = gifURL;
            }

        });
        recorder.startRecording();

        // release camera on stopRecording
        recorder.camera = camera;
    });

}

function stopRecord() {
    recorder.stopRecording(stopRecordingCallback);
}

btnrecord.addEventListener('click',giphycamara);


function giphycamara() {
    if (status_record == 0) {
        opencamara();
        btnrecord.innerHTML = 'Grabar';
        status_record = 1;
    } else if (status_record == 1) {
        startRecord();
        btnrecord.innerHTML = 'Stop';
        status_record = 2;
    } else if (status_record == 2);
        stopRecord();
        btnrecord.innerHTML = 'Finalizar';
        status_record = 0;
}

//comenzar, Dar acceso a la camara, grabar, finalizar, subir gifo




/**function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: { min: 318, max: 480 },
            height: { min: 245, max: 320 }
        }
    }).then(function (stream) {
        video_record.srcObject = stream;
        video_record.onloadedmetadata = function (e) {
            video.play();
        };
    });
}*/