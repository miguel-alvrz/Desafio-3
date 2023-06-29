export class ShoppingCartPage {
  verificarCarrito(productos) {
    cy.get("#goShoppingCart").click();
    for (let i = 0; i < productos.length; i++) {
      cy.get(`#productName[name="${productos[i].nombre}"]`);
      cy.get(`#productPrice[name="${productos[i].precio}"]`);
    }
  }

  verificarPrecioFinal(productos) {
    let precioFinal = 0;
    for (let i = 0; i < productos.length; i++) {
      precioFinal += Number(productos[i].precio);
    }
    cy.xpath('//*[@id="root"]/div/div[2]/div[2]/button').click();
    cy.get("#price").contains(precioFinal);
  }
}
