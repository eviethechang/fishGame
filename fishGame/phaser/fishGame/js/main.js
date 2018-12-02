var game = new Phaser.Game(1300, 700, Phaser.Auto);
var total = 0;
var timer = 0;
var blop;
var playerScale = 0.12;
var playerVelocity = 300;
var baby = false;
var nomCount=0;
var sprite;

/*
function preload() {

    game.load.image('ball', 'assets/img/pinkOrb.png');
	game.load.spritesheet('koi', 'assets/img/KoiSwim.png', 1000, 400);
	game.load.image('water', 'assets/img/Water.png');
	game.load.image('duckweed', 'assets/img/Duckweed.png');
	game.load.image('lillypad', 'assets/img/lillypad.png');
	game.load.audio('blop', 'assets/audio/Blop.wav');
	game.load.audio('music', 'assets/audio/ZenMusic.mp3');
	game.load.spritesheet('koibaby', 'assets/img/KoiSwimBaby.png', 1000, 400);

}
*/

//Preloader State
var Preloader = function(game){};
Preloader.prototype = {
	preload: function(){
		//Loading Assets
		//game.load.atlas('atlas', 'assets/img/spritesheet.png', 'assets/img/sprites.json');
		console.log("hello");
		game.load.image('ball', 'assets/img/pinkOrb.png');
		game.load.spritesheet('koi', 'assets/img/KoiSwim.png', 1000, 400);
		game.load.image('water', 'assets/img/Water.png');
		game.load.image('duckweed', 'assets/img/Duckweed.png');
		game.load.image('lillypad', 'assets/img/lillypad.png');
		game.load.audio('blop', 'assets/audio/Blop.wav');
		game.load.audio('music', 'assets/audio/ZenMusic.mp3');
		game.load.spritesheet('koibaby', 'assets/img/KoiSwimBaby.png', 1000, 400);
		game.load.image('playButton', 'assets/img/playButton.png');
		game.load.image('mainMenu', 'assets/img/MainMenu.png');
		game.load.spritesheet('Title', 'assets/img/title.png', 1064, 384);
		game.load.spritesheet('Title2', 'assets/img/title2.png', 1230, 384);
		
	},
	create: function(){
		game.state.start('MainMenu');
	}
}

//Main Menu State
var MainMenu = function(game){};
MainMenu.prototype = {
	create: function(){
		console.log('MainMenu: create');
		
		//background for Menu
		var titleScreen = game.add.sprite(0, 0, 'mainMenu');
		
		//Game Title
		title = game.add.sprite(game.world.centerX, 300, 'Title');
		title.anchor.setTo(0.5,0.5);
		title.animations.add('idle', [0,1,0,2], 3, true);
		title.scale.setTo(.4, .4);
		title.animations.play('idle');
		
		//Play button, jumps to game when pressed
		var playButton = this.game.add.button(625,500,"playButton",this.playGame,this);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.setTo(.3,.3);
		
		//music
		music = game.add.audio('music');
		music.loop = true;
		music.play();
		
	
	},
	playGame: function(){
		game.state.start('Controls');
	}
}

//Control State
var Controls = function(game){};
Controls.prototype = {
	create: function(){
		//var instructions = this.game.add.sprite(0,0,"menu");
		
		var playButton = this.game.add.button(400,500,"playButton",this.playGame,this);
		playButton.anchor.setTo(0.5,0.5)
	},
	playGame: function(){
		game.state.start('Game');
	}
}

