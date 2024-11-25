var position = 0;
var lightArray = ['green','yellow','red'];

const change = () => {
	var lights = document.getElementsByClassName('light');
	lights.item(0).removeAttribute('id');
	lights.item(1).removeAttribute('id');
	lights.item(2).removeAttribute('id');
	
	position += 1;
	
	if (position >= 3)
		position = 0
	
	lights.item(position).setAttribute('id',lightArray[position]);
}