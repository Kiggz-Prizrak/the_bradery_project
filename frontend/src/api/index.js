const createOrder = (userData, totalPrice, cart) => {
  console.log(totalPrice);
  console.log(cart);
  console.log(userData);
  fetch(`${import.meta.env.VITE_API_HOST}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
    body: JSON.stringify({ totalPrice }),
  })
    .then((res) => res.json())
    .then((res) => {
      createOrderItem(res.order.id, cart, userData.token);
    });
};

const createOrderItem = (OrderId, cart, token) => {
  cart.map((e) => {
    console.log(token);
    console.log(e);
    
    const item = JSON.stringify({
      name: e.name,
      price: Number(e.price),
      quantity: e.productQuantity,
      OrderId,
      ProductId: e.id,
    });

    // const item = {
    //   name: "Jean Slim Noir",
    //   price: 49.99,
    //   quantity: 1,
    //   OrderId: 12,
    //   ProductId: 2,
    // };

    console.log(item);
    fetch(`${import.meta.env.VITE_API_HOST}order/orderItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: item,
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  });
};

const getAllProducts = () => {
  return fetch(`${import.meta.env.VITE_API_HOST}products`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
};

const getOneProduct = (id) => {
  return fetch(`${import.meta.env.VITE_API_HOST}products/${id}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
};

const getUserData = (id, token) => {
  return fetch(`${import.meta.env.VITE_API_HOST}users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
};

const getOrders = (id, token) => {
  return fetch(`${import.meta.env.VITE_API_HOST}orders`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
};

const getOneOrders = (id, token) => {
  return fetch(`${import.meta.env.VITE_API_HOST}orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
};

const editProfile = (data, id, token) => {
  return fetch(`http://localhost:3000/api/users/${id}`, {
    body: data,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      this.$store.dispatch("setUser", res.user);
      this.$router.push({ name: "profil" });
    });
};

export {
  getAllProducts,
  getOneProduct,
  getUserData,
  getOrders,
  getOneOrders,
  editProfile,
  createOrder,
};
