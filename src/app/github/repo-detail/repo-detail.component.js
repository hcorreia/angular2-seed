import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GithubService} from '../shared/github.service';

@Component({
  selector: 'repo-detail',
  styleUrls: ['./repo-detail.component.css'],
  templateUrl: './repo-detail.component.html'
})
export class RepoDetailComponent implements OnInit {
  org: string;
  repo: string;
  repoDetails: any = {};

  static get parameters() {
    return [[GithubService], [ActivatedRoute]];
  }
  constructor(github: GithubService, route: ActivatedRoute) {
    this.github = github;
    this.route = route;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.org = this.route.snapshot.parent.params['org'];
      this.repo = params['repo'] || '';

      if (this.repo) {
        this.github.getRepoForOrg(this.org, this.repo)
          .subscribe(repoDetails => {
            this.repoDetails = repoDetails;
          });
      }
    });
  }
}
