import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json, text/plain, */*');
contentHeaders.append('Content-Type', 'application/json;charset=utf-8');