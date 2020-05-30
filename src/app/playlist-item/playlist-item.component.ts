import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Playlist } from '../models/playlist';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent implements OnInit {
  @Input() playlist : Playlist
  @Output("deletePlayListAction") targetedPlayList = new EventEmitter<Playlist>()
  @Output("editPlayListAction") target = new EventEmitter<Playlist>()
  constructor() { }

  ngOnInit() {
  }
  deletePlayList(p){
    this.targetedPlayList.emit(p)
  }
  editPlayList(p){
    this.target.emit(p)
  }
}
