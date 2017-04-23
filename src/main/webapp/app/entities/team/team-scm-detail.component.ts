import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { TeamScm } from './team-scm.model';
import { TeamScmService } from './team-scm.service';

@Component({
    selector: 'jhi-team-scm-detail',
    templateUrl: './team-scm-detail.component.html'
})
export class TeamScmDetailComponent implements OnInit, OnDestroy {

    team: TeamScm;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private teamService: TeamScmService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['team']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTeams();
    }

    load(id) {
        this.teamService.find(id).subscribe((team) => {
            this.team = team;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe('teamListModification', (response) => this.load(this.team.id));
    }
}
