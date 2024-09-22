import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type DeletePropertyDialogProps = {
  deleteProperty: (propertyId: string) => void;
  propertyId: string;
  isPending: boolean;
};

export default function DeletePropertyDialog({ deleteProperty, propertyId, isPending }: DeletePropertyDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'>Delete</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete Property</DialogTitle>
          <DialogDescription>Are you sure you want to delete this property?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className='bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300'>Cancel</Button>
          </DialogClose>
          <Button
            className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
            type='button'
            onClick={() => deleteProperty(propertyId)}
            disabled={isPending}
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
