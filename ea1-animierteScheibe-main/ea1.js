/*
* Inspiration für die Animation: https://giphy.com/gifs/cat-cute-roomba-3iBcRAErFhFwoTVbN5
* Grundlagen für das lesen von Bildern: Moodle Kurs-Materialien des Kurses Graphical Visualisation Technologies
* Hilfestellung zur Implementierung des Intervalls der Bilder und der Erstellung der Animation über veränderung der Background-Position: https://levelup.gitconnected.com/three-ways-to-animate-sprite-sheet-image-a5c000f0c579
*
* Die Grafiken wurden von mir per Hand (komplett in Photoshop) erstellt und um die mittlere Achse des Staubsaugerroboters jeweils um 15° rotiert.
* Anmerkung 1: Ich habe absichtlich davon abgesehen, das Bild beispielsweise in Adobe After Effekts zu animieren und die Animation direkt als einzelne Bilder oder als Spritesheet zu exportieren, um eine Animation "per Hand" zu erzeugen, diesen Weg auf diese Weise nachzuvollziehen.
* Anmerkung 2: Da durch Drücken von A versehentlich die Animation zuerst unendlich viel schneller abgespielt wurde und ich es überaus witzig fand, habe ich das "Feature" nun absichtlich (über die Taste 'S') mit eingebaut.
* 
* Steuerung:
* 'L': Der Staubsaugerroboter dreht sich um 15° nach links. Zum Drehen muss man wiederholt drücken. Wenn eine Animation läuft wird diese beendet.
* 'R': Der Staubsaugerroboter dreht sich um 15° nach rechts. Zum Drehen muss man wiederholt drücken. Wenn eine Animation läuft wird diese beendet.
* 'A': Die Animation der Drehung des Staubsaugerroboters wird automatisch abgespielt und auch wieder beendet, wird die Taste noch einmal geklickt.
* 'S': Super übertriebener Geschwindigkeits-Modus! Kann über das Klicken der anderen Tasten wieder gestoppt werden.
*
* Die durchgehende animierte Lade-Animation wurde von mir in Adobe After Effects erstellt, als Einzelbilder exportiert und zu einem Tileset zusammengestellt.
* Über die CSS-Background-Position wird über die Einzelbilder eine Animation erstellt.
*/







"use strict";





/*
function numbers() {
    var elem = document.getElementById('textSpan');
    
    for (var i = 0; i < 1000; i++) {
        elem.innerHTML += i + " ";
    }
}

function changeColor(color) {
    var elem = document.getElementById('textSpan');
    elem.style.color = color;
}



window.onkeydown = function(evt) {
    console.log(evt);
    var key = evt.which ? evt.which : evt.keyCode;
    var c = String.fromCharCode(key);
    switch (c) {
    case ('R'):
        changeColor("#ff0000");
        break;
    case ('G'):
        changeColor("#00ff00");
        break;
    case ('B'):
        changeColor("#0000ff");
        break;

    }
}; 
*/
const speed = 100;
const speedTilesetAnimation = 25;
var animationInterval;
var tilesetAnimationInterval;
var bildNummer = 1;
var isConstantlyAnimated = false;
var speedoMode = false;

var hasClickedLeft = false;
var hasClickedRight = false;
var hasClickedAnimationStart = false;

var tilesetSpaltenAnzahl = 6;
var tilesetZeilenAnzahl = 20;
var spaltenGroesse = 0;
var zeilenGroesse = 0;
var tilesetBreite = 0;
var tilesetHoehe = 0;
var aktuelleSpalte = 1;
var aktuelleZeile = 1;
var tilesetAusgangsposition = 0;
var tilesetPositionX = 0;
var tilesetPositionY = 0;


function buildSite() {
    loadImage("1.png");
    loadAnimatedTileset("tileset.png");
}


function loadImage(filename) {
    var imageObj = new Image();
    imageObj.onload = function() {
        var img = document.getElementById('x');
       

       


        img.setAttribute('src', this.src);

      
    };
    imageObj.src = "textures/" + filename;
  //  imageObj.style.height = imageObj.style.height / 2; 
   // imageObj.style.width = imageObj.style.width / 2; 
}



