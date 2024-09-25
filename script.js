let cart = [];
function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            displayProducts(products); 
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width:100px;height:100px;">
            <h3>${product.title}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}
function addToCart(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCart();
}
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; 

    let totalMRP = 0;
    cart.forEach(item => {
        
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        
        cartItemElement.innerHTML = `
            <div>
                <p>Product ID: ${item.id}</p>
                <p>Price: ₹500</p>
            </div>
            <div>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span> ${item.quantity} </span>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
        `;

        cartItems.appendChild(cartItemElement);
        totalMRP += item.quantity * 500; 
    });

    
    document.getElementById('total-mrp').textContent = totalMRP;
    const totalAmount = totalMRP - 50 + 10 + 20; 
    document.getElementById('total-amount').textContent = totalAmount;
}


function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1; 
        updateCart();
    }
}


function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity -= 1; 
    } else if (product && product.quantity === 1) {
        
        cart = cart.filter(item => item.id !== productId);
    }
    updateCart(); 
}
fetchProducts();
