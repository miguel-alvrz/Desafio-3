export class ProductPage {
  agregarProducto(nombreProducto, precioProducto) {
    cy.get(
      `button[type="button"][value="${nombreProducto}"][name="${precioProducto}"]`
    ).click();
    cy.get("#closeModal").click();
  }
}
