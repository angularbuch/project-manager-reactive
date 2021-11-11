import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IfNotBacklogThanAssigneeValidatorDirective, EmailValidatorDirective } from "./custom-validators";

@NgModule({
    imports: [CommonModule],
    declarations: [
        IfNotBacklogThanAssigneeValidatorDirective,
        EmailValidatorDirective
    ],
    exports: [
        IfNotBacklogThanAssigneeValidatorDirective,
        EmailValidatorDirective
    ]
})
export class CustomValidatorsModule {
}