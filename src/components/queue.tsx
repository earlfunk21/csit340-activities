import React from "react";
import Task, { TaskType } from "@/components/task";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Duration from "./duration";

type Props = {
	title: string;
	tasks: TaskType[];
	removeTask: () => void;
};

function Queue({ title, tasks, removeTask }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-2xl">Queue List</div>
				<div className="flex flex-wrap gap-2 h-4">
					{tasks.map((task, index) => (
						<Task
							key={index}
							number={task.number}
							prio={task.prio}
							className="p-2"
						/>
					))}
				</div>
			</CardContent>
			<CardFooter className="flex flex-col items-start">
				<div className="text-2xl">Duration</div>
				<Duration
					run={tasks.length > 0}
					removeTask={removeTask}
				/>
			</CardFooter>
		</Card>
	);
}

export default React.memo(Queue);
