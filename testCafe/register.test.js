import { Selector } from 'testcafe';

fixture`Register testing`
    .page`http://localhost:7002/register`;

test('Register name', async t => {
    await t
        .typeText('#name', 'John Smith')
        .expect(Selector('#name').value).eql('John Smith');
});

test('Register password', async t => {
    await t
        .typeText('#password', 'Top secret password')
        .expect(Selector('#password').value).eql('Top secret password');
});