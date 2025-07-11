const Soldati = document.querySelector('.Soldati') /// clasa soldatilor(bilelor)
const all_inputs = document.querySelectorAll('.Input')
const soldati_input = document.getElementById('soldati_input')
const soldati_button = document.getElementById('soldati_button');
const k_input = document.getElementById('k_input');
const k_button = document.getElementById('k_button');
const feedback = document.getElementById('feedback');
const skip_button = document.getElementById("skip_button");
const restart_button = document.getElementById("restart_button");
var n, k;
var soldiers_arr = []; /// vectorul de soldati ramasi in viata
var viteza

function setup_n()
{
    n = parseInt(soldati_input.value)
    if(!(n >= 1 && n <= 9999))
    {
        alert("Vezi ca ai introdus o valoare invalida!!!")  
    } 

    else
    {
        /// golim lista de soldati
        soldiers_arr = [];
        while(Soldati.firstChild)
            Soldati.removeChild(Soldati.firstChild)

        /// construim noua lista
        for(let i=1; i<=n; i+=1)
        {
            const new_bila = document.createElement('div')
            new_bila.className = "Bila"
            new_bila.innerHTML = i.toString()
            Soldati.append(new_bila)

            soldiers_arr.push(i) /// construim vectorul de soldati
        }
    }
}

function setup_k()
{
    k = parseInt(k_input.value)
    if(!(k >= 1 && k <= 9999) || k > n)
        alert("Vezi ca ai introdus o valoare invalida!!!")
    else
    {
        var nod = Soldati.children[k-1];
        nod.style.backgroundColor = "rgb(141, 206, 38)"
        feedback.innerHTML = `${nod.innerHTML} incepe`
        start_game()
    }
}

soldati_button.addEventListener('mousedown', ()=> setup_n())
soldati_input.addEventListener('keydown', (event)=>
    {
        if(event.key == "Enter")
            setup_n()
    })

k_button.addEventListener('mousedown', ()=> setup_k())
k_input.addEventListener('keydown', (event)=>
{
    if(event.key == "Enter")
        setup_k()
})

restart_button.onclick = ()=> location.reload()
skip_button.onclick = ()=> viteza = 0



/// partea cu algoritmul:
var current, last_victim;

async function start_game()
{
    all_inputs.forEach(input => {
        input.remove()
    });
    skip_button.style.visibility = "visible"
    restart_button.style.visibility = "visible"
    current = k;
    viteza = Math.max(1000 - n * 10, 100);

    while(soldiers_arr.length > 1)
    {
        await sleep(viteza);
        kill(current)
        await sleep(viteza)
        Soldati.children[last_victim - 1].style.backgroundColor = "crimson"
        await sleep(viteza)
        Soldati.children[current - 1].style.backgroundColor = "white";
        
        current = get_next_soldier(current)
        Soldati.children[current - 1].style.backgroundColor = "rgb(141, 206, 38)"
    }
    feedback.innerHTML = `${k} incepe si ${soldiers_arr[0]} castiga`
}

function get_next_soldier(soldier)
{
    var soldier_index = soldiers_arr.indexOf(soldier);
    if(soldier_index + 1 > soldiers_arr.length - 1)
        return soldiers_arr[0]
    else
        return soldiers_arr[soldier_index + 1];
}

function kill(soldier)
{
    var victim = get_next_soldier(soldier)
    console.log(soldier + " -> " + victim)
    soldiers_arr.splice(soldiers_arr.indexOf(victim), 1)
    Soldati.children[victim - 1].style.backgroundColor = "rgb(88, 1, 18)";
    last_victim = victim
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}