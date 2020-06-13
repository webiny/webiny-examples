import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import gql from 'graphql-tag'

const BLOG_QUERY = gql`
  query listBlogs {
    listBlogs {
        data {
          id
          title
          author
          description
          topic
          url  
        }
    }
  }
`;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs: any = [];
  loading: boolean = true;

  constructor(
    private apollo: Apollo,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "angular",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/angular.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "webiny",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/webiny.svg")
    );
  }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: BLOG_QUERY
    })
      .valueChanges
      .pipe(
        map(result => result.data.listBlogs.data)
      ).subscribe(res => {
        this.blogs = res
        this.loading = false
      })
  }
}
