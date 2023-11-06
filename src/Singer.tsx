import React, { useEffect } from "react";
import { Input } from "./components/ui/input";
import useLyrics from "./LyricsContext";
import { useLocation, useParams } from "react-router-dom";
import { LyricsType } from "./types";

const Singer = () => {
  const [singerType, setSingerType] = React.useState(null)
	const { addLyrics, setLyricsValue, lyricsValue } = useLyrics();
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
			
		</>
	);
};

export default Singer;
