import React from "react";
import { LyricsContextType, LyricsType } from "./types";


const defaultLyricsValues = {
  lyrics: [],
  addLyrics: () => {},
  setLyricsValue: () => {},
  lyricsValue: ""
}

export const LyricsContext = React.createContext<LyricsContextType>(defaultLyricsValues);


export const LyricsProvider = ({ children }: { children: React.ReactNode }) => {
	const [lyrics, setLyrics] = React.useState<LyricsType[]>([]);
  const [lyricsValue, setLyricsValue] = React.useState<string>("");

	const addLyrics = (lyrics: LyricsType) => {
		setLyrics(prev => [...prev, lyrics]);
	};

	return (
		<LyricsContext.Provider value={{ lyrics, addLyrics, lyricsValue, setLyricsValue }}>
			{children}
		</LyricsContext.Provider>
	);
};

const useLyrics = () => {
  return React.useContext(LyricsContext);
}

export default useLyrics;