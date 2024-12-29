import { Button } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
        <IoIosAddCircleOutline />
      </Button>
    </div>
  );
};

export default ButtonFormCreate;
