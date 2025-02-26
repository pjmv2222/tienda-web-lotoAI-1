import{g as i,h}from"./chunk-7SU6ZIK7.js";import{D as a,Q as p,V as n,k as c,n as o,r as l,ra as u}from"./chunk-FRCB7G3R.js";var m={production:!1,apiUrl:"http://localhost:3000/api"};var w=(()=>{class r{constructor(t,e){this.http=t,this.platformId=e,this.apiUrl=m.apiUrl,this.mockUsers=["test@example.com"],this.currentUserSubject=new c(this.getStoredUser()),this.currentUser=this.currentUserSubject.asObservable()}getStoredUser(){return i(this.platformId)?JSON.parse(localStorage.getItem("currentUser")||"null"):null}setStoredUser(t){i(this.platformId)&&localStorage.setItem("currentUser",JSON.stringify(t))}get currentUserValue(){return this.currentUserSubject.value}register(t){return this.http.post(`${this.apiUrl}/auth/register`,t)}simulateEmailSending(t,e){console.log(`
      ===============================================
      Simulaci\xF3n de Email de Verificaci\xF3n
      ===============================================
      Para: ${t}
      Asunto: Verifica tu cuenta en LotoIA
      
      Hola,
      
      Gracias por registrarte en LotoIA. Para completar tu registro,
      por favor haz clic en el siguiente enlace:
      
      http://localhost:4200/verificar/${e}
      
      Este enlace expirar\xE1 en 24 horas.
      
      Saludos,
      El equipo de LotoIA
      ===============================================
    `)}login(t,e){return this.http.post(`${this.apiUrl}/login`,{email:t,password:e}).pipe(l(s=>(this.setStoredUser(s),this.currentUserSubject.next(s),s)))}logout(){i(this.platformId)&&localStorage.removeItem("currentUser"),this.currentUserSubject.next(null)}verifyEmail(t){return o({success:!0,message:"Email verificado correctamente"}).pipe(a(1e3))}checkEmailExists(t){return o(this.mockUsers.includes(t)).pipe(a(500))}requestPasswordReset(t){return this.http.post(`${this.apiUrl}/request-password-reset`,{email:t})}resetPassword(t,e){return this.http.post(`${this.apiUrl}/reset-password`,{token:t,newPassword:e})}static{this.\u0275fac=function(e){return new(e||r)(n(h),n(u))}}static{this.\u0275prov=p({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{w as a};
