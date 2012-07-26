// print process._debugger.start(
/*args = function(){
	process.argv.forEach(function(val, index, array){
		//console.log(index + ": " + val)
	});
	return process.argv;
}();*/

var single = (function(){
	function pFunc() {
		return "Hello World!";
	}
	return pFunc();
})();

module.exports = single;