import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { TeamScm } from './team-scm.model';
import { TeamScmPopupService } from './team-scm-popup.service';
import { TeamScmService } from './team-scm.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-team-scm-dialog',
    templateUrl: './team-scm-dialog.component.html'
})
export class TeamScmDialogComponent implements OnInit {

    team: TeamScm;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private teamService: TeamScmService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.team.id !== undefined) {
            this.subscribeToSaveResponse(
                this.teamService.update(this.team));
        } else {
            this.subscribeToSaveResponse(
                this.teamService.create(this.team));
        }
    }

    private subscribeToSaveResponse(result: Observable<TeamScm>) {
        result.subscribe((res: TeamScm) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: TeamScm) {
        this.eventManager.broadcast({ name: 'teamListModification', content: 'OK'});
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
    selector: 'jhi-team-scm-popup',
    template: ''
})
export class TeamScmPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teamPopupService: TeamScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.teamPopupService
                    .open(TeamScmDialogComponent, params['id']);
            } else {
                this.modalRef = this.teamPopupService
                    .open(TeamScmDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
