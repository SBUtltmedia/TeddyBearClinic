class ModalDialog {
    constructor(scene, target, textType, showHeader, isTrigger = true, callback) {
        this.callback = callback
        this.isTrigger = isTrigger;
        this.scene = scene;
        this.showHeader = showHeader;
        this.target = target;
        this.textType = textType;
        this.audioPlay = this.scene.game.autoplay ? 'audioOn' : 'audioOff';
        this.makeDOMItems();
        console.log(target)

    }





    makeDOMItems() {
        $(".target").css({pointerEvents:"none"})
        this.popup = $("<div/>", {
            id: "thoughtBubble",
            class: "thoughtPopAnimation"
        }).load("popup.html", () => this.populateBubble())



    }
    closeBubble() {
        $(".target").css({pointerEvents:"auto"})
        $("#thoughtBubble").remove()
        this.scene.removeTarget()
        this.scene.soundEffect.pauseclip()
        if (!this.scene.triggersLeft) {
            this.scene.game.currentRoom = this.scene.roomInfo.nextRoom;
            this.scene.game.isTutorial = false;
            if(this.scene.game.currentRoom == "Certificate"){
                window.location.assign("certificate/")

            }else{
                setTimeout(() => this.scene.game.loadRoom(), 1000)
            }


        }
    }
    changeBubble() {
        $("#thoughtBubble").hide()
        this.callback.playSound(this.callback.targetInfo.audioFile)
        var animate = new Animate(this.callback.targetInfo.Name, this.callback.targetInfo.frameRate)
        animate.animate().then(() => {
            $("#Heading").html(this.heading)


            $("#bubbleContent").html(this.target[this.textType][1])
            this.scene.soundEffect = ss_soundbits(`audio/bubbleSpeech/${this.scene.game.currentRoom}_${this.target.Name}_1.mp3`);
            

            this.scene.playNarration();
            $(".background1Border").removeClass("background1Border").addClass(this.border)
            $(".background1").removeClass("background1").addClass(this.background)
            $("#thoughtBubble").show()
        })
    }
    populateBubble() {


        $("#roomSVG").append(this.popup)
        console.log(this.target.isGood)
        if (this.target.isGood) {
            console.log("Bananas")
            this.background = "backgroundGood"
            this.border = "backgroundGoodBorder"
            this.heading = "Good job!"
            this.changeBubble()
        } else {
            this.background = "background2"
            this.border = "background2Border"
            this.heading = "This is not safe!"
        }
        $("#Heading").html(this.heading)
        console.log(this)

        $("#bubbleContent").html(this.target[this.textType][0])
        this.scene.soundEffect = ss_soundbits(`audio/bubbleSpeech/${this.scene.game.currentRoom}_${this.target.Name}_0.mp3`);
        this.scene.playNarration();


        $("#thoughtBubble").on("click", () => {
            if ($(".background1").length) {
                this.heading = "What do we do?"
                this.changeBubble()
            } else {
                this.closeBubble()
            }


        })
    }
}