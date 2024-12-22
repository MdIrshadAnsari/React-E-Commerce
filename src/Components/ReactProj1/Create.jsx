import React, { useContext, useState } from "react";
import { ProductContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const Addproducthandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("every field atleast have 4 character...");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    toast.success("Product Added Successfully...")
    navigate("/");
    console.log(product);
  };

  return (
    <form
      onSubmit={Addproducthandler}
      className="p-[5%] flex flex-col items-center w-screen h-screen"
      action=""
    >
      <h1 className="mb-3 w-1/2 text-3xl">Add New Products</h1>
      <input
        type="url"
        placeholder="image-url"
        className="text-1xl bg-zinc-100 p-3 rounded w-1/2 mb-3"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100  p-3 rounded w-1/2 mb-3"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="Category"
          className="text-1xl bg-zinc-100  p-3 rounded w-[48%] mb-3"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />

        <input
          type="number"
          placeholder="Price"
          className="text-1xl bg-zinc-100 p-3 rounded w-[48%] mb-3 [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        onChange={(e) => setdescription(e.target.value)}
        placeholder="Enter the Product Description here..."
        className="text-1xl bg-zinc-100 p-3 rounded w-1/2 mb-3"
        name=""
        id=""
        rows="10"
      ></textarea>

      <div className="w-1/2">
        <button className="self-start py-3 px-5 border rounded border-blue-200 text-blue-300">
          Add New Product
        </button>
      </div>
    </form>
  );
}

export default Create;
