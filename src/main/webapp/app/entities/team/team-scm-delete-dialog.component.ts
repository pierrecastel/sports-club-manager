import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { TeamScm } from './team-scm.model';
import { TeamScmPopupService } from './team-scm-popup.service';
import { TeamScmService } from './team-scm.service';

@Component({
    selector: 'jhi-team-scm-delete-dialog',
    templateUrl: './team-scm-delete-dialog.component.html'
})
export class TeamScmDeleteDialogComponent {

    team: TeamScm;

    constructor(
        private teamService: TeamScmService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teamService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'teamListModification',
                content: 'Deleted an team'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-team-scm-delete-popup',
    template: ''
})
export class TeamScmDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teamPopupService: TeamScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.teamPopupService
                .open(TeamScmDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
