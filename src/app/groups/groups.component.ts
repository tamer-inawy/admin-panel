import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

import { Group } from './group.model';
import { GroupsService } from './groups.service';
import { RolesDirective } from '../auth/directives/roles.directive';
import { MessagesService } from '../utilities/services/messages.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    TooltipModule,
    RolesDirective,
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnDestroy {
  groups: Group[] = [];

  isDeleting = false;
  deletingId?: number | null;

  isEditing = false;
  editingId?: number | null;
  form: FormGroup;

  groupsServiceSubscription: Subscription;

  constructor(
    private groupsService: GroupsService,
    private fb: FormBuilder,
    private messagesService: MessagesService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    this.groupsServiceSubscription = this.groupsService.groups$.subscribe(groups => {
      this.groups = groups;
    });
  }

  ngOnDestroy(): void {
    this.groupsServiceSubscription.unsubscribe();
  }

  onDelete(id: number) {
    this.isDeleting = true;
    this.deletingId = id;
  }

  onCancelDeleting() {
    this.isDeleting = false;
  }

  onConfirmDeleting() {
    let sub: Subscription;
    this.deletingId && (sub = this.groupsService.delete(this.deletingId).subscribe({
      next: data => {
        this.isDeleting = false;
        this.messagesService.success('Deleted successfully!');
        sub.unsubscribe();
      }
    }));
  }

  onHideDeleting() {
    this.deletingId = null;
  }


  onEdit(id: number | null = null) {
    this.isEditing = true;
    if (id) {
      this.editingId = id;
      const group = this.groups.find(group => group.id === this.editingId);
      this.form.get('name')?.setValue(group?.name);
    }
  }

  onCancelEditing() {
    this.isEditing = false;
  }

  onConfirmEditing() {
    const { name } = <{ 'name': string }>this.form.value;

    let groupSubscription = this.editingId ?
      this.groupsService.edit(this.editingId, name).subscribe(_ => {
        this.isEditing = false;
        this.messagesService.success('Updated successfully!');
        groupSubscription.unsubscribe();
      }) :
      this.groupsService.add(name).subscribe(_ => {
        this.isEditing = false;
        this.messagesService.success('Updated successfully!');
        groupSubscription.unsubscribe();
      });
  }

  onHideEditing() {
    this.editingId = null;
    this.form.reset();
  }

}
