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
        ["Sleep at the tavern (1 gold)","heal",1,5,undefined,0],
        ["Buy a wooden sword (5 gold)","buy",5,0,{name:"Wooden sword",atk:4},0]
    ]),
    
    plains:new Location("the plains","A calm plain",0,[
        ["enemy",enemies.slime,70],
        ["enemy",enemies.goblin,90],
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