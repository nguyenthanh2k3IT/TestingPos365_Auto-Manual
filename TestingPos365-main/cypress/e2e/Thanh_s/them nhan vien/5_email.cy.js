describe('email', () => {
	beforeEach(() => {
		// mở web
		cy.visit('https://hvtester.pos365.vn/');

		// login
		cy.get('#Username').should('exist').type('0916591010');
		cy.get('#Password').should('exist').type('vienngocden92');

		// click nút đăng nhập Dashboard
		cy.get('button[value="Dashboard"]')
			.should('be.visible') // Kiểm tra button đang hiển thị
			.click(); // Click vào button

		// click menu
		cy.get('#navbar').find('a[tooltip="Thiết lập"]').click();

		// // vào trang quản lý nhân viên
		cy.get('a[ng-href="/#!/Users"]').click();

		// // bấm nút thêm mới nhân viên
		cy.get('#right-filter button').click();
	});

	it('test case 20: email hợp lệ', () => {
		cy.fixture('tin/them nhan vien/5 email/test_case_20.json').then(data => {
			// cy.log(data.userName);

			cy.get('input[ng-model="user.UserName"]').type(data.userName);
			cy.get('input[ng-model="user.PlainPassword"]').type(data.password);
			cy.get('input[ng-model="user.PlainPasswordCheck"]').type(data.confirmPassword);
			cy.get('input[ng-model="user.Name"]').type(data.fullName);

			cy.get('input[ng-model="user.Email"]')
				.invoke('attr', 'type', 'text') // Tạm thời đổi sang text
				.type(data.email)
				.invoke('attr', 'type', 'email'); // Đặt lại thành email
			cy.get('input[ng-model="user.Phone"]').type(data.phone);

			// Chặn request POST đến API thêm khách hàng
			let apiCalled = false;
			cy.intercept('POST', '/api/users', req => {
				apiCalled = true; // Đánh dấu API được gọi
			}).as('postVoucher');

			cy.get('button[ng-click="save()"]').click();
			cy.wait(500);
			// Đợi request nếu nó được gọi, hoặc tiếp tục nếu không
			cy.then(() => {
				if (apiCalled) {
					cy.wait('@postVoucher').then(interception => {
						const response = interception.response;

						// Log response để debug (tùy chọn)
						cy.log('Response:', response);

						// Kiểm tra mã status
						if (response.statusCode === 200) {
							cy.log(`Đúng test case: email hợp lệ thêm thành công`);
						} else {
							throw new Error(`Lỗi: email hợp lệ thêm thất bại`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 21: email để trống', () => {
		cy.fixture('tin/them nhan vien/5 email/test_case_21.json').then(data => {
			// cy.log(data.userName);

			cy.get('input[ng-model="user.UserName"]').type(data.userName);
			cy.get('input[ng-model="user.PlainPassword"]').type(data.password);
			cy.get('input[ng-model="user.PlainPasswordCheck"]').type(data.confirmPassword);
			cy.get('input[ng-model="user.Name"]').type(data.fullName);

			cy.get('input[ng-model="user.Email"]')
				.invoke('attr', 'type', 'text') // Tạm thời đổi sang text
				.clear()
				.invoke('attr', 'type', 'email'); // Đặt lại thành email
			cy.get('input[ng-model="user.Phone"]').type(data.phone);

			// Chặn request POST đến API thêm khách hàng
			let apiCalled = false;
			cy.intercept('POST', '/api/users', req => {
				apiCalled = true; // Đánh dấu API được gọi
			}).as('postVoucher');

			cy.get('button[ng-click="save()"]').click();

			cy.wait(500);
			// Đợi request nếu nó được gọi, hoặc tiếp tục nếu không
			cy.then(() => {
				if (apiCalled) {
					cy.wait('@postVoucher').then(interception => {
						const response = interception.response;

						// Log response để debug (tùy chọn)
						cy.log('Response:', response);

						// Kiểm tra mã status
						if (response.statusCode === 200) {
							throw new Error(`Lỗi: email để trống mà thêm được`);
						} else {
							cy.log(`Đúng test case: email để trống nên không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 22: email sai định dạng', () => {
		cy.fixture('tin/them nhan vien/5 email/test_case_22.json').then(data => {
			// cy.log(data.userName);

			cy.get('input[ng-model="user.UserName"]').type(data.userName);
			cy.get('input[ng-model="user.PlainPassword"]').type(data.password);
			cy.get('input[ng-model="user.PlainPasswordCheck"]').type(data.confirmPassword);
			cy.get('input[ng-model="user.Name"]').type(data.fullName);

			cy.get('input[ng-model="user.Email"]')
				.invoke('attr', 'type', 'text') // Tạm thời đổi sang text
				.type(data.email)
				.invoke('attr', 'type', 'email'); // Đặt lại thành email
			cy.get('input[ng-model="user.Phone"]').type(data.phone);

			// Chặn request POST đến API thêm khách hàng
			let apiCalled = false;
			cy.intercept('POST', '/api/users', req => {
				apiCalled = true; // Đánh dấu API được gọi
			}).as('postVoucher');

			cy.get('button[ng-click="save()"]').click();
			cy.wait(500);
			// Đợi request nếu nó được gọi, hoặc tiếp tục nếu không
			cy.then(() => {
				if (apiCalled) {
					cy.wait('@postVoucher').then(interception => {
						const response = interception.response;

						// Log response để debug (tùy chọn)
						cy.log('Response:', response);

						// Kiểm tra mã status
						if (response.statusCode === 200) {
							throw new Error(`Lỗi: email sai định dạng mà thêm được`);
						} else {
							cy.log(`Đúng test case: email sai định dạng nên không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 23: email tồn tại trong hệ thống', () => {
		cy.fixture('tin/them nhan vien/5 email/test_case_23.json').then(data => {
			// cy.log(data.userName);

			cy.get('input[ng-model="user.UserName"]').type(data.userName);
			cy.get('input[ng-model="user.PlainPassword"]').type(data.password);
			cy.get('input[ng-model="user.PlainPasswordCheck"]').type(data.confirmPassword);
			cy.get('input[ng-model="user.Name"]').type(data.fullName);

			cy.get('input[ng-model="user.Email"]')
				.invoke('attr', 'type', 'text') // Tạm thời đổi sang text
				.type(data.email)
				.invoke('attr', 'type', 'email'); // Đặt lại thành email
			cy.get('input[ng-model="user.Phone"]').type(data.phone);

			// Chặn request POST đến API thêm khách hàng
			let apiCalled = false;
			cy.intercept('POST', '/api/users', req => {
				apiCalled = true; // Đánh dấu API được gọi
			}).as('postVoucher');

			cy.get('button[ng-click="save()"]').click();
			cy.wait(500);
			// Đợi request nếu nó được gọi, hoặc tiếp tục nếu không
			cy.then(() => {
				if (apiCalled) {
					cy.wait('@postVoucher').then(interception => {
						const response = interception.response;

						// Log response để debug (tùy chọn)
						cy.log('Response:', response);

						// Kiểm tra mã status
						if (response.statusCode === 200) {
							throw new Error(`Lỗi: email đã tồn tại trong hệ thống mà thêm được`);
						} else {
							cy.log(`Đúng test case: email đã tồn tại trong hệ thống nên không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});
});
