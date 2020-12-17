var PLAY  = 1;
var end = 0;
var gameState = PLAY;
var Snowman;

function preload(){
 pointImage = loadImage("5point.PNG");
 backgroundImage = loadImage("background.jpg");
 fireballImage = loadImage("fireball.png");
 snowballImage = loadImage("snowball.PNG");
 snowmanImage = loadImage("snowman.png");
 tree1Image = loadImage("tree1.png");
 tree2Image = loadImage("tree2.png");
 tree3Image = loadImage("tree3.PNG");
 gameoverImage = loadImage("gameover.png");
}

function setup(){
    createCanvas(600,400);

    Background = createSprite(300,200);
    Background.addImage(backgroundImage);
    Background.scale = 1.1;

    Snowman = createSprite(100,300);
    Snowman.addImage(snowmanImage);
    Snowman.scale = 0.3;

    ground = createSprite(300,390,600,10);
    ground.visible=false;

    treeGroup = createGroup();

    Snowman.setCollider("rectangle", 0,0,200,500);
    
    gameover = createSprite(300,150);
    gameover.addImage(gameoverImage);

    fireGroup = createGroup();

    snowGroup = createGroup();
}

function draw(){
    background("pink");

    Snowman.collide(ground);


    if(gameState === PLAY){
        if(Background.x<0){
            Background.x = 300;
        }
        if(keyDown(UP_ARROW)){
            Snowman.velocityY = -12;
        }
        Snowman.velocityY = Snowman.velocityY+0.5;
        gameover.visible = false;

      createTree();

       Background.velocityX = -3;

       if(Snowman.isTouching(treeGroup)){
           gameState = end; 
       }

       number = Math.round(random(1,2))
       if(frameCount%80==0){
        if(number === 1){
            fireball();
           }
           else if(number === 2){
            snowball();
           }
       }
     
       if(Snowman.isTouching(fireGroup)){
           gameState = end;
       }
    }

    else if(gameState === end){
        Background.velocityX = 0; 
        treeGroup.setVelocityXEach(0);
        gameover.visible = true;
        Snowman.velocityY = 0;
        fireGroup.setVelocityYEach(0);
        snowGroup.setVelocityYEach(0);
    }


    drawSprites()
}

function createTree(){
    if(frameCount%100===0){
        tree=createSprite(600,320);
        number=Math.round(random(1,3));
        if(number === 1){
            tree.addImage(tree1Image);
            tree.scale=0.3;
        }
        if(number === 2){
            tree.addImage(tree2Image);
            tree.scale=0.5
        }
        if(number === 3){
            tree.addImage(tree3Image);
            tree.scale = 0.5
        }
        tree.velocityX=-4;

        tree.setCollider("rectangle",0,0,150,250);
        treeGroup.add(tree);
        
        
    }
}

function fireball(){
    if(frameCount%80 === 0){
        fire = createSprite(600,100);
        fire.addImage(fireballImage);
        fire.scale = 0.08;
        fire.velocityX = -5;
        fire.velocityY = 3;
        fireGroup.add(fire);
    }
}

function snowball(){
    if(frameCount%70===0){
        snow = createSprite(600,200);
        snow.addImage(snowballImage);
        snow.scale = 0.15;
        snow.velocityX = -5;
        snowGroup.add(snow);
    }
}

