/**
 * AppComponent: root component
 * component: controls a view through the associated template
 * view: is a portion of the screen
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';


/**
 *  decorator for root component
 *  render AppComponent properties through the associated template
 */
@Component({
    selector: 'admin',
    templateUrl: './admin.html'
})

/**
 *  defines any properties or methods that this component will be using
 *  @property title: title of component
 *  @property nav_options: list of navigation options
 *  @property navigate_studio_users: option that sets navigation to 
 *  show studio users
 */
export class AdminComponent { 
    /**
     *  @constructor
     *  title, myuser: properties of AppComponent
     */
    title: string;

    /**
     *  @constructor
     */
    constructor(private admin_router: Router) {
        this.title = 'Admin';
    }

    /**
     *  go back to dashboard
     */
    goBack(): void {
        this.admin_router.navigate(['']);
    }
}
