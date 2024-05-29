import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const httpJwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
    return next(authReq);
  }
  return next(req);
};
