import { CommonMethodPage } from './CommonMethodPage'

export class CustomChannelPage extends CommonMethodPage{

    dayjs = require('dayjs')

    createCustomChannel(channelName) {
        this.waitForPageLoad()
        cy.visit('https://app.trengo.com/admin/channels2/custom/create')
        cy.get('.col-sm-10 > .form-control').clear().type(channelName)
        cy.get('.multiselect__tag').should('be.exist')
        cy.get('[type="submit"]').contains('Create channel').click();
        cy.get('.growl-message').should('be.visible').and('contain', 'The channel has been created successfully')
        return this;
    }

    getIdentifierAndPostCustomMessage(accessToken) {
        cy.get('.p-3.mt-2').then((value) => {
            let identifier = value.text();
            this.storeCustomMessage(identifier, accessToken)
            this.getChannelID()
        })
        return this;
    }

    storeCustomMessage(identifier, accessToken) {
        const url = 'https://app.trengo.com/api/v2/custom_channel_messages';
        cy.request({
            method: 'POST',
            url: url,
            headers: {
                'Authorization': "Bearer " + accessToken
            },
            body: {
                'contact': {
                    'name': "Test Custom Automation",
                    'email': "test@test.com",
                    'identifier': "custom-asdfghjklzxcv"
                },
                'body': {
                    'text': "Test message custom channel automation"
                },
                'channel': identifier
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
        })
    }

    getChannelID() {
        cy.url().then((value) => {
            const id = value.slice('46')
            cy.wrap(id).as('id');
        })
    }

    navigateToInboxAndVerifyMessageReceived(channelName) {
        cy.get('.main-nav-desktop-placeholder .selector-navigate-inbox').click();
        this.waitForPageLoad()
        cy.get('.inbox .list-item').eq(0).should('contain', channelName)
        var date = this.dayjs().format('DD-MM-YYYY, HH:mm')
        cy.get('.inbox .list-item').eq(0).should('contain', date)
        return this;
    }

    deleteCreatedCustomChannelAndVerify(channelName) {
        cy.get('@id').then(id => {
            cy.visit('https://app.trengo.com/admin/channels2/custom/' + id)
            cy.get('.btn-link').click();
            cy.get('.t-alert-confirm-btn').click();
            cy.get('.growl-message').should('be.visible').and('contain', 'The channel has been deleted successfully')
        });
        cy.visit('https://app.trengo.com/admin/channels2/custom')
        cy.get('.row-inner li').should('not.contain',channelName)
        return this;
    }
}