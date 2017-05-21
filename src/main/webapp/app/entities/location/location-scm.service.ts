import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { LocationScm } from './location-scm.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LocationScmService {

    private resourceUrl = 'api/locations';

    constructor(private http: Http) { }

    create(location: LocationScm): Observable<LocationScm> {
        const copy = this.convert(location);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(location: LocationScm): Observable<LocationScm> {
        const copy = this.convert(location);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<LocationScm> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse);
    }

    private convert(location: LocationScm): LocationScm {
        const copy: LocationScm = Object.assign({}, location);
        return copy;
    }
}
