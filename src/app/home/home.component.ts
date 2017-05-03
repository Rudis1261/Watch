import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from '../keys-pipe.component';
import { LimitToPipe } from '../limit-to.pipe';
import { LoadscriptService } from '../loadscript.service';
import { AngularFire } from 'angularfire2';

declare var videojs: any;
declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loaded: boolean = false;
  configLoaded: boolean = false;
  data: any;
  deleted: any;
  originalData: any;
  offset = [];
  level = 0;
  siteUrl: string;
  folderKey: string;
  pathKey: string = '';
  videoPlayer: any;
  directoryFeed: any;
  videoSrcUrl = "";
  searchTerm = "";
  unlinkState = {};
  config: any = false;
  auth: any = false;
  charLimit = 40;
  playing = false;
  currentFile:any = false;
  currentFileSrc:any = false;
  deleteRef: any;
  usage: any;

  constructor(private ls: LoadscriptService, private af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if(auth && auth.auth) {
        this.auth = auth.auth;
        this.getDirectoryListing();

        this.deleteRef = this.af.database.list('/delete');

        this.af.database.object('/config').subscribe((data) => {
          this.siteUrl = data.siteUrl;
          this.folderKey = data.folderKey;
          this.configLoaded = true;
        });

        this.af.database.object('/usage').subscribe((data) => {
          this.usage = data;
        });

        this.deleteRef.subscribe((data) => {
          this.deleted = data;
          //console.log(this.deleted);
        });
      }
    });
  };

  loadVideo(video): void {
    this.currentFile = this.decode(video);
    this.currentFileSrc = String(this.siteUrl) + String(this.pathKey) + "/" + String(video);

    setTimeout(() => {
      this.videoPlayer = videojs('video-js');
      this.videoPlayer.src({
        "type": "video/mp4",
        "src": this.currentFileSrc
      });
    }, 200);
  }

  setFolder(folder) {
    this.pathKey += "/" + this.decode(folder.key);
    this.data = this.data[folder.key];
  }

  decode(string) {
    return window.decodeURIComponent(string);
  }

  encode(string) {
    return window.encodeURIComponent(string).replace(/\./g, '%2E');
  }

  delete(video) {
    if (!this.deleteRef) return false;
    //console.log(String(this.pathKey) + "/" + String(video));
    this.deleteRef.push(String(this.pathKey) + "/" + String(video));
  }

  isDeleted(filename) {
    if (!filename || !this.deleted || this.deleted.length == 0) {
      return false;
    }

    filename = String(this.pathKey) + "/" + String(filename);
    return this.deleted.filter(file => file.$value === filename).length > 0;
  }

  refresh(): void {
    this.pathKey = "";
    this.currentFile = false;
    this.currentFileSrc = false;
    this.data = this.originalData;
    this.getDirectoryListing();
  }

  getDirectoryListing(): void {
    this.directoryFeed = this.af.database.object('/videos');
    this.directoryFeed.subscribe((data) => {
      //console.log(data);
      this.data = data;
      this.originalData = data;
    });
  }

  ngOnInit(): void {}
}
