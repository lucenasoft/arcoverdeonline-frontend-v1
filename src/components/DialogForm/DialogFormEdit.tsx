import { Button } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DialogFormEdit = ({ handleEdit }: any) => {
  const pathname = usePathname();
  const [name, setName] = useState("");

  useEffect(() => {
    let currentEdit = "";

    if (pathname.startsWith("/pages/categories/editcategory"))
      currentEdit = "esta categoria";
    else if (pathname.startsWith("/pages/subcategories/editsubcategory"))
      currentEdit = "esta sub-categoria";
    else if (pathname.startsWith("/pages/posts/editpost"))
      currentEdit = "esta publicação";
    else if (pathname.startsWith("/pages/sponsors/editsponsor/"))
      currentEdit = "este patrocinador";

    setName(currentEdit);
  }, [pathname]);

  const handleRedirect = async (e: any) => {
    e.preventDefault();
    let location = "/";

    if (pathname.startsWith("/pages/categories/editcategory"))
      location = "/pages/categories/allcategory";
    else if (pathname.startsWith("/pages/subcategories/editsubcategory"))
      location = "/pages/subcategories/allsubcategory";
    else if (pathname.startsWith("/pages/posts/editpost"))
      location = "/pages/posts/allpost";
    else if (pathname.startsWith("/pages/sponsors/editsponsor/"))
      location = "/pages/sponsors/allsponsor";

    window.location.href = location;
  };

  return (
    <div className="flex justify-between gap-4 mt-4">
      <DialogRoot role="alertdialog" placement="center">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            border="1px solid green"
            width="48%"
            color="green"
          >
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent backgroundColor="white">
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja editar {name}?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogActionTrigger>
            <Button color="green" onClick={handleEdit}>
              Editar
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>

      <Button
        size="sm"
        type="submit"
        alignSelf="flex-start"
        width="48%"
        variant="solid"
        color="gray"
        border="1px solid gray"
        onClick={handleRedirect}
      >
        Voltar
      </Button>
    </div>
  );
};

export default DialogFormEdit;
