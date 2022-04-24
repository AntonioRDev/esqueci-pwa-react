import { useState } from "react";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Header from "./components/Header";
import List from "./components/List";

function Main() {
  const [displayControl, setDisplayControl] = useState("list");

  const setDisplayPage = () => {
    switch (displayControl) {
      case "list":
        return (
          <List
            goToAddPage={() => setDisplayControl("add")}
            goToEditPage={() => setDisplayControl("edit")}
          />
        );
      case "add":
        return <Add back={() => setDisplayControl("list")} />;
      case "edit":
        return <Edit back={() => setDisplayControl("list")} />;
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
