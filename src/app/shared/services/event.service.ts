import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Events } from '../models/events.model';

const apiUrl = `${environment.apiUrl}/api/auth`;
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Events[]> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/information`
      )
      .pipe(map((response) => response.data));
  }

  getPostByUserId(id: number): Observable<Events> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${`${apiUrl}/information/user`}/${id}`
      )
      .pipe(map((response) => response.data));
  }

  getPostByPostId(id: number): Observable<Events> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${`${apiUrl}/information`}/${id}`
      )
      .pipe(map((response) => response.data));
  }

  createPost(post: Events): Observable<Events> {
    return this.http
      .post<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/information`,
        post
      )
      .pipe(map((response) => response.data));
  }

  updatePost(post: Events): Observable<Events> {
    return this.http
      .put<{ success: boolean; message: string; data: any }>(
        `${`${apiUrl}/information`}/${post.id}`,
        post
      )
      .pipe(map((response) => response.data));
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${`${apiUrl}/information`}/${id}`);
  }
}
