import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";

function App() {
	const [bcode, setBcode] = useState<string>("");

	return (
		<div className="flex min-h-screen flex-col items-center gap-y-10 p-24">
			<h1>Enter your bingo code here</h1>
			<Input
				type="text"
				placeholder="Bingo Code"
				className="w-fit"
				onChange={e => setBcode(e.target.value)}
				value={bcode}
			/>
			<Button
				className="bg-indigo-500"
				asChild>
				<Link to={bcode}>Get Card</Link>
			</Button>
		</div>
	);
}

export default App;
