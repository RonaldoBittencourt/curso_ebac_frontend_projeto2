const form = document.getElementById("form-contatos");
const contatos = [];

let linhas = '';

form.addEventListener("submit", function (e) {

    e.preventDefault();

    adicionarLinha();
}
)

function adicionarLinha() {
    // recebendo os dados e transformando em letra minúscula para facilitar comparação
    const nomeContato = document.getElementById("nome-contato");
    const sobrenomeContato = document.getElementById("sobrenome-contato");
    const telefoneContato = document.getElementById("telefone-contato");
    const apelidoContato = document.getElementById("apelido-contato");

    // verificando se o contato já existe
    if (contatos.includes(nomeContato.value.toLowerCase()) && contatos.includes(sobrenomeContato.value.toLowerCase())) {
        alert(`O contato ${nomeContato.value} ${sobrenomeContato.value} já existe`);
    } else if (contatos.includes(telefoneContato.value)) {
        alert(`O número ${telefoneContato.value} já existe`);
    } else if (telefoneContato.value.length < 14) {
        alert(`O número ${telefoneContato.value} não está completo`);
    } else {
        // fazendo o push do que foi digitado e transformando em letra minúscula
        contatos.push(nomeContato.value.toLowerCase());
        contatos.push(sobrenomeContato.value.toLowerCase());
        contatos.push(telefoneContato.value);
        contatos.push(apelidoContato.value.toLowerCase());

        // criando a linha da tabela
        let linha = '<tr>';
        linha += `<td><img src="./images/perfil.png" alt="icone de perfil">`
        linha += `<td>${nomeContato.value}`;
        linha += `<td>${sobrenomeContato.value}`;
        linha += `<td>${telefoneContato.value}`;
        linha += `<td>${apelidoContato.value}`;
        linha += `</tr>`;

        linhas += linha;

        atualizarTabela();

        // limpando os campos do formulario
        nomeContato.value = '';
        sobrenomeContato.value = '';
        telefoneContato.value = '';
        apelidoContato.value = '';
    }
}

function atualizarTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function limparTabela() {
    let confirmacao = confirm('Tem certeza que deseja apagar TODA a agenda?');
    if (confirmacao == true) {
        window.location.reload();
    }
}

// formatação do campo de telefone
const formato = {

    phone(value) {

        return value

            .replace(/\D/g, '')

            .replace(/(\d{2})(\d)/, '($1)$2')

            .replace(/(\d{4})(\d)/, '$1-$2')

            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')

            .replace(/(-\d{4})\d+?$/, '$1')

    }

}

document.querySelectorAll('input').forEach(($input) => {

    const field = $input.dataset.js

    $input.addEventListener('input', (e) => {

        e.target.value = formato[field](e.target.value)

    }, false)

})

