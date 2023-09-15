import React from "react";

export const useCountDown = (
	initialCount: number
): [number, (number: number) => void] => {
	const [count, setCount] = React.useState(initialCount);

	React.useEffect(() => {
		let timer: NodeJS.Timeout | null = null;

		if (count > 0) {
			timer = setInterval(() => {
				setCount((prevCount) => prevCount - 1);
			}, 1000);
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
