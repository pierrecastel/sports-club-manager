import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventScm } from './event-scm.model';
import { EventScmService } from './event-scm.service';
@Injectable()
export class EventScmPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private eventService: EventScmService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.eventService.find(id).subscribe(event => {
                if (event.date) {
                    event.date = {
                        year: event.date.getFullYear(),
                        month: event.date.getMonth() + 1,
                        day: event.date.getDate()
                    };
                }
                this.eventModalRef(component, event);
            });
        } else {
            return this.eventModalRef(component, new EventScm());
        }
    }

    eventModalRef(component: Component, event: EventScm): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.event = event;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
