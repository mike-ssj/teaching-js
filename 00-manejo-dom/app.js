const products = [{
    title: 'libro1',
    img: 'https://picsum.photos/300',
    precio: 29.99,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.',
    isbn: 'id0001'
},{
    title: 'libro2',
    img: 'https://picsum.photos/300',
   // img: 'https://picsum.photos/seed/300/300',
    precio: 109.99,
    desc: 'Consectetur adipisicing elit. Quam, voluptatum. lorem ipsum dolor sit amet ',
    isbn: 'id0002'
},{
    title: 'libro3',
    img: 'https://picsum.photos/300',
   // img: 'https://picsum.photos/seed/300/300',
    precio: 109.99,
    desc: 'Consectetur adipisicing elit. Quam, voluptatum. lorem ipsum dolor sit amet ',
    isbn: 'id0002'
},{
    title: 'libro4',
    img: 'https://picsum.photos/300',
   // img: 'https://picsum.photos/seed/300/300',
    precio: 109.99,
    desc: 'Consectetur adipisicing elit. Quam, voluptatum. lorem ipsum dolor sit amet ',
    isbn: 'id0002'
},{
    title: 'libro5',
    img: 'https://picsum.photos/300',
   // img: 'https://picsum.photos/seed/300/300',
    precio: 109.99,
    desc: 'Consectetur adipisicing elit. Quam, voluptatum. lorem ipsum dolor sit amet ',
    isbn: 'id0002'
}]
const root = document.querySelector('#root');

products.forEach((product, index) => {
    const img = document.createElement('img');
    img.src = product.img;
    img.alt = product.title;

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = product.precio;

    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.index = index;
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(price);
    div.addEventListener('click', handleCardClick);

    root.appendChild(div);
});

function handleCardClick(event) {
    const cardIndex = event.currentTarget.dataset.index;
    const product = products[cardIndex];
    
    const bigCard = document.createElement('div');
    bigCard.classList.add('big-card');
    bigCard.dataset.index = product.isbn;

    const img = document.createElement('img');
    img.src = product.img;
    img.alt = product.title;

    const title = document.createElement('h2');
    title.textContent = product.title;

    const desc = document.createElement('p');
    desc.textContent = product.desc;

    const price = document.createElement('p');
    price.textContent = product.precio;

    const isbn = document.createElement('p');
    isbn.textContent = product.isbn;
    isbn.classList.add('isbn');

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'X';
    closeBtn.addEventListener('click', () => {
        bigCard.remove();
    });

    bigCard.appendChild(img);
    bigCard.appendChild(title);
    bigCard.appendChild(desc);
    bigCard.appendChild(price);
    bigCard.appendChild(isbn);
    bigCard.appendChild(closeBtn);
    
    root.appendChild(bigCard);
}