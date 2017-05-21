import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { EventScm } from './event-scm.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EventScmService {

    private resourceUrl = 'api/events';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(event: EventScm): Observable<EventScm> {
        const copy = this.convert(event);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(event: EventScm): Observable<EventScm> {
        const copy = this.convert(event);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<EventScm> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse);
    }

    private convertItemFromServer(entity: any) {
        entity.date = this.dateUtils
            .convertLocalDateFromServer(entity.date);
    }

    private convert(event: EventScm): EventScm {
        const copy: EventScm = Object.assign({}, event);
        copy.date = this.dateUtils
            .convertLocalDateToServer(event.date);
        return copy;
    }
}
