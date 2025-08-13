import React, { useState } from "react";
import axios from "axios";

export default function CadastroCartao() {
  const [form, setForm] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.numero || !form.nome || !form.validade || !form.cvv) {
      setMensagem("Preencha todos os campos");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/cartoes", form);
      setMensagem(res.data.mensagem || "Cartão cadastrado com sucesso!");
      setForm({ numero: "", nome: "", validade: "", cvv: "" });
    } catch (err: any) {
      setMensagem(err.response?.data?.erro || "Erro ao cadastrar");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Cadastro de Cartão</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="numero"
          placeholder="Número do cartão"
          value={form.numero}
          onChange={handleChange}
          maxLength={16}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="text"
          name="nome"
          placeholder="Nome no cartão"
          value={form.nome}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="text"
          name="validade"
          placeholder="Validade (MM/AA)"
          value={form.validade}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          name="cvv"
          placeholder="CVV"
          value={form.cvv}
          onChange={handleChange}
          maxLength={4}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10, backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: 4 }}>
          Cadastrar
        </button>
      </form>
      {mensagem && <p style={{ marginTop: 10 }}>{mensagem}</p>}
    </div>
  );
}
