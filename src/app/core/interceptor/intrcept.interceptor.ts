import { HttpInterceptorFn } from '@angular/common/http';

export const intrceptInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
