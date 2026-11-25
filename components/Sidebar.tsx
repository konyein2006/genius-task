"use client";

import { CheckCircle, ListTodo, Star } from "lucide-react";
import Image from "next/image";
import { useTasks } from "./TaskProvider";

export default function Sidebar() {
  const { todoCount, importantCount, completedCount, filter, setFilter } =
    useTasks();
  return (
    <div className="w-16 lg:w-1/6 border border-gray-200 m-1 sm:m-3 md:m-5 rounded-xl p-3 xl:p-5 min-h-[calu(100vh-10px)] ">
      <div className="flex items-end gap-1">
        <Image
          src="/logo.jpg"
          width={32}
          height={32}
          alt="Genius-Todo"
          className="h-12 lg:h-10 w-12 lg:w-10 rounded object-cover"
        />
        <h2 className="text-xl text-cyan-400 font-bold lg:block hidden">
          GeniusTodo
        </h2>
      </div>
      <div>
        <h3 className="mt-8 mb-3 text-xl text-gray-400 lg:flex items-center gap-1 hidden">
          <span className="hidden lg:block">MAIN </span> MENU
        </h3>
        <div className="space-y-5 xl:space-y-3 my-10 lg:my-0">
          <div
            onClick={() => setFilter(filter === "todo" ? "all" : "todo")}
            className={`flex items-center justify-center lg:justify-between  px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-200 cursor-pointer  duration-300 relative ${filter === "todo" ? "bg-gray-100" : ""}`}
          >
            <div className="flex items-center gap-2 xl:gap-3">
              <ListTodo className="size-5" />
              <p className="text-lg font-bold hidden lg:block">To-do</p>
            </div>
            <p
              className={`bg-cyan-400 px-2 py-1 text-white text-xs rounded-full xl:static absolute -top-2 -right-2 ${todoCount === 0 ? "hidden" : ""}`}
            >
              {todoCount}
            </p>
          </div>
          <div
            onClick={() =>
              setFilter(filter === "important" ? "all" : "important")
            }
            className={`flex items-center justify-center lg:justify-between  px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-200 cursor-pointer  duration-300 relative ${filter === "important" ? "bg-gray-100" : ""}`}
          >
            <div className="flex items-center gap-2 xl:gap-3">
              <Star className="size-5" />
              <p className="text-lg font-bold hidden lg:block">Important</p>
            </div>
            <p
              className={`bg-cyan-400 px-2 py-1 text-white text-xs rounded-full xl:static absolute -top-2 -right-2 ${importantCount === 0 ? "hidden" : ""}`}
            >
              {importantCount}
            </p>
          </div>
          <div
            onClick={() =>
              setFilter(filter === "completed" ? "all" : "completed")
            }
            className={`flex items-center justify-center lg:justify-between  px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-200 cursor-pointer  duration-300 relative ${filter === "completed" ? "bg-gray-100" : ""}`}
          >
            <div className="flex items-center gap-2 xl:gap-3">
              <CheckCircle className="size-5 " />
              <p className="text-lg font-bold hidden lg:block">Complete</p>
            </div>
            <p
              className={`bg-cyan-400 px-2 py-1 text-white text-xs rounded-full xl:static absolute -top-2 -right-2 ${completedCount === 0 ? "hidden" : ""}`}
            >
              {completedCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
