window.addEventListener("load", init);

if(localStorage.getItem("pontuacoes") == undefined){
    localStorage.setItem("pontuacoes", "[]");
}

function init(){
    ler_pontuacoes();
    addEvents();
    document.querySelector(".content").style.height = `${screen.availHeight}px`;
}

function addEvents() {

    let json = {
        ArrowLeft(){
            headerLeft()
        },
        ArrowRight(){
            headerRight()
        }
    }
    let $left = document.querySelector("#left");
    $left.addEventListener("click", headerLeft)

    let $right = document.querySelector("#right");
    $right.addEventListener("click", headerRight)

    let $body = document.querySelector("body");
    $body.addEventListener("keyup", (e)=>{
        try{
            return json[e.key]()
        }catch(err){
            return null
        }
    })

}

function headerLeft(){
    let $b = document.querySelectorAll(".middle>button");
    let n = 0;

    while(true){
        if($b[n].classList.contains("selected")){
            if(n == 0){
                $b[n].classList.remove("selected");
                document.querySelector(`.${$b[n].getAttribute("value")}`).style = "display:none";
                $b[$b.length-1].classList.add("selected");
                document.querySelector(`.${$b[$b.length-1].getAttribute("value")}`).style = "display:flex";
                break;
            }else{
                $b[n].classList.remove("selected");
                document.querySelector(`.${$b[n].getAttribute("value")}`).style = "display:none";
                $b[n-1].classList.add("selected");
                document.querySelector(`.${$b[n-1].getAttribute("value")}`).style = "display:flex";
                break;
            }
        }
        n++;
    }
}

function headerRight(){
    let $b = document.querySelectorAll(".middle>button");
    let n = 0;

    while(true){
        if($b[n].classList.contains("selected")){
            if(n == $b.length-1){
                $b[n].classList.remove("selected");
                document.querySelector(`.${$b[n].getAttribute("value")}`).style = "display:none";
                $b[0].classList.add("selected");
                document.querySelector(`.${$b[0].getAttribute("value")}`).style = "display:flex";
                break;
            }else{
                $b[n].classList.remove("selected");
                document.querySelector(`.${$b[n].getAttribute("value")}`).style = "display:none";
                $b[n+1].classList.add("selected");
                document.querySelector(`.${$b[n+1].getAttribute("value")}`).style = "display:flex";
                break;
            }
        }
        n++;
    }
}

function ler_pontuacoes(){
    let pont = JSON.parse(localStorage.getItem("pontuacoes"));
    let $pontuacoes = document.querySelector("#pontuacoes");
    pont.forEach(element => {
       let $div = `
        <div class="pont">
            <p>${element.nome}</p>
            <p>${element.acertos}</p>
        </div>
       ` 
       $pontuacoes.innerHTML += $div;
    });
}