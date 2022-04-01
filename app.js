fetch('https://my-json-server.typicode.com/DaianaArena/ollivanders-json/products')
  .then(response => response.json())
  .then(json => console.log(json))