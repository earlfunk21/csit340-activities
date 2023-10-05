import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./components/ui/dialog";
import { Undo } from "lucide-react";

type ParamsType = {
	bcode: string;
};

type CardType = {
	B: number[];
	I: number[];
	N: number[];
	G: number[];
	O: number[];
};

const BingoCard = () => {
	const { bcode } = useParams<ParamsType>();
	const [card, setCard] = useState<CardType>({
		B: [],
		I: [],
		N: [],
		G: [],
		O: [],
	});
	const [token, setToken] = useState("");
	const [check, setCheck] = useState(false);

	const newCard = () => {
		window.location.reload();
	};

	const checkCard = async () => {
		axios
			.get("http://www.hyeumine.com/checkwin.php", {
				params: {
					playcard_token: token,
				},
			})
			.then(response => {
				setCheck(response.data);
			});
	};

	useEffect(() => {
		const getCard = async () => {
			axios
				.get("http://www.hyeumine.com/getcard.php", {
					params: {
						bcode: bcode,
					},
				})
				.then(response => {
					const data = response.data;
					setCard(data.card);
					setToken(data.playcard_token);
				});
		};
		getCard();
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center p-24 gap-y-10">
			<h1>Game Code: {bcode}</h1>
			<div className="flex">
				<Button>
					<Undo />
					<Link to="/">Input Another Game Code</Link>
				</Button>
			</div>
			<div className="container flex gap-x-5 justify-center items-center">
				<div className="flex gap-y-4 items-center flex-col">
					B
					{card.B.map((num, key) => (
						<Button key={key}>{num}</Button>
					))}
				</div>
				<div className="flex gap-y-4 items-center flex-col">
					I
					{card.I.map((num, key) => (
						<Button key={key}>{num}</Button>
					))}
				</div>
				<div className="flex gap-y-4 items-center flex-col">
					N
					{card.N.map((num, key) => (
						<Button key={key}>{num}</Button>
					))}
				</div>
				<div className="flex gap-y-4 items-center flex-col">
					G
					{card.B.map((num, key) => (
						<Button key={key}>{num}</Button>
					))}
				</div>
				<div className="flex gap-y-4 items-center flex-col">
					O
					{card.B.map((num, key) => (
						<Button key={key}>{num}</Button>
					))}
				</div>
			</div>

			<div className="flex justify-center gap-x-10">
				<Dialog>
					<DialogTrigger asChild>
						<Button onClick={checkCard}>Check Card</Button>
					</DialogTrigger>
					<DialogContent>
						<div>{check ? <h1>BINGO!</h1> : <h1>Not yet BINGO</h1>}</div>
					</DialogContent>
				</Dialog>
				<Button onClick={newCard}>New Card</Button>
			</div>
		</div>
	);
};

export default BingoCard;
