import React, { useEffect, useState } from "react";
import Task, { TaskType } from "@/components/task";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Props = {
	title: string;
	tasks: TaskType[];
	removeTask: () => void;
};

const useCountDown = (
	initialCount: number, removeTask: () => void
): [number, (number: number) => void] => {
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;

		if (count > 0) {
			timer = setInterval(() => {
				setCount((prevCount) => prevCount - 1);
			}, 1000);
		}

    if(count <= 0){
      removeTask()
    }

		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	}, [count]);

	const changeCount = (number: number) => {
		setCount(number);
	};

	return [count, changeCount];
};

function Queue({ title, tasks, removeTask }: Props) {
	const [count, changeCount] = useCountDown(0, removeTask);


  React.useEffect(() => {
    if(tasks.length > 0){
      changeCount(10);
    }
  }, [tasks])

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
				<Progress
					value={count * 10}
					className={cn("h-8")}
				/>
			</CardFooter>
		</Card>
	);
}

export default Queue;
