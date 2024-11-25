// All categories from the image
const categories = [
    "Burgers",
    "Ice Cream",
    "Pizza",
    "Biryani",
    "Fries",
    "Cake",
    "Noodles",
    "Salads",
    "Coffee",
    "Cold Drinks",
    "All Items"
  ];
  
  // Menu items with images and prices
  const menuData = [
    { category: "Burgers", item: "Aloo Tikki Burger", price: 80, available: true, image: "images/burger/aloo.jpg" },
    { category: "Burgers", item: "Chicken Burger", price: 110, available: true, image: "images/burger/chicken.jpg" },
    { category: "Burgers", item: "Paneer Burger", price: 100, available: true, image: "images/burger/paneer.jpg" },
    { category: "Burgers", item: "Egg Burger", price: 90, available: true, image: "images/burger/egg.jpg" },
    { category: "Burgers", item: "Hamburger", price: 110, available: true, image: "images/burger/hamburger.jpg" },
    { category: "Ice Cream", item: "Chocolate Ice cream", price: 50, available: true, image: "images/ice-cream/choco.jpg" },
    { category: "Ice Cream", item: "Strawberry Ice cream", price: 30, available: true, image: "images/ice-cream/straw.jpg" },
    { category: "Ice Cream", item: "Butterscotch Ice cream", price: 40, available: true, image: "images/ice-cream/butter.jpg" },
    { category: "Ice Cream", item: "Vanilla Ice cream", price: 20, available: true, image: "images/ice-cream/vanilla.jpg" },
    { category: "Ice Cream", item: "Pista Ice cream", price: 30, available: true, image: "images/ice-cream/pista.jpg" },
    { category: "Pizza", item: "Margherita", price: 180, available: true, image: "images/pizza/margherita.jpg" },
    { category: "Pizza", item: "Farmhouse", price: 270, available: true, image: "images/pizza/farmhouse.jpg" },
    { category: "Pizza", item: "Cheese and corn", price: 220, available: true, image: "images/pizza/cheese-n-corn.jpg" },
    { category: "Pizza", item: "Pepperoni", price: 290, available: true, image: "images/pizza/pepperoni.jpg" },
    { category: "Pizza", item: "Mozzarella", price: 250, available: true, image: "images/pizza/mozzarella.jpg" },
    { category: "Biryani", item: "Chicken Biryani", price: 220, available: true, image: "images/biryani/chicken.jpg" },
    { category: "Biryani", item: "Paneer Biryani", price: 210, available: true, image: "images/biryani/paneer.jpg" },
    { category: "Biryani", item: "Veg Biryani", price: 190, available: true, image: "images/biryani/veg.jpg" },
    { category: "Biryani", item: "Prawn Biryani", price: 250, available: true, image: "images/biryani/prawn.jpg" },
    { category: "Biryani", item: "Hyderabadi Biryani", price: 230, available: true, image: "images/biryani/hyderabad.jpg" },
    { category: "Fries", item: "French Fries", price: 70, available: true, image: "images/fries/french.jpg" },
    { category: "Fries", item: "Curly Fries", price: 100, available: true, image: "images/fries/curly.jpg" },
    { category: "Fries", item: "Cheesy Fries", price: 110, available: true, image: "images/fries/cheesy.jpg" },
    { category: "Fries", item: "Peri Peri Fries", price: 100, available: true, image: "images/fries/peri.jpg" },
    { category: "Fries", item: "Garlic Fries", price: 120, available: true, image: "images/fries/garlic.jpg" },
    { category: "Cake", item: "Strawberry cake", price: 450, available: true, image: "images/cakes/strawberry.jpg" },
    { category: "Cake", item: "Butterscotch cake", price: 400, available: true, image: "images/cakes/butterscotch.jpg" },
    { category: "Cake", item: "Chocolate cake", price: 500, available: true, image: "images/cakes/choco.jpg" },
    { category: "Cake", item: "Red velvet cake", price: 550, available: true, image: "images/cakes/red-velvet.jpg" },
    { category: "Cake", item: "Pineapple cake", price: 480, available: true, image: "images/cakes/pineapple.jpg" },
    { category: "Noodles", item: "Veg Noodles", price: 70, available: true, image: "images/noodles/veg-hakka.jpg" },
    { category: "Noodles", item: "Chicken Noodles", price: 100, available: true, image: "images/noodles/chicken.jpg" },
    { category: "Noodles", item: "Egg Noodles", price: 80, available: true, image: "images/noodles/egg.jpg" },
    { category: "Noodles", item: "Chinese Noodles", price: 90, available: true, image: "images/noodles/chinese.jpg" },
    { category: "Noodles", item: "Schezwan Noodles", price: 150, available: true, image: "images/noodles/schezwan.jpg" },
    { category: "Salads", item: "Vegetable Salad", price: 90, available: true, image: "images/salads/veg.jpg" },
    { category: "Salads", item: "Cucumber salad", price: 110, available: true, image: "images/salads/cucumber.jpg" },
    { category: "Salads", item: "Greek salad", price: 120, available: true, image: "images/salads/greek.jpg" },
    { category: "Salads", item: "Garden salad", price: 100, available: true, image: "images/salads/garden.jpg" },
    { category: "Salads", item: "Fruit salad", price: 140, available: true, image: "images/salads/fruit.jpg" },
    { category: "Coffee", item: "Latte", price: 160, available: true, image: "images/coffee/latte.jpg" },
    { category: "Coffee", item: "Espresso", price: 120, available: true, image: "images/coffee/espresso.jpg" },
    { category: "Coffee", item: "Americano", price: 100, available: true, image: "images/coffee/americano.jpg" },
    { category: "Coffee", item: "Cappuccino", price: 150, available: true, image: "images/coffee/cappuccino.jpg" },
    { category: "Coffee", item: "Cold Coffee", price: 180, available: true, image: "images/coffee/cold-coffee.jpg" },
    { category: "Cold Drinks", item: "Coca cola", price: 50, available: true, image: "images/cold-drinks/coca-cola.jpg" },
    { category: "Cold Drinks", item: "Pepsi", price: 40, available: true, image: "images/cold-drinks/pepsi.jpg" },
    { category: "Cold Drinks", item: "Thumbs up", price: 40, available: true, image: "images/cold-drinks/thumbs-up.jpg" },
    { category: "Cold Drinks", item: "Sprite", price: 50, available: true, image: "images/cold-drinks/sprite.jpg" },
    { category: "Cold Drinks", item: "Diet coke", price: 60, available: true, image: "images/cold-drinks/diet-coke.jpg" }
  ];
  
  // Initialize menu and categories
  document.addEventListener("DOMContentLoaded", function () {
    loadCategories();
    loadMenuItems(menuData);
  
    // Search functionality
    document.getElementById("searchBar").addEventListener("input", function() {
      const query = this.value.toLowerCase();
      const filteredItems = menuData.filter(item =>
        item.item.toLowerCase().includes(query)
      );
      loadMenuItems(filteredItems);
    });
  });
  
  // Load categories
  function loadCategories() {
    const categoriesContainer = document.getElementById("categories");
    categories.forEach((category) => {
      const categoryItem = document.createElement("a");
      categoryItem.classList.add("list-group-item", "list-group-item-action");
      categoryItem.textContent = category;
      categoryItem.onclick = function () {
        filterItemsByCategory(category);
      };
      categoriesContainer.appendChild(categoryItem);
    });
  }
  
  // Global variables to track the cart items and total amount
  let cartItems = [];
  let totalAmount = 0;

