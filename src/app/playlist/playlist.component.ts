import { Component, OnInit } from '@angular/core';
import { Playlist } from '../models/playlist';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDialogComponent } from '../playlist-dialog/playlist-dialog.component'
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlists: Playlist[] = [
    {
      name: 'Kopikustik',
      totalDuration: 5,
      totalSongs: 2,
      description: 'More than a coffee, this is all of your favorite accoustic songs.',
      songs: [
        {
          title: 'Cigarettes of ours',
          artist: 'Ardhito Pramono',
          duration: 3
        },
        {
          title: 'Walking Back Home',
          artist: 'Vira Talisa',
          duration: 2
        },
      ]
    },
    {
      name: 'Anime Hits',
      totalDuration: 13,
      totalSongs: 3,
      description: 'Listen to your favorite Anime songs, all in one playlist.',
      songs: [
        {
          title: 'Renai Circulation',
          artist: 'Kana Hanazawa',
          duration: 4
        },
        {
          title: 'Platinum Disco',
          artist: 'Tsukihi Phoenix',
          duration: 4
        },
        {
          title: 'Silhouette',
          artist: 'KANA-BOON',
          duration: 5
        },
      ]
    }
  ];
  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  addPlaylist() {
    const dialogRef = this.dialog.open(PlaylistDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      result.totalDuration = 0
      result.songs.forEach(element=>{
        result.totalDuration += Number(element.duration)
      })
      result.totalSongs = 0
      result.totalSongs = Number(result.songs.length)
      this.playlists.push(result)
    });
  }
  deletePlayList(event){
    const index: number = this.playlists.indexOf(event);
      if (index !== -1) {
          this.playlists.splice(index, 1);
      }      
  }
  editPlayList(event,i){
    const dialogRef = this.dialog.open(PlaylistDialogComponent,{
      data:{
        target : event
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      result.totalDuration = 0
      result.songs.forEach(element=>{
        result.totalDuration += Number(element.duration)
      })
      result.totalSongs = 0
      result.totalSongs = Number(result.songs.length)
      this.playlists[i] = result
    });
  }
}
