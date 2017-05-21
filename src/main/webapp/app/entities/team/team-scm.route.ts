import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TeamScmComponent } from './team-scm.component';
import { TeamScmDetailComponent } from './team-scm-detail.component';
import { TeamScmPopupComponent } from './team-scm-dialog.component';
import { TeamScmDeletePopupComponent } from './team-scm-delete-dialog.component';

import { Principal } from '../../shared';

export const teamRoute: Routes = [
    {
        path: 'team-scm',
        component: TeamScmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'team-scm/:id',
        component: TeamScmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teamPopupRoute: Routes = [
    {
        path: 'team-scm-new',
        component: TeamScmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.team.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'team-scm/:id/edit',
        component: TeamScmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.team.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'team-scm/:id/delete',
        component: TeamScmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'scmApp.team.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
