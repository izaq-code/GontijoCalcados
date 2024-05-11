document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#view').addEventListener('click', viewsenha);
    document.querySelector('#view2').addEventListener('click', viewsenha2);
    
    function viewsenha() {
        var bntview = document.getElementById('view');
        var inputpass = document.getElementById('senha');
    
        if (inputpass.type === 'password') {
            inputpass.setAttribute('type', 'text');
            bntview.classList.replace('bi-eye', 'bi-eye-slash');
        } else {
            inputpass.setAttribute('type', 'password');
            bntview.classList.replace('bi-eye-slash', 'bi-eye');
        }
    }

    function viewsenha2() {
        var inputpass2 = document.getElementById('confirmar-Senha');
        var bntview2 = document.getElementById('view2');
    
        if (inputpass2.type === 'password') {
            inputpass2.setAttribute('type', 'text');
            bntview2.classList.replace('bi-eye', 'bi-eye-slash');
        } else {
            inputpass2.setAttribute('type', 'password');
            bntview2.classList.replace('bi-eye-slash', 'bi-eye');
        }
    }

    function exibirTextoNaTela(tag, texto) {
        let campo = document.querySelector(tag);
        if (campo) {
            campo.textContent = texto;
        } else {
            console.error("Elemento com tag " + tag + " não encontrado.");
        }
    }
    
    var senhaInput = document.querySelector('#senha');
    var confirmarSenhaInput = document.querySelector('#confirmar-Senha');


function verificarSenhas() {

    var senha = senhaInput.value;
    var confirmarSenha = confirmarSenhaInput.value;

    if (senha === "" && confirmarSenha === "") {
        exibirTextoNaTela('#alerta', '');
        senhaInput.style.outline = "2px solid white";
        confirmarSenhaInput.style.outline = "2px solid white";
        senhaInput.style.boxShadow = "0 0 5px white";
        confirmarSenhaInput.style.boxShadow = "0 0 5px white";
    
    } else if (senha === "" || confirmarSenha === "") {
        exibirTextoNaTela('#alerta', 'Preencha ambos os campos de senha');
        senhaInput.style.outline = "2px solid orange";
        confirmarSenhaInput.style.outline = "2px solid orange";
        senhaInput.style.boxShadow = "0 0 5px orange";
        confirmarSenhaInput.style.boxShadow = "0 0 5px orange";
    
    
    } else if (senha !== confirmarSenha) {
        exibirTextoNaTela('#alerta', 'As senhas não coincidem');
        senhaInput.style.boxShadow = "0 0 5px red";
        confirmarSenhaInput.style.boxShadow = "0 0 5px red";
        senhaInput.style.outline = "2px solid red";
        confirmarSenhaInput.style.outline = "2px solid red";
    
    } else {
        exibirTextoNaTela('#alerta', ' ');
        senhaInput.style.boxShadow = "0 0 5px #1ec396";
        confirmarSenhaInput.style.boxShadow = "0 0 5px #1ec396";
        senhaInput.style.outline = "2px solid #1ec396";
        confirmarSenhaInput.style.outline = "2px solid #1ec396";
    }   
    
}

confirmarSenhaInput.addEventListener('input', verificarSenhas);
senhaInput.addEventListener('input', verificarSenhas);
});


