
import { ModuleWithProviders, NgModule } from "@angular/core";
import { MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
@NgModule({
    imports: [
        MatCardModule
    ],
    exports: [
        MatCardModule
    ],
    providers: [
    ]
})
export class MaterialModule {
    constructor(public matIconRegistry: MatIconRegistry) {
        matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MaterialModule,
            providers: [MatIconRegistry]
        };
    }
}
