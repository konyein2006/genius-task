import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { MdAdd } from "react-icons/md";

export default function AddTodo({
  text,
  size = "lg",
}: {
  text: string;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size={size}>
          <MdAdd /> {text}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero
            incidunt sapiente!
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="todo">Todo</Label>
            <Input id="todo" placeholder="new todo" name="todo" />
          </Field>
          <div className="flex items-center gap-3">
            <Field orientation={"horizontal"}>
              <Checkbox id="complete" name="complete" />
              <Label htmlFor="complete">Complete</Label>
            </Field>
            <Field orientation={"horizontal"}>
              <Checkbox id="important" name="important" />
              <Label htmlFor="important">Important</Label>
            </Field>
          </div>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit">Add todo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
