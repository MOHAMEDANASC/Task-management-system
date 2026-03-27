export type Task  = {
    id : number
    title : string,
    description : string,
    status : "todo" | "in-progress" | "done",
    dueDate : string,
    createdAt : string,
}

export type TaskInput = {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
};


