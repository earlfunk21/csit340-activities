import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function App() {
	const [code, setCode] = useState("");

	return (
		<div className="Center">
			<h1>Enter a game code</h1>
			<input
				type="text"
				id="inputCode"
				onChange={e => setCode(e.target.value)}
				value={code}
			/>
			<Link
				className="btn-primary"
				to="/bingo"
				state={code}>
				Get Card
			</Link>
		</div>
	);
}

function Bingo() {
	const { state } = useLocation();
	const [board, setBoard] = useState({
		B: [],
		I: [],
		N: [],
		G: [],
		O: [],
	});
	const [disabledNum, setDisabledNum] = useState({
		B: [],
		I: [],
		N: [],
		G: [],
		O: [],
	});
	const [token, setToken] = useState("");
	const navigate = useNavigate();

	const checkCard = async () => {
		const response = await axios.get("http://www.hyeumine.com/checkwin.php", {
			params: { playcard_token: token },
		});
		if (response.data === 1) alert("Bingo");
		else alert("Not yet Bingo!");
	};

	const newCard = async () => {
		setDisabledNum({
			B: [],
			I: [],
			N: [],
			G: [],
			O: [],
		});
		const response = await axios.get("http://www.hyeumine.com/getcard.php", {
			params: { bcode: state },
		});
		if (response.data === 0) {
			alert(`Invalid Code: ${state}`);
			return navigate(-1);
		}
		setBoard(response.data.card);
		setToken(response.data.playcard_token);
	};

	useEffect(() => {
		newCard();
	}, []);

	return (
		<div className="Center">
			<h1>Game Code: {state}</h1>
			<Link to="/">Enter another code</Link>
			<Link to={`http://www.hyeumine.com/bingodashboard.php?bcode=${state}`}>
				Go to Dashboard
			</Link>
			<div className="board">
				{Object.entries(board).map(([letter, nums], key) => (
					<div
						key={key}
						className="board-col">
						{letter}
						{nums.map((num, numKey) => (
							<button
								key={numKey}
								className="btn-num"
								onClick={e => {
									setDisabledNum(prev => ({
										...prev,
										[letter]: [...prev[letter], num],
									}));
								}}
								disabled={disabledNum[letter].includes(num)}>
								{num}
							</button>
						))}
					</div>
				))}
			</div>
			<button
				onClick={checkCard}
				className="btn-primary">
				Check Card
			</button>
			<button
				onClick={newCard}
				className="btn-primary">
				New Card
			</button>
		</div>
	);
}

export default App;
export { Bingo };
