import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MemberScmComponent } from './member-scm.component';
import { MemberScmDetailComponent } from './member-scm-detail.component';
import { MemberScmPopupComponent } from './member-scm-dialog.component';
import { MemberScmDeletePopupComponent } from './member-scm-delete-dialog.component';

import { Principal } from '../../shared';

export const memberRoute: Routes = [
  {
    path: 'member-scm',
    component: MemberScmComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.member.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'member-scm/:id',
    component: MemberScmDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.member.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const memberPopupRoute: Routes = [
  {
    path: 'member-scm-new',
    component: MemberScmPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.member.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'member-scm/:id/edit',
    component: MemberScmPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.member.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'member-scm/:id/delete',
    component: MemberScmDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.member.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
