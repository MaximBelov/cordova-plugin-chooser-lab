import {Component} from '@angular/core';

import { Chooser } from 'awesome-cordova-plugins-chooser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    providers: [Chooser, File]
})
export class HomePage {
    private readonly mimeTypes =
        'application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    metadata = {}
    result = {};

    constructor(private chooser: Chooser, private file: File) {
    }

    async testSelectFile(){
        const fileEntry = await this.chooser.getFile({mimeTypes: this.mimeTypes, maxFileSize: 10000000 }).catch(error => error);
        this.metadata = fileEntry;
        console.log(fileEntry);
        const fileSize = await this.getFileSize(fileEntry.path).catch(error => error);
        this.result = fileSize
        console.log(fileSize);
    }

    private async getFileSize(fileUri: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.file
                .resolveLocalFilesystemUrl(fileUri)
                .then((file) => {
                    file.getMetadata(
                        (metadata) => {
                            resolve(metadata.size);
                        },
                        (err) => reject(err),
                    );
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}
