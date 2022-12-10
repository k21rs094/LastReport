import TestFilters from '../support/filterTests.js'

TestFilters([], () => {
    describe('monaca login template', function () {
        var email = ''
        var pass = '123456'
        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.visit('http://localhost:8080/#RegisterPage')
    
            email = generate_random_string(8) + '@gmail.com'
        })
    
        it('signup screen', function () {
            cy.get('.ui-title').should('have.contain', 'アプリデモ')
            cy.get('.ui-content').should('have.contain', '新規登録')
            cy.get('#reg_username').type(email, { delay: 100 }).should('have.value', email)
            cy.get('#reg_password').type(pass, { delay: 100 }).should('have.value', pass)
            cy.get('#RegisterBtn').should('have.contain', '登録する')
            cy.get('span').should('have.contain', '戻る')
        })
    
        it('back to signip screen', function () {
            cy.contains('戻る').click()
            cy.get('.ui-content').should('have.contain', 'ログイン')
        })
    
        it('signup success', function () {
            cy.get('#reg_username').type(email, { delay: 100 }).should('have.value', email)
            cy.get('#reg_password').type(pass, { delay: 100 }).should('have.value', pass)
            
            cy.get('#RegisterBtn').click()
            cy.wait(2000)
            cy.on('window:alert', (str) => {
                expect(str).to.equal('新規登録とログイン成功')
            })
            cy.on('window:confirm', () => true);
            cy.wait(1000)
            cy.get('#detailArea').contains('ようこそ！ログイン成功しました！')
        })
    
        function generate_random_string(string_length) {
            let random_string = '';
            let random_ascii;
            for(let i = 0; i < string_length; i++) {
                random_ascii = Math.floor((Math.random() * 25) + 97);
                random_string += String.fromCharCode(random_ascii)
            }
            return random_string
        }
    })
})