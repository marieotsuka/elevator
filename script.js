var synth = new Tone.Synth(
  { oscillator  : {
      type  : 'sine'
    },
    envelope  : {
    attack  : 0.2,
    decay  : 1,
    sustain  : 0.5,
    release  : 1,
    }
  }).toMaster();


$(function(){
    window.scroll(100, document.documentElement.scrollHeight)

    // var audioElement = document.createElement('audio');
    // audioElement.setAttribute('src', 'beep.mp3');
    // $('#muz').prop('volume',0.1);





    var notes = ['C4','D4','E4','F4','G4','A4','B4','C5'];



    var lastScrollTop = 0;
    var position = 1;
    var floor = 0;
    var currentFloor = 0;
    var height = $(document).height();
  
    $(window).scroll(function(event){            
        position = $(this).scrollTop();
        console.log(position);
        synth.pitch = position/10;

        currentFloor = 8-Math.round((position/height)*8);
        console.log(currentFloor);

        changeFloors();

    });

    function changeFloors(){

      if (position > lastScrollTop){
        $('#arrow').removeClass('hide').addClass('down');
      }else{
        $('#arrow').removeClass('hide').removeClass('down');
      }
      lastScrollTop = position;

      console.log(floor); 
      if (currentFloor!=floor){
        synth.triggerRelease();
        floor = currentFloor;  
        // audioElement.play();
        console.log(notes[floor-1]);
        synth.triggerAttackRelease(notes[floor-1]);
        console.log('play');       
      }
      if(floor===0){
          $('#arrow').addClass('hide');
          synth.triggerRelease();
      }else if(floor===8){
        $('#arrow').addClass('hide');
        $('#floor').text(floor);
      }
      else{
        $('#floor').text(floor);
      }

    } 

});

