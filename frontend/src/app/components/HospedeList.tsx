"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HospedeDTO } from "../types";
import { getHospedes, deleteHospede } from "../api-client";
import Pagination from "./Pagination";

const PAGE_SIZE = 10;

interface Props {
  initialData: HospedeDTO[];
}

export default function HospedeList({ initialData }: Props) {
  const router = useRouter();
  const [lista, setLista] = useState<HospedeDTO[]>(initialData);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCpf, setFiltroCpf] = useState("");
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const showMsg = (text: string, type: "success" | "error") => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 4000);
  };

  const consultar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getHospedes(filtroNome || undefined, filtroCpf || undefined);
      setLista(data);
      setPage(1);
    } catch {
      showMsg("Erro ao consultar hóspedes.", "error");
    } finally {
      setLoading(false);
    }
  }, [filtroNome, filtroCpf]);

  async function handleInativar(id: number) {
    if (!confirm("Deseja inativar este hóspede?")) return;
    try {
      await deleteHospede(id);
      showMsg("Hóspede inativado com sucesso!", "success");
      const data = await getHospedes(filtroNome || undefined, filtroCpf || undefined);
      setLista(data);
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : "Erro ao inativar", "error");
    }
  }

  const totalPages = Math.ceil(lista.length / PAGE_SIZE);
  const paginated = lista.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const inputCls = "flex-1 min-w-44 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-hotel-blue focus:ring-2 focus:ring-hotel-blue/20";

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
        {/* Top row */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-navy border-b-2 border-hotel-blue pb-2">
            Consultar Hóspedes 
          </h2>
          <button
            className="px-4 py-2 bg-hotel-blue text-white text-sm font-semibold rounded hover:bg-hotel-blue-hover cursor-pointer whitespace-nowrap"
            onClick={() => router.push("/hospedes/novo")}
          >
            + Novo Hóspede
          </button>
        </div>

        {/* Search row */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <input
            className={inputCls}
            placeholder="Filtrar por nome..."
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && consultar()}
          />
          <input
            className={inputCls}
            placeholder="Filtrar por CPF..."
            value={filtroCpf}
            onChange={(e) => setFiltroCpf(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && consultar()}
          />
          <button
            className="px-4 py-2 bg-hotel-blue text-white text-sm font-semibold rounded hover:bg-hotel-blue-hover cursor-pointer disabled:opacity-50"
            onClick={consultar}
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {["ID","Nome","CPF","E-mail","Cidade/UF","Status","Ações"].map((h) => (
                  <th key={h} className="bg-navy text-white text-xs font-semibold text-left px-3 py-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400 text-sm">
                    Nenhum hóspede encontrado.
                  </td>
                </tr>
              ) : (
                paginated.map((h, i) => (
                  <tr key={h.id} className={`border-b border-gray-100 hover:bg-blue-50 ${i % 2 !== 0 ? "bg-gray-50" : ""}`}>
                    <td className="px-3 py-2">{h.id}</td>
                    <td className="px-3 py-2">{h.nome}</td>
                    <td className="px-3 py-2">{h.cpf}</td>
                    <td className="px-3 py-2">{h.email}</td>
                    <td className="px-3 py-2">{h.cidade}/{h.estado}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        h.ativo
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {h.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        className="text-hotel-blue text-xs underline mr-3 cursor-pointer bg-transparent border-0"
                        onClick={() => router.push(`/hospedes/editar/${h.id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-400 text-xs underline cursor-pointer bg-transparent border-0"
                        onClick={() => handleInativar(h.id!)}
                      >
                        Inativar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

        {lista.length > 0 && (
          <p className="text-xs text-gray-400 mt-2 text-right">
            Exibindo {Math.min((page - 1) * PAGE_SIZE + 1, lista.length)}–{Math.min(page * PAGE_SIZE, lista.length)} de {lista.length} hóspede(s)
          </p>
        )}
      </div>
    </div>
  );
}
