$(function() {

    $(".reset-game").hide();
   
    const WORDSARRAY = ["cheer", "table", "beach", "green", "drive", "hello", "admit", "earth", "image", "brown", "mouse", "house", "water", "drink"];
    
    let newWord = WORDSARRAY[ (Math.floor(Math.random() * WORDSARRAY.length))];
    console.log(newWord);
    const LETTERSARRAY = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    
    let wins = 0;// count the total number of wins
    let lose = 0;// counmt the total number of losses

    let hiddenWord = "-----";
    let letter;
    let lettersEntered = [];    // new array for the letters entered, will add one by one in the game
    
    let attempts = 12; // number of attempts

    let letterArray = [];

    for (let b = 1; b <= 12; b++) {                             //All the pictures hiden from the begining
        $(".picture").append('<img src="./images/'+b+'.jpg" alt="hangman" hidden=true id="' + b +'" />');

    }
    $(".wins").text("WINNINGS: " + wins);
    $(".lose").text("LOSES: " + lose);
    $(".guessword").text(hiddenWord);
    $(".attempts").text("Atempts: " + attempts + " of 12");
    $(".letters_entered").text("Letters already entered: " + lettersEntered);

    let k = 0
    while(k < LETTERSARRAY.length){   //to get the keyboard from the LETTERSARRAY.
        $("<button class='buttons'>"+LETTERSARRAY[k]+"</button>").appendTo(".keyboard"); 
        k++;
    }

    $(".buttons").on( {
        mouseenter: function() {
            $(this).addClass("activebutton");
        },
        mouseleave: function(){
            $(this).removeClass("activebutton");
        },
        click: function() {
            //
            letter= $(this).text().toLowerCase();

            if(attempts > 0){
                if(newWord.indexOf(letter) != -1) {     // check if the letter is in the word
                //the user enter the right code
                    lettersEntered.push(letter);  // add letter into the array
                    letterArray = findIndexes(letter, newWord);   // calling function that will return array of indexes
                   
                    for(let j = 0; j < letterArray.length; j++){     //replace the "-" with the entered letter
                        hiddenWord = replaceAt(hiddenWord,letterArray[j],letter);
                    }
                    if(hiddenWord === newWord){    // final conditional if the whole word is guessed or not.
                        $(".section2").hide();
                        $(".keyboard").hide();
                        $(".section3").text("CONGRATULATIONS!!! YOU WIN.The word was: " + newWord).show();
                        $(".reset-game").show();
                        wins++;
                        $(".wins").text("WINNINGS: " + wins);
                        
                    }else{
                        $(".guessword").text(hiddenWord);
                        $(".attempts").text("Atempts: " + attempts + " of 12");
                        $(".letters_entered").text("Letters already entered: " + lettersEntered);
    
                    }



                }else{                  //the user enter the wrong letter
                    if(attempts === 12) {//first failed attempt
                        $("#" + attempts).show();
                        attempts--;
                    }else{//other failed attempts
                        $("#"+ (attempts + 1)).hide();
                        $("#" + attempts).show();
                        attempts--;

                        if(attempts === 0) {//When no attempts remain
                            $(".section2").hide();
                            $(".keyboard").hide();
                            $(".section3").text("GAME OVER, click reset to start again").show();
                            $(".reset-game").show();
                            lose++;
                            $(".lose").text("LOSES: " + lose);
                        }
                    }
                    
                    lettersEntered.push(letter);  // add letter into the array

                    $(".guessword").text(hiddenWord);
                    $(".attempts").text("Atempts: " + attempts + " of 12");
                    $(".letters_entered").text("Letters already entered: " + lettersEntered);

                }

            }else{
               $(".section2").hide();
               $(".keyboard").hide();
               $(".section3").text("GAME OVER, click reset to start again");
               $(".reset-game").show();
               
            }
        }
    })




function findIndexes(l, w){  // l for letter and w for word, two variables that i do not want to mix with the above already write.

    let arrayOfIndexes = [];

    for(let i = 0; i < w.length; i++) {
        if(l === w[i]){                     // if the letter is in the word will add its index in the array of indexes
            arrayOfIndexes.push(i);
        }
    }
    return arrayOfIndexes;
}

function replaceAt(hWord,index,letter){
    if(index === 0) {
        return  letter + hWord.substring(1, hWord.length);   // this is for the first letter to replace
    }else if (index === hWord.length-1) {                                    // this is for the last letter to replace
        return hWord.substring(0, hWord.length-1) + letter;
    }else {
        return hWord.substring(0, index) + letter+hWord.substring(index+1,hWord.length);   //this is for the middle letters to replace
    } 
}

$("<button class='reset'>RESET</button>").appendTo(".reset-game");

$(".reset").on( {
    mouseenter: function() {
        $(this).addClass("activebutton");
    },
    mouseleave: function(){
        $(this).removeClass("activebutton");
    },
    click: function() {
        $(".section3").hide();

        hiddenWord="-----";
        if(attempts < 12){
            $("#" + (attempts+1)).hide();
        }
        attempts = 12; 
        lettersEntered = [];   
        newWord = WORDSARRAY[ (Math.floor(Math.random() * WORDSARRAY.length))];
        console.log(newWord);

        $(".guessword").text(hiddenWord);
        $(".attempts").text("Atempts: " + attempts + " of 12");
        $(".letters_entered").text("Letters already entered: " + lettersEntered);

        $(".section2").show();
        $(".keyboard").show();
        $(".reset-game").hide();

    }
    
})


})