// Function to load the menu items
function loadMenuItems(items) {
  const menuItemsContainer = document.getElementById("menuItems");
  menuItemsContainer.innerHTML = "";

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    // Card HTML structure with local images
    card.innerHTML = `
      <div class="card">
        <div class="card-img-container position-relative">
          <img src="${item.image}" class="card-img-top" alt="${item.item}">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">${item.item}</h5>
          <p class="card-text">₹${item.price}</p>
          <div id="controls-${index}" class="d-flex justify-content-center align-items-center">
            <button id="add-btn-${index}" class="btn btn-outline-primary">Add</button>
          </div>
        </div>
      </div>
    `;

    menuItemsContainer.appendChild(card);

    // Add button click logic
    const addButton = document.getElementById(`add-btn-${index}`);
    const controlsContainer = document.getElementById(`controls-${index}`);
    let quantity = 0;

    // Add button click
    addButton.addEventListener("click", () => {
      quantity = 1;
      updateControls();
      addItemToCart(item, quantity); // Add the item to cart initially
    });

    // Function to update controls
    function updateControls() {
      if (quantity > 0) {
        controlsContainer.innerHTML = `
          <button id="minus-btn-${index}" class="btn btn-outline-secondary me-2">-</button>
          <span id="quantity-${index}" class="me-2">${quantity}</span>
          <button id="plus-btn-${index}" class="btn btn-outline-secondary ms-2">+</button>
        `;

        // Add event listeners for new controls
        const minusButton = document.getElementById(`minus-btn-${index}`);
        const plusButton = document.getElementById(`plus-btn-${index}`);
        
        // Minus button event listener
        minusButton.addEventListener("click", () => {
          if (quantity > 0) {
            quantity -= 1;
            updateControls();
            addItemToCart(item, quantity); // Update the cart when quantity changes
          }
        });

        // Plus button event listener
        plusButton.addEventListener("click", () => {
          quantity += 1;
          updateControls();
          addItemToCart(item, quantity); // Update the cart when quantity changes
        });
      } else {
        // When quantity is 0, reset to Add button
        controlsContainer.innerHTML = `
          <button id="add-btn-${index}" class="btn btn-outline-primary">Add</button>
        `;
        const addButton = document.getElementById(`add-btn-${index}`);
        addButton.addEventListener("click", () => {
          quantity = 1;
          updateControls();
          addItemToCart(item, quantity);
        });
      }
    }
  });
}

