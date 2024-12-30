import { Button } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ButtonFormCreate = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");

  useEffect(() => {
    let currentTitle = "Criar";

    if (pathname === "/pages/categories/EditCategory")
      currentTitle = "Criar Categoria";
    else if (pathname === "/pages/subCategories/EditSubCategory")
      currentTitle = "Criar Sub-Categoria";
    else if (pathname === "/pages/posts/EditPost")
      currentTitle = "Criar Publicação";
    else if (pathname === "/pages/sponsors/EditSponsor")
      currentTitle = "Criar Patrocinador";

    setName(currentTitle);
  }, [pathname]);

  const handleRedirect = async (e: any) => {
    e.preventDefault();
    let location = "/";

    if (pathname.startsWith("/pages/categories/CreateCategory"))
      location = "/pages/categories/AllCategory";
    else if (pathname.startsWith("/pages/subCategories/CreateSubCategory"))
      location = "/pages/subCategories/AllSubCategory";
    else if (pathname.startsWith("/pages/posts/CreatePost"))
      location = "/pages/posts/AllPost";
    else if (pathname.startsWith("/pages/sponsors/CreateSponsor/"))
      location = "/pages/sponsors/AllSponsor";

    window.location.href = location;
  };

  return (
    <div className="flex justify-between gap-4 mt-4">
      <Button
        type="submit"
        width="48%"
        variant="solid"
        colorScheme="green"
        className="transition-all hover:opacity-80"
        border="1px solid green"
        color="green.700"
      >
        {name}
        <IoIosAddCircleOutline />
      </Button>

      <Button
        size="sm"
        type="submit"
        alignSelf="flex-start"
        width="48%"
        variant="solid"
        color="gray"
        border="1px solid gray"
        onClick={handleRedirect}
        paddingY="1.2rem"
      >
        Voltar
      </Button>
    </div>
  );
};

export default ButtonFormCreate;
