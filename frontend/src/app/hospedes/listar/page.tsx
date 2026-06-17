import { getHospedes } from "../../api-client";
import { HospedeDTO } from "../../types";
import HospedeList from "../../components/HospedeList";

export const dynamic = "force-dynamic";

export default async function ListarPage() {
  let hospedes: HospedeDTO[] = [];
  try {
    hospedes = await getHospedes();
  } catch {
    // API may be offline in dev; start with empty list
  }
  return <HospedeList initialData={hospedes} />;
}
