var audiotypes = {
    "mp3": "audio/mpeg",
    "mp4": "audio/mp4",
    "ogg": "audio/ogg",
    "wav": "audio/wav"
}



function playSound(sound, type, callback = () => { }) {
    console.log(sound)
    let cb = callback;
    let audio_element = $(`#${type}`)[0];
    let source_element = $(`#${type} source`)[0];

    if (audio_element.canPlayType) {
        //for (var i = 0; i < arguments.length; i++) {
        source_element.setAttribute('src', "audio/" + sound)
        //if (arguments[i].match(/\.(\w+)$/i))
        //source_element.setAttribute('type', audiotypes[RegExp.$1])

        //}
        //audio_element.volume = 0.05
        audio_element.addEventListener('ended', (event) => {
            console.log(cb)
            cb()
        });




        audio_element.load()
        audio_element.playclip = function () {
            audio_element.pause()
            audio_element.currentTime = 0
            audio_element.play()
        }
        audio_element.pauseclip = function () {
            audio_element.pause()
        }
        audio_element.stopclip = function () {
            cb = () => { };
            console.log("here")
            //source_element.setAttribute('src', '')


            audio_element.pause();
            audio_element.currentTime = 0;
        }
        return audio_element
    }
}