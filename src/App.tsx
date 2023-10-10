import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { cn } from "./lib/utils";

enum SingerType {
	FIRST = "bg-purple-500",
	SECOND = "bg-rose-500",
	THIRD = "bg-cyan-500",
	FOURTH = "bg-amber-500",
}

type LyricsType = {
	singerType: SingerType;
	lyrics: string;
};

function App() {
	const [focus, setFocus] = useState(false);
	const [lyrics, setLyrics] = useState<LyricsType[]>([]);
	const [lyricsValue, setLyricsValue] = useState("");
	const [singerType, setSingerType] = useState<SingerType | null>(null);

	const setSingerTypeHandler = (newSingerType: SingerType) => {
		if (lyricsValue && singerType) {
			setLyrics(prev => [
				...prev,
				{ singerType: singerType, lyrics: lyricsValue },
			]);
			setLyricsValue("");
		}
		setSingerType(newSingerType);
		setFocus(true);
	};

	return (
		<div className="min-h-screen flex justify-center">
			<div className="flex flex-col items-center gap-y-10 pt-16">
				<h1 className="text-4xl font-bold">Complete the Lyrics</h1>
				<div className="flex justify-center gap-4">
					<Button
						className="bg-purple-500 hover:bg-purple-500/90"
						onClick={() => setSingerTypeHandler(SingerType.FIRST)}>
						FIRST SINGER
					</Button>
					<Button
						className="bg-rose-500 hover:bg-rose-500/90"
						onClick={() => setSingerTypeHandler(SingerType.SECOND)}>
						SECOND SINGER
					</Button>
					<Button
						className="bg-cyan-500 hover:bg-cyan-500/90"
						onClick={() => setSingerTypeHandler(SingerType.THIRD)}>
						THIRD SINGER
					</Button>
					<Button
						className="bg-amber-500 hover:bg-amber-500/90"
						onClick={() => setSingerTypeHandler(SingerType.FOURTH)}>
						FOURTH SINGER
					</Button>
				</div>
				{focus && (
					<Input
						onChange={e => setLyricsValue(e.target.value)}
						value={lyricsValue}
					/>
				)}
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
						<div className={cn("w-full p-2 rounded-md text-white", singerType)}>
							{lyricsValue}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
