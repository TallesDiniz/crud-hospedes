import { HospedeDTO } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/hospedes";

export async function getHospedes(nome?: string, cpf?: string): Promise<HospedeDTO[]> {
  const params = new URLSearchParams();
  if (nome) params.append("nome", nome);
  if (cpf) params.append("cpf", cpf);
  const res = await fetch(`${API}?${params}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar hóspedes");
  return res.json();
}

export async function createHospede(data: HospedeDTO): Promise<HospedeDTO> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.erro || "Erro ao cadastrar");
  return json;
}

export async function updateHospede(id: number, data: HospedeDTO): Promise<HospedeDTO> {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.erro || "Erro ao atualizar");
  return json;
}

export async function deleteHospede(id: number): Promise<void> {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.erro || "Erro ao inativar");
}
