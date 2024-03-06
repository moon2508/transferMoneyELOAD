describe('Duyệt đơn hàng Airtime Eload', () => {
    beforeEach(() => {
        cy.viewport(1920, 1024);
        // cy.visit('http://192.168.100.192:1999/');
        cy.visit('http://192.168.100.192:1999/');
        //login
        cy.get('#exampleInputEmail1').type('haptdv');
        cy.get('#exampleInputPassword1').type('123456');
        cy.get('.btn-success').click();
        cy.wait(300);
        //click list order
        cy.get('.app-sidebar__heading').contains('Mua/Bán hàng hoá Viễn thông');
        cy.get('li:contains("Đơn hàng Airtime, Eload")').click()
            .children('ul.mm-collapse')
            .invoke('css', 'display', 'block')
            .find('a:contains("Danh sách")')
            .click();

        //filter about status
        cy.get('#status_chosen').click().type('Chờ duyệt{enter}');
        cy.get('#searchListOrder').click();
        cy.wait(300);

    })
    it('Duyệt đơn hàng', () => {


        //detail order
        cy.get('td.text-center').eq(1).click();
        cy.wait(300);
        cy.get('button').contains('Duyệt').click();
        cy.get('#contentApproveOrderEload').click().type('123456');
        cy.get('button.btn.btn-danger').eq(3).contains('Đồng ý').click();


        cy.wait(600);
        // cy.get('button').contains('Quay lại').click();

    });
    it.skip('Từ chối đơn hàng', () => {


        //detail order
        cy.get('td.text-center').eq(1).click();
        cy.wait(300);
        cy.get('button').contains('Từ chối').click();
        cy.wait(600);
        // cy.get('button').contains('Quay lại').click();

    });


})