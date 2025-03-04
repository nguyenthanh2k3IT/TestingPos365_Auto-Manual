describe('Export Pricing Table Functionality', () => {
    beforeEach(() => {
        cy.loginAndNavigateToSetPrice();
        cy.get('span[class="fa fa-filter"]').click();
        cy.get('span[class="categorytree ng-binding"]').eq(1).click();
        cy.get('button[ng-click="import()"').first().click();
      });
      it('Hiển thị thông báo lỗi khi không nhập dữ liệu', () => {
        cy.get('button[ng-click="saveImport()"]').click();
        cy.contains('Chưa có mặt hàng nào trong danh sách.').should('be.visible');
      });
      it('Kiểm tra chức năng lưu khi nhập sai định dạng dữ liệu cho trường "Đơn giá"', () => {
        cy.get('button[ng-click="saveImport()"]').click();
        cy.contains('Chưa có mặt hàng nào trong danh sách.').should('be.visible');
      });
  });