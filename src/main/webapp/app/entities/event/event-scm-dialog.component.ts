import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { EventScm } from './event-scm.model';
import { EventScmPopupService } from './event-scm-popup.service';
import { EventScmService } from './event-scm.service';
import { TeamScm, TeamScmService } from '../team';
import { LocationScm, LocationScmService } from '../location';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-event-scm-dialog',
    templateUrl: './event-scm-dialog.component.html'
})
export class EventScmDialogComponent implements OnInit {

    event: EventScm;
    authorities: any[];
    isSaving: boolean;

    teams: TeamScm[];

    locations: LocationScm[];

    users: User[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventService: EventScmService,
        private teamService: TeamScmService,
        private locationService: LocationScmService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.teamService.query()
            .subscribe((res: ResponseWrapper) => { this.teams = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.locationService.query()
            .subscribe((res: ResponseWrapper) => { this.locations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.event.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventService.update(this.event));
        } else {
            this.subscribeToSaveResponse(
                this.eventService.create(this.event));
        }
    }

    private subscribeToSaveResponse(result: Observable<EventScm>) {
        result.subscribe((res: EventScm) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: EventScm) {
        this.eventManager.broadcast({ name: 'eventListModification', content: 'OK'});
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

    trackTeamById(index: number, item: TeamScm) {
        return item.id;
    }

    trackLocationById(index: number, item: LocationScm) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-event-scm-popup',
    template: ''
})
export class EventScmPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.eventPopupService
                    .open(EventScmDialogComponent, params['id']);
            } else {
                this.modalRef = this.eventPopupService
                    .open(EventScmDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
