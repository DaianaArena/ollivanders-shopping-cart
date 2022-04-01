const templateCard = document.getElementById('template-card').content;
const varitasContainer = document.getElementById('varitasContainer');
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();

});


const fetchProducts = async () => {
  try {
    const res = await fetch('https://my-json-server.typicode.com/DaianaArena/ollivanders-json/products');
    const products = await res.json();

    displayProducts(products);


  } catch (error) {
    console.log(error);
  }
};

function displayProducts  (products) {
  products.forEach(product => {

    console.log(product.name, product.id, product.description, product.image, product.house, product.price);
    templateCard.querySelector('h3').textContent = product.name;
    templateCard.querySelector('img').src = product.image;
    templateCard.querySelector('p').textContent = product.description;
    templateCard.querySelector('h4').textContent = `$`+product.price;
    templateCard.querySelector('span').textContent = product.house;


    //Elegir el color del badge dependiendo de la casa
    templateCard.querySelector('span').removeAttribute('class')
    templateCard.querySelector('span').setAttribute('class', 'badge');

    switch (product.house) {
      case 'Griffindor':
        templateCard.querySelector('span').classList.add('bg-danger');
        break;
      case 'Slytherin':
         templateCard.querySelector('span').classList.add('bg-success');
        break;
      case 'Ravenclaw':
        templateCard.querySelector('span').classList.add('bg-info');
        break;
      case 'Hufflepuff':
        templateCard.querySelector('span').classList.add('bg-warning');
        break;
    }


    const newCard = templateCard.cloneNode(true);
    fragment.appendChild(newCard);
  });

  varitasContainer.appendChild(fragment);
}