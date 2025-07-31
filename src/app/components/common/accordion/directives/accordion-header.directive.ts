import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[accordionHeader]',
  standalone: false,
})
export class AccordionHeader {
  constructor(public templateRef: TemplateRef<any>) {}
}
