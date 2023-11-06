export enum SingerType {
	FIRST = "bg-purple-500",
	SECOND = "bg-rose-500",
	THIRD = "bg-cyan-500",
	FOURTH = "bg-amber-500",
}

export type LyricsType = {
	singerType: SingerType;
	lyrics: string;
};

export type LyricsContextType = {
  lyrics: LyricsType[];
  addLyrics: (lyrics: LyricsType) => void;
  setLyricsValue: (lyrics: string) => void;
  lyricsValue: string;
}