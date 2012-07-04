$(document).ready(function(){

	var fifteenGame = {
		emptySquare: null,
		values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		emptyIndex: 0,
		correctSequenceLength: 0,
		init: function(){
			for(var i = 1; i < this.values.length;i++){
				//var value = this.values.splice(baserat på random 0 - i,1);
				var value = this.values.pop();
				$('#gameField').append('<div class="square" data-index="'+i+'" data-value="'+value+'"><h3>'+value+'</h3></div>');
			}
			this.emptySquare = $('#gameField .square.empty');
			this.toggleClassesAroundEmpty();
		},
		toggleClassesAroundEmpty: function(){
				$('#gameField .square').removeClass('over under left right');
				$('#gameField .square[data-index="'+(parseInt(this.emptyIndex) +1)+'"]').addClass('right');
				$('#gameField .square[data-index="'+(parseInt(this.emptyIndex) +4)+'"]').addClass('under');
				$('#gameField .square[data-index="'+(parseInt(this.emptyIndex) -1)+'"]').addClass('left');
				$('#gameField .square[data-index="'+(parseInt(this.emptyIndex) -4)+'"]').addClass('over');
		},
		winCheck: function(){
			var squareElements = $('#gameField .square'); 
			var value = 0;
			var i = 0;
			$(squareElements).removeClass('correct');
			for(; i < squareElements.length && value +1 == parseInt($(squareElements[i]).attr('data-value'));i++){
				value++;
				$(squareElements[i]).addClass('correct');
			}
			return i;
		}
	};

	$('#gameField').on('click','.square',function(){
			var squareIndex = parseInt($(this).attr('data-index'));
			if(fifteenGame.emptyIndex +1 == squareIndex || fifteenGame.emptyIndex -1 == squareIndex ||
			 fifteenGame.emptyIndex + 4 == squareIndex || fifteenGame.emptyIndex -4 == squareIndex){
				fifteenGame.emptySquare.html($(this).html());
				$(this).html('');

				fifteenGame.emptySquare.attr('data-value',$(this).attr('data-value'));
				$(this).attr('data-value',16);

				fifteenGame.emptySquare.removeClass('empty');
				$(this).addClass('empty');
				fifteenGame.emptySquare = $(this);

				fifteenGame.emptyIndex = parseInt(fifteenGame.emptySquare.attr('data-index'));



				fifteenGame.toggleClassesAroundEmpty();
			 	fifteenGame.sequenceLength = fifteenGame.winCheck();
				$('#gameStatus .sequenceLength-js').text(fifteenGame.sequenceLength);
				$('#gameStatus .sequenceRemaining-js').text(16 - fifteenGame.sequenceLength);
			}
	});

	fifteenGame.init();
});