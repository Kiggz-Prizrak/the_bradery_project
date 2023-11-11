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

export {
  getAllProducts,
  getOneProduct,
};