import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { MemberScm } from './member-scm.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MemberScmService {

    private resourceUrl = 'api/members';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(member: MemberScm): Observable<MemberScm> {
        const copy = this.convert(member);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(member: MemberScm): Observable<MemberScm> {
        const copy = this.convert(member);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<MemberScm> {
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
        entity.birthDate = this.dateUtils
            .convertLocalDateFromServer(entity.birthDate);
    }

    private convert(member: MemberScm): MemberScm {
        const copy: MemberScm = Object.assign({}, member);
        copy.birthDate = this.dateUtils
            .convertLocalDateToServer(member.birthDate);
        return copy;
    }
}
