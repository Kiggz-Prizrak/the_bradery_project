const login = (userlog) => {
  return fetch(`${import.meta.env.VITE_API_HOST}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userlog),
  })
    .then((res) => res.json())
    .then((res) => console.log("res.error"))
    // .catch((err) => console.log(err));
    // .then((res) => {
    //   console.log(res);
    //   this.errorMessage = res.error;
    //   const { token, user } = res;
    //   this.$store.dispatch("setToken", token);
    //   this.$store.dispatch("setUser", user);
    //   if (user === undefined || token === undefined) {
    //     localStorage.clear();
    //   } else {
    //     document.location.href = "http://localhost:8080/";
    //   }
    // });
  
  
};

// const signup = (data) => {}

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
}

const getUserData = (id, token) => {
  return fetch(`${import.meta.env.VITE_API_HOST}users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
};

const getOrders= (id, token) => {
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
      }
  




export {
  getAllProducts,
  getOneProduct,
  getUserData,
  getOrders,
  getOneOrders,
  editProfile,
  login,
};