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
  const [logo, setLogo] = useState<File | undefined>(undefined);
  const [contact, setContact] = useState("");
  const [url, setUrl] = useState("");

  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [user, setUser] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setUser(!!tokenCookie);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchSponsorData = async () => {
      try {
        const data = await getSponsorId(id);
        setSponsor(data);
        setName(data.name || "");
        setContact(data.contact || "");
        setUrl(data.url || "");
        if (data.logo) {
          setLogo(undefined);
        }
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
      // Garantir que id seja tratado como string
      const sponsorId = Array.isArray(id) ? id[0] : id;

      // Criação do FormData
      const formData = new FormData();
      formData.append("name", name);
      if (logo) formData.append("logo", logo); // Se logo foi alterado, anexa
      formData.append("contact", contact);
      formData.append("url", url);

      // Passando o FormData para a função de atualização
      await updateSponsor(sponsorId, formData);

      // Redirecionando após o sucesso
      window.location.href = "/pages/sponsors/allsponsor";
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
    <div className={user ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="flex items-center flex-col pt-10 h-screen bg-white">
        <form
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
          onSubmit={handleEdit}
        >
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
    </div>
  );
}
