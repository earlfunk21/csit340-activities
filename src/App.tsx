import useLyrics from "./LyricsContext";
import { Button } from "./components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "./lib/utils";


function App() {
  
	const { lyrics, lyricsValue } = useLyrics();
	const { state } = useLocation();
	

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

					<Outlet />

        <div className="border-2 rounded-lg w-[600px] h-[400px] overflow-y-auto flex flex-col gap-y-2 p-4">
				{lyrics.map((lyric, index) => (
					<div
						key={index}
						className={cn(
							"w-full p-2 rounded-md text-white",
							lyric.singerType
						)}>
						{lyric.lyrics}
					</div>
				))}
        {lyricsValue && (
						<div className={cn("w-full p-2 rounded-md text-white", state)}>
							{lyricsValue}
						</div>
					)}
			</div>
			</div>
		</div>
	);
}

export default App;
