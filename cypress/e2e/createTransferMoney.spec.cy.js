function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomNum = getRandomInt(1, 100);
// get date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
const day = currentDate.getDate();

// Format the date as per your requirements
const formattedDate = `${day}/${month}/${year}`;


describe('Tạo đơn hàng Eload', () => {
  beforeEach(()=>
  {
    cy.viewport(1920,1024);
    // cy.visit('http://192.168.100.192:1999/');
    cy.visit('http://192.168.100.192:1999/');
     //login
     cy.get('#exampleInputEmail1').type('hangptdv');
     cy.get('#exampleInputPassword1').type('123456');
     cy.get('.btn-success').click();
     cy.wait(300);
     //click list order
    
     cy.get('.app-sidebar__heading').contains('Mua/Bán hàng hoá Viễn thông');
     
  })
  it('Tạo đơn hàng với trạng thái Mới tạo', () => {
    cy.get('li:contains("Đơn hàng Airtime, Eload")').click()
     .children('ul.mm-collapse')
     .invoke('css', 'display', 'block')
     .find('a:contains("Thêm mới")')
     .click();
     cy.wait(300);
   cy.get('#providerId_chosen').click().type('AirtimeVNP{enter}');
   cy.wait(500);
   cy.get('#inputProduct_chosen').click().type('Eload Vinaphone {enter}');
 

   //Chọn pháp nhân bán
   cy.get('#merchantSale_chosen').click().type('IMEDIA {enter}');
   cy.get('#phoneNumberConnection_chosen').click().type('Imedia - {enter}');
   cy.get('#merchantBuy_chosen').click().type('PCQ{enter}');
   cy.get('#phoneNumber_chosen').click().type('0833322312{enter}');

   //Nhập số lượng
   cy.get('.product-row').each(($row, index) => {
    cy.wrap($row)
      .find('.product-value')
      .then(($price) => {
        if ($price.text().includes("1")) 
        {
          cy.get('.quantity-' + index).click().type(randomNum * 10000);

        } 
      });
  });

  //Nhập chiết khấu
  cy.get('.product-row').each(($row, index) => {
    cy.wrap($row)
      .find('.product-value')
      .then(($price) => {
        if ($price.text().includes("1")) 
        {
          cy.get('.commission-' + index).click().type('2.5');

        } 
      });
  });
  cy.get('#sale-note').type('Hangptt test xuất hóa đơn ELOAD' + " "+ randomNum + randomNum + " ngày " + formattedDate);
  // click button 'Gửi duyệt'
  // cy.get('button').contains('Lưu tạm').click();
  cy.get('button').contains('Gửi duyệt').click();
  cy.wait(500);


  });
  it.skip('Chỉnh sửa đơn hàng thành trạng thái Gửi duyệt', () => {
    cy.get('li:contains("Đơn hàng Airtime, Eload")').click()
     .children('ul.mm-collapse')
     .invoke('css', 'display', 'block')
     .find('a:contains("Danh sách")')
     .click();
     cy.wait(300);
    //Lọc đơn Lưu tạm
    cy.get('#status_chosen').click().type('Mới tạo{enter}');
    cy.get('#searchListOrder').click();
    cy.wait(300);
    //Chọn chỉnh sửa
    cy.get('td.text-center').eq(0).click();
   
    cy.wait(300);

  



  //Nhập số lượng
  cy.get('.product-row').each(($row, index) => {
    cy.wrap($row)
      .find('.product-value')
      .then(($price) => {
        if ($price.text().includes("1")) 
        {
          cy.get('.quantity-' + index).clear().type('1000000');

        } 
      });
  });

  //Nhập chiết khấu
  cy.get('.product-row').each(($row, index) => {
    cy.wrap($row)
      .find('.product-value')
      .then(($price) => {
        if ($price.text().includes("1")) 
        {
          cy.get('.commission-' + index).clear().type('2.3');

        } 
      });
  });
  // cy.get('#sale-note').clear().type('Hangptt test xuất hóa đơn ELOAD' + " "+ randomNum + randomNum + " ngày " + formattedDate);
  // click button 'Gửi duyệt'
  // cy.get('button').contains('Lưu tạm').click();
  cy.get('button').contains('Gửi duyệt').click();
  cy.wait(500);
        


  });

});
