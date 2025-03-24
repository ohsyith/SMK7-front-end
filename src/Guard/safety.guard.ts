import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/Services/api.service';

export const safetyGuard: CanActivateFn = (route, state) => {

  const Acc = inject(ApiService)
const go = inject(Router)
const hallos = Acc.getLevelFromToken();

if(hallos ==  "81nPYdU4y2Apde6fNLoecuuypc05bKvn"){
  return true;
}else{
  go.navigate(['Not-found'])
  return false
}


};
