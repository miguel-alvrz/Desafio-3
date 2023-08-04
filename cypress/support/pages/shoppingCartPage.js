export class ShoppingCartPage {
  verificarCarrito(productos) {
    for (let i = 0; i < productos.length; i++) {
      cy.get(`#productName[name="${productos[i].nombre}"]`);
      cy.get(`#productPrice[name="${productos[i].precio}"]`);
    }
  }

  verificarPrecioFinal(precioFinal) {
    cy.get("#price").contains(precioFinal);
  }
  irAlDetalle(){
    cy.xpath('//*[@id="root"]/div/div[2]/div[2]/button').click();
  }
}
