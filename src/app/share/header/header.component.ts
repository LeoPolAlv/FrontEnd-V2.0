import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() usuarioConectado;
  //public usuarioConectado: string = '';

  constructor(
    private tokenService: TokenService,
    //private autenticacionService: AutenticacionService,
    private router: Router,
  ) { 
    console.log('Constructor header');
  }

  ngOnInit() {
    console.log('OnInit header');
    this.tokenService.nuevoToken
          .subscribe(token => {
            this.usuarioConectado = this.tokenService.userToken(token);
    });
    
    this.init();
  }

  async init(){
    if (this.usuarioConectado === null) {
      let tokenAux = this.tokenService.getToken();
      this.usuarioConectado = this.tokenService.userToken(await tokenAux)
      console.log('Usuario Obtenido - Home: ', this.usuarioConectado);
    } else {
      console.log('Usuario que nos llega de home: ', this.usuarioConectado);
    }
  }

  logout(){
    //console.log('Logout');
    this.tokenService.eliminarToken();
    this.router.navigateByUrl('/login');
  }

}
