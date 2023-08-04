export class CheckOutPage{
    completeCheckOut(nombre, apellido, cardNumber){
        cy.xpath("/html/body/div[1]/div/div[2]/div[3]/div/button").click()
        cy.get("#FirstName").type(nombre)
        cy.get("#lastName").type(apellido)
        cy.get("#cardNumber").type(cardNumber)
        cy.xpath("/html/body/div[1]/div/div[2]/div[2]/form/div/div[4]/button[1]").click()
        cy.wait(5000)
    }
}

    