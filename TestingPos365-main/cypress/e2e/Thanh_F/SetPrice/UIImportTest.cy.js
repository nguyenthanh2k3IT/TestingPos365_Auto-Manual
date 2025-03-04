describe('Export Pricing Table Functionality', () => {
    beforeEach(() => {
        cy.loginAndNavigateToSetPrice();
        cy.get('span[class="fa fa-filter"]').click();
      });
    it('should export file with correct data', () => {

        cy.get('span[class="categorytree ng-binding"]').eq(1).click();
        cy.get('button[ng-click="import()"').first().click();
        // Kiểm tra giao diện 
        cy.get('button[ng-click="saveImport()"]').should('be.visible');
        cy.get('a').contains(' Tải file mẫu').should('be.visible');
        cy.get('button[onclick="document.getElementById(\'myFileInputElem\').click()"]').should('be.visible');
        cy.get('button[ng-click="reset()"]').should('be.visible');
        cy.get('button[ng-click="cancelimport()"]').should('be.visible');
        cy.get('div[kendo-spreadsheet="spreadsheet"]').should('be.visible');
    });
  });
  
  