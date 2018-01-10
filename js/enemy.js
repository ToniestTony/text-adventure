class Enemy{
    constructor(name,desc,hp,atk,def,xp,gold,loot){
        this.name=name;
        this.desc=desc;
        this.hp=hp;
        this.totalHp=hp;
        
        this.atk=atk;
        this.def=def;
        
        this.gold=gold;
        this.xp=xp;
        
        this.loot=loot;
    }
}

//enemy loot:[{item:itemObj,chance:%}]

var enemies={
    slime:new Enemy("a slime","A slimey creature",5,2,0,2,1,[{item:{type:"armor",name:"Slime armor",value:2},chance:100}]),
    goldenSlime:new Enemy("a golden slime","A slime with gold nuggets inside him",6,3,2,3,12),
    goblin:new Enemy("a goblin","A hostile goblin",8,3,0,3,2),
    armoredGoblin:new Enemy("an armored goblin","A leathered armored hostile goblin",10,3,1,5,5),
    chest:new Enemy("a wooden chest","A wooden chest with no lock",5,0,0,0,10)
}