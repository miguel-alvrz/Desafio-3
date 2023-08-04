export class ReciptPage{
ticketVerification(nombre, apellido, cardNumber, products, totalPrice){
    cy.get("#name").contains(nombre)
    cy.get("#name").contains(apellido)
    for(let i =0; i< products.length; i++)
    {
        cy.contains(`${products[i].nombre}`)
    }
    cy.get("#creditCard").contains(cardNumber)
    cy.get("#totalPrice").contains(totalPrice)
    }
}