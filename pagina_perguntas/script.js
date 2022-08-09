window.addEventListener("load", init);
window.sessionStorage.setItem("resp", "[]");

let num = 0;
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let set1 = [];

let params = new URLSearchParams(window.location.search);
if(params.get("id") == "1"){
    set1 = [
        {
            nome: "questão 1",
            pergunta: "O que é o gelo seco?",
            respostas: [
                {
                    type: false,
                    reposta: "pó do leite"
                },
                {
                    type: false,
                    reposta: "pó do ovo"
                },
                {
                    type: true,
                    reposta: "Carbono comprenssado"
                }
            ]
        }
    ]
}

function init(){
    addEvents();
    loadans();
}

function loadans(){
    if(set1.length == num){
        document.querySelector("#addanswer").innerHTML = "";
        document.querySelector("#pergunta").classList.add("model");
        return document.querySelector(".modal").classList.remove("model")
    }
    document.querySelector("#addanswer").innerHTML = `
    <div class="quest model">
        <div class="circle">
            <p></p>
        </div>
        <div class="circle2">
        </div>
        <div class="retangulo">
            <p></p>
        </div>
    </div>
    `;
    document.querySelector("#pergunta").innerHTML = set1[num].pergunta
    set1[num].respostas.forEach((e, index)=>{
        let model = document.querySelector(".model").cloneNode(true);
        model.classList.remove("model")
        model.querySelector(".circle").querySelector("p").innerHTML = alphabet[index];
        model.querySelector(".retangulo").querySelector("p").innerHTML = e.reposta;
        model.addEventListener("click", ()=>{
            let array = JSON.parse(window.sessionStorage.getItem("resp"));
            array.push(e);
            window.sessionStorage.setItem("resp", JSON.stringify(array));
            num+=1;
            loadans();
        })
        document.querySelector("#addanswer").appendChild(model);
    })
}

function addEvents(){
    let $back = document.getElementById("back");
    $back.addEventListener("click", function(){
        window.location.href = "/";
    });

    let $salvar = document.getElementById("salvar");
    $salvar.addEventListener("click", function(){
        let item = JSON.parse(window.sessionStorage.getItem("resp"));
        let acertos = 0;
        item.forEach(e=>{
            if(e.type){
                acertos++;
            }
        })
        let json = {
            nome: document.getElementById("nome").value,
            acertos: `${acertos}/${set1.length}`
        }
        let array = JSON.parse(localStorage.getItem("pontuacoes"));
        array.push(json);
        localStorage.setItem("pontuacoes", JSON.stringify(array));
        window.location.href = "/"
    });
}