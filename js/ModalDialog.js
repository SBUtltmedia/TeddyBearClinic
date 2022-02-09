class ModalDialog {
    constructor(scene, targetInfo) {
       
        this.scene = scene;
 
        this.targetInfo = targetInfo;
   
        this.audioPlay = this.scene.game.autoplay ? 'audioOn' : 'audioOff';
        this.makeDOMItems();
        

    }





    makeDOMItems() {
        console.log("makeDOMItems")
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
        playSound(this.targetInfo.audioFile,"soundEffect").playclip();
        var animate = new Animate(this.targetInfo.Name, this.targetInfo.frameRate)
        animate.animate().then(() => {
            
            $("#Heading").html(this.heading)


            $("#bubbleContent").html(this.targetInfo['postText'][1])
            let callback=()=>$('#thoughtBubble').click();
            let sound= `bubbleSpeech/${this.scene.game.currentRoom}_${this.targetInfo.Name}_1.mp3`
            this.scene.Narration = playSound(sound,"bubbleSpeech",callback);
            

            this.scene.playNarration();
            $(".background1Border").removeClass("background1Border").addClass(this.border)
            $(".background1").removeClass("background1").addClass(this.background)
            $("#thoughtBubble").show()
        })
    }
    populateBubble() {
        
     
        $("#roomSVG").append(this.popup)

      
        $(".target").css({pointerEvents:"none"})
        if (this.targetInfo.isGood) {
            
            this.background = "backgroundGood"
            this.border = "backgroundGoodBorder"
            this.heading = "Good job!"
            $(".background1Border").removeClass("background1Border").addClass(this.border)
            $(".background1").removeClass("background1").addClass(this.background)
            this.changeBubble()
        } else {
            this.background = "background2"
            this.border = "background2Border"
            this.heading = "This is not safe!"
        }
        $("#Heading").html(this.heading)
        

        $("#bubbleContent").html(this.targetInfo['postText'][0])
        let sound= `bubbleSpeech/${this.scene.game.currentRoom}_${this.targetInfo.Name}_0.mp3`
        let callback=()=>{$('#thoughtBubble').trigger("click")};
        this.scene.Narration = playSound(sound,"bubbleSpeech",callback);
      
        this.scene.playNarration();
        console.log(    $("thoughtBubble"))
        
        $("#thoughtBubble").on("click", () => {
     
            this.scene.Narration.stopclip();
         //   this.scene.soundEffect.stopclip()
            if ($(".background1").length) {
                this.heading = "What do we do?"
                this.changeBubble()
            } else {
                this.closeBubble()
            }


        });
        


    }
}