import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  posts;

  constructor(
    private db: DbService
  ) { }

  async ngOnInit() {
    this.posts = await this.db.getPosts();
  }

}
