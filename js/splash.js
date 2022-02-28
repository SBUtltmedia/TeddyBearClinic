let sound;
$(()=>{

    $("#roomSVG").css({display: "none"});
    // console.log("splash");
    $("#first_splash").on("click", closeSplash);

    $("#KristiIntro").on("click", () => {
        console.log("intro click");
        $("#KristiIntro").css({display: "none"});
        var game=new Game();
        sound.stopclip();
    })
})

function closeSplash(){
    console.log("game click");
    $("#KristiIntro").css({display: "block"});

    $("#first_splash").css({display: "none"});
    sound = playSound("Welcome_Page.mp3", "bubbleSpeech", () => {$("#KristiIntro").trigger("click")});
    sound.playclip();
}

