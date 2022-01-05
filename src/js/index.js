import { test } from './module/_sub';
import '@scss/style.scss';

const text = () => {
	$('#myText').text();
	$('#myText').empty().show();
};

const init = async () => {
	console.log('hello from app.js');
	await asyncFn();
};

async function asyncFn() {
	console.log([1, 2, 3].includes(0));
}

init();
test();
text();
