import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../posts/post.model';


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  

  constructor(private  http: HttpClient ) { }

   url = ' http://localhost:3000/posts ' ;

  getPost() {
   return  this.http.get(this.url);

  }
  postData(post) {
    return this.http.post(this.url, post) ;
  }
 delete(id) {
   return this.http.delete('http://localhost:3000/posts/' + id);
 }
 update(id , newPost) {
   return this.http.put('http://localhost:3000/posts/' + id , newPost )
 }
}
