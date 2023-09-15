import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useCountDown } from "@/hooks/useCountDown";


type Props = {
	run: boolean;
	removeTask: () => void;
};

function Duration({ run, removeTask }: Props) {
	const [count, changeCount] = useCountDown(0);

	React.useEffect(() => {
    changeCount(run ? 10 : 0)
  }, [run]);

  React.useEffect(() => {
    if(count <= 0)
      removeTask();
  }, [count])

	return (
		<Progress
			value={count * 10}
			className={cn("h-8")}
		/>
	);
}

export default React.memo(Duration);
