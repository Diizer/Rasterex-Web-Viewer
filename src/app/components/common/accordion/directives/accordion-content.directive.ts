import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[accordionContent]',
  standalone: false,
})
export class AccordionContent {
  constructor(public templateRef: TemplateRef<any | unknown>) {}
}
