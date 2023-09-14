import React from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import Task, { TaskType } from "./components/task";
import Queue from "./components/queue";
import { cn } from "@/lib/utils";

function App() {
  const [tasks, setTasks] = React.useState<TaskType[]>([]);
  const [highPrioTasks, setHighPrioTasks] = React.useState<TaskType[]>([]);
  const [randomQ1, setRandomQ1] = React.useState<TaskType[]>([]);
  const [randomQ2, setRandomQ2] = React.useState<TaskType[]>([]);
  const [randomQ3, setRandomQ3] = React.useState<TaskType[]>([]);


  const removeTask = (tasks: TaskType[], setTasks: (tasks: TaskType[]) => void) => {
    setTasks(tasks.slice(1))
  }

  const handleAddTask = () => {
    let randomNumber = Math.floor(Math.random() * 200);
    let randomPrio = Math.random() < 0.5;
    let newTask: TaskType = {
      number: randomNumber,
      prio: randomPrio,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleAdmitTask = () => {
    if (tasks.length > 0) {
      const removeTask = tasks[0];
      const updatedTasks = tasks.slice(1);
      setTasks(updatedTasks);
      if (removeTask.prio) setHighPrioTasks((prev) => [...prev, removeTask]);
      else {
        const randomListQ = [setRandomQ1, setRandomQ2, setRandomQ3];
        const randomNumber = Math.floor(Math.random() * 3);
        const randomQueue = randomListQ[randomNumber];
        randomQueue((prev) => [...prev, removeTask]);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center gap-7">
      <Card className="w-[700px]">
        <CardHeader>
          <div className="flex justify-end">
            <Button className="bg-blue-400" onClick={handleAddTask}>
              ADD RANDOM TASKS
            </Button>
          </div>
          <CardTitle>Task Queue</CardTitle>
          <CardDescription>Add tasks to the queue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-5 flex-wrap">
            {tasks.map((task, index) => (
              <Task key={index} number={task.number} prio={task.prio} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className={cn("bg-blue-400")}
            disabled={tasks.length <= 0}
            onClick={handleAdmitTask}
          >
            ADMIT TASKS
          </Button>
        </CardFooter>
      </Card>

      <div className="flex-flex-col">
        <Queue title="High PriorityQueue 1" tasks={highPrioTasks} removeTask={() => {removeTask(highPrioTasks, setHighPrioTasks)}} />
        <Queue title="Random Queue 2" tasks={randomQ1} removeTask={() => {removeTask(randomQ1, setRandomQ1)}} />
        <Queue title="Random Queue 3" tasks={randomQ2} removeTask={() => {removeTask(randomQ2, setRandomQ2)}} />
        <Queue title="Random Queue 4" tasks={randomQ3} removeTask={() => {removeTask(randomQ3, setRandomQ3)}} />
      </div>
    </div>
  );
}

export default App;
