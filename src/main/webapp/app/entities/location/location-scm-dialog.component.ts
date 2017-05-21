import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { LocationScm } from './location-scm.model';
import { LocationScmPopupService } from './location-scm-popup.service';
import { LocationScmService } from './location-scm.service';
import { AddressScm, AddressScmService } from '../address';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-location-scm-dialog',
    templateUrl: './location-scm-dialog.component.html'
})
export class LocationScmDialogComponent implements OnInit {

    location: LocationScm;
    authorities: any[];
    isSaving: boolean;

    addresses: AddressScm[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private locationService: LocationScmService,
        private addressService: AddressScmService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.addressService
            .query({filter: 'location-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.location.addressId) {
                    this.addresses = res.json;
                } else {
                    this.addressService
                        .find(this.location.addressId)
                        .subscribe((subRes: AddressScm) => {
                            this.addresses = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(
                this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(
                this.locationService.create(this.location));
        }
    }

    private subscribeToSaveResponse(result: Observable<LocationScm>) {
        result.subscribe((res: LocationScm) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: LocationScm) {
        this.eventManager.broadcast({ name: 'locationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackAddressById(index: number, item: AddressScm) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-location-scm-popup',
    template: ''
})
export class LocationScmPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private locationPopupService: LocationScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.locationPopupService
                    .open(LocationScmDialogComponent, params['id']);
            } else {
                this.modalRef = this.locationPopupService
                    .open(LocationScmDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
