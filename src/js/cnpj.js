var inputCNPJ = document.getElementById('inputCNPJ');
var returnCNPJ = document.getElementById('return');

function renderizaEmpresa(empresa) {
  returnCNPJ.innerHTML = '';
  const textName = document.createTextNode(empresa.nome);
  const textActivity = document.createTextNode('Atividade: '+empresa.atividade_principal[0]['text']);
  const textPhone = document.createTextNode('Telefone: '+empresa.telefone);

  const h3Name = document.createElement('h3');
  const pActivity = document.createElement('p');
  const pPhone = document.createElement('p');

  h3Name.appendChild(textName);
  pActivity.appendChild(textActivity);
  pPhone.appendChild(textPhone);

  returnCNPJ.appendChild(h3Name);
  returnCNPJ.appendChild(pActivity);
  returnCNPJ.appendChild(pPhone);
}

function renderizaLoading() {
  returnCNPJ.innerHTML = '';

  const textElement = document.createTextNode('Carregando...');
  const loadingElement = document.createElement('p');

  loadingElement.id = "loading";
  loadingElement.appendChild(textElement);
  returnCNPJ.appendChild(loadingElement);
}

function renderizaErro(erro) {
  returnCNPJ.innerHTML = '';

  
  const textElement = document.createTextNode('');
  const errElement = document.createElement('p');
  
  if (erro.response.status === 429) {
    textElement.nodeValue = 'Quantidade de pesquisas excedida! =(';
  } else if (erro.response.status === 404) {
    textElement.nodeValue = 'CNPJ Não encontrado!';
  } else {
    textElement.nodeValue = erro.response.data
  }

  errElement.style.color = "#F00";

  errElement.appendChild(textElement);
  returnCNPJ.appendChild(errElement);
}

function listaEmpresa() {
  returnCNPJ.innerHTML = '';
  var cnpj = inputCNPJ.value;

  renderizaLoading();

  axios({
    method: 'get',
    baseURL: `https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    })
    .then(response => {
      renderizaEmpresa(response.data);
      console.log(response.data);
    })
    .catch(error => {
      renderizaErro(error);
      console.log(JSON.stringify(error.response.data));
      console.log(JSON.stringify(error.response.headers));
      console.log(JSON.stringify(error.response.status));
  });
}
