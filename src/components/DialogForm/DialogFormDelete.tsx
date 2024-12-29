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

    if (pathname.startsWith("/pages/categories/AllCategory"))
      currentEdit = "esta categoria";
    else if (pathname.startsWith("/pages/subCategories/AllSubCategory"))
      currentEdit = "esta sub-categoria";
    else if (pathname.startsWith("/pages/posts/AllPost"))
      currentEdit = "esta publicação";
    else if (pathname.startsWith("/pages/sponsors/AllSponsor"))
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
            Apagar
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
