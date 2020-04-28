import React from "react";

export default function About({ children }) {
  return (
    <section className="section about-section">
      <h1 className="section-title">Quem somos</h1>
      <p>
        A mobilidade urbana é um dos maiores desafios do nosso tempo e está no
        cerne das grandes decisões que temos que tomar agora. O congestionamento
        das grandes cidades, com velocidade média que não ultrapassa 25
        quilômetros por hora; o transporte público ineficiente e o altíssimo
        custo de tudo que gira em torno do atual modelo de locomoção urbana são
        a combinação perfeita para o caos.
      </p>
      <div className="hero-about">{children}</div>
    </section>
  );
}
