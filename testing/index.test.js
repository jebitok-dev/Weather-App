const string = require('./index');

test('converts str into uppercase', () => {
    expect(string('Hello, World!')).toBe('HELLO, WORLD!');
});