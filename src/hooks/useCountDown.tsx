import React from "react";

export const useCountDown = (run: boolean, length: number): [number] => {
	const [count, setCount] = React.useState(0);

  React.useEffect(() => {
		if (run && count === 0) setCount(length);
	}, [run]);

	React.useEffect(() => {

		if (run) {
			const timer = setInterval(() => {
				if (count !== 0) setCount((prevCount) => prevCount - 1);
        else setCount(length);
			}, 1000);

			return () => {
				clearInterval(timer);
			};
		}
	}, [run, count]);

	return [count];
};
