//1: hacer un evento click en cualquier objeto del carrito (CUIDADO PORQUE LOS TR NO SE CREAN HASTA LA FUNCION) con un if target= boton + o boton -

const templateCard = document.getElementById('template-card').content;
const varitasContainer = document.getElementById('varitasContainer');
const fragment = document.createDocumentFragment();
const templateCart = document.getElementById('template-cart').content;
const cartContainer = document.getElementById('cartContainer');

let cart = {};

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();

});

varitasContainer.addEventListener('click', (event) => {
  addToCart(event);
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


    templateCard.querySelector('h3').textContent = product.name;
    templateCard.querySelector('img').src = product.image;
    templateCard.querySelector('p').textContent = product.description;
    templateCard.querySelector('h4').textContent = `$`+product.price;
    templateCard.querySelector('span').textContent = product.house;
    templateCard.querySelector('button').setAttribute('data-id', product.id);


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


    let newCard = templateCard.cloneNode(true);
    fragment.appendChild(newCard);
  });

  varitasContainer.appendChild(fragment);
}

const addToCart = (event) => {


 if (event.target.classList.contains("btn-primary")) {
    setCart(event.target.parentElement);

  }
  event.stopPropagation();
}

const setCart = object => {
  const product = {
    id: object.querySelector('button').getAttribute('data-id'),
    name: object.querySelector('h3').textContent,
    price: object.querySelector('h4').textContent,
    quantity: 1

  }

  if  (cart.hasOwnProperty(product.id)) {
    cart[product.id].quantity++;


  } else {
    cart[product.id] = product;
  }

  displayCart(cart);
}

function displayCart(cart) {

  cartContainer.innerHTML = '';
  for (let key in cart) {
    let product = cart[key];
    templateCart.querySelector("tr").setAttribute('data-id', product.id);
    templateCart.getElementById('id').textContent = product.id;
    templateCart.getElementById('nombre').textContent = product.name;
    templateCart.querySelector('span').textContent = product.quantity;
    templateCart.getElementById('precio').textContent = product.price;
    templateCart.getElementById('total').textContent = `$`+ (product.quantity * parseInt(product.price.substring(1), 10));

    let addProductToCart = templateCart.cloneNode(true);
    fragment.appendChild(addProductToCart);
    cartContainer.appendChild(fragment);
  }


}


