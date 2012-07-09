$(document).ready(function(){
	var emptySquare = $('#gameField .square.empty');

	var randomValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];//.sort(Math.round(Math.random())-0.5);

	var emptyIndex = parseInt(emptySquare.attr('data-index'));

	var sequenceLength = 0;

	for(var i = 1; i < 16;i++){
		var value = randomValues.pop();
		$('#gameField').append('<div class="square" data-index="'+i+'" data-value="'+value+'"><h3>'+value+'</h3></div>');
	}
	toggleMoveClasses(emptyIndex);


	$('#gameField').on('click','.square',function(){
			var squareIndex = parseInt($(this).attr('data-index'));
			if(emptyIndex +1 == squareIndex || emptyIndex -1 == squareIndex ||
			 emptyIndex + 4 == squareIndex || emptyIndex -4 == squareIndex){

				emptySquare.html($(this).html());
				$(this).html('');

				emptySquare.attr('data-value',$(this).attr('data-value'));
				$(this).attr('data-value',16);

				emptySquare.removeClass('empty');
				$(this).addClass('empty');
				emptySquare = $(this);

				emptyIndex = parseInt(emptySquare.attr('data-index'));



				toggleMoveClasses(emptyIndex);
			 	sequenceLength = winCheck($('#gameField .square'));
				$('#gameStatus .sequenceLength-js').text(sequenceLength);
				$('#gameStatus .sequenceRemaining-js').text(15 - sequenceLength);
			}
	});
});

function toggleMoveClasses(emptyIndex){
	$('#gameField .square').removeClass('over under left right');
	$('#gameField .square[data-index="'+(parseInt(emptyIndex) +1)+'"]').addClass('right');
	$('#gameField .square[data-index="'+(parseInt(emptyIndex) +4)+'"]').addClass('under');
	$('#gameField .square[data-index="'+(parseInt(emptyIndex) -1)+'"]').addClass('left');
	$('#gameField .square[data-index="'+(parseInt(emptyIndex) -4)+'"]').addClass('over');
}

function winCheck(squareElements){
	var value = 0;
	var i = 0;
	for(; i < squareElements.length && value +1 == parseInt($(squareElements[i]).attr('data-value'));i++){
		value++;
	}
	return i;
}