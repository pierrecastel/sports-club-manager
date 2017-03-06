import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { EventScm } from './event-scm.model';
import { EventScmPopupService } from './event-scm-popup.service';
import { EventScmService } from './event-scm.service';
import { TeamScm, TeamScmService } from '../team';
import { User, UserService } from '../../shared';
@Component({
    selector: 'jhi-event-scm-dialog',
    templateUrl: './event-scm-dialog.component.html'
})
export class EventScmDialogComponent implements OnInit {

    event: EventScm;
    authorities: any[];
    isSaving: boolean;

    teams: TeamScm[];

    users: User[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private eventService: EventScmService,
        private teamService: TeamScmService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['event', 'eventType']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.teamService.query().subscribe(
            (res: Response) => { this.teams = res.json(); }, (res: Response) => this.onError(res.json()));
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.event.id !== undefined) {
            this.eventService.update(this.event)
                .subscribe((res: EventScm) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.eventService.create(this.event)
                .subscribe((res: EventScm) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: EventScm) {
        this.eventManager.broadcast({ name: 'eventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackTeamById(index: number, item: TeamScm) {
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

    constructor (
        private route: ActivatedRoute,
        private eventPopupService: EventScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
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
