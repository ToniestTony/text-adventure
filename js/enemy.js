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

class Item{
    constructor(type,name,value){
        this.type=type;
        this.name=name;
        this.value=value;
    }
}

var items={
    woodenSword:new Item("weapon","Wooden sword",3),
    bronzeSword:new Item("weapon","Bronze sword",4),
    reinforcedLeatherClothes:new Item("armor","Reinforced leather clothes",2),
    
    slimeHat:new Item("armor","Slime hat",2),
    slimeArmor:new Item("armor","Slime armor",3),
    goldenSlimeArmor:new Item("armor","Golden slime armor",4),
    kingSlimeCrown:new Item("armor","King slime crown",4),
    
    goblinDagger:new Item("weapon","Goblin dagger",4),
    woodArmor:new Item("armor","A wood armor",4),
}

//enemy loot:[{item:itemObj,chance:%}]

var enemies={
    //name,desc,hp,atk,def,xp,gold,loot
    //enemy:new Enemy("name","desc",hp,atk,def,xp,gold),
    //enemy:new Enemy("name","desc",hp,atk,def,xp,gold,[{item:itemObj,chance:num}]),
    
    //plain and slime kingdom
    slime:new Enemy("a slime","A slimey creature",5,2,0,2,2,[{item:items.slimeHat,chance:20},{item:items.slimeArmor,chance:10}]),
    
    redSlime:new Enemy("a red slime","A red slimey creature",10,2,0,3,2,[{item:items.slimeHat,chance:20},{item:items.slimeArmor,chance:10}]),
    
    angrySlime:new Enemy("an angry slime","A slimey creature that's angry",5,4,0,4,2,[{item:items.slimeHat,chance:20},{item:items.slimeArmor,chance:10}]),
    
    knightSlime:new Enemy("a knight slime","A slimey creature equipped as a knight",6,3,1,4,2,[{item:items.bronzeSword,chance:15},{item:items.reinforcedLeatherClothes,chance:15}]),
    
    kingSlime:new Enemy("the king slime","The king slime, his slimey majesty",12,4,2,10,5,[{item:items.kingSlimeCrown,chance:50}]),
    
    goldenSlime:new Enemy("a golden slime","A slime with gold nuggets inside him",8,3,2,3,15,
                         [{item:items.slimeArmor,chance:20},{item:items.goldenSlimeArmor,chance:10}]),
    
    
    //forest and dense forest
    bear:new Enemy("a bear","An angry bear",12,4,1,8,3),
    
    wolf:new Enemy("a wolf","A hungry wolf",10,3,0,5,3),
    
    goblin:new Enemy("a goblin","A hostile goblin",8,3,0,4,2,[{item:items.goblinDagger,chance:25}]),
    
    groupGoblin:new Enemy("a group of goblin","A group of hostile goblins",20,5,0,8,5,[{item:items.goblinDagger,chance:50}]),
    
    armoredGoblin:new Enemy("an armored goblin","A leathered armored hostile goblin",10,3,1,6,5,[{item:items.goblinDagger,chance:20},{item:items.reinforcedLeatherClothes,chance:20}]),
    
    treeant:new Enemy("a treeant","A tree that's alive",15,2,2,8,0,[{item:items.woodArmor,chance:10}]),
    
    giganticTreeant:new Enemy("a gigantic treeant","A gigantic tree that's alive",30,3,3,12,2,[{item:items.woodArmor,chance:40}]),
    
    manEatingPlant:new Enemy("a man eating plant","A big plant that eats human",7,6,1,8,8),
    
    giganticManEatingPlant:new Enemy("a gigantic man eating plant","A gigantic plant that eats human",15,7,2,15,10),
    
    woodenChest:new Enemy("a wooden chest","A wooden chest with no lock",5,0,0,0,10,[{item:items.woodenSword,chance:25},{item:items.bronzeSword,chance:10}]),
    
    forestChest:new Enemy("a forest chest","An ancient chest found in forests",10,0,1,0,20),
    
    //dragonsden
    
    kevin:new Enemy("Kevin OLeary","Dragon's den most evil investor",50,9,2,100,100),
}