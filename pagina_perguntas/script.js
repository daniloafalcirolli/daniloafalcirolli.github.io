window.addEventListener("load", init);
window.sessionStorage.setItem("resp", "[]");

let num = 0;
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let set1 = [];

let params = new URLSearchParams(window.location.search);
console.log(params.get("id"))
if(params.get("id") == "1"){
    set1 = [
        {
            nome: "Questão 1",
            pergunta: "Todas as afirmativas sobre os mamíferos citados estão corretas, exceto:",
            respostas: [
                {
                    type: false,
                    reposta: "Os cangurus e os gambás têm em comum o fato de seu desenvolvimento fetal terminar fora do útero, no marsúpio"
                },
                {
                    type: true,
                    reposta: "Os mamíferos marinhos, como as baleias e os golfinhos, e os de água doce, como o boto, têm respiração branquial"
                },
                {
                    type: false,
                    reposta: "Os mamíferos monotremados reproduzem-se através de ovos"
                },
                {
                    type: false,
                    reposta: "Os micos e outros macacos são exemplos de primatas que ocorrem no Brasil"
                },
                {
                    type: false,
                    reposta: "Os morcegos são, em sua maioria, insetívoros ou frugívoros, sendo úteis na polinização de certas plantas"
                },
            ]
        },
        {
            nome: "questão 2",
            pergunta: "Existem características que permitem classificar um animal como pertencente à classe Mammalia. Todas as características abaixo são exclusivas dessa classe, exceto:",
            respostas: [
                {
                    type: false,
                    reposta: "Glândulas mamárias."
                },
                {
                    type: false,
                    reposta: "Presença de pelos."
                },
                {
                    type: false,
                    reposta: "Dentes diferenciados."
                },
                {
                    type: false,
                    reposta: "Diafragma"
                },
                {
                    type: true,
                    reposta: "Pulmões"
                },
            ]
        },
        {
            nome: "questão 3",
            pergunta: "Os mamíferos são classificados normalmente em monotremados, marsupiais e placentários. Os marsupiais apresentam uma bolsa chamada de marsúpio onde o embrião completa seu desenvolvimento. Marque a alternativa que apresenta apenas exemplos de marsupiais:",
            respostas: [
                {
                    type: false,
                    reposta: "Ornitorrinco e gambás"
                },
                {
                    type: false,
                    reposta: "Ratos e coelhos"
                },
                {
                    type: true,
                    reposta: "Cangurus e cuícas"
                },
                {
                    type: false,
                    reposta: "Cuícas e ratos"
                },
                {
                    type: false,
                    reposta: "Coelhos e cangurus"
                },
            ]
        },
    ]
}else if(params.get("id") == 2){
    set1 = [
        {
            nome: "questão 1",
            pergunta: "A seguir estão indicados os anexos embrionários que se formam durante a embriogênese da maioria dos mamíferos. O anexo embrionário exclusivo dos mamíferos e que possibilita um período mais longo de desenvolvimento do embrião no interior do organismo materno é:",
            respostas: [
                {
                    type: false,
                    reposta: "o saco vitelino."
                },
                {
                    type: false,
                    reposta: "o âmnio."
                },
                {
                    type: false,
                    reposta: "o córion."
                },
                {
                    type: true,
                    reposta: "a placenta."
                },
                {
                    type: false,
                    reposta: "o alantoide."
                },
            ]
        },
        {
            nome: "questão 2",
            pergunta: "Os mamíferos apresentam diferentes formas de desenvolvimento embrionário, sendo que, em alguns, como os cangurus, esse desenvolvimento só é completo após passarem um determinado período em uma bolsa chamada de marsúpio. Mamíferos com essas características fazem parte da infraclasse:",
            respostas: [
                {
                    type: false,
                    reposta: "Prototheria."
                },
                {
                    type: true,
                    reposta: "Metatheria."
                },
                {
                    type: false,
                    reposta: "Eutheria."
                },
                {
                    type: false,
                    reposta: "Allotheria."
                },
            ]
        },
        {
            nome: "questão 3",
            pergunta: "O ornitorrinco e a equidna são mamíferos primitivos que botam ovos, no interior dos quais ocorre o desenvolvimento embrionário. Sobre esses animais é correto afirmar que:",
            respostas: [
                {
                    type: false,
                    reposta: "diferentemente dos mamíferos placentários, eles apresentam autofecundação."
                },
                {
                    type: false,
                    reposta: "diferentemente dos mamíferos placentários, eles não produzem leite para a alimentação dos filhotes."
                },
                {
                    type: true,
                    reposta: "diferentemente dos mamíferos placentários, seus embriões realizam trocas gasosas diretamente com o ar."
                },
                {
                    type: false,
                    reposta: "à semelhança dos mamíferos placentários, seus embriões alimentam-se exclusivamente de vitelo acumulado no ovo."
                },
                {
                    type: false,
                    reposta: "à semelhança dos mamíferos placentários, seus embriões livram-se dos excretas nitrogenados através da placenta."
                },
            ]
        },
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