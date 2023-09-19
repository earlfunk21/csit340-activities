import React from "react";

function Number({ value }: { value: number }) {
	return <div className="Color Number">{value}</div>;
}

function Box({ boxNumber, value }: { boxNumber: number; value: number }) {
	return (
		<div
			key={boxNumber}
			className="Color Box"
			style={{
				opacity: value === boxNumber ? 0.5 : 1,
			}}></div>
	);
}

function App() {
	const [isRolling, setIsRolling] = React.useState(false);
	const [number, setNumber] = React.useState(-1);
	const [numbers, setNumbers] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

	React.useEffect(() => {
		let random: number;
		if (isRolling) {
			const interval = setInterval(() => {
				random = Math.floor(Math.random() * 8) + 1;
				setNumber(random);
			}, 100);

			return () => {
				const newNumbers = [...numbers];
				newNumbers[random]++;
				setNumbers(newNumbers);
				clearInterval(interval);
			};
		}
	}, [isRolling]);

	return (
		<div className="App">
			<div className="Container">
				<div className="Numbers">
					{numbers.map((number, index) => (
						<Number
							key={index}
							value={number}
						/>
					))}
				</div>
				<div className="Boxes">
					{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((boxNumber) => (
						<Box
							key={boxNumber}
							value={number}
							boxNumber={boxNumber}
						/>
					))}
				</div>
				<button
					className="btnRoll"
					onClick={() => setIsRolling((prev) => !prev)}>
					{isRolling ? "STOP" : "START"} ROLL
				</button>
			</div>
		</div>
	);
}

export default App;
