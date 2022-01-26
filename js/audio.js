var audiotypes = {
    "mp3": "audio/mpeg",
    "mp4": "audio/mp4",
    "ogg": "audio/ogg",
    "wav": "audio/wav"
}

var soundEffect = $('<audio/>', { "id": "soundEffect" })
var source_element = document.createElement('source')

var audio_element = soundEffect[0];
audio_element.appendChild(source_element)

function ss_soundbits(sound, callback= ()=> {}) {



    if (audio_element.canPlayType) {
        //for (var i = 0; i < arguments.length; i++) {
            source_element.setAttribute('src', sound)
            //if (arguments[i].match(/\.(\w+)$/i))
                //source_element.setAttribute('type', audiotypes[RegExp.$1])

        //}
        //audio_element.volume = 0.05
        audio_element.addEventListener('ended', (event) => {
            audio_element.pause()
            callback()
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
            source_element.setAttribute('src', '')
        }
        return audio_element
    }
}