import { CustomChannelPage} from '../Pages/CustomChannelPage';
import { TeamsPage} from '../Pages/TeamsPage';

describe('Custom channel and team automation', () => {
    const customChannelPage = new CustomChannelPage();
    const teamsPage = new TeamsPage();
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWM2Njc0M2IwZjEwZTI5N2MyMDU2YWMyZmFiMjk5OWI2N2Q0NTg1NWIyNTY1MjA2MzNjOGUyMjBiMGQwMWIyYzRlNDkxMDI5Yjk4NzI2NmUiLCJpYXQiOjE2NjY2Mjk2MzAuMzYxMzExLCJuYmYiOjE2NjY2Mjk2MzAuMzYxMzE1LCJleHAiOjE2OTgxNjU2MzAuMzU1OTc0LCJzdWIiOiI1NTc1MjQiLCJzY29wZXMiOltdfQ.bt3qEVIB8vxUlH6QcRJWoqnMCvIQuanRqc1JDatIa1TyzCzWOOHwp0v_EMVx4kNIHNoXADmL_Ee_ejEc52UsyA';
    const channelName = "channelAutomation";
    const teamName = "teamAutomation";

    beforeEach(function () {
        cy.visit('https://app.trengo.com')
        cy.get('[name="email"]').type('babubalamurugan93@gmail.com');
        cy.get('[name="password"]').type('Pass@1602');
        cy.get('[type="submit"]').click();
    })

    it('custom channel creation and verification of incoming message', function () {
        customChannelPage.createCustomChannel(channelName, accessToken)
        .getIdentifierAndPostCustomMessage(accessToken)
        .navigateToInboxAndVerifyMessageReceived(channelName)
        .deleteCreatedCustomChannelAndVerify(channelName)
    })

    it('team creation and verification', function () {
       teamsPage.createTeamAndVerify(teamName)
       .deleteCreatedTeamAndVerify(teamName, accessToken)
    })

})