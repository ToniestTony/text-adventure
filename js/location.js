class Location{
    constructor(name,description,level,events,customs){
        this.name=name;
        this.description=description;
        this.level=level;
        this.events=events;
        this.customs=customs;
    }
}

var locations={
    village:new Location("the village","A small village",0,undefined,[
        //name,event,cost,xp gained OR hp gained,item, active (0:limited,1:unactive,2:unlimited)
        //talk,event(talk),[answer]
        ["Talk to the village elder","talk",["Good luck on your adventure!","Be careful","The small house is said to contain a weapon, I wonder where is the key."]],
        ["Sleep at the tavern (3 gold)","heal",3,5,undefined,0],
        ["Buy a wooden sword (10 gold)","buy",10,0,items.woodenSword,0],
        ["Buy reinforced leather clothes (15 gold)","buy",15,0,items.reinforcedLeatherClothes,0],
        ["Buy a bronze sword (20 gold)","buy",20,0,items.bronzeSword,0],
        ["A small house (locked)","nothing",2],
        //["Buy a minor health (1 gold)","buy",1,0,items.minorPotion,2],
        
    ]),
    
    plains:new Location("the plains","A calm plain popular with slimes",0,[
        //enemy,instance,%
        //gold, desc, %, value
        //custom, desc, %, changingLocation, changingName, for
        //["gold","You found <b>10</b> gold on the ground!",60,10],
        ["custom","You have found a key, and you unlocked the small house in the village.",10,"village","A small house (locked)",["A small house","buy",0,0,items.villageSword,0]],
        //["unique",enemies.woodenChest,100],
        ["enemy",enemies.slime,60],
        ["enemy",enemies.redSlime,80],
        ["enemy",enemies.angrySlime,95],
        ["enemy",enemies.goldenSlime,100]
    ]),
    
    forest:new Location("the forest","A forest home to many creatures.",3,[
        ["enemy",enemies.goblin,20],
        ["enemy",enemies.armoredGoblin,40],
        ["enemy",enemies.wolf,60],
        ["enemy",enemies.bear,70],
        ["enemy",enemies.manEatingPlant,80],
        ["enemy",enemies.treeant,90],
        ["enemy",enemies.woodenChest,100],
    ]),
    
    slimeKingdom:new Location("the slime kingdom","An old kingdom filled with slimes",5,[
        ["enemy",enemies.redSlime,15],
        ["enemy",enemies.angrySlime,30],
        ["enemy",enemies.knightSlime,70],
        ["enemy",enemies.goldenSlime,75],
        ["enemy",enemies.kingSlime,100],
    ]),
    
    forestShop:new Location("a shop at the dense forest","A shop that's at the entrance of the dense forest",6,undefined,[
        //name,event,cost,xp gained OR hp gained,item, active (0:limited,1:unactive,2:unlimited)
        //talk,event(talk),[answer]
        ["Talk to the show owner","talk",["Welcome to my shop!","You should equip yourself before you go into the dense forest.","If you can find a shadow branch, I will reward you."]],
        ["Buy a silver sword (25 gold)","buy",25,0,items.silverSword,0],
        ["Buy a forest armor (40 gold)","buy",40,0,items.forestArmor,0],
        ["Buy a minor health potion (15 gold)","buy",15,0,items.minorPotion,2],
        ["Find a shadow branch (locked)","nothing",2],
    ]),
    
    denseForest:new Location("the dense forest","A forest so dense, it blocks the sun's light.",7,[
        ["custom","You have found a shadow branch.",10,"forestShop","Find a shadow branch (locked)",["Give the shadow branch","buy",0,0,items.shadowSword,0]],
        ["enemy",enemies.armoredGoblin,15],
        ["enemy",enemies.groupGoblin,25],
        ["enemy",enemies.bear,30],
        ["enemy",enemies.giganticManEatingPlant,60],
        ["enemy",enemies.giganticTreeant,90],
        ["enemy",enemies.forestChest,100],
        
    ]),
    
    darkcave:new Location("a dark cave","A dark cave, with some primitive tools at the entrance.",10,[
        ["unique",enemies.kingGiant,20],
        ["enemy",enemies.giant,100],
        
    ]),
    
    giantShop:new Location("a giant shop","A huge shop by giants, for giants",14,undefined,[
        //name,event,cost,xp gained OR hp gained,item, active (0:limited,1:unactive,2:unlimited)
        //talk,event(talk),[answer]
        ["Talk to the show owner","talk",["Welcome to the giant shop!","The dragons den is really dangerous","You should stack up on potions before you face off the dragon."]],
        ["Buy a big hammer (35 gold)","buy",35,0,items.bigHammer,0],
        ["Buy a major health potion (30 gold)","buy",30,0,items.majorPotion,2],
    ]),
    
    dragonsDen:new Location("the dragon's den","Legends say that the dragon sleep here",15,[
        ["enemy",enemies.kevin,100],
    ]),
    
    biggerDragonsDen:new Location("the bigger dragon's den","Legends say that the angriest of dragons sleep here",16,[
        ["unique",enemies.angryKevin,100],
    ]),
    
    
}