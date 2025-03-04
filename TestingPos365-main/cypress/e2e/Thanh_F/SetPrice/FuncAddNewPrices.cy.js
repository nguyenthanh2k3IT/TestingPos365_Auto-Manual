describe('Kiểm tra chức năng tạo bảng giá mới', () => {
    beforeEach(() => {
        cy.loginAndNavigateToSetPrice();
        cy.get('span[class="fa fa-filter"]').click();
        cy.get('button[ng-click="EditPriceBook({id:0})"]').click();

      });
    it('Kiểm tra ngày sản xuất và ngày hết hạn không hợp lệ', () => {
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();
      // Nhập các thông tin khác đúng và đầy đủ
      cy.get('input[ng-model="pricebook.Name"]').type('Bảng giá Phú Huy'+currentDate+currentTime);
      cy.get('input[k-ng-model="pricebook.StartDate"]').type('32/10/2020');
      // Chọn ngày hết hiệu lực là 17/10/2023
      cy.get('input[k-ng-model="pricebook.EndDate"]').type('32/10/2020');
        
      // Bấm lưu
      cy.get('button[ng-click="save()"]').first().click();
  
      // Kiểm tra thông báo lỗi
      cy.contains('Ngày sản xuất không hợp lệ').should('be.visible');
    });
    it('Kiểm tra ngày sản xuất lớn hơn ngày hết hạn', () => {
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();
      // Nhập các thông tin khác đúng và đầy đủ
      cy.get('input[ng-model="pricebook.Name"]').type('Bảng giá Phú Huy'+currentDate+currentTime);
      cy.get('input[k-ng-model="pricebook.StartDate"]').type('32/10/2025');
      // Chọn ngày hết hiệu lực là 17/10/2023
      cy.get('input[k-ng-model="pricebook.EndDate"]').type('32/10/2024');
        
      // Bấm lưu
      cy.get('button[ng-click="save()"]').first().click();
  
      // Kiểm tra thông báo lỗi
      cy.contains('Ngày sản xuất không được lớn hơn ngày hết hạn').should('be.visible');
    });
    it('Kiểm tra bỏ trống tên bảng giá', () => {
      // Nhập các thông tin khác đúng và đầy đủ
      cy.get('input[ng-model="pricebook.Name"]').type(' ');
        
      // Bấm lưu
      cy.get('button[ng-click="save()"]').first().click();
        cy.wait(100);
      // Kiểm tra thông báo lỗi
      cy.contains('Vui lòng nhập đủ các thông tin bắt buộc trước khi lưu.').should('be.visible');
    });
    it('Kiểm tra nhập Tên bảng giá đã tồn tại', () => {
        // Nhập các thông tin khác đúng và đầy đủ
        cy.get('input[ng-model="pricebook.Name"]').type('ABC');
          
        // Bấm lưu
        cy.get('button[ng-click="save()"]').first().click();
          cy.wait(100);
        // Kiểm tra thông báo lỗi
        cy.contains('ABC đã tồn tại trong hệ thống.').should('be.visible');
      });
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();
        var priceBookTitle = 'BẢNG GIÁ PHÚ HUY'+currentDate+currentTime;
    it('Kiểm tra chức năng thêm bảng giá mới 01', () => {

      // Nhập các thông tin khác đúng và đầy đủ
      cy.get('input[ng-model="pricebook.Name"]').type(priceBookTitle);        
      // Bấm lưu
      cy.get('button[ng-click="save()"]').first().click();
  
      // Kiểm tra thông báo lỗi
      cy.contains('Cập nhật dữ liệu thành công.').should('be.visible');
    });
    it('Kiểm tra chức năng thêm bảng giá mới 02', () => {
        cy.get('button[ng-click="cancel()"]').first().click();
       cy.wait(500);
       cy.get('ul[class="k-group k-treeview-lines"]').within(() => {
        cy.get('li').invoke('text').then((text) => {
           expect(text).to.include(priceBookTitle);
        });


      });
    });
  });
  