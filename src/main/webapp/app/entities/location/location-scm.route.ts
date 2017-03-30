import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LocationScmComponent } from './location-scm.component';
import { LocationScmDetailComponent } from './location-scm-detail.component';
import { LocationScmPopupComponent } from './location-scm-dialog.component';
import { LocationScmDeletePopupComponent } from './location-scm-delete-dialog.component';

import { Principal } from '../../shared';


export const locationRoute: Routes = [
  {
    path: 'location-scm',
    component: LocationScmComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.location.home.title'
    }
  }, {
    path: 'location-scm/:id',
    component: LocationScmDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.location.home.title'
    }
  }
];

export const locationPopupRoute: Routes = [
  {
    path: 'location-scm-new',
    component: LocationScmPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.location.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'location-scm/:id/edit',
    component: LocationScmPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.location.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'location-scm/:id/delete',
    component: LocationScmDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.location.home.title'
    },
    outlet: 'popup'
  }
];
