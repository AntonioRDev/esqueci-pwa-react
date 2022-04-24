import { useState } from "react";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Header from "./components/Header";
import List from "./components/List";

// Componente principal que controla o display dos componentes de listagem, edicao e adicao
function Main() {
  const [displayControl, setDisplayControl] = useState("list");
  const [editingItem, setEditingItem] = useState(undefined);

  const setDisplayPage = () => {
    switch (displayControl) {
      case "list":
        return (
          <List
            goToAddPage={() => setDisplayControl("add")}
            goToEditPage={(item) => {
              setDisplayControl("edit");
              setEditingItem(item);
            }}
          />
        );
      case "add":
        return <Add back={() => setDisplayControl("list")} />;
      case "edit":
        return <Edit itemToEdit={editingItem} back={() => setDisplayControl("list")} />;
      default:
        console.error("default display case");
        return;
    }
  };

  return (
    <main className="font-hand">
      <Header />
      {setDisplayPage()}
    </main>
  );
}

export default Main;
