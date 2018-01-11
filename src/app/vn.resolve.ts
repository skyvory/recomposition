import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VnService } from './vn.service';

@Injectable()
export class VnResolve implements Resolve<any> {

    constructor(
        private vnService: VnService
    ) { }

    query: any = {
        limit: 12,
        page: 1,
        filter: '',
        total: 0
    };

    resolve(route: ActivatedRouteSnapshot) {

        return this.vnService.getVns(this.query.limit, this.query.page, this.query.filter);
    }
}