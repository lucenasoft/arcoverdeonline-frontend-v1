import { Button } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ButtonPageAllCreate = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [href, setHref] = useState("");

  useEffect(() => {
    let currentTitle = "Criar";
    let href = "";

    if (pathname === "/pages/categories/AllCategory") {
      currentTitle = "Criar Categoria";
      href = "/pages/categories/CreateCategory";
    } else if (pathname === "/pages/subCategories/AllSubCategory") {
      currentTitle = "Criar Sub-Categoria";
      href = "/pages/subCategories/CreateSubCategory";
    } else if (pathname === "/pages/posts/AllPost") {
      currentTitle = "Criar Publicação";
      href = "/pages/posts/CreatePost";
    } else if (pathname === "/pages/sponsors/AllSponsor") {
      currentTitle = "Criar Patrocinador";
      href = "/pages/sponsors/CreateSponsor";
    }

    setName(currentTitle);
    setHref(href);
  }, [pathname]);

  return (
    <div>
      <Link href={href}>
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
      </Link>
    </div>
  );
};

export default ButtonPageAllCreate;
