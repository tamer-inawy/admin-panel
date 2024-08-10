import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Role } from '../role.model';
import { Roles } from '../roles.enum';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    TagModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RoleComponent implements OnInit {
  @Input({ required: true }) role!: Role['role'];
  @Input() group?: string;
  label!: string;

  ngOnInit() {
    this.label = (this.group ? `${this.group} / ` : '') + this.role;
  }

  severities: {
    [key: string]: 'danger' | 'info' | 'secondary'
  } = {
      [Roles.GLOBAL_MANAGER]: 'danger',
      [Roles.MANAGER]: 'info',
      [Roles.REGULAR]: 'secondary',
    };
}
