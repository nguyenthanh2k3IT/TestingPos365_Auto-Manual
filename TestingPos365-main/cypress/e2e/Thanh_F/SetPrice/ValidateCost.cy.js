describe('Pricing Table - Price Input Validation', () => {
    beforeEach(() => {
        cy.loginAndNavigateToSetPrice();
      });

    // it('Kiểm tra để trống giá trị cho trường nhập giá bán', () => {

    //     cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().clear();
    //     cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().type('{enter}');
    //     cy.contains('Cập nhật dữ liệu thành công.').should('be.visible');

    //     cy.reload();
    //     cy.wait(5000);// Check lại bằng mắt =))
    //     // Nhập giá bán lớn hơn giá vốn
    //     cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().clear();
    //     cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().type('10000000000');
    //     cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().type('{enter}');
    //     cy.contains('Cập nhật dữ liệu thành công.').should('be.visible');

    //     cy.reload();
    //     cy.wait(5000);// Check lại bằng mắt =))
    // });

    // it('Kiểm tra nhập số âm cho trường "Giá bán"', () => {

    //     // Try to enter a negative number
    //     cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().clear().type('-100');
    //     // Assert that the minus sign is not visible
    //     cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().should('not.contain.value', '-');
    // });

    // it('Kiểm tra nhập nguyên dương cho trường "Giá bán"', () => {
    //     // Enter a positive integer
    //     cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().clear().type('100');
    //     // Assert that the value was entered correctly
    //     cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().should('have.value', '100');
    // });

    it('should not display a comma when a decimal is entered into the price input field', () => {
        // Enter a decimal number
        cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().clear().type('1234,56');
        // Assert that a comma is not displayed in the input
        cy.get('input[ng-blur="updatePrice(dataItem,1)"]').first().should('not.contain.value', '.');
    });
});
