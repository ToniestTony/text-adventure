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
        this.quantity=1;
    }
}

var items={
    minorPotion:new Item("heal","Minor health potion",5),
    majorPotion:new Item("heal","Major health potion",20),
    
    woodenSword:new Item("weapon","Wooden sword",3),
    bronzeSword:new Item("weapon","Bronze sword",4),
    reinforcedLeatherClothes:new Item("armor","Reinforced leather clothes",2),
    villageSword:new Item("weapon","Sword of the village",5),
    
    slimeHat:new Item("armor","Slime hat",2),
    slimeArmor:new Item("armor","Slime armor",3),
    goldenSlimeArmor:new Item("armor","Golden slime armor",4),
    kingSlimeCrown:new Item("armor","King slime crown",4),
    
    goblinDagger:new Item("weapon","Goblin dagger",4),
    woodArmor:new Item("armor","Wood armor",4),
    
    silverSword:new Item("weapon","Silver sword",6),
    forestArmor:new Item("armor","Forest armor",4),
    shadowSword:new Item("weapon","Shadow sword",7),
    
    bigHammer:new Item("weapon","Big hammer",7),
    bigKingHammer:new Item("weapon","Big hammer meant for a king",8),
}

//enemy loot:[{item:itemObj,chance:%}]

var enemies={
    //name,desc,hp,atk,def,xp,gold,loot
    //enemy:new Enemy("name","desc",hp,atk,def,xp,gold),
    //enemy:new Enemy("name","desc",hp,atk,def,xp,gold,[{item:itemObj,chance:num}]),
    
    //plain and slime kingdom
    slime:new Enemy("a slime","A slimey creature",5,2,0,2,2,[{item:items.slimeHat,chance:20},{item:items.slimeArmor,chance:10}]),
    
    bigSlime:new Enemy("a big slime","A big slimey creature",15,3,1,4,4,[{item:items.slimeHat,chance:60},{item:items.slimeArmor,chance:30}]),
    
    redSlime:new Enemy("a red slime","A red slimey creature",10,2,0,3,2,[{item:items.slimeHat,chance:20},{item:items.slimeArmor,chance:10}]),
    
    angrySlime:new Enemy("an angry slime","A slimey creature that's angry",5,4,0,4,2,[{item:items.slimeHat,chance:20},{item:items.slimeArmor,chance:10}]),
    
    knightSlime:new Enemy("a knight slime","A slimey creature equipped as a knight",6,5,1,4,2,[{item:items.bronzeSword,chance:15},{item:items.reinforcedLeatherClothes,chance:15}]),
    
    kingSlime:new Enemy("the king slime","The king slime, his slimey majesty",12,6,2,10,5,[{item:items.kingSlimeCrown,chance:50}]),
    
    goldenSlime:new Enemy("a golden slime","A slime with gold nuggets inside him",8,3,2,3,15,
                         [{item:items.slimeArmor,chance:20},{item:items.goldenSlimeArmor,chance:10}]),
    
    
    //forest and dense forest
    bear:new Enemy("a bear","An angry bear",12,4,1,8,3),
    
    wolf:new Enemy("a wolf","A hungry wolf",10,3,0,5,3),
    
    goblin:new Enemy("a goblin","A hostile goblin",8,3,0,4,2,[{item:items.goblinDagger,chance:25}]),
    
    groupGoblin:new Enemy("a group of goblin","A group of hostile goblins",20,5,0,8,5,[{item:items.goblinDagger,chance:50}]),
    
    armoredGoblin:new Enemy("an armored goblin","A leathered armored hostile goblin",10,3,1,6,5,[{item:items.goblinDagger,chance:20},{item:items.reinforcedLeatherClothes,chance:20}]),
    
    treeant:new Enemy("a treeant","A tree that's alive",15,3,2,8,1,[{item:items.woodArmor,chance:10}]),
    
    giganticTreeant:new Enemy("a gigantic treeant","A gigantic tree that's alive",30,5,3,12,3,[{item:items.woodArmor,chance:35}]),
    
    manEatingPlant:new Enemy("a man eating plant","A big plant that eats human",7,6,1,8,6),
    
    giganticManEatingPlant:new Enemy("a gigantic man eating plant","A gigantic plant that eats human",15,8,2,15,8,[{item:items.woodArmor,chance:35}]),
    
    woodenChest:new Enemy("a wooden chest","A wooden chest with no lock",5,0,0,0,10,[{item:items.woodenSword,chance:25},{item:items.bronzeSword,chance:10}]),
    
    forestChest:new Enemy("a forest chest","An ancient chest found in forests",10,0,1,0,20),
    
    //dark cave
    giant:new Enemy("a giant","A huge primitive human with a big hammer",70,8,1,30,10,[{item:items.bigHammer,chance:100}]),
    
    kingGiant:new Enemy("the king giant","The king of all giants in this cave",80,9,2,40,20,[{item:items.bigKingHammer,chance:100}]),
    
    //dragonsden
    
    kevin:new Enemy("Kevin OLeary","Dragon's den most evil investor",70,10,4,50,50),
    
    angryKevin:new Enemy("Angry Kevin OLeary","Dragon's den most evil and angry investor",120,11,4,75,75),
}