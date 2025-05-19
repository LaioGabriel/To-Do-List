const localStorageKey = "todoListLaio";
function newTask(){
    let input = document.getElementById("input-task");
    input.style.border = "none";

    if(input.value === "") {
        input.style.border = "1px solid red";
        alert("Você precisa nomear sua task.");
        return;
        

    }else if(input.value.length > 25) {
        input.style.border = "1px solid red";
        alert("O nome da task não pode ter mais de 25 caracteres.");
        
        return;

    }else if(textExists()){
        input.style.border = "1px solid red";
    alert("Essa task já existe.");
    
    }else{
        let values = JSON.parse(localStorage.getItem(localStorageKey)|| '[]') ;
        values.push({
            name: input.value
        })
        
        console.log(values);
        localStorage.setItem(localStorageKey,JSON.stringify(values));
        showTask();
    }
    input.value = ""

}

function showTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    let list = document.getElementById("to-do-list");
    list.innerHTML = "";    
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['name']} 
            <button onclick="eraseItem(${i})" id='btn-erase'>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
               <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
               </svg>
            </button>
        </li>`;
    }
}

function eraseItem(index){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    values.splice(index, 1); // remove o item da posição index
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showTask();
}

function textExists(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    let input = document.getElementById("input-task");
    let exist = values.find(x=> x.name == input.value);
    return exist ? true : false;

}
showTask();