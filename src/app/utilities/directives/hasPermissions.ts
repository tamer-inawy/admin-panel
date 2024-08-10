import { Directive, Input, TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { PermissionOptions } from './model/permissionOptions.interface';
import { PermissionService } from './permission.service';

@Directive({
  selector: '[appHasPermissions]'
})

export class HasPermissionsDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private permissionService: PermissionService
  ) { }

  @Input()
  set appHasPermissions(userPermission : string[]) {
    this.permissionService.event$.subscribe((userPermission: string[]) => {
      this.decideView(userPermission);
    })
    this.decideView(userPermission);
  }

  decideView(value: string[]) {
   // your business logic to call the functions
  }

  disableComponent(): void {
    this.viewContainerRef.clear();
    const viewRootElement : HTMLElement = this.viewContainerRef.createEmbeddedView(
      this.templateRef
    ).rootNodes[0];
    viewRootElement.setAttribute('style', 'background-color: grey');
    this.renderer.setProperty(viewRootElement, 'disabled', true);
  }

  enableComponent(): void {
    this.viewContainerRef.clear();
    const viewRootElement : HTMLElement = this.viewContainerRef.createEmbeddedView(
      this.templateRef
    ).rootNodes[0];
    this.renderer.setProperty(viewRootElement, 'disabled', false);
  }

  removeComponent(): void {
    this.viewContainerRef.clear();
  }

  showComponent(): void {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(
      this.templateRef
    ).rootNodes[0];
  }

}