var txt_tarefa = document.querySelector("#txt_tarefa");
var botao_tarefa = document.querySelector("#botao_tarefa");
var lista_tarefas = document.querySelector("#lista_tarefas");
var edicao = document.querySelector("#edicao");
var fundo_edicao = document.querySelector("#fundo_edicao");
var fechar_janela = document.querySelector("#fechar_janela");
var atualizar = document.querySelector("#atualizar");
var id_edicao = document.querySelector("#id_edicao");
var txt_tarefa_edicao = document.querySelector("#txt_tarefa_edicao");
var favoritos_div = document.querySelector("#favoritos_div")
var exclusao = document.querySelector('#exclusao')

txt_tarefa.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        var tarefa = {
            nome: txt_tarefa.value, 
            id: gerador_id(),
        }
        if (txt_tarefa.value != '') {
            adicionar_tarefa(tarefa);
        }
    }
});

fechar_janela.addEventListener("click", (e) => {
    alternarJanelaEdicao();
})

botao_tarefa.addEventListener('click', (e) => {
    var tarefa = {
        nome: txt_tarefa.value,
        id: gerador_id(),
    }
    if (txt_tarefa.value != '') {
        adicionar_tarefa(tarefa);
    }
})

atualizar.addEventListener('click', (e) => {
    e.preventDefault();

    var idTarefa = id_edicao.innerHTML.replace('#', '');

    // var tarefa = {
    //     nome: txt_tarefa_edicao.value, 
    //     id: idTarefa
    // }

    var tarefa = document.getElementById(''+idTarefa+'');
    tarefa.children[0].textContent = txt_tarefa_edicao.value

    // var li = TagsLi(tarefa);
    alternarJanelaEdicao();
});

function gerador_id() {
    return Math.floor(Math.random() * 1000);
}

function adicionar_tarefa(tarefa) {
    var li = TagsLi(tarefa);
    lista_tarefas.appendChild(li);
    txt_tarefa.value = '';
}

function TagsLi(tarefa) {
    var li = document.createElement("li");
    li.id = tarefa.id;
    li.classList.add("item");

    var span = document.createElement("span");
    span.classList.add("tarefa");
    span.innerHTML = tarefa.nome;

    var div = document.createElement("div");

    var favoritar = document.createElement("button")
    favoritar.classList.add("favoritar");
    favoritar.innerHTML = '<i class="fa fa-star-o"></i>';
    favoritar.setAttribute("onclick", 'favoritar('+tarefa.id+')')

    var editar = document.createElement("button");
    editar.classList.add("editar");
    editar.innerHTML = '<i class="fa fa-pencil"></i>';
    editar.setAttribute("onclick", "editar("+tarefa.id+")");

    var tchau = document.createElement("button");
    tchau.classList.add("tchau");
    tchau.innerHTML = '<i class="fa fa-trash"></i>';
    tchau.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(favoritar);
    div.appendChild(editar);
    div.appendChild(tchau);
    li.appendChild(span);
    li.appendChild(div);

    span.setAttribute("onclick", "concluida("+tarefa.id+")");

    return li
}

function excluir(idTarefa) {
    var confirmar = window.confirm("Certeza que deseja excluir?");
    if(confirmar) {
        var li = document.getElementById(idTarefa);
        // nome = li.firstChild.nodeName;
        // criar_tabela_exclusao(nome);
        // lista_tarefas.removeChild(li);
        li.remove();

        var nomeTarefa = li.children[0].textContent;
        var concluida = li.classList.contains('done') ? 'SIM' : 'NÃO';
        var favorita = li.children[1].children[0].children[0].classList.contains('fa-star') ? 'SIM' : 'NÃO';

        var tempo = new Date();
        var horario = tempo.toLocaleTimeString();
        var data = `${tempo.getDate()}/${tempo.getMonth() + 1}/${tempo.getFullYear()}`

        var info = [nomeTarefa, concluida, favorita, horario, data]
        adicionar_tarefa_excluida(info)
    }
}

function concluida(idTarefa) {
    var li = document.getElementById(idTarefa);
    li.classList.toggle("done");  

    var nomeTarefa = li.children[0].textContent;
    var concluida = li.classList.contains('done') ? 'SIM' : 'NÃO';
    var favorita = li.children[1].children[0].children[0].classList.contains('fa-star') ? 'SIM' : 'NÃO';

    var tempo = new Date();
    var horario = tempo.toLocaleTimeString();
    var data = `${tempo.getDate()}/${tempo.getMonth() + 1}/${tempo.getFullYear()}`

    var info = [nomeTarefa, favorita, horario, data]
    if(concluida == 'SIM') {
        adicionar_tarefa_concluida(info)
    }
}

function editar(idTarefa) {
    var li = document.getElementById(idTarefa);
    id_edicao.innerHTML = '#' + idTarefa;
    txt_tarefa_edicao.value = li.innerText;
    alternarJanelaEdicao();
}

function alternarJanelaEdicao() {
    edicao.classList.toggle('abrir');
    fundo_edicao.classList.toggle('abrir');
}

function adicionar_tarefa_excluida(info_lista) {
    var tableRow = document.createElement('tr')

    info_lista.forEach((info) => {
        var item = document.createElement('td')
        item.textContent = info

        tableRow.append(item)
    })

    exclusao.append(tableRow)
}

function adicionar_tarefa_concluida(info_lista) {
    var tableRow = document.createElement('tr')

    info_lista.forEach((info) => {
        var item = document.createElement('td')
        item.textContent = info

        tableRow.append(item)
    })

    conclusao.append(tableRow)
    
}

function favoritar(idTarefa) {
    var li = document.getElementById(idTarefa);
    var btn = li.children[1].children[0];
    var text = btn.children[0];
    text.classList.remove('fa-star-o');
    text.classList.add('fa-star');
    btn.setAttribute('onclick', 'desfavoritar('+idTarefa+')');

    const cloneElement = li.cloneNode(true);
    favoritos_div.append(cloneElement);

    li.remove();
}

function desfavoritar(idTarefa) {
    var li = document.getElementById(idTarefa);
    var btn = li.children[1].children[0]
    var text = btn.children[0];
    text.classList.remove('fa-star');
    text.classList.add('fa-star-o');
    btn.setAttribute('onclick', 'favoritar('+idTarefa+')');

    const cloneElement = li.cloneNode(true);
    lista_tarefas.append(cloneElement);

    li.remove();
}



