import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssessmentService } from '../assessment.service';
import { ActivatedRoute, Params, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AssessmentResolve implements Resolve<any> {

  constructor(
    private assessmentService: AssessmentService,
    private route: ActivatedRoute
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = +route.params['assessmentId'];
    return this.assessmentService.getAssessment(id);
  }
}