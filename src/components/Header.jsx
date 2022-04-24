import React from "react";
import Logo from "../assets/images/logo.png";

// Componente Header com logo do app
function Header() {
  return (
    <header className="flex justify-center items-center p-4 mb-6">
      <img className="w-16" src={Logo} alt="Logo" />
      <div className="flex flex-col items-center ml-5 font-bold">
        <h1>Esqueci !?</h1>
        <h1>Lista de compras</h1>
      </div>
    </header>
  );
}

export default Header;
