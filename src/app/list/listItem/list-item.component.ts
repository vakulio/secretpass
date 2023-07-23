import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import IServiceItem from 'src/app/models/service.modal';
import { AES, enc } from 'crypto-js';
import { PasswordManagerService } from 'src/app/services/password-manager.service';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'secretpass-list-item[site]',
  standalone: true,
  imports: [CommonModule, ClipboardModule],
  templateUrl: './list-item.component.html',
  styles: [
    `
      .word-wrap {
        word-wrap: break-all;
      }
    `,
  ],
})
export class ListItemComponent implements OnInit {
  @Input() site: IServiceItem = {} as IServiceItem;
  private manager = inject(PasswordManagerService);
  private clipboardService = inject(ClipboardService);
  isEncrypt = true;
  showSnackbar = false;
  snackbarDuration = 2000;
  password = '';

  ngOnInit(): void {
    this.password = this.site.password;
  }

  viewSnackBar() {
    this.showSnackbar = true;
    setTimeout(() => {
      this.showSnackbar = false;
    }, this.snackbarDuration);
  }

  decrtyptPassword() {
    if (this.site.password !== this.password) {
      this.password = this.site.password;
      return;
    }
    const secretKey = '44H7YaZxYmuX0VxxvT5njenuzFC5shLU';
    const decodedPassword = AES.decrypt(this.site.password, secretKey).toString(
      enc.Utf8
    );
    this.viewSnackBar();
    this.clipboardService.copy(decodedPassword);
    this.password = decodedPassword;
  }

  deleteClient(client: IServiceItem) {
    this.manager.deleteClient(client);
  }
}
