class Target {
    constructor(room, targetInfo) {
        this.room = room;
        this.isAnimating = false;
        this.currentFrame = 1;
        this.currentLoop = 1;

        this.targetInfo = targetInfo;
        this.targetInfo.isTrigger = this.targetInfo.isTrigger || false;
        this.loopAmount = this.targetInfo.loopAmount || 1;
        this.targetSelector = $(`#roomSVG  #${this.targetInfo.Name}`)

        this.targetSelector.one("click", (evt) => {


            this.itemClicked(evt)

        })

    }


    playSound(sound = "MirrorDing.mp3") {
        var soundEffect = ss_soundbits("audio/" + sound);
        soundEffect.playclip();
    }



    itemClicked(evt) {
        this.playSound()
        setTimeout(() => this.modalAndCubbyShow(evt), 500)

    }

    // initialize the timer variables and start the animation

    modalAndCubbyShow(evt) {

        if (this.targetInfo.isTrigger) {
            var cubbyCheck = evt.currentTarget.id.slice(0, 8)

            if (cubbyCheck === "cubbySVG") {

            } else {
                // this.room.removeTarget()
                var cubbyTarget = `#cubbySVG_${this.targetInfo.Name}`
                $(cubbyTarget).show(2000)
                $(cubbyTarget).off().on("click", (evt) => this.itemClicked(evt));

                // $(`#${this.targetInfo.Name}`).hide("1000");
                this.room.blur.removeHighlightCopy()
                if (this.room.house.isTutorial && this.room.triggersLeft) {

                    this.room.setupTarget(this.room.roomInfo.targets[this.room.currentTargetId])
                }
            }
            //  isTrigger = true;
        }
        // var item = roomData.targets[lookup[clickedItem]];

        var itemName = this.targetInfo.Name
        if (true || !$("#thoughtBubble").length) {


            if (!this.room.triggersLeft) {
                this.room.showHeader = true
            }

            this.targetModalDialog = new ModalDialog(this.room, this.targetInfo, "postText", this.room.showHeader, this.targetInfo.isTrigger, this)
                // this.targetModalDialog.displayTargetInfo()




            this.targetSelector.off()
        }


    }



}