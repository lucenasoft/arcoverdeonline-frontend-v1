"use client";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import { getSponsorId, updateSponsor } from "@/services/sponsor";

// COMPONENTES
import FormSponsor from "@/components/Form/FormSponsor";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";

export default function EditSponsor() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [contact, setContact] = useState("");
  const [url, setUrl] = useState("");

  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSponsorData = async () => {
      try {
        const data = await getSponsorId(id);
        setSponsor(data);
        setName(data.name);
        setLogo(data.logo);
        setContact(data.contact);
        setUrl(data.url);
      } catch (error: any) {
        setError("Erro ao buscar o patrocinador, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsorData();
  }, [id]);

  const handleEdit = async (e: any) => {
    e.preventDefault();

    try {
      await updateSponsor(id, { name, logo, contact, url });
      window.location.href = "/pages/sponsors/AllSponsor";
    } catch (error: any) {
      setError("Erro ao atualizar o patrocinador, tente novamente mais tarde.");
    }
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!sponsor)
    return (
      <p className="flex justify-center pt-8">Patrocinador não encontrado.</p>
    );

  return (
    <div className="flex items-center justify-center flex-col py-6 bg-white">
      <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <FormSponsor
          name={name}
          setName={setName}
          logo={logo}
          setLogo={setLogo}
          contact={contact}
          setContact={setContact}
          url={url}
          setUrl={setUrl}
        />

        <DialogFormEdit handleEdit={handleEdit} />
      </form>
    </div>
  );
}
