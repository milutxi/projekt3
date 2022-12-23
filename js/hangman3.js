$(function() {
   
const WORDSARRAY = ["cheer", "table", "beach", "green", "drive", "hello", "admit", "earth", "image", "brown", "mouse", "house", "water", "drink"];
const WORD = WORDSARRAY[ (Math.floor(Math.random() * WORDSARRAY.length))];

const LETTERSARRAY = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


$(".picture").append('<img src="./images/12.jpg" alt="hangman" />');



for (let k = 0; k < LETTERSARRAY.length; k++) {   //to get the keyboard from the lettersArray.
    $("<button class='buttons'>"+LETTERSARRAY[k]+"</button>").appendTo(".keyboard"); 
}

$(".buttons").on( {
    mouseenter: function() {
        $(this).addClass("activebutton");
    },
    mouseleave: function(){
        $(this).removeClass("activebutton");
    },
  //  click: function() {
  //      $(this).
    })

})

