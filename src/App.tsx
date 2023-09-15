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
import { taskReducer, ACTION } from "./reducers/task";

function App() {
	const [state, dispatch] = React.useReducer(taskReducer, {
		tasks: [],
		highPrio: [],
		queue1: [],
		queue2: [],
		queue3: [],
	});

	const handleAddTask = () => {
		const randomNumber = Math.floor(Math.random() * 200);
		const randomPrio = Math.random() < 0.5;
		const newTask = {
			number: randomNumber,
			prio: randomPrio,
		};
		dispatch({ type: ACTION.ADD_TASK, payload: newTask });
	};

	const handleAdmitTask = () => {
		dispatch({ type: ACTION.ADMIT_TASK });
	};

	const removeHighPrio = React.useCallback(() => {
		dispatch({ type: ACTION.REMOVE_HIGH_PRIO_QUEUE });
	}, []);

	const removeQueue1Task = React.useCallback(() => {
		dispatch({ type: ACTION.REMOVE_RANDOM_QUEUE_1 });
	}, []);

	const removeQueue2Task = React.useCallback(() => {
		dispatch({ type: ACTION.REMOVE_RANDOM_QUEUE_2 });
	}, []);

	const removeQueue3Task = React.useCallback(() => {
		dispatch({ type: ACTION.REMOVE_RANDOM_QUEUE_3 });
	}, []);

	return (
		<div className="min-h-screen flex justify-center gap-7">
			<Card className="w-[700px]">
				<CardHeader>
					<div className="flex justify-end">
						<Button
							className="bg-blue-400"
							onClick={handleAddTask}>
							ADD RANDOM TASKS
						</Button>
					</div>
					<CardTitle>Task Queue</CardTitle>
					<CardDescription>Add tasks to the queue</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex gap-5 flex-wrap">
						{state.tasks.map((task: TaskType, index: number) => (
							<Task
								key={index}
								number={task.number}
								prio={task.prio}
							/>
						))}
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className={cn("bg-blue-400")}
						disabled={state.tasks.length <= 0}
						onClick={handleAdmitTask}>
						ADMIT TASKS
					</Button>
				</CardFooter>
			</Card>

			<div className="flex-flex-col">
				<Queue
					title="High PriorityQueue 1"
					tasks={state.highPrio}
					removeTask={removeHighPrio}
				/>
				<Queue
					title="Random Queue 2"
					tasks={state.queue1}
					removeTask={removeQueue1Task}
				/>
				<Queue
					title="Random Queue 3"
					tasks={state.queue2}
					removeTask={removeQueue2Task}
				/>
				<Queue
					title="Random Queue 4"
					tasks={state.queue3}
					removeTask={removeQueue3Task}
				/>
			</div>
		</div>
	);
}

export default App;
