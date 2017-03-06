import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
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
                declarations: [EventScmDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    EventScmService
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
