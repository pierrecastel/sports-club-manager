import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { ScmTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EventScmDetailComponent } from '../../../../../../main/webapp/app/entities/event/event-scm-detail.component';
import { EventScmService } from '../../../../../../main/webapp/app/entities/event/event-scm.service';
import { EventScm } from '../../../../../../main/webapp/app/entities/event/event-scm.model';

describe('Component Tests', () => {

    describe('EventScm Management Detail Component', () => {
        let comp: EventScmDetailComponent;
        let fixture: ComponentFixture<EventScmDetailComponent>;
        let service: EventScmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ScmTestModule],
                declarations: [EventScmDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EventScmService,
                    EventManager
                ]
            }).overrideComponent(EventScmDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventScmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventScmService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EventScm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.event).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
