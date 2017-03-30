import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { EventScm } from './event-scm.model';
import { EventScmPopupService } from './event-scm-popup.service';
import { EventScmService } from './event-scm.service';

@Component({
    selector: 'jhi-event-scm-delete-dialog',
    templateUrl: './event-scm-delete-dialog.component.html'
})
export class EventScmDeleteDialogComponent {

    event: EventScm;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private eventService: EventScmService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['event', 'eventType', 'eventState']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.eventService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'eventListModification',
                content: 'Deleted an event'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-event-scm-delete-popup',
    template: ''
})
export class EventScmDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private eventPopupService: EventScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.eventPopupService
                .open(EventScmDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
