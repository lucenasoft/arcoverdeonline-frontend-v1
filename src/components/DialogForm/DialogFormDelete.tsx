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
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DialogFormDelete = ({ handleDelete }: any) => {
  const pathname = usePathname();
  const [name, setName] = useState("");

  useEffect(() => {
    let currentEdit = "Editar";

    if (pathname.startsWith("/pages/categories/allcategory"))
      currentEdit = "esta categoria";
    else if (pathname.startsWith("/pages/subcategories/allsubcategory"))
      currentEdit = "esta sub-categoria";
    else if (pathname.startsWith("/pages/posts/allpost"))
      currentEdit = "esta publicação";
    else if (pathname.startsWith("/pages/sponsors/allsponsor"))
      currentEdit = "este patrocinador";

    setName(currentEdit);
  }, [pathname]);

  return (
    <div className="flex justify-between">
      <DialogRoot role="alertdialog" placement="center">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            border="1px solid red"
            width="full"
            color="red"
          >
            <span className="hidden sm:block">Apagar</span>
            <BsTrash />
          </Button>
        </DialogTrigger>
        <DialogContent backgroundColor="white">
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja apagar {name}?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogActionTrigger>
            <Button color="red" onClick={handleDelete}>
              Apagar
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </div>
  );
};

export default DialogFormDelete;