// Filter items based on category
function filterItemsByCategory(category) {
  const filteredItems = category === "All Items" ? menuData : menuData.filter(item => item.category === category);
  loadMenuItems(filteredItems);
}

// Function to add item to cart or update quantity if already in cart
function addItemToCart(item, quantity) {
  const existingItem = cartItems.find(cartItem => cartItem.item === item.item);
  
  if (existingItem) {
    // Update quantity of the existing item
    existingItem.quantity = quantity; // Set the new quantity
  } else {
    // Add new item to cart
    cartItems.push({ ...item, quantity });
  }

  // Update total amount
  totalAmount = cartItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);
  updateFloatingCart();
}

// Function to remove item from cart
function removeItemFromCart(item) {
  const itemIndex = cartItems.findIndex(cartItem => cartItem.item === item.item);
  
  if (itemIndex !== -1) {
    // Reduce total amount
    totalAmount -= cartItems[itemIndex].price * cartItems[itemIndex].quantity;
    // Remove item from cart
    cartItems.splice(itemIndex, 1);
  }

  updateFloatingCart();
}

// Function to update floating cart display
function updateFloatingCart() {
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-total-items").textContent = `${cartItemCount} items`;
  document.getElementById("cart-total-value").textContent = `Total: ₹${totalAmount}`;
}

// Function to show order summary modal
function showOrderSummary() {
  const orderItemsList = document.getElementById("order-items-list");
  orderItemsList.innerHTML = ''; // Clear previous items
  cartItems.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("order-item");
    itemElement.innerHTML = `
      <p>${item.quantity} x ${item.item} - ₹${item.price * item.quantity}</p>
      <button onclick="removeItemFromCart(${JSON.stringify(item)})">Remove</button>
    `;
    orderItemsList.appendChild(itemElement);
  });
  document.getElementById("order-total").textContent = `Total: ₹${totalAmount}`;
  document.getElementById("order-summary-modal").style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById("order-summary-modal").style.display = "none";
}

// Function to proceed to payment (Redirect example)
function proceedToPayment() {
  window.location.href = "checkout.html"; // Replace with actual payment page
}
