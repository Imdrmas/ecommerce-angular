import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/modal/Modal';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }

  addCommentToProduct(comment: Comment, idProduct: number): Observable<Comment> {
    return this.http.post<Comment>(`http://localhost:8080/api/addCommentToProduct/${idProduct}`, comment);
  }
  editComment(comment: Comment, id: number): Observable<Comment> {
    return this.http.put<Comment>(`http://localhost:8080/api/editComment/${id}`, comment);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.http.delete<Comment>(`http://localhost:8080/api/deleteComment/${id}`);
  }

  findCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`http://localhost:8080/api/findCommentById/${id}`);
  }

  findAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`http://localhost:8080/api/findAllComments`);
  }

  findCommentsForProduct(idProduct: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`http://localhost:8080/api/findCommentsForProduct/${idProduct}`);
  }
}
