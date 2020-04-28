import React from "react";
import loading from '../assets/loading.gif'

export default function Loading() {
  return <div className="loading">
      <img src={loading} alt="carregando Gif"/><h2>Carregando...</h2>  
    </div>;
}
    
