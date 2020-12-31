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
	else{
		MoveActiveTile(key);
	}
} );



let tile_arr = []; //scope
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
	//Active tile highlighting
	if(ac){
		ac.remove();
		ActiveTile(tile_w, nineth_grid_x, nineth_grid_y);
	}
	else{
		ActiveTile(tile_w, nineth_grid_x, nineth_grid_y);
	}

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
function ActiveTile(tile_wh, x, y){
	ac = document.createElement("DIV");
	ac.style.width = tile_wh + "px";
	ac.style.height = tile_wh + "px";
	ac.style.border = "5px dotted red";
	ac.style.position = "absolute";
	ac.style.left = x;
	ac.style.top = y;	
	document.body.appendChild(ac);

}

//move ac only on tile elements, so that you can interact with them once you are on them.
function MoveActiveTile(key){
	if(key== 37){
		ac.style.left = String((Number(ac.style.left.replace("px", "")) - 40)) + "px";
	}
	else if(key == 38){
	}
	else if(key == 39){
	}
	else if(key == 40){
	}
}
