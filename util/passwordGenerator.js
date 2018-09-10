
function getRandomChar() {
	var ascii = [[48, 57],[64,90],[97,122]];
	var i = Math.floor(Math.random()*ascii.length);
	return String.fromCharCode(Math.floor(Math.random()*(ascii[i][1]-ascii[i][0]))+ascii[i][0]);
}

function newPass(){

	var s = '';

	for (var i= 0; i<8; i++) {
		s += getRandomChar();
	}
	
	return s;
};


module.exports =  {
  
  newPass:newPass

};