import React, { useState } from "react";
import UserCard from "./UserCard";

const DatosPorPagina = 5;

export default function UsersList({usuarios}){
    const [paginaActual, setPaginaActual] = useState(1);

  const totalPages = Math.ceil(usuarios.length / DatosPorPagina);

  const handleClick = (pageNumber) => {
    console.log(pageNumber);
    setPaginaActual(pageNumber);
  };

  const renderData = () => {
    const inicio = (paginaActual - 1) * DatosPorPagina;
    const fin = inicio + DatosPorPagina;

    return usuarios.slice(inicio, fin).map((usr, index) => (
        <div key={usr.idusuario} style={{display: 'flex', justifyContent:'center'}}>
            <UserCard user={usr}/>
        </div>
    ));
  };

  const renderPagination = () => {
    const pagination = [];
    let ini = (paginaActual - 5) < 1 ? 1 : paginaActual - 5;
    let fin = (paginaActual + 5) > totalPages ? totalPages : paginaActual + 5;
    for (let i = ini; i <= fin; i++) {
      pagination.push(
        <button key={i} onClick={() => handleClick(i)}>
          {i}
        </button>
      );
    }
    return pagination;
  };

  return (
    <div style={{height: '100%'}}>
      <div style={{overflow: 'auto', maxHeight: '90%', minHeight: '93%'}}>{renderData()}</div>
      <div style={{display: 'flex', justifyContent: 'center', padding: 15}}>
        <button
          disabled={paginaActual === 1}
          onClick={() => handleClick(1)}
        >
          {'<<'}
        </button>
        <button
          disabled={paginaActual === 1}
          onClick={() => handleClick(paginaActual - 1)}
        >
          Anterior
        </button>
        {renderPagination()}
        <button
          disabled={paginaActual === totalPages}
          onClick={() => handleClick(paginaActual + 1)}
        >
          Siguiente
        </button>
        <button
          disabled={paginaActual === totalPages}
          onClick={() => handleClick(totalPages)}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
}