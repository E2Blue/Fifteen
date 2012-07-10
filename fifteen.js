
var fifteenGame = {
	emptytile: null,
	values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
	emptyIndex: 0,
	correctSequenceLength: 0,
	init: function(){
		for(var i = this.values.length; i > 0;i--){
			var value = this.values.splice(Math.floor(Math.random() * i),1);
			$('#gameField').append('<div class="tile" data-index="'+(16 -i)+'" data-value="'+value+'"><h3>'+value+'</h3></div>');
		}
		this.emptytile = $('#gameField .tile.empty');
		this.toggleClassesAroundEmpty();
	},
	toggleClassesAroundEmpty: function(){
			$('#gameField .tile').removeClass('over under left right');
			$('#gameField .tile[data-index="'+(parseInt(this.emptyIndex) +1)+'"]').addClass('right');
			$('#gameField .tile[data-index="'+(parseInt(this.emptyIndex) +4)+'"]').addClass('under');
			$('#gameField .tile[data-index="'+(parseInt(this.emptyIndex) -1)+'"]').addClass('left');
			$('#gameField .tile[data-index="'+(parseInt(this.emptyIndex) -4)+'"]').addClass('over');
	},
	winCheck: function(){
		var tileElements = $('#gameField .tile'); 
		var value = 0;
		var i = 0;
		$(tileElements).removeClass('correct');
		for(; i < tileElements.length && value +1 == parseInt($(tileElements[i]).attr('data-value'));i++){
			value++;
			$(tileElements[i]).addClass('correct');
		}
		return i;
	},
	tileClick: function(){
		var tileIndex = parseInt($(this).attr('data-index'));
		if(fifteenGame.emptyIndex +1 == tileIndex || fifteenGame.emptyIndex -1 == tileIndex ||
		 fifteenGame.emptyIndex + 4 == tileIndex || fifteenGame.emptyIndex -4 == tileIndex){
			fifteenGame.emptytile.html($(this).html());
			$(this).html('');

			fifteenGame.emptytile.attr('data-value',$(this).attr('data-value'));
			$(this).attr('data-value',16);

			fifteenGame.emptytile.removeClass('empty');
			$(this).addClass('empty');
			fifteenGame.emptytile = $(this);

			fifteenGame.emptyIndex = parseInt(fifteenGame.emptytile.attr('data-index'));

			fifteenGame.toggleClassesAroundEmpty();
		 	fifteenGame.sequenceLength = fifteenGame.winCheck();
		 	if(sequenceLength >= 15){
		 		$('#gameField').off('click','.tile',fifteenGame.tileClick);
		 	}
			$('#gameStatus .sequenceLength-js').text(fifteenGame.sequenceLength);
			$('#gameStatus .sequenceRemaining-js').text(15 - fifteenGame.sequenceLength);
		}
	}
};
