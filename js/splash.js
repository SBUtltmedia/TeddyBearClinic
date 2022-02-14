$(()=>{
    let img = $("<img/>", {src:"img/Title_Screen.svg", id: "first_splash", css: {position: "absolute", left: "0", top: "0"}});
    console.log("splash");
    $("#screen").append(img.on("click", closeSplash));

    $("#splash").on("click", () => {
        $("#splash").css({display: "none"});
        $("#roomSVG").css({display: "visible"});
    })
})

function closeSplash(){
    $("#first_splash").css({display: "none"});
}

