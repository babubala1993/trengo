import { CustomChannelPage} from '../Pages/CustomChannelPage';
import { TeamsPage} from '../Pages/TeamsPage';

describe('Custom channel and team automation', () => {
    const customChannelPage = new CustomChannelPage();
    const teamsPage = new TeamsPage();
    const accessToken = '<<ACCESS TOKEN>>';
    const channelName = "channelAutomation";
    const teamName = "teamAutomation";

    beforeEach(function () {
        cy.visit('https://app.trengo.com')
        cy.get('[name="email"]').type('<<EMAIL>>');
        cy.get('[name="password"]').type('<<PASSWORD>>');
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