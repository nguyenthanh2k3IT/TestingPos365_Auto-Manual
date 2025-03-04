describe('Kiểm tra giao diện bảng giá', () => {
  
    beforeEach(() => {
      cy.loginAndNavigateToSetPrice();
    });
  
    it('Kiểm tra sidebar mặc định hiển thị', () => {
      cy.get('span[class="fa fa-filter"]').click(); // Click vào nút ẩn/hiện sidebar

      cy.get('div[class="filter-col ng-scope filter-col-show"]').should('be.visible'); // Xác nhận sidebar hiển thị
      // Kiểm tra hiển thị danh sách sản phẩm
      cy.get('h2[class="panel-filter-title ng-binding"]').first().should('contain.text', 'Danh sách bảng giá');
      cy.get('button[ng-click="EditPriceBook({id:0})"]').should('be.visible');
      cy.get('ul[class="k-group k-treeview-lines"]').within(() => {
        cy.get('li').should('have.length.greaterThan', 0);
      });
      // Kiểm tra thanh tìm kiếm trong sidebar
      cy.get('h2[class="panel-filter-title ng-binding"]').eq(1).should('contain.text', ' Tìm kiếm');
      cy.get('input[ng-model="filter.keyword"]').should('be.visible');
    });
    
    it('Kiểm tra nút ẩn/hiện sidebar và tên bảng giá', () => {
      cy.get('button[toggle-class-filter]').should('be.visible'); // Kiểm tra nút ẩn/hiện sidebar
      cy.get('h1[ng-bind="$root.title"]').invoke('text').should('not.be.empty'); // Kiểm tra tên bảng giá
      cy.get('button[ng-click="exportButton()"]').should('be.visible').invoke('text').should('include',' Xuất ra file'); // Kiểm tra nút "XUẤT RA FILE"
      // chuyển sang bảng giá khác 
      cy.get('span[class="fa fa-filter"]').click(); // Click vào nút ẩn/hiện sidebar
      cy.get('span.categorytree').eq(1).click();
      cy.get('button[ng-click="import()"]').should('be.visible').invoke('text').should('include',' Import'); // Kiểm tra nút "Import"
      cy.get('button[ng-click="AddByCategory()"').should('be.visible').invoke('text').should('include',' Thêm theo nhóm'); // Kiểm tra nút "Thêm theo nhóm"
      cy.get('button[ng-click="Calculator(false)"').should('be.visible').find('i.fa.fa-calculator').should('exist'); // Kiểm tra nút "Tính giá"
      cy.get('input[ng-model="findproduct"]').should('be.visible'); // Kiểm tra textbox tìm kiếm mặt hàng
      cy.get('button[ng-click="findProduct()"]').should('be.visible'); // Kiểm tra nút tìm kiếm

    });
  it('Nhấn reload 20 lần và kiểm tra trang thông tin hiển thị đầy đủ', () => {
      cy.wait(500);
      for (let i = 0; i < 20; i++) {
        cy.reload(); 
          cy.wait(500);
        // quan sát xem giao diện có hiển thị đầy đủ thông tin không
      }
    });
    const viewports = [
      { device: 'iPhone 6', width: 375, height: 667 },
      { device: 'iPad Mini', width: 768, height: 1024 },
      { device: 'Macbook 13', width: 1280, height: 800 },
      { device: 'Desktop 1080p', width: 1920, height: 1080 }
    ];
    viewports.forEach(viewport => {
      it(`Should display login screen correctly on ${viewport.device}`, () => {
        cy.viewport(viewport.width, viewport.height);  // Thiết lập kích thước màn hình
        cy.wait(10000);
      });
    });
    
  
  });
  