class ModalDialog {
    constructor(room, target, textType, showHeader, isTrigger = true, callback) {
        this.callback = callback
        this.isTrigger = isTrigger;
        this.room = room;
        this.showHeader = showHeader;
        this.target = target;
        this.textType = textType;
        this.audioPlay = this.room.house.autoplay ? 'audioOn' : 'audioOff';
        this.displayTargetInfo();
        console.log(target)

    }


    displayTargetInfo() {


        this.makeDOMItems();
        this.makeModalEvents();
        setTimeout(() => this.changePlayState(), 1000)
    }

    makeModalEvents() {

        $("#AudioButton").on("click", () => this.toggleSpokenAudio())






    }


    toggleSpokenAudio() {
        $("#AudioButton").toggleClass("audioOff audioOn")
        this.room.house.autoplay = !this.room.house.autoplay;
        this.changePlayState();
    }


    changePlayState() {


        if (this.room.house.autoplay) {

            this.soundEffect.playclip()
        } else {

            this.soundEffect.pauseclip()
        }

        this.room.house.toggleAutoplay();
    }

    makeDOMItems() {

        this.popup = $("<div/>", {
            id: "thoughtBubble",
            class: "thoughtPopAnimation"
        }).load("popup.html", () => this.populateBubble())



    }
    closeBubble() {

        $("#thoughtBubble").remove()
        this.room.removeTarget()
        if (!this.room.triggersLeft) {
            this.room.house.currentRoom = this.room.roomInfo.nextRoom;
            this.room.house.isTutorial = false;
            setTimeout(() => this.room.house.loadRoom(), 1000)


        }
    }
    changeBubble() {
        $("#thoughtBubble").hide()
        this.callback.playSound(this.callback.targetInfo.audioFile)
        var animate = new Animate(this.callback.targetInfo.Name, this.callback.targetInfo.frameRate)
        animate.animate().then(() => {
            $("#Heading").html(this.heading)


            $("#bubbleContent").html(this.target[this.textType][1])
            this.room.soundEffect = ss_soundbits(`audio/bubbleSpeech/bubble1/${this.room.house.currentRoom}_${this.target.Name}_1.mp3`);
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
        this.room.soundEffect = ss_soundbits(`audio/bubbleSpeech/bubble1/${this.room.house.currentRoom}_${this.target.Name}_0.mp3`);


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