import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { ScmTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TeamScmDetailComponent } from '../../../../../../main/webapp/app/entities/team/team-scm-detail.component';
import { TeamScmService } from '../../../../../../main/webapp/app/entities/team/team-scm.service';
import { TeamScm } from '../../../../../../main/webapp/app/entities/team/team-scm.model';

describe('Component Tests', () => {

    describe('TeamScm Management Detail Component', () => {
        let comp: TeamScmDetailComponent;
        let fixture: ComponentFixture<TeamScmDetailComponent>;
        let service: TeamScmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ScmTestModule],
                declarations: [TeamScmDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TeamScmService,
                    EventManager
                ]
            }).overrideComponent(TeamScmDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeamScmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamScmService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TeamScm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.team).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
