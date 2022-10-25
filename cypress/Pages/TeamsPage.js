import { CommonMethodPage } from './CommonMethodPage'

export class TeamsPage extends CommonMethodPage{

    createTeamAndVerify(teamName){
        this.waitForPageLoad()
        cy.visit('https://app.trengo.com/admin/teams')
        cy.get('.text-md > .btn').click()
        cy.get('[data-test="input"]').type(teamName)
        cy.get('[data-test=create-team-members]').click();
        cy.get('.multiselect__option').contains('Babu Balamurugan').click()
        cy.get('[data-test=create-team-channels]').click();
        cy.get('.multiselect__option').contains('Email').click();
        cy.get('[data-test=create-team-modal-submit]').click({ force: true });
        cy.get('.growl-message').should('be.visible').and('contain', 'Team was created successfully')
        return this;
    }

    deleteCreatedTeamAndVerify(teamName, accessToken){
        cy.url().then((value) => {
            var id = value.slice('35')
            cy.request({
                method: 'DELETE',
                url: "https://app.trengo.com/api/v2/teams/" + id,
                headers: {
                    'Authorization': "Bearer " + accessToken
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
                cy.reload();
                cy.get('.row-inner li').should('not.contain',teamName)
            })
        })
        return this;
    }
}
