import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { EventScm } from './event-scm.model';
import { EventScmService } from './event-scm.service';

@Component({
    selector: 'jhi-event-scm-detail',
    templateUrl: './event-scm-detail.component.html'
})
export class EventScmDetailComponent implements OnInit, OnDestroy {

    event: EventScm;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private eventService: EventScmService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['event', 'eventType']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.eventService.find(id).subscribe(event => {
            this.event = event;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
