import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  defaultLife = 5000;

  constructor(
    private messageService: MessageService,
  ) { }

  add(message: Message | string = {}) {
    this.messageService.clear();
    const messageObj = (typeof message === 'string') ? { detail: message } : { ...message };

    this.messageService.add({
      life: this.defaultLife,
      severity: 'error',
      summary: 'Error:',
      detail: 'Soemthing went wrong!',
      ...messageObj,
    });
  }

  info(message: Message | string = {}) {
    this.messageService.clear();
    const messageObj = (typeof message === 'string') ? { detail: message } : { ...message };

    this.messageService.add({
      life: this.defaultLife,
      summary: 'Info:',
      ...messageObj,
      severity: 'info',
    });
  }

  success(message: Message | string = {}) {
    this.messageService.clear();
    const messageObj = (typeof message === 'string') ? { detail: message } : { ...message };

    this.messageService.add({
      life: this.defaultLife,
      summary: 'Done:',
      detail: 'Successfully done!',
      ...messageObj,
      severity: 'success',
    });
  }

  warn(message: Message | string = {}) {
    this.messageService.clear();
    const messageObj = (typeof message === 'string') ? { detail: message } : { ...message };

    this.messageService.add({
      life: this.defaultLife,
      summary: 'Warning:',
      ...messageObj,
      severity: 'warn',
    });
  }

  error(message: Message | string = {}) {
    this.messageService.clear();
    const messageObj = (typeof message === 'string') ? { detail: message } : { ...message };

    this.messageService.add({
      life: this.defaultLife,
      summary: 'Error:',
      detail: 'Soemthing went wrong!',
      ...messageObj,
      severity: 'error',
    });
  }

  secondary(message: Message | string = {}) {
    this.messageService.clear();
    const messageObj = (typeof message === 'string') ? { detail: message } : { ...message };

    this.messageService.add({
      life: this.defaultLife,
      ...messageObj,
      severity: 'secondary',
    });
  }

  contrast(message: Message | string = {}) {
    this.messageService.clear();
    const messageObj = (typeof message === 'string') ? { detail: message } : { ...message };

    this.messageService.add({
      life: this.defaultLife,
      ...messageObj,
      severity: 'contrast',
    });
  }

}
