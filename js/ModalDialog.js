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


    // if (this.room.house.autoplay) {

    //   $("#audioTag")[0].play();
    // } else {

    //   $("#audioTag")[0].pause();
    // }


  }

  makeDOMItems() {

    this.popup = $("<div/>", {
      id: "thoughtBubble",
      class: "thoughtPopAnimation"
    }).load("popup.html",()=>this.populateBubble())
    


  }
  populateBubble(){
    $("#roomSVG").append(this.popup)
    $("#bubbleHeaders").html("This is not safe!")
    console.log(this)
   
    $("#bubbleContent").html(this.target[this.textType][0])


    $("#thoughtBubble").on("click", ()=> {
      if ( $(".background2").length) {
        $("#thoughtBubble").remove()
        this.room.removeTarget()
        if (!this.room.triggersLeft) {
          this.room.house.currentRoom = this.room.roomInfo.nextRoom;
          this.room.house.isTutorial = false;
          setTimeout(() => this.room.house.loadRoom(), 1000)
  
  
        }
      }
      else {
        $("#thoughtBubble").hide()
        this.callback.animate().then(()=>
       {
        $("#Title_1_").html("What do we do?")
    
     
      $("#bubbleContent").html(this.target[this.textType][1])
        $("#bubbleHeaders,#bubbleContent").addClass("secondBubble")
        $(".background1Border").removeClass("background1Border").addClass("background2Border")
        $(".background1").removeClass("background1").addClass("background2")
        $("#thoughtBubble").show()
      })
    }

   
    })
  }
}