import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../services/post-service.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts : any ;
  title = '';
 description = '' ;
  constructor(public postServ: PostServiceService) {

   }

  ngOnInit() {
    this.postServ.getPost().subscribe(res => {
       this.posts = res ;
    }) ; 
  }
  onClick() {
   const  Post = { title: this.title , description: this.description};
   this.postServ.postData(Post).subscribe( () => {
     this.posts.splice(0, 0, Post) ;
     this.title = '' ;
     this.description = '' ;
     this.postServ.getPost().subscribe( re => {
      this.posts = re ; }) ;
     
  }) ;
}
   
   deletepost(id) {
  this.postServ.delete(id).subscribe(res => {
   let index = this.posts.indexOf(id) ;
   res = this.posts.splice(1 , index) ;
   this.postServ.getPost().subscribe( re => {
    this.posts = re ; }) ;
 
  });
}
updatePost(id) {
  const updatedPost = { title: this.title , description: this.description};
  this.postServ.update(id, updatedPost).subscribe(res => {
    this.postServ.getPost().subscribe( re => {
      this.posts = re ; }) ;
    this.title = '' ;
    this.description = '' ;
}) ;
 
}
}
