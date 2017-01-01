/**
 *  class that primes an in-memory database
 */

import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let users = [
            {first_name: 'Yara', last_name: 'Awad', role: 'ILI', email: 'awadyn@bu.edu', password: 'somepassword', pin: 12345, id: 1},
            {first_name: 'Antonio', last_name: 'Nehme', role: 'ILI', email: 'anehme@interactivelife.com', password: 'somepassword', pin: 123456, id: 2},
            {first_name: 'Adnan', last_name: 'Utayyim', role: 'ILI', email: 'mmu00@mail.aub.edu', password: 'somepassword', pin: 1234567, id: 3}
        ];
        let orgs = [
            {name: 'AlSumaria', type: 'Media', package: undefined, id: 1},
            {name: 'Administrate', type: 'Education', package: undefined, id: 2},
            {name: 'BDD', type: 'Other', package: undefined, id: 3},
            {name: 'Elation', type: 'Other', package: 'Gold', id: 4}
        ];
        let procedures = [
            {first_name: 'yara', last_name: 'awad', email: 'awadyn@bu.edu', gender: 'female', birthday: '28/3/2099', phone: '4444444444', zip: 12345, hsr: true, notes: 'test procedure 1', id:1},
            {first_name: 'adnan', last_name: 'utayyim', email: 'mmu00@mail.aub.edu', gender: 'male', birthday: '', phone: '5555555555', zip: 123456, hsr: true, notes: 'test procedure 2', id:2}
        ];
        return {users, orgs, procedures};
    }
}
