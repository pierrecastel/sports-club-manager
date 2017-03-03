import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScmSharedModule } from '../../shared';

import {
    AddressScmService,
    AddressScmPopupService,
    AddressScmComponent,
    AddressScmDetailComponent,
    AddressScmDialogComponent,
    AddressScmPopupComponent,
    AddressScmDeletePopupComponent,
    AddressScmDeleteDialogComponent,
    addressRoute,
    addressPopupRoute,
} from './';

let ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute,
];

@NgModule({
    imports: [
        ScmSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AddressScmComponent,
        AddressScmDetailComponent,
        AddressScmDialogComponent,
        AddressScmDeleteDialogComponent,
        AddressScmPopupComponent,
        AddressScmDeletePopupComponent,
    ],
    entryComponents: [
        AddressScmComponent,
        AddressScmDialogComponent,
        AddressScmPopupComponent,
        AddressScmDeleteDialogComponent,
        AddressScmDeletePopupComponent,
    ],
    providers: [
        AddressScmService,
        AddressScmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScmAddressScmModule {}
