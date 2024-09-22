import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { EventImage, Events } from '../models/events.model';

const apiUrl = `${environment.apiUrl}/api/auth`;
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getPosts(page: number, pageSize: number, category: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('pageSize', pageSize.toString());
    params = params.set('page', page.toString());
    params = params.set('category', category.toString());
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/information`,
        { params }
      )
      .pipe(map((response) => response));
  }
  getPubPosts(
    page: number,
    pageSize: number,
    category: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.set('pageSize', pageSize.toString());
    params = params.set('page', page.toString());
    params = params.set('category', category.toString());
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${environment.apiUrl}/api/auth/pub-information`,
        { params }
      )
      .pipe(map((response) => response));
  }

  // getPosts(): Observable<Events[]> {
  //   return this.http
  //     .get<{ success: boolean; message: string; data: any }>(
  //       `${apiUrl}/information`
  //     )
  //     .pipe(map((response) => response.data));
  // }

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

  createPost(post: any): Observable<Events> {
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

  insertImage(image: any): Observable<EventImage> {
    return this.http
      .post<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/eventImages`,
        image
      )
      .pipe(map((response) => response.data));
  }
  getImageByPostId(): Observable<EventImage> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/eventImages/information`
      )
      .pipe(map((response) => response.data));
  }
  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${`${apiUrl}/eventImages`}/${id}`);
  }
}
