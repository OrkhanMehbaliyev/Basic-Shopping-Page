const dvProducts = document.getElementById("dvProducts");
const categoryList = document.getElementById("categoryList");
const wishListDdl = document.getElementById("wishListDdl");
const txtSearch = document.getElementById("txtSearch");
const myCardContainer = document.getElementById("myCardContainer");
const btnShowCard = document.getElementById("btnShowCard");

const PRODUCTS = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    desc: "lorem ipsum dot color",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 699.99,
    desc: "lorem ipsum dot color",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Headphones",
    price: 99.99,
    desc: "lorem ipsum dot color",
    category: "Electronics",
  },
  {
    id: 4,
    name: "T-shirt",
    price: 19.99,
    desc: "lorem ipsum dot color",
    category: "Clothing",
  },
  {
    id: 5,
    name: "Jeans",
    price: 49.99,
    desc: "lorem ipsum dot color",
    category: "Clothing",
  },
  {
    id: 6,
    name: "Backpack",
    price: 79.99,
    desc: "lorem ipsum dot color",
    category: "Accessories",
  },
  {
    id: 7,
    name: "Watch",
    price: 149.99,
    desc: "lorem ipsum dot color",
    category: "Accessories",
  },
  {
    id: 8,
    name: "Desk Lamp",
    price: 29.99,
    desc: "lorem ipsum dot color",
    category: "Home & Office",
  },
  {
    id: 9,
    name: "Coffee Mug",
    price: 9.99,
    desc: "lorem ipsum dot color",
    category: "Home & Office",
  },
  {
    id: 10,
    name: "Notebook",
    price: 4.99,
    desc: "lorem ipsum dot color",
    category: "Home & Office",
  },
];

let wishlist = [];

let myCardData = [];

const CARD_CATEGORIES = {
  all: "All Categories",
};

let currentCategory = CARD_CATEGORIES.all;

const addUserEventListeners = () => {
  txtSearch.addEventListener("keyup", onSearch);
};

const addAllEventListeners = () => {
  addUserEventListeners();
};

const onSearch = (e) => {
  const searchStr = e.target.value.toLowerCase();
  const searchData = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchStr)
  );
  bindCards(searchData, currentCategory);
};

const createCard = (product) => {
  const col4 = document.createElement("div");
  col4.className = "col-4 mb-3";

  const card = document.createElement("div");
  card.className = "card";

  const cardHeader = document.createElement("div");
  cardHeader.className =
    "card-header d-flex justify-content-between align-items-center";

  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.textContent = product.name;

  const heartIcon = document.createElement("i");
  heartIcon.className = "fa-regular fa-heart";
  if (wishlist.includes(product.name)) heartIcon.classList.add("fa-solid");
  heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("fa-solid");
    addToWishlist(product.name);
  });

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const desc = document.createElement("p");
  desc.textContent = product.desc;
  const priceSpan = document.createElement("span");
  priceSpan.textContent = product.price;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex gap-3";

  const btnAddToCard = document.createElement("button");
  btnAddToCard.className = "btn btn-primary";
  if (myCardData.some((x) => x.id == product.id))
    btnAddToCard.classList.add("disabled");
  btnAddToCard.textContent = "Add to Cart";
  btnAddToCard.addEventListener("click", () => {
    let bool = myCardData.some((x) => x.id == product.id);
    if (
      !bool &&
      document.getElementById(`txtQuantity${product.id}`).value > 0
    ) {
      btnAddToCard.classList.add("disabled");
      myCardData.push({
        id: product.id,
        name: product.name,
        price: product.price,
        desc: product.desc,
        quantity: document.getElementById(`txtQuantity${product.id}`).value,
      });
      bindMyCard();
    }
  });

  const btnDecrease = document.createElement("button");
  btnDecrease.className = "btn btn-sm btn-outline-secondary";
  btnDecrease.textContent = "-";
  btnDecrease.addEventListener("click", () => {
    const inputElm = document.getElementById(`txtQuantity${product.id}`);
    if (inputElm.value > 0) inputElm.value--;
  });

  const inputQuantity = document.createElement("input");
  inputQuantity.type = "text";
  inputQuantity.className = "form-control w-25";
  inputQuantity.id = `txtQuantity${product.id}`;
  inputQuantity.value = 0;

  const btnIncrease = document.createElement("button");
  btnIncrease.className = "btn btn-sm btn-outline-secondary";
  btnIncrease.textContent = "+";
  btnIncrease.addEventListener("click", () => {
    const inputElm = document.getElementById(`txtQuantity${product.id}`);
    inputElm.value++;
  });

  col4.appendChild(card);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  cardHeader.appendChild(h5);
  cardHeader.appendChild(heartIcon);

  cardBody.appendChild(desc);
  cardBody.appendChild(priceSpan);

  cardFooter.appendChild(btnAddToCard);
  cardFooter.appendChild(btnDecrease);
  cardFooter.appendChild(inputQuantity);
  cardFooter.appendChild(btnIncrease);

  return col4;
};

