import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const changeHandler = (e) => {
    // console.log(e.target.name, e.target.value)
    setproduct({ ...product, [e.target.name]: e.target.value });
  };
  // const [title, settitle] = useState("");
  // const [image, setimage] = useState("");
  // const [category, setcategory] = useState("");
  // const [price, setprice] = useState("");
  // const [description, setdescription] = useState("");

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const Addproducthandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("every field atleast have 4 character...");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copydata = [...products];
    copydata[pi] = { ...products[pi], ...product };
    setproducts(copydata)
    localStorage.setItem("products", JSON.stringify([...products, product]));
    navigate(-1);

    //   const product = {
    //     id: nanoid(),
    //     title,
    //     image,
    //     category,
    //     price,
    //     description,
    //   };
    //   setproducts([...products, product]);
    // localStorage.setItem("products", JSON.stringify([...products, product]));
    //   navigate("/");
    console.log(product);
  };
  return (
    <form
      onSubmit={Addproducthandler}
      className="p-[5%] flex flex-col items-center w-screen h-screen"
      action=""
    >
      <h1 className="mb-3 w-1/2 text-3xl">Edit Product</h1>
      <input
        type="url"
        placeholder="image-url"
        className="text-1xl bg-zinc-100 p-3 rounded w-1/2 mb-3"
        name="image"
        onChange={changeHandler}
        value={product && product.image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100  p-3 rounded w-1/2 mb-3"
        name="title"
        onChange={changeHandler}
        value={product && product.title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="Category"
          className="text-1xl bg-zinc-100  p-3 rounded w-[48%] mb-3"
          name="category"
          onChange={changeHandler}
          value={product && product.category}
        />

        <input
          type="number"
          placeholder="Price"
          className="text-1xl bg-zinc-100 p-3 rounded w-[48%] mb-3 [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
          name="price"
          onChange={changeHandler}
          value={product && product.price}
        />
      </div>
      <textarea
        name="description"
        onChange={changeHandler}
        placeholder="Enter the Product Description here..."
        value={product && product.description}
        className="text-1xl bg-zinc-100 p-3 rounded w-1/2 mb-3"
        id=""
        rows="10"
      ></textarea>
      <div className="w-1/2">
        <button className="self-start py-3 px-5 border rounded border-blue-200 text-blue-300">
          Added Product
        </button>
      </div>
    </form>
  );
}
export default Edit;
