import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";

function ListItem({ list, onEditClick }) {
  const [toggleStatus, setToggleStatus] = useState(false);

  const toggle = () => {
    setToggleStatus(!toggleStatus);
  };

  return (
    <div className="flex flex-col justify-between border rounded-lg p-3 mb-1 cursor-pointer">
      <div className="flex justify-between border rounded-lg p-3 mb-1 cursor-pointer">
        <p>{list.name}</p>

        <div className="flex">
          <p className="mr-3">
            R$
            {list.products.reduce(
              (acc, currentItem) => acc + currentItem.price,
              0
            )}
          </p>
          
          {toggleStatus ? (
            <FaChevronUp onClick={toggle} />
          ) : (
            <FaChevronDown onClick={toggle} />
          )}
        </div>
      </div>

      {toggleStatus && (
        <div className="flex flex-col border rounded-lg p-3">
          {list.products.map((product) => (
            <div key={product.id} className="flex justify-between">
              <p>{product.name}</p>
              <p>R$ {product.price}</p>
            </div>
          ))}

          <div className="flex justify-center mt-2">
            <BiEdit onClick={onEditClick} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItem;
