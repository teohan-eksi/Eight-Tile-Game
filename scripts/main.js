/*Eight Tile Game
 *
 */

var ng_btn = document.getElementById("new_game_btn");
ng_btn.onclick = NewGame;

document.addEventListener('keydown', function(event){
    let key = event.which || event.keyCode;
	
	if(key == 78){// code for 'N'.
		NewGame();
	}
	else if(key == 32){// code for 'space bar'.
		MoverandShaker();//moves tiles.
	}
	else{
		MoveActiveTile(key);//only works if the 'key' is one of the arrow keys.
	}
} );

let tile_arr = []; //an array for tile DOM elements on the board (1,2,...,8)
function NewGame(){
	var board = document.getElementById("board");
	
	//offset values for positioning the tiles relative to the borders of the board.
	//frame width ratio: the ratio of one of the board's frames' width to the board's overall width.
	const frame_w_ratio = 1/50;
	var x_off = board.offsetLeft + board.width*frame_w_ratio;
	var y_off =	board.offsetTop + board.width*frame_w_ratio;
	
	//get the tile width. tile width = tile height.
	let tile_w = document.getElementById("tile1").clientWidth;
	
	//get an array of unique random integers
	let rndm_int_arr = RandomIntArr(1,9);

	//set up the tiles on the board. 
	let tile_elem; //DOM element
	let i = 0;
	for(i; i<8; i++){//there are 8 tiles, constant.
		tile_elem = document.getElementById("tile" + String(rndm_int_arr[i]));

		//3 tiles per row -> (i%3)
		tile_elem.style.left = String(x_off + (i%3) * tile_w) + "px";	
		//put 3 tiles in a row, drop exactly one tile height and repeat.
		tile_elem.style.top = String(y_off + ( Math.floor(i/3) * tile_w)) + "px";
		
		tile_arr[i] = tile_elem;//to be used when moving the tiles around.
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
//console.log(k); //between 9 and 15
	return int_arr;
}

//active tile highlighter element
let ac;
let ac_index = 8; //by default at the end.
function ActiveTile(tile_wh, x, y){
	ac = document.createElement("DIV");
	ac.style.width = tile_wh + "px";
	ac.style.height = tile_wh + "px";
	ac.style.border = "4px dotted red";
	ac.style.position = "absolute";
	ac.style.left = x; //nineth grid coordinates
	ac.style.top = y;	
	document.body.appendChild(ac);
	//realigns the index to the nineth grid when 'N' is pressed.
	ac_index = 8;
}

let empty_elem;
let empty_index = 8; //by default it's on the nineth grid.
function EmptyElem(tile_wh, x, y){
	//create an element for the empty grid and place it on the 9th grid to manipulate as an empty grid.
	//emptiness is not the absence of elements but the existence of an empty element.
	empty_elem = document.createElement("DIV");
	empty_elem.style.width = tile_wh + "px";
	empty_elem.style.height = tile_wh + "px";
	empty_elem.style.position = "absolute";
	empty_elem.style.left = x;
	empty_elem.style.top = y;	
	document.body.appendChild(empty_elem);
	empty_index = 8; //realigning to the nineth grid for a new game.
	tile_arr[empty_index] = empty_elem; //add the empty element to the elements array.
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

//called upon pressing 'space bar'
function MoverandShaker(){
let dummy_i;
let dummy_elem;
	//how to actually know that ac and empty tile on the same row?
	if((ac_index - empty_index) > -3 && (ac_index - empty_index) < 0){
		dummy_elem = tile_arr[empty_index];
		dummy_pos = dummy_elem.style.left;
		
		tile_arr[empty_index].style.left = tile_arr[empty_index-1].style.left;
		tile_arr[empty_index-1].style.left = dummy_pos;

		tile_arr[empty_index] = tile_arr[empty_index-1];
		tile_arr[empty_index-1] = dummy_elem;

		empty_index--;
		dummy_elem = null;
		dummy_pos = null;
	}else if((ac_index - empty_index) < 3 && (ac_index - empty_index) > 0){
		dummy_elem = tile_arr[empty_index];
		dummy_pos = dummy_elem.style.left;
		
		tile_arr[empty_index].style.left = tile_arr[empty_index+1].style.left;
		tile_arr[empty_index+1].style.left = dummy_pos;

		tile_arr[empty_index] = tile_arr[empty_index+1];
		tile_arr[empty_index+1] = dummy_elem;

		empty_index++;
		dummy_elem = null;
		dummy_pos = null;
	}else if((ac_index - empty_index) == -3 || (ac_index - empty_index) == -6){
		dummy_elem = tile_arr[empty_index];
		dummy_pos = dummy_elem.style.top;
		
		tile_arr[empty_index].style.top = tile_arr[empty_index-3].style.top;
		tile_arr[empty_index-3].style.top = dummy_pos;

		tile_arr[empty_index] = tile_arr[empty_index-3];
		tile_arr[empty_index-3] = dummy_elem;

		empty_index -= 3;
		dummy_elem = null;
		dummy_pos = null;
	}else if((ac_index - empty_index) == 3 || (ac_index - empty_index) == 6){
		dummy_elem = tile_arr[empty_index];
		dummy_pos = dummy_elem.style.top;
		
		tile_arr[empty_index].style.top = tile_arr[empty_index+3].style.top;
		tile_arr[empty_index+3].style.top = dummy_pos;

		tile_arr[empty_index] = tile_arr[empty_index+3];
		tile_arr[empty_index+3] = dummy_elem;

		empty_index += 3;
		dummy_elem = null;
		dummy_pos = null;
	}
}
