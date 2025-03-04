describe('Tên đăng nhập', () => {
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

	it('test case 1: Tên nhân đăng nhập hợp lệ', () => {

		cy.fixture('tin/them nhan vien/1 ten dang nhap/test_case_1.json').then(data => {
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
							cy.log(`Đúng test case: thêm nhân viên thành công`);
						} else {
							throw new Error(`Lỗi: không thêm được nhân viên khi đúng dữ liệu`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}

				cy.wait(1500);
			});
		});
	});

	it('test case 2: Tên nhân đăng nhập để trống', () => {

		cy.fixture('tin/them nhan vien/1 ten dang nhap/test_case_2.json').then(data => {
			// cy.log(data.userName);

			cy.get('input[ng-model="user.UserName"]').clear();
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
							throw new Error(`Lỗi: tên đăng nhập để trống mà thêm được nhân viên`);
						} else {
							cy.log(`Đúng test case: tên đăng nhập để trống thì không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 3: Tên nhân đăng nhập chứa khoản trắng', () => {

		cy.fixture('tin/them nhan vien/1 ten dang nhap/test_case_3.json').then(data => {
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
							throw new Error(`Lỗi: tên đăng nhập chứa khoản trắng mà thêm được nhân viên`);
						} else {
							cy.log(`Đúng test case: tên đăng nhập chứa khoản trắng thì không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 4: Tên nhân đăng nhập chứa ký tự unicode', () => {

		cy.fixture('tin/them nhan vien/1 ten dang nhap/test_case_4.json').then(data => {
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
							throw new Error(`Lỗi: tên đăng nhập chứa ký tự unicode mà thêm được nhân viên`);
						} else {
							cy.log(`Đúng test case: tên đăng nhập chứa ký tự unicode thì không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 5: Tên nhân đăng nhập chứa ký tự đặc biệt', () => {

		cy.fixture('tin/them nhan vien/1 ten dang nhap/test_case_5.json').then(data => {
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
							throw new Error(`Lỗi: tên đăng nhập chứa ký tự đặc biệt mà thêm được nhân viên`);
						} else {
							cy.log(`Đúng test case: tên đăng nhập chứa ký tự đặc biệt thì không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 6: Tên nhân đăng nhập có chiều dài nhỏ hơn 6 ký tự', () => {

		cy.fixture('tin/them nhan vien/1 ten dang nhap/test_case_6.json').then(data => {
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
							throw new Error(`Lỗi: tên đăng nhập có chiều dài nhỏ hơn 6 ký tự mà thêm được nhân viên`);
						} else {
							cy.log(`Đúng test case: tên đăng nhập có chiều dài nhỏ hơn 6 ký tự thì không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 7: Tên nhân đăng nhập có chiều dài 19 ký tự', () => {

		cy.fixture('tin/them nhan vien/1 ten dang nhap/test_case_7.json').then(data => {
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
							throw new Error(`Lỗi: tên đăng nhập có chiều dài 19 ký tự mà thêm được nhân viên`);
						} else {
							cy.log(`Đúng test case: tên đăng nhập có chiều dài 19 ký tự thì không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 8: Tên nhân đăng nhập bắt đầu bằng một chữ số', () => {

		cy.fixture('tin/them nhan vien/1 ten dang nhap/test_case_8.json').then(data => {
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
							throw new Error(`Lỗi: tên đăng nhập bắt đầu bằng một chữ số mà thêm được nhân viên`);
						} else {
							cy.log(`Đúng test case: tên đăng nhập bắt đầu bằng một chữ số thì không thêm được`);
						}
					});
				} else {
					cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
				}
				cy.wait(1500);
			});
		});
	});

	it('test case 8: Tên nhân đăng nhập đã tồn tại', () => {

		cy.fixture('tin/them nhan vien/1 ten dang nhap/test_case_9.json').then(data => {
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
							throw new Error(`Lỗi: tên đăng nhập đã tồn tại mà thêm được nhân viên`);
						} else {
							cy.log(`Đúng test case: tên đăng nhập tồn tại thì không thêm được`);
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
