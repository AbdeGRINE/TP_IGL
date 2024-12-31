import { Injectable } from '@angular/core';
import { DPI } from '../models/interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class DpiService {
private dpiData: DPI | null = null;

  constructor() { }

  setDPI(dpi: DPI): void {
    this.dpiData = dpi;
  }

  getDPI(): any {
    return this.dpiData;
  }
}
