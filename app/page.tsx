"use client";

import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  EllipsisVertical,
  PenBox,
  Plus,
  Sparkles,
  Star,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Edit from "@/components/Edit";
import { useTasks } from "@/components/TaskProvider";
import { FormEvent, useMemo, useState } from "react";
import { Task } from "./lib/definitions";

export default function Home() {
  const {
    tasks,
    isLoaded,
    filter,
    setFilter,
    addTask,
    updateTask,
    toggleComplete,
    toggleImportant,
    deleteTask,
  } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Add task dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskImportant, setNewTaskImportant] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "todo") return !task.isCompleted;
      if (filter === "important") return task.important;
      if (filter === "completed") return task.isCompleted;
      return true;
    });
  }, [tasks, filter]);

  function handleAddTask(e: FormEvent) {
    e.preventDefault();
    const trimmed = newTaskText.trim();
    if (!trimmed) return;

    addTask(trimmed, newTaskImportant);
    setNewTaskText("");
    setNewTaskImportant(false);
    setAddOpen(false);
    setFilter("todo");
  }

  return (
    <main className="flex-1 flex justify-start m-1 sm:m-3 md:m-5">
      <Card className="h-full w-full lg:max-w-3xl lg:py-5">
        <CardHeader>
          <CardTitle className="">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xl capitalize">
                {filter === "all" ? "My Tasks" : `${filter} Tasks`}
              </h3>
              <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogTrigger>
                  <Button>
                    <Plus /> NEW TASK
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleAddTask}>
                    <DialogHeader>
                      <DialogTitle>Add NEW TASK</DialogTitle>
                      <DialogDescription>
                        Create a new item for your to-do list and mark it as
                        important if it needs priority.
                      </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                      <Field>
                        <Label htmlFor="task">Task</Label>
                        <Input
                          id="task"
                          name="task"
                          placeholder="Add new task"
                          onChange={(e) => setNewTaskText(e.target.value)}
                          value={newTaskText}
                          required
                        />
                      </Field>
                      <Field orientation={"horizontal"}>
                        <Checkbox
                          id="important"
                          name="important"
                          onCheckedChange={(checked) =>
                            setNewTaskImportant(Boolean(checked))
                          }
                        />
                        <Label htmlFor="important">Important task</Label>
                      </Field>
                    </FieldGroup>
                    <DialogFooter>
                      <DialogClose
                        render={<Button variant={"outline"}>Cancel</Button>}
                      />
                      <Button type="submit">Add task</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isLoaded ? null : filteredTasks?.length === 0 ? (
            <div className="text-sm text-muted-foreground py-6 text-center">
              No tasks yet. Click &ldquo;NEW TASK&rdquo; to add one.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-100 p-5 rounded-lg my-3 space-y-5"
              >
                <Field orientation={"horizontal"}>
                  <Checkbox
                    id={`complete-${task.id}`}
                    name="complete"
                    checked={task.isCompleted}
                    onCheckedChange={(checked) =>
                      toggleComplete(task.id, Boolean(checked))
                    }
                  />
                  <Label
                    htmlFor={`complete-${task.id}`}
                    className={
                      task.isCompleted ? "line-through decoration-2" : ""
                    }
                  >
                    {task.text}
                  </Label>
                </Field>
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-2 text-orange-400 text-sm">
                    <Calendar className="size-4" />
                    <p>{dayjs(task.createAt).format("DD/MM/YYYY hh:mmA")}</p>
                  </div>
                  <div className="space-x-1 hidden md:block">
                    <Button
                      variant={"outline"}
                      onClick={() => toggleImportant(task.id)}
                    >
                      {task.important ? (
                        <Sparkles className="text-red-300" />
                      ) : (
                        <Star />
                      )}
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() => setEditingTask(task)}
                    >
                      <PenBox />
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                  <div className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant={"outline"} />}
                      >
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Action</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => toggleImportant(task.id)}
                          >
                            {task.important ? (
                              <Sparkles className="text-red-300" />
                            ) : (
                              <Star />
                            )}{" "}
                            Important
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setEditingTask(task)}
                          >
                            <PenBox /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteTask(task.id)}>
                            <Trash /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {editingTask && (
                  <Edit
                    task={editingTask}
                    open={Boolean(editingTask)}
                    onOpenChange={(open) => {
                      if (!open) setEditingTask(null);
                    }}
                    onUpdateTask={(updated) => {
                      updateTask(updated);
                      setEditingTask(null);
                    }}
                  />
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </main>
  );
}
