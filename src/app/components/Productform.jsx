"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function ProductForm() {
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
    });

    const form = useRef(null);
    const router = useRouter();
    const params = useParams();

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (params.id) {
            axios.get("/api/products/" + params.id).then((res) => {
                setProduct({
                    name: res.data.name,
                    price: res.data.price,
                    description: res.data.description,
                });
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!params.id) {
            const res = await axios.post("/api/products", product
            );
        } else {
            const res = await axios.put("/api/products/" + params.id, product,
            );
        }

        form.current.reset();
        router.push("/products");
        router.refresh();
    };

    return (
        <div className="flex ">
            <form
                className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
                ref={form}
            >
                <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Product Name:
                </label>
                <input
                    name="name"
                    type="text"
                    placeholder="name"
                    onChange={handleChange}
                    value={product.name}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                    autoFocus
                />

                <label
                    htmlFor="price"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Product Price:
                </label>
                <input
                    name="price"
                    type="text"
                    placeholder="00.00"
                    onChange={handleChange}
                    value={product.price}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                />

                <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Product Description:
                </label>
                <textarea
                    name="description"
                    rows={3}
                    placeholder="description"
                    onChange={handleChange}
                    value={product.description}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                />



                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {params.id ? "Update Product" : "Create Product"}
                </button>
            </form>
        </div>
    );
}

export default ProductForm;