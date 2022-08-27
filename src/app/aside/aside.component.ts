import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  Notes!: string[]
  content:string=''
  @Input() newNote:string=''
  @Output() display: EventEmitter<boolean> = new EventEmitter()
  @Output() submitText: EventEmitter<string> = new EventEmitter()
  @Output() noteToUpdate: EventEmitter<object> = new EventEmitter()
  constructor(private service: NoteService) { }

  ngOnInit(): void {
    let newNotes:string[]=[];
    this.service.getNotes().subscribe((data: any) => {
      data.result.forEach((element: string) => {
        newNotes.push(element.slice(0, element.length - 4))
      });
      this.Notes=newNotes
    })
  }

  ngOnChanges(): void {
    if(this.Notes){
    this.Notes.push(this.newNote)
    }
  }

  displayAddForm() {
    this.display.emit(true)
    this.submitText.emit("Add")
    this.noteToUpdate.emit({'title':'','content':''})
  }

  displayEditForm(note:string) {
    this.display.emit(true)
    this.submitText.emit("Update")
    this.service.getNote(note).subscribe((data:any)=>{this.content=data.result})
    setTimeout(()=>{this.noteToUpdate.emit({'title':note,'content':this.content})},750)
  }

  deleteNote(note:string){
    let newNotes: string[]=[]
    this.service.deleteNote(note).subscribe((data:any)=>{if(data.result=="Note deleted"){
      this.Notes.forEach(oldnote=>{
        if(oldnote==note){}
        else{
          newNotes.push(oldnote)
        }
      })
      this.Notes=newNotes
    }})
    this.noteToUpdate.emit({'title':'','content':''})
  }

}
