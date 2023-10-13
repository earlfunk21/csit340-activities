import React, { useEffect } from "react";
import { Input } from "./components/ui/input";
import useLyrics from "./LyricsContext";
import { cn } from "./lib/utils";
import { useLocation, useParams } from "react-router-dom";
import { LyricsType } from "./types";

const Singer = () => {
	const [lyricsValue, setLyricsValue] = React.useState("");
  const [singerType, setSingerType] = React.useState(null)
	const { lyrics, addLyrics } = useLyrics();
	const { singer } = useParams();
	const { state } = useLocation();

	useEffect(() => {
    if(lyricsValue && singerType)
    {
      const newLyrics: LyricsType = { lyrics: lyricsValue, singerType: singerType }
		  addLyrics(newLyrics);
      setLyricsValue("");
    }
    setSingerType(state)
	}, [singer]);

	return (
		<>
			<Input
				onChange={e => setLyricsValue(e.target.value)}
        autoFocus
				value={lyricsValue}
			/>
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
		</>
	);
};

export default Singer;
