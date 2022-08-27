import { Component } from '@angular/core';
import { Note } from './interfaces/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
displayForm:boolean = false
submitText:string =''
newNote:string=''
content:Note['content']=''
title:Note['title']=''
  display(bo:boolean){
    this.displayForm=bo;
  }
  changeFormtype(str:string){
    this.submitText=str
  }
  addnewNote(str:string){
    this.newNote=str
    this.title=''
    this.content=''
  }
  update(ev:Note){
    this.title=ev.title
    this.content=ev.content
  }
}
