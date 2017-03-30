import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { TeamScm } from './team-scm.model';
import { TeamScmService } from './team-scm.service';

@Component({
    selector: 'jhi-team-scm-detail',
    templateUrl: './team-scm-detail.component.html'
})
export class TeamScmDetailComponent implements OnInit, OnDestroy {

    team: TeamScm;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private teamService: TeamScmService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['team']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.teamService.find(id).subscribe(team => {
            this.team = team;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
