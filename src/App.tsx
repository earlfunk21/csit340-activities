import { LyricsProvider } from "./LyricsContext";
import { Button } from "./components/ui/button";
import { Link, Outlet } from "react-router-dom";


function App() {
	

	return (
		<div className="min-h-screen flex justify-center">
			<div className="flex flex-col items-center gap-y-10 pt-16">
				<h1 className="text-4xl font-bold">Complete the Lyrics</h1>
				<div className="flex justify-center gap-4">
					<Button className="bg-purple-500 hover:bg-purple-500/90" asChild onClick={() => console.log("Hello world")}>
						<Link
							to="/singer/first"
							state="bg-purple-500">
							FIRST SINGER
						</Link>
					</Button>
					<Button className="bg-rose-500 hover:bg-rose-500/90" asChild>
						<Link
							to="/singer/second"
							state="bg-rose-500">
							second SINGER
						</Link>
					</Button>
					<Button className="bg-cyan-500 hover:bg-cyan-500/90" asChild>
						<Link
							to="/singer/third"
							state="bg-cyan-500">
							third SINGER
						</Link>
					</Button>
					<Button className="bg-amber-500 hover:bg-amber-500/90" asChild>
						<Link
							to="/singer/fourth"
							state="bg-amber-500">
							fourth SINGER
						</Link>
					</Button>
				</div>

				<LyricsProvider>
					<Outlet />
				</LyricsProvider>
			</div>
		</div>
	);
}

export default App;
