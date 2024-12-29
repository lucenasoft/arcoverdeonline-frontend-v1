"use client";

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

        <div className="flex flex-col pt-10 pb-14 gap-4">
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

          <Link href="/pages/categories/AllCategory">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
            >
              Categorias
            </Button>
          </Link>

          <Link href="/pages/subCategories/AllSubCategory">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
            >
              Sub-Categorias
            </Button>
          </Link>

          <Link href="/pages/posts/AllPost">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
            >
              Publicações
            </Button>
          </Link>

          <Link href="/pages/sponsors/AllSponsor">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
            >
              Patrocinadores
            </Button>
          </Link>
        </div>

        <footer className="flex flex-col pt-96">
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
