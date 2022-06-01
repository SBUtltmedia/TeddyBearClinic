let sound;
$(()=>{
    if(location.hash){
        closeSplash();
        closeIntro();
    }
    $("#roomSVG").css({display: "none"});

    $("#first_splash").on("click", closeSplash);

    $("#KristiIntro").on("click", closeIntro);
})

function closeSplash(){
    console.log("game click");
    $("#KristiIntro").css({display: "block"});

    $("#first_splash").css({display: "none"});
    sound = playSound("Welcome_Page.mp3", "bubbleSpeech", () => {$("#KristiIntro").trigger("click")});
    sound.playclip();
}

function closeIntro(){
    console.log("intro click");
    $("#KristiIntro").css({display: "none"});
    var game=new Game();
    sound.stopclip();
}
