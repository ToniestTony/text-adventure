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
        ["Sleep at the tavern (1 gold)","heal",1,5,undefined,0],
        ["Buy a wooden sword (15 gold)","buy",15,0,{type:"weapon",name:"Wooden sword",value:4},0],
        ["A small house (locked)","nothing",2]
    ]),
    
    plains:new Location("the plains","A calm plain",0,[
        //enemy,instance,%
        //gold, desc, %, value
        //custom, desc, %, changingLocation, changingName, for
        //["gold","You found <b>10</b> gold on the ground!",60,10],
        ["custom","You have found a key, and you unlocked the small house in the village.",10,"village","A small house (locked)",["A small house","buy",0,0,{type:"weapon",name:"Sword of the village",value:6},0]],
        ["enemy",enemies.slime,70],
        ["enemy",enemies.goblin,95],
        ["enemy",enemies.goldenSlime,100],
    ]),
    
    forest:new Location("the forest","A dense forest",3,[
        ["enemy",enemies.slime,30],
        ["enemy",enemies.goldenSlime,40],
        ["enemy",enemies.goblin,70],
        ["enemy",enemies.armoredGoblin,90],
        ["enemy",enemies.chest,100]
    ]),
}