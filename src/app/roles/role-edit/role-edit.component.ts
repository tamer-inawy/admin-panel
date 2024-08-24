import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Roles } from '../roles.enum';
import { Group } from '../../groups/group.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolesService } from '../roles.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { GroupsService } from '../../groups/groups.service';

@Component({
  selector: 'app-role-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent implements OnInit, OnDestroy {
  @Input({ required: true }) userId!: number;
  @Output() done = new EventEmitter<boolean>();

  allRoles: Roles[];
  groups: Group[] = [];
  form: FormGroup;
  groupsSubscription: Subscription;
  roleServiceSubscription?: Subscription;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RolesService,
    private groupsService: GroupsService,
  ) {

    this.groupsSubscription = this.groupsService.groups$.subscribe(groups => {
      this.groups = groups;
    });

    this.form = this.fb.group({
      role: [null, Validators.required],
      user: [null, Validators.required],
      group: [null, Validators.required],
    });

    this.allRoles = this.roleService.getAllRoles();
  }

  ngOnInit() {
    this.form.controls['user'].setValue(this.userId);

  }

  ngOnDestroy(): void {
    this.groupsSubscription.unsubscribe();
    this.roleServiceSubscription?.unsubscribe();
  }

  onCancelAdding() {
    this.resetForm();
    this.done.emit(false);
  }

  onConfirmAdding() {
    this.isLoading = true;
    this.form.controls['user'].setValue(this.userId);

    this.roleService.add(this.form.value).subscribe({
      next: _ => {
        this.resetForm();
        this.done.emit(true);
      },
      error: err => {
        this.resetForm();
        this.done.emit(false);
        throw new Error(err.message);
      }
    });
  }

  onRoleChange(event: any) {
    if(event.value === Roles.GLOBAL_MANAGER) {
      this.form.get('group')?.reset();
      this.form.get('group')?.disable();
    } else {
      this.form.get('group')?.enable();
    }
  }

  private resetForm() {
    this.isLoading = false;
    this.form.reset();
    this.form.controls['user'].setValue(-1);
  }

}
