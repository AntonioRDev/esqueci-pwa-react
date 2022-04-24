import React, { useState } from "react";
import { FaAngleLeft, FaTrash } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { editListInStorage, removeListInStorage } from '../services/storage.service';

// Componente de edição de listas - estados e funcoes para persistir 
function Edit({ back, itemToEdit }) {
  const [listName, setListName] = useState(itemToEdit.name);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [productsToEdit, setProductsToEdit] = useState([...itemToEdit.products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productName && productPrice) {
      const id = new Date().valueOf();
      const item = {
        id: id,
        name: productName,
        price: Number(productPrice),
      };

      setProductsToEdit([...productsToEdit, item]);
      clearProductFields();
    }
  };

  const handleSaveList = () => {
    const listToEdit = {
      id: new Date().valueOf(),
      name: listName,
      products: productsToEdit,
    };

    editListInStorage(listToEdit);
    clearAllFields();
    back();
  }

  const handleDeleteList = () => {
    removeListInStorage(itemToEdit.id);
    back();
  }

  const clearProductFields = () => {
    setProductName("");
    setProductPrice("");
  };

  const clearAllFields = () => {
    clearProductFields();
    setListName("");
    setProductsToEdit([]);
  };

  const renderProductsToEdit = () => {
    const deleteItemToEdit = (id) => {
      setProductsToEdit(productsToEdit.filter(product => product.id !== id));
    }

    if (productsToEdit.length) {
      return productsToEdit.map((product) => (
        <div key={product.id} className="flex justify-between border rounded-lg p-3 mb-1">
          <p>{product.name}</p>
          <div className="flex">
            <p className="mr-6">R$ {product.price}</p>
            <FaTrash className="cursor-pointer" onClick={() => deleteItemToEdit(product.id)}/>
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
          <p className="w-fit border-b px-5">Editar Lista</p>
        </div>

        <div className="absolute right-10 cursor-pointer">
          <IoMdSave onClick={handleSaveList}/>
        </div>
      </div>

      <div className="pt-8 px-6">
        <div class='flex justify-center mb-2'>
          <button class="border rounded-lg p-2 bg-red-500 text-white" onClick={handleDeleteList}>Excluir Lista</button>
        </div>

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

        {renderProductsToEdit()}
      </div>
    </div>
  );
}

export default Edit;
