describe('Pricing Table Search - Empty Search Field', () => {
    beforeEach(() => {
        cy.loginAndNavigateToSetPrice();
      });
    it('Kiểm tra tìm kiếm với từ khóa rỗng', () => {
        cy.wait(500);
        cy.get('span[class="fa fa-filter"]').click(); // Click vào nút ẩn/hiện sidebar
      // Đảm bảo thanh tìm kiếm có placeholder "Mã, Tên"
      cy.get('input[placeholder="Mã, Tên"]').should('exist');
  
      // Đảm bảo thanh tìm kiếm đang rỗng
      cy.get('input[placeholder="Mã, Tên"]').should('have.value', '');
  
      // Nhấn Enter
      cy.get('input[placeholder="Mã, Tên"]').type('{enter}');
  
      cy.get('div[class="k-grid-content k-auto-scrollable"]').within(() => {
        cy.get('tr').should('have.length.greaterThan', 1);
      });
    });
    it('Cho phép tìm kiếm với mọi từ khóa được nhập vào', () => {
    
        cy.get('span[class="fa fa-filter"]').click(); // Click vào nút ẩn/hiện sidebar
        // Nhập từ khóa bất kỳ vào thanh tìm kiếm
        const searchTerm = 'abc';
        cy.get('input[placeholder="Mã, Tên"]').type(searchTerm);
    
        // Nhấn Enter
        cy.get('input[placeholder="Mã, Tên"]').type('{enter}');
    
        // Kiểm tra có loading hay không
        cy.get('.k-loading-mask').should('be.visible');
      });
  });
  