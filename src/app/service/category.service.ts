import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../modal/Modal';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategoryToUser(category: Category, idUser: number): Observable<Category> {
    return this.http.post<Category>(`http://localhost:8080/api/addCategoryToUser/${idUser}`, category);
  }
  editCategory(category: Category, id: number): Observable<Category> {
    return this.http.put<Category>(`http://localhost:8080/api/editCategory/${id}`, category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`http://localhost:8080/api/deleteCategory/${id}`);
  }

  findCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`http://localhost:8080/api/findCategoryById/${id}`);
  }

  findAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8080/api/findAllCategories`);
  }

  findCategoriesForUser(idUser: number): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8080/api/findCategoriesForUser/${idUser}`);
  }
}
