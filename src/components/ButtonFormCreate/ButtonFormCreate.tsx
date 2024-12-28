import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ButtonFormCreate = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");

  useEffect(() => {
    let currentTitle = "Criar";

    if (pathname === "/pages/categories/CreateCategory")
      currentTitle = "Criar Categoria";

    else if (pathname === "/pages/subCategories/CreateSubCategory")
      currentTitle = "Criar Sub-Categoria";

    else if (pathname === "/pages/posts/CreatePost")
      currentTitle = "Criar Publicação";

    else if (pathname === "/pages/sponsors/CreateSponsor")
      currentTitle = "Criar Patrocinador";

    setName(currentTitle);
  }, [pathname]);

  return (
    <div>
      <Button
        type="submit"
        marginTop="1rem"
        width="full"
        variant="solid"
        colorScheme="green"
        className="transition-all hover:opacity-80"
        border="1px solid green"
        color="green.700"
      >
        {name}
      </Button>
    </div>
  );
};

export default ButtonFormCreate;
