'use client'
import { useState } from "react";
import axios from "axios";


function ProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
    });

    //Guardar cambios en el estado
    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    //Enviar datos por el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post("/api/products", product)
        console.log(res)
        form.current.reset()
    }

    return (
        <div className="flex ">

            <form className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}
                
            >

                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2"> Product name</label>
                <input name='name' type="text" placeholder="name" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3"
                    autoFocus />

                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2"> Product price</label>
                <input name='price' type="text" placeholder="00.00" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3"
                    autoFocus />

                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2"> Product description</label>
                <textarea name='description' rows={3} type="text" placeholder="description" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3"
                    autoFocus />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Crear
                </button>
            </form>
        </div>
    );
}

export default ProductForm;