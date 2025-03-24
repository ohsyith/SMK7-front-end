import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { ApiService } from 'src/Services/api.service';

export const verifGuard: CanActivateFn = (route, state) => {

  const aswww = inject(ActivatedRoute)
const token = route.queryParams['token']
  const has = inject(ApiService)
  const aa = inject(Router)
const s = has.Verification(token);
if(s.subscribe(
  response => response
)){
  aa.navigate(["Verification"])
  return true;
}else if(s.subscribe (
  error => error === "Token verifikasi telah kedaluwarsa atau terjadi kesalahan silahkan register ulang x-x"
)){

  aa.navigate(["Expired"])
  return false;
}else{

  aa.navigate(["Not-found"])
  return false;
}
aa.navigate(["Not-found"])
return false;

};
