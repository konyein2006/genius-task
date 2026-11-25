"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenBox } from "lucide-react";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Task } from "@/app/lib/definitions";
import React, { useState } from "react";

interface EditProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTask: (updatedTask: Task) => void;
}

export default function Edit({
  task,
  open,
  onOpenChange,
  onUpdateTask,
}: EditProps) {
  const [text, setText] = useState(task.text);
  const [important, setImportant] = useState(task.important);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onUpdateTask({
      ...task,
      text: trimmed,
      important,
      isCompleted,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <PenBox />
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Edit your task</DialogTitle>
            <DialogDescription>
              Update your task details and save your changes.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                name="task"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </Field>
            <div className="flex">
              <Field orientation={"horizontal"}>
                <Checkbox
                  id={`important-${task.id}`}
                  name="important"
                  checked={important}
                  onCheckedChange={(checked) => setImportant(Boolean(checked))}
                />
                <Label htmlFor={`important-${task.id}`}>Important</Label>
              </Field>
              <Field orientation={"horizontal"}>
                <Checkbox
                  id={`complete-${task.id}`}
                  name="complete"
                  onCheckedChange={(checked) =>
                    setIsCompleted(Boolean(checked))
                  }
                  checked={isCompleted}
                />
                <Label htmlFor={`complete-${task.id}`}>Complete</Label>
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant={"outline"}>Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
