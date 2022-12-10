import TestFilters from '../support/filterTests.js'

TestFilters([], () => {
    describe('monaca login template', function () {
        var email = 'test@gmail.com'
        var pass = '123456'
        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.visit('http://localhost:8080')
          })
    
        it('signin screen', function () {
            cy.get('.ui-title').should('have.contain', 'アプリデモ')
            cy.get('.ui-content').should('have.contain', 'ログイン')
            cy.get('#login_username').type(email, { delay: 100 }).should('have.value', email)
            cy.get('#login_password').type(pass, { delay: 100 }).should('have.value', pass)
            cy.get('#LoginBtn').should('have.contain', 'ログインする')
            cy.get('span').should('have.contain', '登録')
        })
    
        it('move to signup screen', function () {
            cy.contains('登録').click()
            cy.wait(2000)
            cy.get('.ui-content').should('have.contain', '新規登録')
        })
    
        it('signin success', function () {
            cy.get('#login_username').type(email, { delay: 100 }).should('have.value', email)
            cy.get('#login_password').type(pass, { delay: 100 }).should('have.value', pass)
            
            cy.get('#LoginBtn').click()
            cy.wait(2000)
            cy.on('window:alert', (str) => {
                expect(str).to.equal('ログイン成功')
            })
            cy.on('window:confirm', () => true)
            cy.wait(1000)
            cy.get('#detailArea').contains('ようこそ！ログイン成功しました！')
        })
    
        it('sigout success', function () {
            cy.get('#login_username').type(email, { delay: 100 }).should('have.value', email)
            cy.get('#login_password').type(pass, { delay: 100 }).should('have.value', pass)
            
            let count = 0
            cy.on('window:alert', (str) => {
                count += 1
                switch (count) {
                case 1:
                    expect(str).to.equal('ログイン成功')
                    return true
                case 2:
                    expect(str).to.equal('ログアウト成功')
                    return true
                }
            })
            cy.on('window:confirm', () => true)
    
            cy.get('#LoginBtn').click()
            cy.wait(2000)
            // handling logout
            cy.contains('ログアウト').click()
            cy.get('#YesBtn_logout').click()
        })
    })
})