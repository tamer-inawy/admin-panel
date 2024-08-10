import { ErrorHandler, Injectable, isDevMode } from "@angular/core";
import { MessagesService } from "./services/messages.service";
import { Message } from "primeng/api";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private messageService: MessagesService) {}

  handleError(error: any): void {
    const messageObj: Message = {
      life: 10000,
      summary: 'Error',
      detail: error.message || 'Soemthing went wrong!',
      severity: 'error',
    };
console.log('e', error);
    this.messageService.add(messageObj);

    if(isDevMode()) console.dir(error);
  }
}
