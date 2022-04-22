//Funzioni 

function selected(event)
    {

    const images = document.querySelectorAll('.choice-grid div');
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

    choice_id = image.dataset.choiceId;
    let domanda = image.dataset.questionId;
    
    // controllo

    for(const box of images)
    {
        if(box.classList !="selected" && domanda==box.dataset.questionId && choice_id!=box.dataset.choiceId){
            box.classList.add("unselected");
        }
  
        if(box.classList == "selected" && domanda==box.dataset.questionId && choice_id!=box.dataset.choiceId){
            box.classList.replace("selected","unselected");
           const checkbox = box.querySelector('.checkbox');
           checkbox.src = 'images/unchecked.png';
        }   
  
    }

    
    Risposte(image.dataset.questionId,image.dataset.choiceId);

}

 
function Risposte(domanda,id){

const images = document.querySelectorAll('.choice-grid div');

  for(const box of images){
        if(box.classList == "selected" && domanda=="one")
        {
            answers.Ans1=box.dataset.choiceId;
           
            
        }

        if(box.classList == "selected" && domanda=="two")
        {
            answers.Ans2=box.dataset.choiceId;
            
        }

        if(box.classList == "selected" && domanda=="three")
        {
            answers.Ans3=box.dataset.choiceId;
            
        }
    }
        

  if(answers.Ans1 !== "" && answers.Ans2 !== "" && answers.Ans3 !== ""){      
    
    for (let image of images)
    {
    image.removeEventListener('click', selected);
    }

    fetch(kitsu,  
        {
            headers: 
            {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization':'Bearer' + token 
            }
    
        }).then(onResponse).then(onJsonAnime);

   /* if (answers.Ans1 === answers.Ans2 || answers.Ans1 === answers.Ans3 || answers.Ans1 !== answers.Ans2 !== answers.Ans3 ){
        titolo.textContent = title;
        descrizione.textContent = synops;
        res_img.src = poster;

        fetch(kitsu,  
            {
                headers: 
                {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization':'Bearer' + token 
                }
        
            }).then(onResponse).then(onJsonAnime);
        
    }

    else if(answers.Ans2 === answers.Ans3){
        titolo.textContent = title;
        descrizione.textContent = synops;
        res_img.src = poster;

        fetch(kitsu,  
            {
                headers: 
                {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization':'Bearer' + token 
                }
        
            }).then(onResponse).then(onJsonAnime);
        
    }*/

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

function Start(){

    quiz.classList.remove('hidden');

    for (let button of buttons)
    {
    button.classList.add('hidden');
    }

    fetch(neko).then(onResponse).then(onJsonNeko);

   
}

function creation(){
    let j = 0;
    let list = Array.prototype.slice.call(grids); 

    for(let grid of grids){

        for( let i = 0; i<9 ; i++){

            const block = document.createElement('div');
            const image = document.createElement('img');
            const chkbox = document.createElement('img');

            image.src = random_img[j].url;
            j++
            if(j>=20)
            j=0;
            

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

function onResponse(response){
    
    return response.json();
}

function onJsonNeko(json){
    random_img = json.results;
    creation();
    
            

   /* let j = 0;
    let list = Array.prototype.slice.call(grids); 
    

    for(let grid of grids){

        for( let i = 0; i<9 ; i++){
            
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
    }*/

}

function onJsonAnime(json){

    let  i = choice_id;
    title = json.data[i].attributes.slug;
    poster = json.data[i].attributes.posterImage.original;
    synops = json.data[i].attributes.synopsis;

    if (answers.Ans1 === answers.Ans2 || answers.Ans1 === answers.Ans3 || answers.Ans1 !== answers.Ans2 !== answers.Ans3 ){
        titolo.textContent ="Titolo: " + title;
        descrizione.textContent = synops;
        res_img.src = poster;
        
    }

    else if(answers.Ans2 === answers.Ans3){
        titolo.textContent = title;
        descrizione.textContent = synops;
        res_img.src = poster;
    }
   
}

//TOKEN

function onTokenResponse(response){
    return response.json();
}

function getToken(json){
    token = json;
    
}




//Selettori

let quiz = document.querySelector(".quiz")
const grids = document.querySelectorAll(".choice-grid")
const buttons = document.querySelectorAll("#category button");
const reset = document.querySelector("footer button");
const res_img = document.querySelector("footer img");
const titolo = document.querySelector("#title");
const descrizione = document.querySelector("#descrizione");
const result = document.querySelector("footer div");
const images = document.querySelectorAll('.choice-grid div');

let answers = {
    Ans1:"",
    Ans2:"",
    Ans3:""     
};  

let title;
let poster;
let synops;
let choice_id;
let random;
let random_img;
//API

let token;

const neko = 'https://nekos.best/api/v2/neko?amount=20';
const kitsu = 'https://kitsu.io/api/edge//anime?filter[categories]=shounen';
const kitsu_auth_token = 'https://kitsu.io/api/oauth/token';
const poke = "https://pokeapi.co/api/v2/pokemon/"+random+"/";

const id = 'antodibella111@gmail.com';
const password = 'webprog2022';

fetch(kitsu_auth_token,
    {
        method: 'POST',
        body: 'grant_type=password&username=' + id + '&password=' + password,
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    ).then(onTokenResponse).then(getToken);

//EventListeners

for (let button of buttons)
{
button.addEventListener('click', Start);
}

reset.addEventListener('click', Reset);
