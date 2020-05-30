import { Component, OnInit, Input, Output,EventEmitter, Inject } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup, FormArray, Form} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Playlist } from '../models/playlist';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from '../models/song';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.css']
})
export class PlaylistDialogComponent implements OnInit {
  requiredControl = new FormControl('', [
    Validators.required,
  ]);
  targetPlaylist = {} as Playlist
  matcher = new MyErrorStateMatcher();
  playlistForm : FormGroup 
  songs:FormArray
  @Output() returnedPlayList = new EventEmitter<Playlist>()
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
  ngOnInit() {
    if(this.data && this.data.target){
      this.playlistForm = this.formBuilder.group({
        name:  new FormControl(this.data.target.name,[Validators.required]),
        description:  new FormControl(this.data.target.description,[Validators.required]),
        totalSongs : this.data.target.totalSongs,
        totalDuration : this.data.target.totalDuration,
        songs: this.formBuilder.array(this.createFilledItems(this.data.target.songs))
      });
      this.songs = this.playlistForm.get('songs') as FormArray
    }
    else{
    this.playlistForm = this.formBuilder.group({
      name:  new FormControl('',[Validators.required]),
      description:  new FormControl('',[Validators.required]),
      songs: this.formBuilder.array([ this.createItem() ])
    });
  }
  } 

  createFilledItems(songs: Song[]): FormGroup[] {
    let res: FormGroup[] = []
    songs.forEach(element => {
      res.push(this.formBuilder.group({
        title: new FormControl(element.title, [Validators.required]),
        artist: new FormControl(element.artist, [Validators.required]),
        duration: new FormControl(element.duration, [Validators.min(1)])
      }))
    });
    return res
  }
  createItem(): FormGroup {
     return this.formBuilder.group({
      title: new FormControl('',[Validators.required]),
      artist: new FormControl('',[Validators.required]),
      duration:  new FormControl('0',[Validators.min(1)])
    });
  }
  
  addItem(): void {
    this.songs = this.playlistForm.get('songs') as FormArray;
    this.songs.push(this.createItem());
  } 
  deleteItem(i){
    this.songs.removeAt(i)
  }
  // returning the form value after exiting the modal
  returnFormValueResult(){
    let result : Playlist = this.playlistForm.value
    
    return result
  }

}
