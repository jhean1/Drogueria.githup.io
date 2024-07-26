document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const filterBtn = document.getElementById('filter-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const cartBtn = document.getElementById('cart-btn');
    const cartMenu = document.getElementById('cart-menu');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    let cart = [];

    const medications = [
        { id: 1, name: "Paracetamol 500mg", description: "Analgésico y antipirético efectivo", price: 19900, rating: 4.5, image: "paracetamol.jfif", category: "analgesicos" },
        { id: 2, name: "Ibuprofeno 400mg", description: "Antiinflamatorio y analgésico", price: 24900, rating: 4.2, image: "ibuprofeno.jfif", category: "antiinflamatorios" },
        { id: 3, name: "Amoxicilina 500mg", description: "Antibiótico de amplio espectro", price: 34900, rating: 4.8, image: "amoxicilina.jfif", category: "antibioticos" },
        { id: 4, name: "Omeprazol 20mg", description: "Inhibidor de la bomba de protones", price: 27900, rating: 4.3, image: "amoprazol.png", category: "antiacidos" },
        { id: 5, name: "Loratadina 10mg", description: "Antihistamínico de segunda generación", price: 21900, rating: 4.6, image: "loratadina.png", category: "antihistaminicos" },
        { id: 6, name: "Acetaminofén 500mg", description: "Analgésico y antipirético", price: 15900, rating: 4.7, image: "acetaminofen.jfif", category: "analgesicos" },
        { id: 7, name: "Cetirizina 10mg", description: "Antihistamínico de segunda generación", price: 23900, rating: 4.4, image: "ceterizina.jfif", category: "antihistaminicos" },
        { id: 8, name: "Naproxeno 500mg", description: "Antiinflamatorio no esteroideo", price: 31900, rating: 4.6, image: "naproxeno.jfif", category: "antiinflamatorios" },
        { id: 9, name: "Fluoxetina 20mg", description: "Antidepresivo inhibidor de la recaptación de serotonina", price: 39900, rating: 4.8, image: "Fluoxetina.png", category: "antiacidos" },
        { id: 10, name: "Metformina 500mg", description: "Antidiabético biguanida", price: 27000, rating: 4.5, image: "Metformina.jfif", category: "antiacidos" },
        { id: 11, name: "Atorvastatina 10mg", description: "Hipolipemiante", price: 42900, rating: 4.7, image: "Atorvastatina.png", category: "antiacidos" },
        { id: 12, name: "Losartán 50mg", description: "Antihipertensivo bloqueador de los receptores de angiotensina II", price: 28900, rating: 4.6, image: "losartan.png", category: "antiacidos" },
        { id: 13, name: "Enalapril 20mg", description: "Antihipertensivo inhibidor de la enzima convertidora de angiotensina", price: 27900, rating: 4.4, image: "Enalapril.jfif", category: "antiacidos" },
        { id: 14, name: "Clonazepam 2mg", description: "Ansiolítico benzodiacepina", price: 35000, rating: 4.5, image: "Clonazepam.jfif", category: "antiacidos" },
        { id: 15, name: "Aspirina 100mg", description: "Analgésico, antipirético y antiinflamatorio", price: 25000, rating: 4.3, image: "aspirina.jfif", category: "analgesicos" }
    ];

    function renderMedications(filteredMedications = medications) {
        const medicationsList = document.getElementById('medications-list');
        medicationsList.innerHTML = '';
        filteredMedications.forEach(med => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${med.image}" alt="${med.name}">
                <div class="card-content">
                    <h3>${med.name}</h3>
                    <p>${med.description}</p>
                </div>
                <div class="card-footer">
                    <span>$${med.price.toLocaleString()}</span>
                    <button class="add-to-cart-btn" data-id="${med.id}">Añadir</button>
                </div>
            `;
            medicationsList.appendChild(card);
        });

        // Asignar eventos a los botones después de que los medicamentos sean renderizados
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const medId = parseInt(event.target.getAttribute('data-id'));
                addToCart(medId);
            });
        });
    }

    function addToCart(medId) {
        const medication = medications.find(med => med.id === medId);
        if (medication) {
            cart.push(medication);
            renderCart();
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toLocaleString()}</span>
                <button class="remove-from-cart-btn" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });
        totalPriceContainer.innerText = `$${total.toLocaleString()}`;
        cartBtn.innerText = `Carrito (${cart.length})`;
        if (cart.length === 0) {
            cartItemsContainer.innerText = 'Tu carrito está vacío';
        }

        // Asignar eventos a los botones de eliminar después de que los productos sean renderizados
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            renderCart();
        }
    }

    function applyFilters() {
        const category = document.querySelector('input[name="category"]:checked').value;
        const price = document.querySelector('input[name="price"]:checked').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;

        let filteredMedications = medications;

        if (category !== 'all') {
            filteredMedications = filteredMedications.filter(med => med.category === category);
        }

        if (price !== 'all') {
            const [minPrice, maxPrice] = price === 'low' ? [0, 30000] : [30000, Infinity];
            filteredMedications = filteredMedications.filter(med => med.price >= minPrice && med.price <= maxPrice);
        }

        if (rating !== 'all') {
            filteredMedications = filteredMedications.filter(med => med.rating >= parseFloat(rating));
        }

        renderMedications(filteredMedications);
    }

    function searchMedications() {
        const query = searchInput.value.toLowerCase();
        const filteredMedications = medications.filter(med => 
            med.name.toLowerCase().includes(query) || med.description.toLowerCase().includes(query)
        );
        renderMedications(filteredMedications);
    }

    filterBtn.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
        applyFilters();
    });

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchMedications();
        }
    });

    cartBtn.addEventListener('click', () => {
        cartMenu.classList.toggle('hidden');
    });

    renderMedications();
    renderCart();
});
