import { Component, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/services/post-service.service';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  
  constructor(public postServ: PostServiceService) { }

  ngOnInit() {

  }

}
