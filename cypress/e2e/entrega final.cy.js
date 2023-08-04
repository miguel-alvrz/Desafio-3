/// <reference types="cypress" />
import { HomePage} from "../support/pages/homePage";
import { ProductPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckOutPage} from "../support/pages/checkOutPage";
import { ReciptPage } from "../support/pages/reciptPage";

describe("Entrega Final", () => {
  let productos;
  let precioFinal;
  let checkOutName;
  let checkOutLastName;
  let checkOutCardNumber;
  const homePage = new HomePage ();
  const productsPage = new ProductPage();
  const shoppingCartPage = new ShoppingCartPage();
  const checkOutPage = new CheckOutPage ();
  const reciptPage = new ReciptPage ();

  before("Datos de ingreso", () => {
    cy.fixture("productos").then((productList) => {
      productos = productList.productos;
      precioFinal = productList.precioFinal;
    });

    cy.fixture("purchasedata").then((purchasedata) => {
      checkOutName = purchasedata.nombre;
      checkOutLastName = purchasedata.apellido;
      checkOutCardNumber = purchasedata.cardNumber;
    })
  });

  it("Registro, Login, Seleccion de productos, Verificacion de productos, Compra, Verificacion Compra", () => {
    cy.request({
      url: "https://pushing-it.onrender.com/api/register",
      method: "POST",
      body:{
        username : "miguel",
        password: "123456!",
        gender: "MASC",
        day: "09",
        month: "02",
        year: "1997",
      }
    }).then(respuesta => {
        expect(respuesta.status).to.be.equal(200)
    })
    cy.request({
      url: "https://pushing-it.onrender.com/api/login",
      method: "POST",
      body:{
        username : "miguel",
        password: "123456!",
      }
    }).then(respuesta => {
      expect(respuesta.status).to.be.equal(200)
      window.localStorage.setItem('token', respuesta.body.token)
      window.localStorage.setItem('user', respuesta.body.user.username)
    }) 
    homePage.onlineShop();
    productsPage.agregarProducto(productos[0].nombre, productos[0].precio);
    productsPage.agregarProducto(productos[1].nombre, productos[1].precio);
    productsPage.irAlCarrito();
    shoppingCartPage.verificarCarrito(productos);
    shoppingCartPage.irAlDetalle();
    shoppingCartPage.verificarPrecioFinal(precioFinal);
    checkOutPage.completeCheckOut(checkOutName, checkOutLastName, checkOutCardNumber);
    reciptPage.ticketVerification(checkOutName, checkOutLastName, checkOutCardNumber, productos, precioFinal)
  });

  after("Eliminar User", () => {
    cy.request({
      url: "https://pushing-it.onrender.com/api/deleteuser/{miguel}",
      method: "DELETE",
}).then(respuesta => {
  expect(respuesta.status).to.be.equal(200)
    })
  })
})
