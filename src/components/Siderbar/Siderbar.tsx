"use client";

import Link from "next/link";
import { Button, HStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { IoMdMenu } from "react-icons/io";

import { useEffect, useState } from "react";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";


const Sidebar: React.FC = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    // Verifica se o cookie "token" existe
    const cookies = document.cookie.split("; ").map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "next-auth.session-token");

    // Habilita a sidebar se o token estiver presente
    setUser(!!tokenCookie);
  }, []);

  return (
    <div className={user ? "block" : "hidden"}>
      <div className="w-56 h-full bg-green-50 text-gray-800 fixed top-0 left-0 shadow-md shadow-black hidden lg:block">
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
        </nav>
      </div>
      <div className="fixed z-10 right-5 bottom-10 lg:hidden">
        <DrawerRoot placement="start" size="xs">
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="2xl"
              shadow="lg"
              shadowColor="black"
              rounded="full"
            >
              <IoMdMenu className="w-full h-full bg-green-700 hover:bg-green-500 rounded-full text-white p-2" />
            </Button>
          </DrawerTrigger>
          <DrawerContent backgroundColor="green.50">
            <DrawerBody>
              <div className="px-24 pt-16">
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
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
      </div>
    </div>
  );
};

export default Sidebar;
