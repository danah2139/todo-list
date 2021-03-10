const { addItem, deleteItem } = require('./index');

test('testing if item is added to list', () => {
	expect(addItem(2, 'test', false, '0', '02/02/2020')).toEqual({
		id: 2,
		taskName: 'test',
		isCompleted: false,
		prioritize: '0',
		date: '02/02/2020',
	});
});

test('testing if item is deleted from the list', () => {
	expect(deleteItem(3)).toEqual(0);
});
