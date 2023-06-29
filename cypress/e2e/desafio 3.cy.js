/// <reference types="cypress" />
import { LoginPage } from "../support/pages/loginPage";
import { ProductPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe("Desafio 3", () => {
  let data;
  let productos;
  const loginPage = new LoginPage();
  const productsPage = new ProductPage();
  const shoppingCartPage = new ShoppingCartPage();

  before("Datos de ingreso", () => {
    cy.fixture("data").then((datos) => {
      data = datos;
    });

    cy.fixture("productos").then((productList) => {
      productos = productList.productos;
    });
  });

  beforeEach("Before Each", () => {
    cy.visit("");
    cy.get("#registertoggle").dblclick();
    loginPage.escribirUsuario(data.usuario);
    loginPage.escribirContrasena(data.contrasena);
    loginPage.clickLoginBtn();
    cy.log("ingresando al modulo to Online Shop");
    cy.contains("Online Shop").click();
  });

  it("Seleccion de productos, Verificacion de productos", () => {
    productsPage.agregarProducto(productos[0].nombre, productos[0].precio);
    productsPage.agregarProducto(productos[1].nombre, productos[1].precio);
    shoppingCartPage.verificarCarrito(productos);
    shoppingCartPage.verificarPrecioFinal(productos);
  });
});
