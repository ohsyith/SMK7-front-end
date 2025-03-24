import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/Services/api.service';

export const userRoutesGuard: CanActivateFn = (route, state) => {
  const Acc = inject(ApiService)
  const go = inject(Router)
  const hallos = Acc.getLevelFromToken();
const testing = inject(CookieService)
const asloween = testing.get('^a*B`TeVerlDn+8SP>+"Ad_{z/J;k[C%%GC4h6VV_;z8^.[kq~-JbFM{Y?{j')

  if(hallos ==  "USER" || hallos == "ADMIN" && asloween){
    return true;
  }else{
alert("Please Login First ^-^")
go.navigate(["Home"])
    return false
  }

};
