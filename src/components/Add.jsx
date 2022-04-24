import React, { useState } from "react";
import { FaAngleLeft, FaTrash } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { addListToStorage } from '../services/storage.service';

function Add({ back }) {
  const [listName, setListName] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [productsToAdd, setProductsToAdd] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productName && productPrice) {
      const id = new Date().valueOf();
      const item = {
        id: id,
        name: productName,
        price: Number(productPrice),
      };

      setProductsToAdd([...productsToAdd, item]);
      clearProductFields();
    }
  };

  const handleSaveList = () => {
    const listToPersist = {
      id: new Date().valueOf(),
      name: listName,
      products: productsToAdd,
    };

    addListToStorage(listToPersist);
    clearAllFields();
    back();
  }

  const clearProductFields = () => {
    setProductName("");
    setProductPrice("");
  };

  const clearAllFields = () => {
    clearProductFields();
    setListName("");
    setProductsToAdd([]);
  };

  const renderProductsToAdd = () => {
    const deleteItemToAdd = (id) => {
      setProductsToAdd(productsToAdd.filter(product => product.id !== id));
    }

    if (productsToAdd.length) {
      return productsToAdd.map((product) => (
        <div key={product.id} className="flex justify-between border rounded-lg p-3 mb-1">
          <p>{product.name}</p>
          <div className="flex">
            <p className="mr-6">R$ {product.price}</p>
            <FaTrash className="cursor-pointer" onClick={() => deleteItemToAdd(product.id)}/>
          </div>
        </div>
      ));
    }
  };

  return (
    <div>
      <div className="relative flex justify-center">
        <div className="absolute left-10 cursor-pointer" onClick={back}>
          <FaAngleLeft />
        </div>

        <div>
          <p className="w-fit border-b px-5">Criar Lista</p>
        </div>

        <div className="absolute right-10 cursor-pointer">
          <IoMdSave onClick={handleSaveList}/>
        </div>
      </div>

      <div className="pt-8 px-6">
        <form
          id="add-form"
          className="flex flex-col mb-6"
          onSubmit={handleSubmit}
        >
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="border rounded-lg p-1 pl-2"
            type="text"
            placeholder="Digite o nome da lista..."
          />

          <div id="divider" className="py-4">
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border rounded-lg p-1 pl-2 mb-2"
            type="text"
            placeholder="Digite o nome do produto..."
          />
          <input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border rounded-lg p-1 pl-2 mb-2"
            type="number"
            placeholder="Digite o preço do produto..."
          />

          <div className="flex justify-center">
            <button className="border rounded-lg p-2" type="submit">
              Adicionar Item
            </button>
          </div>
        </form>

        {renderProductsToAdd()}
      </div>
    </div>
  );
}

export default Add;
