import { getHospedes } from "../../../api-client";
import HospedeForm from "../../../components/HospedeForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarPage({ params }: Props) {
  const { id } = await params;
  let hospede = undefined;
  try {
    const lista = await getHospedes();
    hospede = lista.find((h) => String(h.id) === id);
  } catch {
    // fallback: form will be empty
  }

  if (!hospede) {
    return (
      <div className="bg-white rounded-lg p-6 text-center text-blue-600">
        Hóspede não encontrado. <a href="/hospedes/listar" className="hover:text-blue-800">Voltar à lista</a>
      </div>
    );
  }

  return <HospedeForm mode="edit" initial={hospede} />;
}
