import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import IServiceItem from 'src/app/models/service.modal';
import { AES, enc } from 'crypto-js';
import { PasswordManagerService } from 'src/app/services/password-manager.service';

@Component({
  selector: 'secretpass-list-item[site]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styles: [
    `
      .word-wrap {
        word-wrap: break-all;
      }
    `,
  ],
})
export class ListItemComponent {
  @Input() site: IServiceItem = {} as IServiceItem;
  private manager = inject(PasswordManagerService);
  isEncrypt = false;

  changeState() {
    this.isEncrypt = !this.isEncrypt;
  }

  decrtyptPassword(password: string) {
    if (this.isEncrypt) return password;
    const secretKey = '44H7YaZxYmuX0VxxvT5njenuzFC5shLU';
    const decodedPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decodedPassword;
  }

  deleteClient(client: IServiceItem) {
    this.manager.deleteClient(client);
  }
}
