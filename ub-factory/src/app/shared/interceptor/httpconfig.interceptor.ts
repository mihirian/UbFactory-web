import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn === 'true') {
      // User is logged in
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      // User is not logged in
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'X-Guest': 'true'
        }
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Process the response if needed
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors if needed
        return throwError(error);
      })
    );
  }
}
