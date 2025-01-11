"use client";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import { getUserId, updateUser } from "@/services/user";

// COMPONENTES
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";
import FormUser from "@/components/Form/FormUser";

export default function EditUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [token, setToken] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setToken(!!tokenCookie);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchUserData = async () => {
      try {
        const data = await getUserId(id);
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
      } catch (error: any) {
        setError("Erro ao buscar o usuário, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleEdit = async (e: any) => {
    e.preventDefault();
    try {
      await updateUser(id, { name, email, password });
      window.location.href = "/";
    } catch (error: any) {
      setError("Erro ao atualizar o usuário, tente novamente mais tarde.");
    }
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!user)
    return <p className="flex justify-center pt-8">Usuário não encontrado.</p>;

  return (
    <div className={token ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="flex items-center pt-10 flex-col h-screen bg-white">
        <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <FormUser
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          <DialogFormEdit handleEdit={handleEdit} />
        </form>
      </div>
    </div>
  );
}