function loadAnimatedTileset(filename) {
    var imageObj = new Image();
    imageObj.src = "textures/" + filename;


        //imageObj.width = imageObj.width * 0.5;
      //  imageObj.width = imageObj.height * 0.5;


        var img = document.getElementById('animatedTileset');
       

       


    //    img.setAttribute('src', this.src);

     //   tilesetAusgangsposition = img.position;
    //    console.log(tilesetAusgangsposition);

   // tilesetBreite = imageObj.width;
    tilesetBreite = imageObj.width;
   // console.log(tilesetBreite);
        tilesetHoehe = imageObj.height;



        //tilesetHoehe = 10240;
        
        spaltenGroesse = tilesetBreite / tilesetSpaltenAnzahl;
      //  console.log(spaltenGroesse);
        zeilenGroesse = tilesetHoehe / tilesetZeilenAnzahl;
     //   console.log(zeilenGroesse);

      //  console.log("rest");

      tilesetPositionX = spaltenGroesse;

      img.style.width = spaltenGroesse;
      img.style.height = zeilenGroesse;
      
 //   };

   // imageObj.src = "textures/" + filename;

   tilesetAnimationInterval = setInterval(() => {
    // console.log(  tilesetAnimationInterval);

        
/*

        if (aktuelleSpalte < 6) {
            imageObj.position = imageObj.position - spaltenGroesse;

            aktuelleSpalte++;
        } else {
            bildNummer = 1;
        }*/

        img.style.backgroundPosition = `${tilesetPositionX}px ${tilesetPositionY}px`;

        img.style.resize 

        if (tilesetPositionX < tilesetBreite) {
            tilesetPositionX = tilesetPositionX + spaltenGroesse;
          } else {
            //increment the position by the width of each sprite each time
            tilesetPositionX = spaltenGroesse;
            if (tilesetPositionY < tilesetHoehe) {
                tilesetPositionY = tilesetPositionY + zeilenGroesse;
            } else {
                tilesetPositionY = zeilenGroesse;
            }
          }
        
        //  console.log(tilesetPositionX);

    }, speedTilesetAnimation);


   // animateTileset();
  //  imageObj.style.height = imageObj.style.height / 2; 
   // imageObj.style.width = imageObj.style.width / 2; 
}

function animateTileset() {
    
   // isConstantlyAnimated = true;

    var imageObj = new Image();
    imageObj.onload = function() {
        var img = document.getElementById('animatedTileset');
        img.setAttribute('src', this.src);




    };

   // imageObj.src = "textures/" + bildNummer + ".png";

/*
    animationInterval = setInterval(() => {
        if (aktuelleSpalte < 6) {
            img.style.position = imageObj.style.position - spaltenGroesse;

            aktuelleSpalte++;
        } else {
            bildNummer = 1;
        }

        
    }, speed);*/

 //   for (let i = 1; i <25; i++) {
 //   imageObj.src = "textures/" + i + ".png";
  //  }

}


function animateImage() {
    
    isConstantlyAnimated = true;

    var imageObj = new Image();
    imageObj.onload = function() {
        var img = document.getElementById('x');
        img.setAttribute('src', this.src);
    };

    animationInterval = setInterval(() => {
        if (bildNummer < 24) {
            bildNummer++;
        } else {
            bildNummer = 1;
        }

        imageObj.src = "textures/" + bildNummer + ".png";
    }, speed);

 //   for (let i = 1; i <25; i++) {
 //   imageObj.src = "textures/" + i + ".png";
  //  }

}


function goFasterPog() {
    speedoMode = true;
    isConstantlyAnimated = true;
    var imageObj = new Image();
    imageObj.onload = function() {
        var img = document.getElementById('x');
        img.setAttribute('src', this.src);
    };

    animationInterval = setInterval(() => {
        if (bildNummer < 24) {
            bildNummer++;
        } else {
            bildNummer = 1;
        }

        imageObj.src = "textures/" + bildNummer + ".png";
    }, speed);

}


window.onkeydown = function(evt) {
    console.log(evt);
    var key = evt.which ? evt.which : evt.keyCode;
    var c = String.fromCharCode(key);
    switch (c) {
    case ('A'):
        if (!hasClickedAnimationStart) {
            hasClickedAnimationStart = true;
        if (!isConstantlyAnimated) {
            animateImage();
        } else {
            stopAnimation()
        }
    }
        break;
    case ('S'):
        goFasterPog();
        break;
    case ('L'):
        if (!hasClickedLeft) {
            goLeft();
            hasClickedLeft = true;
        }
        break;
    case ('R'):
        if (!hasClickedRight) {
            goRight();
            hasClickedRight = true;
        }
        break;
    }
}; 







window.onkeyup = function(evt) {
    console.log(evt);
    var key = evt.which ? evt.which : evt.keyCode;
    var c = String.fromCharCode(key);
    switch (c) {
    case ('A'):
        hasClickedAnimationStart = false;
        break;
    case ('L'):
        hasClickedLeft = false;
        break;
    case ('R'):
        hasClickedRight = false;

        break;

    }
}; 









function stopAnimation() {
    clearInterval(animationInterval);
    if (!speedoMode) {
    isConstantlyAnimated = false;
    }
    else {
     
for (var i = 0; i < animationInterval; i++)
{
    if (i != tilesetAnimationInterval) {
	window.clearInterval(i);
    }
 
}
    isConstantlyAnimated = false;

    }
  }




  
  function goLeft() {
    
    if (isConstantlyAnimated) {
        stopAnimation();
    }

    var imageObj = new Image();
    imageObj.onload = function() {
        var img = document.getElementById('x');
        img.setAttribute('src', this.src);
    };

        if (bildNummer < 24) {
            bildNummer++;
        } else {
            bildNummer = 1;
        }

        imageObj.src = "textures/" + bildNummer + ".png";


}


  
function goRight() {
    
    if (isConstantlyAnimated) {
        stopAnimation();
    }

    var imageObj = new Image();
    imageObj.onload = function() {
        var img = document.getElementById('x');
        img.setAttribute('src', this.src);
    };

        if (bildNummer > 1) {
            bildNummer--;
        } else {
            bildNummer = 24;
        }

        imageObj.src = "textures/" + bildNummer + ".png";


}




$(document).ready(function () {
    $('.modal').modal();
});
