import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { EventScm } from './event-scm.model';
import { EventScmService } from './event-scm.service';

@Component({
    selector: 'jhi-event-scm-detail',
    templateUrl: './event-scm-detail.component.html'
})
export class EventScmDetailComponent implements OnInit, OnDestroy {

    event: EventScm;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private eventService: EventScmService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['event', 'eventType', 'eventState']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEvents();
    }

    load(id) {
        this.eventService.find(id).subscribe((event) => {
            this.event = event;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEvents() {
        this.eventSubscriber = this.eventManager.subscribe('eventListModification', (response) => this.load(this.event.id));
    }
}
