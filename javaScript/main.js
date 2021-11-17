let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let btnWhite = document.querySelector('.btn-white');
let btnCorrect = document.querySelector('.btn-correct');
let btnConfirm = document.querySelector('.btn-confirm');

let etapaAtual = 0;
let numero = '';
let white = false;
let votos = [];

let buttons = document.querySelectorAll('.keyboard-button');

const updateInterface = () => {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });

  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.name}<br>Partido: ${candidato.partido}`;
    let fotosHtml = '';
    for(let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
      }
    }
    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
  }
}

const clickNumber = (number) => {
  let elNumero = document.querySelector('.number.pisca');
  if (elNumero !== null) {
    elNumero.innerHTML = number;
    numero = `${numero}${number}`;
    elNumero.classList.remove('pisca');
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add('pisca');
    } else {
      updateInterface();
    }
  }
}


const clickButton = (button) => {

  switch(button.innerHTML) {
    case 'BRANCO':
      numero = '';
      white = true;
      seuVotoPara.style.display = 'block';
      aviso.style.display = 'block';
      numeros.innerHTML = '';
      descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
      lateral.innerHTML = '';
      break;
    case 'CORRIGE':
      startStep();
      break;
    case 'CONFIRMA':
      let etapa = etapas[etapaAtual];
      let votoConfirmado = false;
      if (white) {
        votoConfirmado = true;
        votos.push({
          etapa: etapas[etapaAtual].titulo,
          voto: 'branco'
        })
      } else if (numero.length === etapa.numero) {
        votoConfirmado = true;
        votos.push({
          etapa: etapas[etapaAtual].titulo,
          voto: numero
        })
      }

      if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual]) {
          startStep();
        } else {
          document.querySelector('.screen').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`;
          console.log(votos);
        }
      }
      break;
    default:
      let number = Number(button.innerHTML);
      clickNumber(number);
      break;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => clickButton(button))
})

const startStep = () => {
  let etapa = etapas[etapaAtual];
  let numeroHtml = '';
  numero = '';
  white = false;
  for(let i = 0; i < etapa.numero;i++) {
    if (i === 0) {
      numeroHtml += '<div class="number pisca"></div>';
    } else {
      numeroHtml += '<div class="number"></div>';
    }
  }

  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

startStep();
