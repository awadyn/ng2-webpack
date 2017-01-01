import {Injectable} from '@angular/core';

@Injectable()
export class ProceduresService {
        proceduresData = [
            {
                "id": 1,
                "field_1": "test",
                "field_2": "test"
            },
            {
                "id": 2,
                "field_1": "test",
                "field_2": "test"
            },
        ];

        getData(): Promise<any> {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.proceduresData);
                }, 2000);
            });
        }
}
