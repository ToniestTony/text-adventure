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
        ["A small house (locked)","nothing",2],
        ["Sleep at the tavern (1 gold)","heal",1,5,undefined,0],
        ["Buy a wooden sword (10 gold)","buy",10,0,items.woodenSword,0],
        ["Buy reinforced leather clothes (15 gold)","buy",15,0,items.reinforcedLeatherClothes,0],
        ["Buy a bronze sword (20 gold)","buy",20,0,items.bronzeSword,0],
        
    ]),
    
    plains:new Location("the plains","A calm plain popular with slimes",0,[
        //enemy,instance,%
        //gold, desc, %, value
        //custom, desc, %, changingLocation, changingName, for
        //["gold","You found <b>10</b> gold on the ground!",60,10],
        ["custom","You have found a key, and you unlocked the small house in the village.",10,"village","A small house (locked)",["A small house","buy",0,0,{type:"weapon",name:"Sword of the village",value:6},0]],
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
    
    denseForest:new Location("the dense forest","A forest so dense, it blocks the sun's light.",7,[
        ["enemy",enemies.armoredGoblin,10],
        ["enemy",enemies.groupGoblin,20],
        ["enemy",enemies.bear,30],
        ["enemy",enemies.giganticManEatingPlant,60],
        ["enemy",enemies.giganticTreeant,90],
        ["enemy",enemies.forestChest,100],
    ]),
    
    dragonsDen:new Location("the dragon's den","Legends say that the dragon sleep here",10,[
        ["unique",enemies.kevin,100],
    ]),
    
    
}