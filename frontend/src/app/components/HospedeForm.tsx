"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HospedeDTO } from "../types";
import { createHospede, updateHospede } from "../api-client";

const ESTADOS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const EMPTY: HospedeDTO = {
  nome: "", cpf: "", dataNascimento: "", email: "", telefone: "",
  logradouro: "", numero: "", cep: "", bairro: "", complemento: "", cidade: "", estado: "",
};

interface Props {
  initial?: HospedeDTO;
  mode: "create" | "edit";
}

const inputCls = "w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-hotel-blue focus:ring-2 focus:ring-hotel-blue/20";
const labelCls = "block text-xs font-semibold text-gray-500 mb-1";

export default function HospedeForm({ initial, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<HospedeDTO>(initial ?? EMPTY);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  function set(field: keyof HospedeDTO, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    setMsg(null);
    try {
      if (mode === "create") {
        await createHospede(form);
        setMsg({ text: "Hóspede cadastrado com sucesso!", type: "success" });
        setForm(EMPTY);
        setTimeout(() => router.push("/hospedes/listar"), 1500);
      } else {
        await updateHospede(form.id!, form);
        setMsg({ text: "Hóspede alterado com sucesso!", type: "success" });
        setTimeout(() => router.push("/hospedes/listar"), 1500);
      }
    } catch (e: unknown) {
      setMsg({ text: e instanceof Error ? e.message : "Erro desconhecido", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {msg && (
        <div className={`text-sm px-3 py-2 rounded mb-3 border ${
          msg.type === "success"
            ? "bg-green-50 text-green-800 border-green-200"
            : "bg-red-50 text-red-800 border-red-200"
        }`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-5 mb-5">
        <h2 className="text-base font-semibold text-navy border-b-2 border-hotel-blue pb-2 mb-4">
          {mode === "create" ? "Cadastrar Hóspede" : "Alterar Hóspede (RF0102)"}
        </h2>

        {/* Dados pessoais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className={labelCls}>Nome Completo *</label>
            <input className={inputCls} value={form.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Nome completo" />
          </div>
          <div>
            <label className={labelCls}>CPF *</label>
            <input className={inputCls} value={form.cpf} onChange={(e) => set("cpf", e.target.value)} placeholder="000.000.000-00" maxLength={14} />
          </div>
          <div>
            <label className={labelCls}>Data Nascimento *</label>
            <input className={inputCls} type="date" value={form.dataNascimento} onChange={(e) => set("dataNascimento", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>E-mail *</label>
            <input className={inputCls} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@exemplo.com" />
          </div>
          <div>
            <label className={labelCls}>Telefone *</label>
            <input className={inputCls} value={form.telefone} onChange={(e) => set("telefone", e.target.value)} placeholder="(11) 99999-9999" />
          </div>
        </div>

        {/* Endereço */}
        <p className="text-sm font-semibold text-navy mt-4 mb-3">Endereço</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className={labelCls}>Logradouro *</label>
            <input className={inputCls} value={form.logradouro} onChange={(e) => set("logradouro", e.target.value)} placeholder="Rua, Av..." />
          </div>
          <div>
            <label className={labelCls}>Número *</label>
            <input className={inputCls} value={form.numero} onChange={(e) => set("numero", e.target.value)} placeholder="123" />
          </div>
          <div>
            <label className={labelCls}>CEP *</label>
            <input className={inputCls} value={form.cep} onChange={(e) => set("cep", e.target.value)} placeholder="00000-000" maxLength={9} />
          </div>
          <div>
            <label className={labelCls}>Bairro *</label>
            <input className={inputCls} value={form.bairro} onChange={(e) => set("bairro", e.target.value)} placeholder="Bairro" />
          </div>
          <div>
            <label className={labelCls}>Complemento</label>
            <input className={inputCls} value={form.complemento} onChange={(e) => set("complemento", e.target.value)} placeholder="Apto, Bloco..." />
          </div>
          <div>
            <label className={labelCls}>Cidade *</label>
            <input className={inputCls} value={form.cidade} onChange={(e) => set("cidade", e.target.value)} placeholder="Cidade" />
          </div>
          <div>
            <label className={labelCls}>Estado *</label>
            <select className={inputCls} value={form.estado} onChange={(e) => set("estado", e.target.value)}>
              <option value="">Selecione...</option>
              {ESTADOS.map((uf) => <option key={uf}>{uf}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-5 py-2 rounded text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
            onClick={() => router.push("/hospedes/listar")}
          >
            Cancelar
          </button>
          <button
            className="px-5 py-2 rounded text-sm font-semibold bg-hotel-blue text-white hover:bg-hotel-blue-hover cursor-pointer disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Salvando..." : mode === "create" ? "Cadastrar" : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}
