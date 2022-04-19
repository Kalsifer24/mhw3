//Funzioni 
function Start(){

    quiz.classList.remove('hidden');

    for (let button of buttons)
    {
    button.classList.add('hidden');
    }

    fetch('https://nekos.best/api/v2/neko?amount=20').then(onResponse).then(onJson);
}

function selected(event)
    {
    let image = event.currentTarget;
    let ckbox = image.querySelector('img.checkbox') 

    if(image.classList != "selected" && image.classList != "unselected"){
    image.classList.add("selected")
    ckbox.src = 'images/checked.png';
    }

    else if(image.classList == "unselected"){
    image.classList.replace("unselected" , "selected");
    ckbox.src = 'images/checked.png';
    }

   
    Controlli(image.dataset.questionId,image.dataset.choiceId);
    Risposte(image.dataset.questionId,image.dataset.choiceId);

}

function Controlli(domanda,id){

const images = document.querySelectorAll('.choice-grid div');

  for(const box of images)
  {
      if(box.classList !="selected" && domanda==box.dataset.questionId && id!=box.dataset.choiceId){
          box.classList.add("unselected");
      }

      if(box.classList == "selected" && domanda==box.dataset.questionId && id!=box.dataset.choiceId){
          box.classList.replace("selected","unselected");
         const checkbox = box.querySelector('.checkbox');
         checkbox.src = 'images/unchecked.png';
      }   

  }
      
}
 
function Risposte(domanda,id){

const images = document.querySelectorAll('.choice-grid div');

  for(const box of images){
        if(box.classList == "selected" && domanda=="one")
        {
            answers.Ans1=box.dataset.choiceId;
           
            console.log(answers);
        }

        if(box.classList == "selected" && domanda=="two")
        {
            answers.Ans2=box.dataset.choiceId;
            console.log(answers);
        }

        if(box.classList == "selected" && domanda=="three")
        {
            answers.Ans3=box.dataset.choiceId;
            console.log(answers);
        }
    }
        

  if(answers.Ans1 !== "" && answers.Ans2 !== "" && answers.Ans3 !== ""){      
    
    for (let image of images)
    {
    image.removeEventListener('click', selected);
    }

    if (answers.Ans1 === answers.Ans2 || answers.Ans1 === answers.Ans3 || answers.Ans1 !== answers.Ans2 !== answers.Ans3 ){
        titolo.textContent = RESULTS_MAP[answers.Ans1].title;
        descrizione.textContent = RESULTS_MAP[answers.Ans1].contents;
        res_img.src = RESULTS_MAP[answers.Ans1].image;
    }

    else if(answers.Ans2 === answers.Ans3){
        titolo.textContent = RESULTS_MAP[answers.Ans2].title;
        descrizione.textContent = RESULTS_MAP[answers.Ans2].contents;
        res_img.src = RESULTS_MAP[answers.Ans2].image;
    }

    result.classList.remove("hidden");

  }
}

function Reset(){
    
const images = document.querySelectorAll('.choice-grid div');

    for (let image of images){
    image.addEventListener('click', selected);
    const checkbox = image.querySelector('.checkbox');     
    checkbox.src = 'images/unchecked.png';
    image.className = "";
    }

    for (let grid of grids)
    {
        grid.innerHTML = '';
        quiz.classList.add('hidden');
    }

    for (let button of buttons)
    {
    button.classList.remove('hidden');
    }


    answers.Ans1 = "";
    answers.Ans2 = "";
    answers.Ans3 = "";

    result.classList.add("hidden");

}


function onResponse(response){
    
    return response.json();
}

function onJson(json){
    
    let j = 0;
    let list = Array.prototype.slice.call(grids); 
    

    for(let grid of grids){

        for( let i = 0; i<6 ; i++){
            
            let images = json.results[j];
            j++
            if(j>=20){
                j=0;
            }

            const block = document.createElement('div');
            const image = document.createElement('img');
            const chkbox = document.createElement('img');

            image.src = images.url;
            chkbox.src = "images/unchecked.png";
            chkbox.classList.add("checkbox");
           
            
            if(list.indexOf(grid) == "0"){
            block.setAttribute('data-question-id',"one");
            }
            else if(list.indexOf(grid) == "1"){
            block.setAttribute('data-question-id',"two");
            }
            else if(list.indexOf(grid) == "2"){
            block.setAttribute('data-question-id',"three");
            }
             
            block.setAttribute('data-choice-id', i);

            grid.appendChild(block);
            block.appendChild(image);
            block.appendChild(chkbox);
        }    
    }  

    const images = document.querySelectorAll('.choice-grid div');
    
    for (let image of images)
    {
    image.addEventListener('click', selected);
    }

}



//Selettori

let quiz = document.querySelector(".quiz")
const grids = document.querySelectorAll(".choice-grid")
const buttons = document.querySelectorAll("#category button");
const reset = document.querySelector("footer button");
const res_img = document.querySelector("footer img");
const titolo = document.querySelector("footer h1");
const descrizione = document.querySelector("footer p");
const result = document.querySelector("footer div");
const images = document.querySelectorAll('.choice-grid div');


let answers = {
    Ans1:"",
    Ans2:"",
    Ans3:""     
};

//EventListeners

for (let button of buttons)
{
button.addEventListener('click', Start);
}

reset.addEventListener('click', Reset);
