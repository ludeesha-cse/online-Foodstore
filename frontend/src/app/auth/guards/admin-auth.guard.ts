import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  // const jwtDecoderService = inject(JwtDecoderService);

  // const user = localStorage.getItem('User');
  // if (!user) {
  //   return false;
  // }

  // const token = (JSON.parse(user) as User).token;

  // const decodedToken = jwtDecoderService.decodeToken(token);

  // if (!decodedToken.isAdmin) {
  //   return true;
  // } else {
  //   return false;
  // }

  const userService = inject(UserService);

  if (!userService.isAdmin) {
    return true;
  } else {
    return false;
  }
};
