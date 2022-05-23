import { Selector } from 'testcafe';

fixture`Login testing`
    .page`http://localhost:4200/register`;

test('Register name', async t => {
    await t
        .typeText('#name', 'John Smith')

        // Use the assertion to check if the actual header text is equal to the expected one
        .expect(Selector('#name').value).eql('John Smith');
});

test('Register password', async t => {
    await t
        .typeText('#password', 'Top secret password')
        // Use the assertion to check if the actual header text is equal to the expected one
        .expect(Selector('#password').value).eql('Top secret password');
});