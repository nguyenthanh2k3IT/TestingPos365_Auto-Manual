describe('Export Pricing Table Functionality', () => {
    beforeEach(() => {
        cy.loginAndNavigateToSetPrice();

      });
    it('should export file with correct data', () => {

        cy.get('button[ng-click="exportButton()"]').click();

        const downloadsFolder = Cypress.config('downloadsFolder');
        const downloadedFilePath = `${downloadsFolder}/PriceBook.xlsx`;
        cy.readFile(downloadedFilePath).should('exist');
        
            // Phần nội dung còn lại tự check bằng mắt
    });
  });
  
  