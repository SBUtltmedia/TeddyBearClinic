class ModalDialog {
    constructor(scene, targetInfo, dialogIndex, background = "background1", border = "background1Border") {

        this.scene = scene;
        this.background = background;
        this.border = border;
        this.targetInfo = targetInfo;
        this.dialogIndex = dialogIndex
        this.audioPlay = this.scene.game.autoplay ? 'audioOn' : 'audioOff';
        this.makeDOMItems();


    }


    makeDOMItems() {


        this.popup = $("<div/>", {
            id: "thoughtBubble",
            class: "thoughtPopAnimation"
        }).load("popup.html", () => this.populateBubble())





    }
    closeBubble() {
        
        $(".target").css({ pointerEvents: "auto" })
        $("#thoughtBubble").remove()
        this.scene.removeTarget()

        if (!this.scene.triggersLeft) {
            this.scene.game.currentRoom = this.scene.roomInfo.nextRoom;
            this.scene.game.isTutorial = false;
            if (this.scene.game.currentRoom == "Certificate") {
                window.location.assign("https://apps.tlt.stonybrook.edu/TeddyBearClinic/certificate/")

            } else {
                setTimeout(() => this.scene.game.loadRoom(), 1000)
            }

        }
        if(this.dialogIndex == 1 && this.targetInfo.autoClickNext){
            console.log(this.targetInfo);
            setTimeout(() => {$(`#${this.targetInfo.autoClickNext}`).trigger("click")}, 3000)
        }
    }


    populateBubble() {

        let left = this.targetInfo.left ? this.targetInfo.left + "rem" : "42rem";
        let top = this.targetInfo.top ? this.targetInfo.top + "rem" : "23rem";

        this.heading = "This is not safe!"

        if (this.targetInfo.isGood) {

            this.background = "backgroundGood"
            this.border = "backgroundGoodBorder"
            this.heading = "Good job!"

        } else if (this.dialogIndex > 0) {
            this.background = "background2"
            this.border = "background2Border"
            this.heading = "Now it's better!"
        }

        this.popup.css({ left, top })
        $("#roomSVG").append(this.popup)
        $("#Heading").html(this.heading)
        $(".background1Border").removeClass("background1Border").addClass(this.border)
        $(".background1").removeClass("background1").addClass(this.background)

        $("#bubbleContent").html(this.targetInfo['postText'][this.dialogIndex])
        let sound = `bubbleSpeech/${this.scene.game.currentRoom}_${this.targetInfo.Name}_${this.dialogIndex}.mp3` //Naming for bubble audio files
        let callback = () => { $('#thoughtBubble').trigger("click") };
        this.scene.Narration = playSound(sound, "bubbleSpeech", callback);

        this.scene.playNarration();
        console.log($("thoughtBubble"))

        $("#thoughtBubble").on("click", () => {
            console.log("Start animation");
            $('#thoughtBubble').remove();
            this.scene.Narration.stopclip();
            if (!this.targetInfo.hasAnimated) {
                console.log("!hasAnimated");
                playSound(this.targetInfo.audioFile, "soundEffect").playclip();
                var animate = new Animate(this.targetInfo.Name, this.targetInfo.frameRate)
                animate.animate().then(() => {
                    console.log("animate().then");
                    this.targetInfo.hasAnimated = true;
                    if (this.targetInfo.postText.length - 1 > this.dialogIndex) {
                        new ModalDialog(this.scene, this.targetInfo, this.dialogIndex + 1)
                    }
                    else {
                        this.closeBubble()
                    }
                })
                
                if (this.targetInfo.otherAnimations) {
                    let animation_list = [];
                    for (let animation_index in this.targetInfo.otherAnimations) {
                        animation_list[animation_index] = new Animate(this.targetInfo.otherAnimations[animation_index].Name, this.targetInfo.otherAnimations[animation_index].frameRate)
                        animation_list[animation_index].animate().then(() => { })
                    }

                }
            }
            else {
                this.closeBubble()
            }
        });



    }
}
