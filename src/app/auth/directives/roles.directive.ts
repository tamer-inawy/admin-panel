import { Directive, Input, TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../users/user.model';
import { Role } from '../../roles/role.model';
import { Roles } from '../../roles/roles.enum';

@Directive({
  selector: '[appRoles]',
  standalone: true
})
export class RolesDirective {
  @Input() groupId?: number;

  @Input()
  set appRoles(allowedRoles: Roles[]) {
    this.authService.user$.subscribe((user) => {
      this.userRoles = this.groupId ? user?.roles.filter(r => r.group === this.groupId) : user?.roles;
      this.switchView(allowedRoles);
    })
  }

  userRoles?: Role[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private authService: AuthService,
  ) { }

  switchView(allowedRoles: Roles[]) {
    if (
      this.userRoles?.some(
        ({ role }) => role === Roles.GLOBAL_MANAGER || allowedRoles.includes(role)
      )
    ) {
      this.show();
    } else {
      this.remove();

    }

  }


  disable(): void {
    this.viewContainerRef.clear();
    const viewRootElement: HTMLElement = this.viewContainerRef.createEmbeddedView(
      this.templateRef
    ).rootNodes[0];
    viewRootElement.setAttribute('style', 'background-color: grey');
    this.renderer.setProperty(viewRootElement, 'disabled', true);
  }

  enable(): void {
    this.viewContainerRef.clear();
    const viewRootElement: HTMLElement = this.viewContainerRef.createEmbeddedView(
      this.templateRef
    ).rootNodes[0];
    this.renderer.setProperty(viewRootElement, 'disabled', false);
  }

  remove(): void {
    this.viewContainerRef.clear();
  }

  show(): void {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(
      this.templateRef
    ).rootNodes[0];
  }

}
