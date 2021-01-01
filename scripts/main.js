/* 
 *clean and comment 
 */

var ng_btn = document.getElementById("new_game_btn");
ng_btn.onclick = NewGame;

document.addEventListener('keydown', function(event){
    let key = event.which || event.keyCode;
	
	if(key == 78){// code for 'N'.
		NewGame();
	}
	else if(key == 32){
		MoverandShaker();
	}
	else{
		MoveActiveTile(key);
	}
} );



let tile_arr = []; //tile DOM elements randomly placed on the board
function NewGame(){
	var board = document.getElementById("board");
	
	//for relative positioning
	var x_off = board.offsetLeft;//recalculate with board borders. 1/50  
	var y_off =	board.offsetTop;
	
	//get the tile width, here. tile width, should be, = height.
	let tile_w = document.getElementById("tile1").clientWidth;
	
	//get an array of unique random integers
	let rndm_int_arr = RandomIntArr(1,9);
	
	let tile_elem; //DOM element
	let i = 0;
	for(i; i<8; i++){//there are 8 tiles, constant.
		tile_elem = document.getElementById("tile" + String(rndm_int_arr[i]));

		//3 tiles per row -> (i%3)
		tile_elem.style.left = String(x_off + (i%3) * tile_w) + "px";	
		//put 3 tiles in a row, drop exactly one tile height and repeat.
		tile_elem.style.top = String(y_off + ( Math.floor(i/3) * tile_w)) + "px";
		
		tile_arr[i] = tile_elem;
	}

	let nineth_grid_x = String(x_off + 2*tile_w + "px");
	let nineth_grid_y = String(y_off + 2*tile_w + "px");

	if(ac || empty_elem){
		ac.remove();
		empty_elem.remove();
	}

	//Active tile highlighting
	ActiveTile(tile_w, nineth_grid_x, nineth_grid_y);
	//Empty element
	EmptyElem(tile_w, nineth_grid_x, nineth_grid_y);
}

function RandomIntArr(a, b){
	//fill an array with random unique integers from a (inclusive) to b (exclusive).
	let int_arr = [];
	let arr_size = b-a;

	b--;//excluding 'b'.

let k = 0;	
	while(int_arr.length<arr_size){
		//Math.random gives a number between 0 and 1 inclusive.
		//k_rand is a random integer number between a to b, both inclusive.
		var k_rand = Math.floor(a + (Math.random() * b));
	
		if(int_arr.includes(k_rand) && !(int_arr.includes(b))){
			int_arr.push(b);
			b--;
		}
		else if(!int_arr.includes(k_rand)){
			int_arr.push(k_rand);
		}
		else if(int_arr.includes(b)){
			b--;
		}

k++;
	}
//alert(k);between 9 and 15
	return int_arr;
}

let ac;
let ac_index = 8;
function ActiveTile(tile_wh, x, y){
	ac = document.createElement("DIV");
	ac.style.width = tile_wh + "px";
	ac.style.height = tile_wh + "px";
	ac.style.border = "5px dotted red";
	ac.style.position = "absolute";
	ac.style.left = x;
	ac.style.top = y;	
	document.body.appendChild(ac);
	ac_index = 8;// realign the index.
}

let empty_elem;
let empty_index = 8; //by default it's on the nineth grid.
function EmptyElem(tile_wh, x, y){
	//create an element for the empty grid and place it on the 9th grid to manipulate the empty grid.
	//emptiness is not the absence of elements but the existence of an empty element.
	empty_elem = document.createElement("DIV");
	empty_elem.style.width = tile_wh + "px";
	empty_elem.style.height = tile_wh + "px";
	empty_elem.style.position = "absolute";
	empty_elem.style.left = x;
	empty_elem.style.top = y;	
	document.body.appendChild(empty_elem);
	tile_arr[8] = empty_elem; //add the empty element to the elements array.
}

/* move ac only on tile elements, so that you can interact with them once you are on them.
 * there are only 9 possible grids that the ac can be in. 
 * By default it's in the 9th grid (8th element of the element array).
 */

function MoveActiveTile(key){
	if(key == 37 && (ac_index != 0 && ac_index != 3 && ac_index != 6)){// left arrrow
		ac_index--;
		ac.style.left = tile_arr[ac_index].style.left;
	}
	else if(key == 38 && (ac_index != 0 && ac_index != 1 && ac_index !=2)){//up arrow
		ac_index -= 3;
		ac.style.top = tile_arr[ac_index].style.top;
	}
	else if(key == 39 && (ac_index != 2 && ac_index != 5 && ac_index != 8)){//right arrow
		ac_index++;
		ac.style.left = tile_arr[ac_index].style.left;

	}
	else if(key == 40 && (ac_index != 6 && ac_index != 7 && ac_index != 8)){//down arrow
		ac_index += 3;
		ac.style.top = tile_arr[ac_index].style.top;
	}
}

function MoverandShaker(){
let dummy_i=0;
console.log(ac_index, empty_index);	
	if((ac_index - empty_index) > -3 && (ac_index - empty_index) < 0){
		console.log("h-lr");
		
	}else if((ac_index-empty_index) % 3 == 0  ){
		console.log("v");
	}

}
