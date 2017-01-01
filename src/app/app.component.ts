/**
 * AppComponent: root component
 * component: controls a view through the associated template
 * view: is a portion of the screen
 */

import { Component } from '@angular/core';

/**
 *  decorator for root component
 *  render AppComponent properties through the associated template
 */
@Component({
    selector: 'ili',
    template: ` <div>
                    <h1>{{title}}</h1>
                    <dashboard></dashboard>
                </div>
                <router-outlet></router-outlet> `
})

/**
 *  defines any properties or methods that this component will be using
 *  @property title: title of component
 *  @property nav_options: list of navigation options
 *  @property navigate_studio_users: option that sets navigation to 
 *  show studio users
 */
export class AppComponent { 
    title: string;

    /**
     *  @constructor
     */
    constructor() {
        this.title = 'ILI';
    }
}
