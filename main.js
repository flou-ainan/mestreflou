console.log(new Date().toLocaleDateString())
function $(id){
    return document.getElementById(id)
}




function typeWrite(elementsIds){
   
   let i = 0;
   let counter;
   let contentsArray = []
   let startDelay = 1000 // starting type delay in milliseconds
   const typingSpeed = 60 // interval between types in milliseconds
   const wordDelay = 750 // waiting time between words in milliseconds
   const deletingSpeed = 14 // interval between backspaces in milliseconds
  
   contentsArray = elementsIds.map((elementID) => {
      return $(elementID).innerHTML
   })
   console.log(contentsArray)
   
   if (i==0){
      for(let index = 0; index < elementsIds.length; index++){
         $(elementsIds[index]).innerHTML = ""
      }
   }

   
   
   // recieve an array of DOM element IDs that have innerHTML atribute and typewrite them.
   let typeNow = (elementsIds) => {
      let element = $(elementsIds[i])
      let barElement = $(`${elementsIds[i]}-bar`)
      let word = contentsArray[i].split("")
      element.innerHTML = ""

      
      var loopTyping = () => {
         element.style = "display: inline;"
         barElement.className = ""
         if (word.length > 0) {
            element.innerHTML += word.shift();
         } else {
           
            setTimeout(() => {
               barElement.className = "blinker"
               setTimeout(()=>{
                  barElement.style = "opacity: .0;"
                  // Time to loop again hahaha
                  i++
                  if (elementsIds.length > i){
                     typeNow(elementsIds)       //TYPING LOOP ENDING POINT
                  }else{
                    
                     i=0
                     contentsArray = []

                     setTimeout(() => {typeWrite(elementsIds)},7000)
                     return  // TYPENOW ENDING POINT
                  }
            }, wordDelay)
            }, 200)
            return false;
         };
         counter = setTimeout(loopTyping, typingSpeed);
      };

      // Typing Loop first call
      barElement.style = "opacity: 1.0;"
      counter = setTimeout(loopTyping, wordDelay)
   };
   
   // typeNow first call
   $(`${elementsIds[0]}-bar`).style = "opacity: 1.0;"
   counter = setTimeout(() => typeNow(elementsIds), startDelay)
}

typeWrite(['header-text', 'subtitle-text-01', 'subtitle-text-02'])
