import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hidden-one',
    template: `
        <p>The Hidden One</p>
    `
})

export class HiddenComponent{
    constructor(public router:Router) {}
}