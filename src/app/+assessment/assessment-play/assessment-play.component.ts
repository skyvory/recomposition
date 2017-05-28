import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { VnService } from '../../vn.service';
import { VndbService } from '../../vndb.service';
import { AssessmentService } from '../../assessment.service';
import { ActiveService } from '../../active.service';
import { ToastService } from '../../toaster/toast.service';
import { TwitterService } from '../../twitter.service';

@Component({
  selector: 'app-assessment-play',
  templateUrl: './assessment-play.component.html',
  styleUrls: ['./assessment-play.component.css']
})
export class AssessmentPlayComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
		private vnService: VnService,
		private vndbService: VndbService,
		private assessmentService: AssessmentService,
		private active: ActiveService,
		private toast: ToastService,
    private twitterService: TwitterService
  ) { }

  @Input() vn;
  @Input() assessment;
  

  ngOnInit() {
  }

  postStatus(status):void {
    this.twitterService.postStatus(status).subscribe(response => {
      console.log("STAT", response);
    });
  }

}
