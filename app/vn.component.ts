import { Component } from '@angular/core';
import { Router } from '@angular/router';

export class Vn {
    id: number;
    title_en: string;
}

@Component({
    selector: 'my-vn',
    template: `
        <p>{{vn.title_en}}</p>
        <h2>Tittle en supposed</h2>
    `
})

export class VnComponent{
    constructor(public router:Router) {}
    vn: any = {
        id: 1,
        title_en: 'Chaod Head',
    };
}