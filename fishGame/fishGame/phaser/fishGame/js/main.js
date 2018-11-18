var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var total = 0;
var timer = 0;

function preload() {

    game.load.image('ball', 'assets/img/pinkOrb.png');
	game.load.spritesheet('koi', 'assets/img/KoiSwim.png', 1000, 400);
	game.load.image('water', 'assets/img/Water.png');
	game.load.image('duckweed', 'assets/img/Duckweed.png');
	game.load.image('lillypad', 'assets/img/lillypad.png');

}

var sprite;

function create() {

	var background = game.add.sprite(0, 0, 'water');
	background.scale.setTo(0.75, 0.75);
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
    foods = game.add.group();
	foods.enableBody = true;
	
	sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'koi');
	game.physics.arcade.enable(sprite);
	sprite.enableBody = true;
	//sprite.body.setSize(60, 50, 30, 18);
	sprite.anchor.setTo(0.5, 0.5);
	sprite.angle = 90;
	sprite.scale.setTo(0.2, 0.2);
	sprite.animations.add('swim', [0,1,2,3,4,3,2,1,0], 10, true);

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
	
	
	lillypads = game.add.group();
	var lillypad = lillypads.create(720, 50, 'lillypad');
	lillypad.scale.setTo(0.4, 0.4);
	var lillypad2 = lillypads.create(850, 310, 'lillypad');
	lillypad2.scale.setTo(0.2, 0.2);
	lillypad2.angle = 275;
	var lillypad3 = lillypads.create(250, 600, 'lillypad');
	lillypad3.scale.setTo(0.3, 0.3);
	lillypad3.angle = 180;
}

function spawnFood(){
	
	//var food = game.add.sprite(game.world.randomX, game.world.randomY, 'ball');
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
	timer = game.time.now + 1000;
	
}

function update() {
	
	sprite.rotation = game.physics.arcade.angleToPointer(sprite);
    //  only move when you click
    if (game.input.mousePointer.isDown)
    {
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(sprite, 300);
		sprite.animations.play('swim')

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(sprite.body, game.input.x, game.input.y))
        {
            sprite.body.velocity.setTo(0, 0);
        }
    }
    else
    {
        sprite.body.velocity.setTo(0, 0);
    }
	
	if (total < 5 && game.time.now > timer)
    {
        spawnFood();
    }
	
	game.physics.arcade.overlap(sprite, foods, collectFood);

}



function collectFood(sprite, food) {
		// Removes the food from the screen
		food.kill();
		console.log("nom");
		total--;
		//plink.play();
		//score += 1; //score updating
		//scoreText.text = 'Score: ' + score;
}