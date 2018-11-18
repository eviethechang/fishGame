var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var total = 0;
var timer = 0;

function preload() {

    game.load.image('ball', 'assets/img/blueOrb.png');
	game.load.spritesheet('koi', 'assets/img/KoiSwim.png', 1000, 400);

}

var sprite;

function create() {

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
		console.log("cheesecake");
		total--;
		//plink.play();
		//score += 1; //score updating
		//scoreText.text = 'Score: ' + score;
}