const bindMyCard = () => {
  myCardContainer.innerHTML = "";
  myCardData.forEach((data) => {
    let cardItem = createAddedCard(data);
    myCardContainer.appendChild(cardItem);
  });
};

const createAddedCard = (product) => {
  const col12 = document.createElement("div");
  col12.className = "col-12 mb-3";

  const card = document.createElement("div");
  card.className = "card";

  const cardHeader = document.createElement("div");
  cardHeader.className =
    "card-header d-flex justify-content-between align-items-center";

  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.textContent = product.name;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const desc = document.createElement("p");
  desc.textContent = product.desc;
  const priceSpan = document.createElement("span");
  priceSpan.textContent = product.price;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex gap-3";

  const col4Start = document.createElement("div");
  col4Start.className = "col-4";

  const col4End = document.createElement("div");
  col4End.className =
    "col-4 offset-4 d-flex justify-content-center align-items-center";

  const quantitySpan = document.createElement("span");
  quantitySpan.className = "bg-body border border-1 px-4 py-2 rounded-2";
  quantitySpan.textContent = product.quantity;

  const btnDeleteCard = document.createElement("button");
  btnDeleteCard.className = "btn btn-outline-danger";
  btnDeleteCard.textContent = "Delete";
  btnDeleteCard.addEventListener("click", () => {
    deleteItemFromMyCard(product.id);
  });

  col12.appendChild(card);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  cardHeader.appendChild(h5);

  cardBody.appendChild(desc);
  cardBody.appendChild(priceSpan);

  cardFooter.appendChild(col4Start);
  cardFooter.appendChild(col4End);

  col4Start.appendChild(btnDeleteCard);
  col4End.appendChild(quantitySpan);

  return col12;
};

const deleteItemFromMyCard = (prId) => {
  myCardData = myCardData.filter((x) => x.id != prId);
  bindMyCard();

  bindCards(PRODUCTS, currentCategory);
};

const addToWishlist = (productName) => {
  if (wishlist.includes(productName)) {
    wishlist = wishlist.filter((name) => name !== productName);
  } else {
    wishlist.push(productName);
  }

  renderWishlist();
};

const renderWishlist = () => {
  wishListDdl.innerHTML = "";

  wishlist.forEach((wish) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.textContent = wish;

    li.appendChild(a);
    wishListDdl.appendChild(li);
  });
};

const bindCards = (data, category) => {
  dvProducts.innerHTML = "";

  const filteredData =
    category === CARD_CATEGORIES.all
      ? data
      : data.filter((product) => product.category === category);

  filteredData.forEach((product) => {
    const card = createCard(product);
    dvProducts.appendChild(card);
  });
};

const getCategories = (data) => {
  categoryList.innerHTML = "";

  const allCategories = document.createElement("li");
  allCategories.className = "list-group-item active";
  allCategories.textContent = CARD_CATEGORIES.all;
  categoryList.appendChild(allCategories);
  allCategories.addEventListener("click", (e) => {
    bindCards(data, CARD_CATEGORIES.all);
    Array.from(categoryList.querySelectorAll("li")).forEach((x) => {
      x.classList.remove("active");
    });
    e.target.classList.add("active");
    currentCategory = CARD_CATEGORIES.all;
  });

  const categoryArray = [];

  data.forEach((product) => {
    const category = product.category;
    if (!categoryArray.includes(category)) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = category;
      li.addEventListener("click", (e) => {
        bindCards(data, category);
        Array.from(categoryList.querySelectorAll("li")).forEach((x) => {
          x.classList.remove("active");
        });
        e.target.classList.add("active");
        currentCategory = category;
      });

      categoryList.appendChild(li);
      categoryArray.push(category);
    }
  });
};

const onload = () => {
  bindCards(PRODUCTS, CARD_CATEGORIES.all);
  getCategories(PRODUCTS);
  addAllEventListeners();
};

document.addEventListener("DOMContentLoaded", onload);
