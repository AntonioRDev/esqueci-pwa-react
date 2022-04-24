import React, { useEffect, useState } from "react";
import { getLists } from "../services/storage.service";
import { FaPlusCircle } from "react-icons/fa";
import NoDataImg from "../assets/images/no-data.svg";
import ListItem from "../components/ListItem";

function List({ goToAddPage }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const savedLists = getLists();

    if (savedLists) {
      setLists(savedLists);
    }
  }, []);

  const renderLists = () => {
    if (lists.length) {
      return (
        <div className="pt-8 px-6">
          {lists.map((list) => <ListItem key={list.id} list={list} onEditClick={() => console.log('edit')}/>)}
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center pt-28">
          <div className="flex flex-col items-center">
            <img className="w-28 mb-4" src={NoDataImg} alt="Lista vazia" />
            <p>Nenhuma lista criada.</p>
            <p>Clique no + para criar uma nova lista.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="relative flex justify-center">
        <div>
          <p className="w-fit border-b px-5">Minhas Listas</p>
        </div>

        <div className="absolute right-10 cursor-pointer" onClick={goToAddPage}>
          <FaPlusCircle />
        </div>
      </div>

      {renderLists()}
    </div>
  );
}

export default List;
