import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { LocationScm } from './location-scm.model';
import { LocationScmPopupService } from './location-scm-popup.service';
import { LocationScmService } from './location-scm.service';

@Component({
    selector: 'jhi-location-scm-delete-dialog',
    templateUrl: './location-scm-delete-dialog.component.html'
})
export class LocationScmDeleteDialogComponent {

    location: LocationScm;

    constructor(
        private locationService: LocationScmService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.locationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'locationListModification',
                content: 'Deleted an location'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-location-scm-delete-popup',
    template: ''
})
export class LocationScmDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private locationPopupService: LocationScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.locationPopupService
                .open(LocationScmDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
