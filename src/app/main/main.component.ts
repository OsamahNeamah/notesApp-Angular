import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Note } from '../interfaces/note'
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() displayForm: boolean = false
  @Input() SubmitType: string = ''
  @Output() newNote: EventEmitter<string> = new EventEmitter()
  addNote!: FormGroup
  myNote!: Note
  @Input() title:Note['title']=''
  @Input() content:Note['content']=''
  ignoreTitle:boolean = false
  get Title(): FormControl {
    return this.addNote.get('title') as FormControl
  }

  get Content(): FormControl {
    return this.addNote.get('content') as FormControl
  }

  constructor(private builder: FormBuilder, private service: NoteService) { }


  ngOnInit(): void {
    this.addNote = this.builder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      content: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  ngOnChanges(): void {
    if(this.addNote!=undefined){
      this.addNote.reset()
    this.addNote.get('title')?.setValue(this.title)
    this.addNote.get('content')?.setValue(this.content)
    setTimeout(()=>{if(this.addNote.get('title')?.value!=''){this.addNote.get('title')?.disable()}else{this.addNote.get('title')?.enable()}},50)
    }
  }
  Submit() {
    if (this.Title.errors || this.Content.errors) { alert('Cann\'t Add the note, title should be not less than 4 characters and content should be not less than 4 characters'); return }
    else {
      this.myNote = {
        title: this.Title.value,
        content: this.Content.value
      }
      if(this.SubmitType=="Add"){
      this.service.addNote(this.myNote).subscribe((data: any) => { if (data.result == "Your note is created") { this.newNote.emit(this.myNote.title) } })
      this.addNote.reset()
    }
    if(this.SubmitType=="Update"){
      this.addNote.get('title')?.enable()
      this.service.updateNote({"title":this.addNote.get('title')?.value,"content":this.addNote.get('content')?.value}).subscribe(data=>{console.log(data)})
      console.log(this.addNote.value)
    }
    }
  }
}