var Game = function(game){};
Game.prototype = {
	preload: function(){
		console.log('Game: preload');
	},
	create: function(){
	
		//music = game.add.audio('music');
		//music.loop = true;
		//music.play();

		var background = game.add.sprite(0, 0, 'water');
		background.scale.setTo(.9, 0.75);
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		foods = game.add.group();
		foods.enableBody = true;
		
		sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'koi');
		game.physics.arcade.enable(sprite);
		sprite.enableBody = true;
		sprite.body.setSize(300, 300,240,0);
		sprite.anchor.setTo(0.5, 0.5);
		sprite.angle = 90;
		sprite.scale.setTo(playerScale, playerScale);
		sprite.animations.add('swim', [0,1,2,3,4,3,2,1], 10, true);
		sprite.animations.add('idle', [0,1,2,3,4,3,2,1], 5, true);

		/*
		var duckweed = game.add.sprite(20,15, 'duckweed');
		duckweed.scale.setTo(0.25,0.25);
		var duckweed2 = game.add.sprite(650,420, 'duckweed');
		duckweed2.scale.setTo(0.3,0.3);
		duckweed2.angle = 67;
		var duckweed3 = game.add.sprite(950, 0, 'duckweed');
		duckweed3.scale.setTo(0.25, 0.25);
		duckweed3.angle = 55;
		var duckweed4 = game.add.sprite(650, 100, 'duckweed');
		duckweed4.scale.setTo(0.25, 0.25);
		duckweed4.angle = 25;
		var duckweed5 = game.add.sprite(840, 225, 'duckweed');
		duckweed5.scale.setTo(0.2, 0.2);
		duckweed5.angle = 75;
		var duckweed6 = game.add.sprite(200, 555, 'duckweed');
		duckweed6.scale.setTo(0.25, 0.25);
		duckweed6.angle = 100;
		var duckweed7 = game.add.sprite(350, 550, 'duckweed');
		duckweed7.scale.setTo(0.2, 0.2);
		duckweed7.angle = 118;
		*/
		
		var duckweed = game.add.sprite(game.world.randomX,game.world.randomY, 'duckweed');
		duckweed.scale.setTo(0.25,0.25);
		var duckweed2 = game.add.sprite(game.world.randomX,game.world.randomY, 'duckweed');
		duckweed2.scale.setTo(0.3,0.3);
		duckweed2.angle = 67;
		var duckweed3 = game.add.sprite(game.world.randomX,game.world.randomY, 'duckweed');
		duckweed3.scale.setTo(0.25, 0.25);
		duckweed3.angle = 55;
		var duckweed4 = game.add.sprite(game.world.randomX,game.world.randomY, 'duckweed');
		duckweed4.scale.setTo(0.25, 0.25);
		duckweed4.angle = 25;
		var duckweed5 = game.add.sprite(game.world.randomX,game.world.randomY, 'duckweed');
		duckweed5.scale.setTo(0.2, 0.2);
		duckweed5.angle = 75;
		var duckweed6 = game.add.sprite(game.world.randomX,game.world.randomY, 'duckweed');
		duckweed6.scale.setTo(0.25, 0.25);
		duckweed6.angle = 100;
		var duckweed7 = game.add.sprite(game.world.randomX,game.world.randomY, 'duckweed');
		duckweed7.scale.setTo(0.2, 0.2);
		duckweed7.angle = 118;
		
		lillypads = game.add.group();
		/*
		var lillypad = lillypads.create(720, 50, 'lillypad');
		lillypad.scale.setTo(0.4, 0.4);
		var lillypad2 = lillypads.create(850, 310, 'lillypad');
		lillypad2.scale.setTo(0.2, 0.2);
		lillypad2.angle = 275;
		var lillypad3 = lillypads.create(250, 600, 'lillypad');
		lillypad3.scale.setTo(0.3, 0.3);
		lillypad3.angle = 180;
		*/
		var lillypad4 = lillypads.create(game.world.randomX,game.world.randomY, 'lillypad');
		lillypad4.scale.setTo(0.3, 0.3);
		var lillypad5 = lillypads.create(game.world.randomX,game.world.randomY, 'lillypad');
		lillypad5.scale.setTo(0.2, 0.2);
		lillypad5.angle = 275;
		var lillypad6 = lillypads.create(game.world.randomX,game.world.randomY, 'lillypad');
		lillypad6.scale.setTo(0.3, 0.3);
		lillypad6.angle = 180;
		
		blop = game.add.audio('blop');
	},
	update: function(){
		
		sprite.rotation = game.physics.arcade.angleToPointer(sprite);
		if(baby==true){
			fishBaby.rotation = game.physics.arcade.angleToPointer(fishBaby);
		}
		
		//  only move when you click
		if (game.input.mousePointer.isDown)
		{
	 
			game.physics.arcade.moveToPointer(sprite, playerVelocity);
			sprite.animations.play('swim');
			if(baby == true){
				game.physics.arcade.moveToPointer(fishBaby, playerVelocity-50);
				fishBaby.animations.play('babyswim');
			}

			//  if it's overlapping the mouse, don't move any more
			if (Phaser.Rectangle.contains(sprite.body, game.input.x, game.input.y))
			{
				sprite.body.velocity.setTo(0, 0);
				sprite.animations.play('idle');
				if(baby == true){
					fishBaby.body.velocity.setTo(0,0);
					fishBaby.animations.play('babyidle');
				}
				
			}
		}
		else
		{
			sprite.body.velocity.setTo(0, 0);
			sprite.animations.play('idle');
			if(baby==true){
				fishBaby.body.velocity.setTo(0,0);
				fishBaby.animations.play('babyidle');
			}
		}
		
		if (total < 5 && game.time.now > timer)
		{
			this.spawnFood();
		}
		
		sprite.scale.setTo(playerScale, playerScale);
		game.physics.arcade.overlap(sprite, foods, this.collectFood);

	},
	
	spawnFood: function(x, y){
		var food = foods.create(game.world.randomX, game.world.randomY, 'ball');
		if (food.x < 80)
		{
			food.x = 80;
		}
		if (food.x > (game.world.width - 80))
		{
			food.x = game.world.width - 80;
		}
			if (food.y < 80)
		{
			food.y = 80;
		}
		if (food.y > (game.world.height - 80))
		{
			food.y = game.world.height - 80;
		}
		game.physics.arcade.overlap(lillypads, foods, food.kill);
		//food.enableBody = true;
		game.physics.arcade.enable(food);
		total++;
		timer = game.time.now + 1200;
		
	},
	collectFood: function(sprite, food) {
		// Removes the food from the screen
		food.kill();
		console.log("nom");
		total--;
		if (playerScale < 0.3){
			playerScale+=0.002;
			//console.log(playerScale);
			playerVelocity-=1;
		}
		if(playerScale >= 0.3){
			nomCount++;
		}
		if(nomCount>10 && baby == false){
			//console.log("BABY");
			fishBaby = game.add.sprite(sprite.x-50, sprite.y-100, 'koibaby');
			game.physics.arcade.enable(fishBaby);
			fishBaby.enableBody = true;
			fishBaby.anchor.setTo(0.5, 0.5);
			fishBaby.angle = 90;
			fishBaby.scale.setTo(0.13, 0.13);
			fishBaby.animations.add('babyswim', [2,3,4,3,2,1,0,1], 10, true);
			fishBaby.animations.add('babyidle', [2,3,4,3,2,1,0,1], 5, true);
			baby = true;
			game.world.bringToTop(lillypads);
		}
		blop.play();
		
		//score += 1; //score updating
		//scoreText.text = 'Score: ' + score;
	}
}
	
