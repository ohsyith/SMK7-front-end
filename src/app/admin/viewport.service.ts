import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isBelow1000px(): Observable<BreakpointState> {
    return this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small,Breakpoints.Medium,Breakpoints.TabletPortrait]);
  }
}
