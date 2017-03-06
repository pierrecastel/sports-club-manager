import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AddressScmComponent } from './address-scm.component';
import { AddressScmDetailComponent } from './address-scm-detail.component';
import { AddressScmPopupComponent } from './address-scm-dialog.component';
import { AddressScmDeletePopupComponent } from './address-scm-delete-dialog.component';

import { Principal } from '../../shared';


export const addressRoute: Routes = [
  {
    path: 'address-scm',
    component: AddressScmComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.address.home.title'
    }
  }, {
    path: 'address-scm/:id',
    component: AddressScmDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.address.home.title'
    }
  }
];

export const addressPopupRoute: Routes = [
  {
    path: 'address-scm-new',
    component: AddressScmPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.address.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'address-scm/:id/edit',
    component: AddressScmPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.address.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'address-scm/:id/delete',
    component: AddressScmDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'scmApp.address.home.title'
    },
    outlet: 'popup'
  }
];
