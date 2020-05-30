import { Song } from './song';

export interface Playlist {
    name: string;
    totalDuration: number;
    totalSongs: number;
    description: string;
    songs: Song[];
  }