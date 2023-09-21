// Duration.tsx
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useCountDown } from "@/hooks/useCountDown";
import { TaskType } from "./task";

type Props = {
	tasks: TaskType[];
	removeTask: VoidFunction;
};

function Duration({ tasks, removeTask }: Props) {
	const [count] = useCountDown(tasks, 100);

	React.useEffect(() => {
		if (count === 0 && tasks.length > 0) {
			removeTask();
		}
	}, [count]);

	return (
		<Progress
			value={count}
			className={cn("h-8 max-w-[200px]")}
		/>
	);
}

export default React.memo(Duration);
