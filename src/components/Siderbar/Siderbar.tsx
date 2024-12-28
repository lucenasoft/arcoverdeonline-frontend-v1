"use client"

import Link from "next/link";
import { Button, HStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

import { LogoutAdmin } from "@/services/auth";

const Sidebar: React.FC = () => {
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Nenhum token encontrado.");
      return;
    }

    try {
      await LogoutAdmin(token);

      localStorage.removeItem("token");

      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <aside className="w-56 h-full bg-green-50 text-gray-800 fixed top-0 left-0 shadow-md shadow-black">
      <nav className="flex flex-col py-16 px-4 gap-4">
        <div className="px-16">
          <HStack>
            <Avatar
              variant="solid"
              name="Usuário Adm"
              size="2xl"
              width="full"
              outlineWidth="2px"
              outlineColor="green.700"
              outlineOffset="2px"
              outlineStyle="solid"
            />
          </HStack>
        </div>

        <div className="flex flex-col pt-10 pb-44 px-4 gap-4">
          <Link href="/">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
            >
              Início
            </Button>
          </Link>

          <Link href="/pages/categories/CreateCategory">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
            >
              Criar Categoria
            </Button>
          </Link>

          <Link href="/pages/subCategories/CreateSubCategory">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
            >
              Criar Sub-Categoria
            </Button>
          </Link>

          <Link href="/pages/posts/CreatePost">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
            >
              Criar Publicação
            </Button>
          </Link>

          <Link href="/pages/sponsors/CreateSponsor">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
            >
              Criar Patrocinador
            </Button>
          </Link>
        </div>

        <footer className="flex flex-col pt-64 px-4 gap-4">
          <Button
            type="submit"
            width="full"
            variant="solid"
            colorScheme="green"
            className="transition-all hover:opacity-80"
            color="white"
            backgroundColor="green.700"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </footer>
      </nav>
    </aside>
  );
};

export default Sidebar;
