import { TaskType } from "@/components/task";
import React from "react";

export const useCountDown = (tasks: TaskType[], length: number): [number] => {
	const [count, setCount] = React.useState(0);

  React.useEffect(() => {
		if (tasks.length > 0 && count === 0) setCount(prev => prev + length);
	}, [tasks]);

	React.useEffect(() => {

		if (tasks.length > 0 && count > 0) {
			const timer = setInterval(() => {
				if (count !== 0) setCount((prevCount) => prevCount - 1);
        else setCount(prev => prev + length);
			}, tasks[0].number);

			return () => {
				clearInterval(timer);
			};
		}
	}, [tasks, count]);

	return [count];
};
