// Preenchendo o card template
const cards = [
  {
    date: '17 de ago, 2024',
    title: 'O que é linguagem de programação? Conheça as principais',
    description: 'Uma das mais populares vertentes da tecnologia da informação, a área de programação segue tendo muita demanda de trabalho justamente pela velocidade com que dispositivos tecnológicos vêm avançando.'
  },
  {
    date: '12 de jul, 2024',
    title: 'GitHub agora permite fazer login sem precisar de senha',
    description: 'O GitHub anunciou nesta quarta-feira (12) o acesso a partir das passkeys, método de autenticação sem senhas. A novidade está disponível em uma versão beta pública e pode substituir a autenticação em dois fatores.'
  },
  {
    date: '21 de jun, 2024',
    title: 'Por que os hiperlinks são azuis em sua maioria?',
    description: 'Quem navega na internet, certamente já percebeu que ela conta com diversos recursos para tornar a nossa vida mais fácil. Entre essas opções podemos mencionar os hiperlinks – uma palavra ou termo clicável que direciona o leitor.'
  },
  {
    date: '03 de mai, 2024',
    title: 'Inteligência artificial: as tendências para os próximos anos',
    description: 'A inteligência artificial tem sido uma das áreas mais inovadoras da tecnologia. Nos próximos anos, a expectativa é que ela se torne ainda mais integrada ao cotidiano das pessoas e empresas.'
  },
  {
    date: '29 de abr, 2024',
    title: 'Os melhores editores de código para programadores',
    description: 'Se você trabalha com desenvolvimento de software, sabe que um bom editor de código pode fazer toda a diferença. Neste artigo, listamos os melhores editores disponíveis no mercado.'
  },
  {
    date: '14 de abr, 2024',
    title: 'Como proteger seus dados online de forma eficaz',
    description: 'Com a crescente digitalização, proteger seus dados pessoais online se tornou uma prioridade. Confira as melhores práticas para garantir a segurança das suas informações na internet.'
  },
  {
    date: '10 de mar, 2024',
    title: 'A evolução dos sistemas operacionais móveis',
    description: 'Os sistemas operacionais móveis evoluíram muito ao longo dos anos. De simples interfaces a complexos ecossistemas, conheça a história e as inovações que marcaram essa evolução.'
  },
  {
    date: '28 de fev, 2024',
    title: 'As linguagens de programação mais usadas em 2024',
    description: '2024 trouxe novas tendências no mundo da programação. Neste artigo, exploramos as linguagens mais utilizadas no mercado, de acordo com as últimas pesquisas e estatísticas.'
  },
  {
    date: '05 de jan, 2024',
    title: 'Por que aprender a programar é importante para qualquer carreira?',
    description: 'Independentemente da área de atuação, aprender a programar pode abrir novas oportunidades e melhorar suas habilidades analíticas. Veja por que você deve considerar aprender a programar.'
  },
  {
    date: '15 de dez, 2023',
    title: 'Tendências de cibersegurança para 2024',
    description: 'Com o aumento dos ataques cibernéticos, a cibersegurança se tornou uma preocupação global. Descubra quais são as principais tendências de segurança digital para o próximo ano.'
  }
];

// Função para converter a data para o formato Date para facilitar a ordenação
function convertToDate(dateStr) {
  const [day, month, year] = dateStr.split(' de ');
  const months = {
    'jan': '01',
    'fev': '02',
    'mar': '03',
    'abr': '04',
    'mai': '05',
    'jun': '06',
    'jul': '07',
    'ago': '08',
    'set': '09',
    'out': '10',
    'nov': '11',
    'dez': '12'
  };
  return new Date(`${year}-${months[month]}-${day}`);
}

// Ordenar os cards por data
cards.sort((a, b) => convertToDate(a.date) - convertToDate(b.date));

const mainContainer = document.querySelector('#main_container');
const template = document.querySelector('#card_template');

// Função para exibir os cards
function displayCards(filteredCards) {
  mainContainer.innerHTML = ''; // Limpar o container antes de adicionar novos elementos
  filteredCards.forEach((card, index) => {
    const cardElement = template.content.cloneNode(true);
    cardElement.querySelector('.date span').textContent = card.date;
    cardElement.querySelector('h2').textContent = card.title;
    cardElement.querySelector('p').textContent = card.description;

    // Identificador único para cada card
    const heartIcon = cardElement.querySelector(".icon-heart");
    heartIcon.dataset.index = index;

    // Verifica se o coração está preenchido com base no localStorage
    if (localStorage.getItem(`heart-${index}`) === 'filled') {
      heartIcon.classList.add('filled');
    }

    mainContainer.appendChild(cardElement);
  });

  // Registra os eventos de clique para os ícones de coração
  registerHeartClickEvents();
}

// Função para registrar os eventos de clique dos ícones de coração
function registerHeartClickEvents() {
  const iconHearts = document.querySelectorAll(".icon-heart");

  iconHearts.forEach(icon => {
    icon.onclick = () => {
      const index = icon.dataset.index;
      icon.classList.toggle("filled");

      // Atualiza o localStorage com o estado do coração
      if (icon.classList.contains("filled")) {
        localStorage.setItem(`heart-${index}`, 'filled');
      } else {
        localStorage.removeItem(`heart-${index}`);
      }
    };
  });
}

// Exibir todos os cards inicialmente
displayCards(cards);

// Função para filtrar os cards com base na pesquisa
const searchInput = document.querySelector('.search-blog input');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchTerm) || 
    card.description.toLowerCase().includes(searchTerm)
  );
  displayCards(filteredCards);
});

// Scroll Reveal
ScrollReveal().reveal('.card', { delay: 200, reset: true });
ScrollReveal().reveal('.card .date', { delay: 300, reset: true });
ScrollReveal().reveal('.card h2', { delay: 400, reset: true });
ScrollReveal().reveal('.card p', { delay: 500, reset: true });