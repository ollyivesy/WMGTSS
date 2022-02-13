const deleteEvent = require('./script')

test('properly delete event', () => {
    expect(deleteEvent(eventTitleInput.value = '').toBe(''))
})