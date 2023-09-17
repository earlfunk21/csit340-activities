// Duration.tsx
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useCountDown } from "@/hooks/useCountDown";

type Props = {
	run: boolean;
	removeTask: VoidFunction;
};

function Duration({ run, removeTask }: Props) {
	const [count] = useCountDown(run, 10);

	React.useEffect(() => {
		if (count === 0 && run) {
			removeTask();
		}
	}, [count]);

	return (
		<Progress
			value={count * 10}
			className={cn("h-8 max-w-[200px]")}
		/>
	);
}

export default React.memo(Duration);
