
describe('Existen elementos básicos del sitio', () => {
    it('Chequea que la página haya cargado', () => {
        cy.visit('http://192.168.100.10:8080')
    })

    it('Chequea que haya cargado el selector', () => {
        cy.get('option').should('have.length', 34) 
    })

    it('Chequea que haya cargado los keys de la tabla', () => {
        cy.get('th').should('have.length', 34) 
    })

    it('Chequea que haya cargado los values de la tabla', () => {
        cy.get('td').should('have.length', 32) 
    })

    it('Chequea que la fecha sea la del día actual', () => {
        cy.get('h1').contains('2021-03-19') 
    })

    it('Chequea que la moneda base sea EUR', () => {
        cy.get('h2').contains('EUR') 
    })
})

describe('Interactua con el sitio 1.Moneda 2. Fecha', () => {
    it('Hace click en la moneda y cambia su valor', () => {
        cy.visit('http://192.168.100.10:8080')
        cy.get('select').select('CAD')
    })

    it('Asegura que haya cambiado la moneda base del título', () => {
        cy.get('h2').contains('CAD')
    })

    it('Asegura que la moneda elegida se haya representado en la tabla', () => {
        cy.get('td').eq(0).should('have.text', "1")
    })

    it('Selecciona otra fecha', () => {
        cy.get('input').type('2018-03-05').trigger('change')
    })

    it('Chequea que haya cambiado el valor con la fecha', () => {
        cy.get('td').eq(1).should('have.text', '6.0574337062')
    })

    it('Chequea la cantidad de options', () => {
        cy.get('option').should('have.length', 34) 
    })
})

describe('Interactua con el sitio 1.Fecha 2. Moneda', () => {
    it('Entra al sitio', () => {
        cy.visit('http://192.168.100.10:8080')
    })

    it('Selecciona otra fecha', () => {
        cy.get('input').type('2018-03-05').trigger('change')
    })

    it('Cambia de moneda', () => {
        cy.get('select').select('EUR')
    })

    it('Chequea que haya cambiado el valor con la fecha', () => {
        cy.get('td').eq(0).should('have.text', '1.5914')
    })

    it('Cambia de moneda', () => {
        cy.get('select').select('CAD')
    })

    it('Asegura que haya cambiado la moneda base del título', () => {
        cy.get('h2').contains('CAD')
    })

    it('Asegura que la moneda elegida se haya representado en la tabla', () => {
        cy.get('td').eq(0).should('have.text', "1")
    })

    it('Chequea que haya cambiado el valor con la moneda', () => {
        cy.get('td').eq(1).should('have.text', '6.0574337062')
    })

    it('Chequea la cantidad de options', () => {
        cy.get('option').should('have.length', 34) 
    })
})