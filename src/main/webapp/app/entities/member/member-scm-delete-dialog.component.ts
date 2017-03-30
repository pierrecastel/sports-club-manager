import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { MemberScm } from './member-scm.model';
import { MemberScmPopupService } from './member-scm-popup.service';
import { MemberScmService } from './member-scm.service';

@Component({
    selector: 'jhi-member-scm-delete-dialog',
    templateUrl: './member-scm-delete-dialog.component.html'
})
export class MemberScmDeleteDialogComponent {

    member: MemberScm;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private memberService: MemberScmService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['member']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.memberService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'memberListModification',
                content: 'Deleted an member'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-member-scm-delete-popup',
    template: ''
})
export class MemberScmDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private memberPopupService: MemberScmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.memberPopupService
                .open(MemberScmDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
