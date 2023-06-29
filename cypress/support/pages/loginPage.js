export class LoginPage {

    escribirUsuario(usuario){
        cy.get('#user').type(usuario);
    };

    escribirContrasena(contrasena){
        cy.get('#pass').type(contrasena)

    };

     clickLoginBtn(){
        cy.get('#submitForm').click();
     }

}