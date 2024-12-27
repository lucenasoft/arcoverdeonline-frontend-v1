"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSponsorId } from "@/services/sponsor";

export default function SponsorDetails() {
  const { id } = useParams();
  const [sponsor, setSponsor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSponsor = async () => {
      try {
        const data = await getSponsorId(id);
        setSponsor(data);
      } catch (error: any) {
        console.error("Erro ao buscar o patrocinador:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (!sponsor) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-600 text-xl font-semibold">
          Patrocinador não encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white py-36 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">{sponsor.name}</h1>
          <p className="text-gray-500 mt-2">
            {sponsor.description || "Informações do patrocinador."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 text-lg">
              <strong className="font-medium">Logo:</strong> {sponsor.logo}
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-lg">
              <strong className="font-medium">Contato:</strong>{" "}
              {sponsor.contact}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-700 text-lg">
              <strong className="font-medium">URL:</strong>{" "}
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline hover:text-green-800"
              >
                {sponsor.url}
              </a>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href={`/`}>
            <Button
              variant="solid"
              colorScheme="green"
              size="lg"
              borderRadius="full"
            >
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
