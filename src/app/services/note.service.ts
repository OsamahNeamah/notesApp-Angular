import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseURL: string = 'http://localhost:5000';


  constructor(private http:HttpClient) { }

  addNote(note:Note):Observable<object> {
    const {title,content} = note
    return <any>this.http.post(`${this.baseURL}/addNote/`,{title,content}).pipe(
      map(data => {
        return data
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
  getNotes():Observable<object> {
    return <any>this.http.get(`${this.baseURL}/getNotes/`).pipe(
      map(data => {
        return data
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  deleteNote(note:string):Observable<object> {
    let myNote=note
    return <any>this.http.delete(`${this.baseURL}/deleteNote/title=${myNote}`).pipe(
      map(data => {
        return data
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
  getNote(note:string):Observable<object> {
    let myNote=note
    return <any>this.http.get(`${this.baseURL}/getNote/title=${myNote}`).pipe(
      map(data => {
        return data
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
  updateNote(note:Note):Observable<object> {
    let myNote=note
    return <any>this.http.post(`${this.baseURL}/updateNote/`,myNote).pipe(
      map(data => {
        return data
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
}
