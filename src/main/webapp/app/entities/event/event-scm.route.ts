import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { EventScmComponent } from './event-scm.component';
import { EventScmDetailComponent } from './event-scm-detail.component';
import { EventScmPopupComponent } from './event-scm-dialog.component';
import { EventScmDeletePopupComponent } from './event-scm-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class EventScmResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: PaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const eventRoute: Routes = [
    {
        path: 'event-scm',
        component: EventScmComponent,
        resolve: {
            'pagingParams': EventScmResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.event.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'event-scm/:id',
        component: EventScmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.event.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventPopupRoute: Routes = [
    {
        path: 'event-scm-new',
        component: EventScmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-scm/:id/edit',
        component: EventScmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-scm/:id/delete',
        component: EventScmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