game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Controls', Controls);
game.state.add('Game', Game);
game.state.start('Preloader');
	
	
/*
function spawnFood(){
	
	var food = foods.create(game.world.randomX, game.world.randomY, 'ball');
	if (food.x < 80)
	{
		food.x = 80;
	}
	if (food.x > (game.world.width - 80))
	{
		food.x = game.world.width - 80;
	}
		if (food.y < 80)
	{
		food.y = 80;
	}
	if (food.y > (game.world.height - 80))
	{
		food.y = game.world.height - 80;
	}
	game.physics.arcade.overlap(lillypads, foods, food.kill);
	//food.enableBody = true;
	game.physics.arcade.enable(food);
	total++;
	timer = game.time.now + 1200;
	
}
*/

/*
function update() {
	
	sprite.rotation = game.physics.arcade.angleToPointer(sprite);
	if(baby==true){
		fishBaby.rotation = game.physics.arcade.angleToPointer(fishBaby);
	}
	
    //  only move when you click
    if (game.input.mousePointer.isDown)
    {
 
        game.physics.arcade.moveToPointer(sprite, playerVelocity);
		sprite.animations.play('swim');
		if(baby == true){
			game.physics.arcade.moveToPointer(fishBaby, playerVelocity-50);
			fishBaby.animations.play('babyswim');
		}

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(sprite.body, game.input.x, game.input.y))
        {
            sprite.body.velocity.setTo(0, 0);
			sprite.animations.play('idle');
			if(baby == true){
				fishBaby.body.velocity.setTo(0,0);
				fishBaby.animations.play('babyidle');
			}
			
        }
    }
    else
    {
        sprite.body.velocity.setTo(0, 0);
		sprite.animations.play('idle');
		if(baby==true){
			fishBaby.body.velocity.setTo(0,0);
			fishBaby.animations.play('babyidle');
		}
    }
	
	if (total < 5 && game.time.now > timer)
    {
        spawnFood();
    }
	
	sprite.scale.setTo(playerScale, playerScale);
	game.physics.arcade.overlap(sprite, foods, collectFood);

}
*/

/*
function collectFood(sprite, food) {
		// Removes the food from the screen
		food.kill();
		console.log("nom");
		total--;
		if (playerScale < 0.3){
			playerScale+=0.002;
			//console.log(playerScale);
			playerVelocity-=1;
		}
		if(playerScale >= 0.3){
			nomCount++;
		}
		if(nomCount>10 && baby == false){
			//console.log("BABY");
			fishBaby = game.add.sprite(sprite.x-50, sprite.y-100, 'koibaby');
			game.physics.arcade.enable(fishBaby);
			fishBaby.enableBody = true;
			fishBaby.anchor.setTo(0.5, 0.5);
			fishBaby.angle = 90;
			fishBaby.scale.setTo(0.13, 0.13);
			fishBaby.animations.add('babyswim', [2,3,4,3,2,1,0,1], 10, true);
			fishBaby.animations.add('babyidle', [2,3,4,3,2,1,0,1], 5, true);
			baby = true;
			game.world.bringToTop(lillypads);
		}
		blop.play();
		
		//score += 1; //score updating
		//scoreText.text = 'Score: ' + score;
}
*/