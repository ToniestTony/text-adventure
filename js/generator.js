/*
var locations={
    village:new Location("the village","A small village",0,undefined,[
        //name,event,cost,xp gained OR hp gained,item, active (0:limited,1:unactive,2:unlimited)
        //talk,event(talk),[answer]
        ["Talk to the village elder","talk",["Good luck on your adventure!","Be careful","The small house is said to contain a weapon, I wonder where is the key."]],
        ["Sleep at the tavern (3 gold)","heal",1,5,undefined,0],
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
    */


var genEnemies={
    //name,desc,hp,atk,def,xp,gold,loot
    //enemy:new Enemy("name","desc",hp,atk,def,xp,gold),
    //enemy:new Enemy("name","desc",hp,atk,def,xp,gold,[{item:itemObj,chance:num}]),
    
    //plain and slime kingdom
    //name,desc,atk,def,xp,gold,loot
    //0->4, 0 is min, 2 is middle, 4 is max
    slime:new Enemy("a slime","A slimey creature",1,1,0,1,1,[{item:items.slimeHat,chance:20},{item:items.slimeArmor,chance:10}]),
}

//gen short for generator
var gen={
    normal:{
        names:[
            //reference name, actual name, desc
            ["plains","the plains","A calm plain"],
            ["slimePlains","the slime plains","A calm plain with slimes"],
            ["smallForest","a small forest","A small and young forest"],
            ["smallFriskyForest","a small frisky forest","A small forest that is a bit cold"],
            ["hill","a hill","A vast hill"],
            ["smallHill","a small hill","A small but vast hill"],
        ],
        shopNames:[
            //reference name, actual name, desc
            ["village","the village","A small village"],
            ["shop","a shop","A small shop"],
            ["tavern","a tavern","A small tavern"],
        ],
        
        owners:[
            "the shop owner",
            "the village elder",
            "the shopkeeper",
            "the owner",
            "the man behind the counter",
            "the vendor",
        ],
        
        talks:[
            "Good luck on your adventure!",
            "Be careful out there.",
            "You can recover your health here.",
            "Slimes should not be too hard around here.",
            "Remember there is no shame in running from a fight!",
            "You should buy weapon and armor to defend yourself!",
            "Rumors say that a big slime can be found nearby",
            "Legends say that the king slime lives nearby",
        ],
        
        weapons:[
            // name, value (0-4), price (0-4)
            ["Wooden sword",2,2],
            ["Bronze sword",3,3],
        ],
        
        armors:[
            // name, value (0-4), price (0-4)
            ["Reinforced leather clothes",2,2],
            ["Rusty soldier armor",3,3],
        ],
        
        heals:[
          // name, value(0-4), price (0-4)
            ["Minor health potion",2,2],
            
        ],
        
        enemies:[
            //enemy, appearance %, drop
            //ref,name,desc,hp,atk,def,xp,gold,%,loot
            //loot=type,name,val(0->4),chance(%)
            ["a slime","A slimey creature",2,1,0,1,1,60,[
                ["armor","Slime hat",2,50],
                ["armor","Slime armor",3,25],
            ]],
            ["a red slime","A red slimey creature",3,1,0,2,1,30],
            ["a angry slime","A angry slimey creature",2,2,0,2,1,30],
            ["a golden slime","A golden slimey creature",2,1,2,1,5,10],
        ],
        
        bosses:[
            //enemy, appearance %, drop
            //ref,name,desc,hp,atk,def,xp,gold,%,loot
            //loot=type,name,val(0->4),chance(%)
            ["a big slime","A big slimey creature",5,2,0,3,2,66,[
                ["armor","Slime armor",3,80],
            ]],
            ["the king slime","The king of all ",5,3,1,4,3,100,[
                ["armor","King slime crown",4,50],
            ]],
        ],
    },
    
    forest:{
        names:[
            //reference name, actual name, desc
            ["forest","the forest","A forest with different kind of trees."],
            ["youngForest","the young forest","A young forest."],
            ["denseForest","the dense forest","A forest so dense that light can barely pass through it."],
            ["denseYoungForest","the dense young forest","A dense but young forest."],
            ["forestHill","the forest on a hill","A forest on top of a large hill"],
            ["crookedForest","the crooked forest","A forest where the trees are crooked"],
        ],
        shopNames:[
            //reference name, actual name, desc
            ["forestShop","the forest shop","A shop at the entrance of a forest"],
            ["woodenCabin","a wooden cabin","A wooden cabin with both owners selling items"],
            ["woodenTavern","a wooden tavern","A wooden tavern with both owners selling items"],
        ],
        
        owners:[
            "the shop owner",
            "the shopkeeper",
            "the owner",
            "the talking creature behind the counter",
            "the vendor",
        ],
        
        talks:[
            "You can recover your health here.",
            "Watch out for those man eating plants, they hit hard!",
            "Remember there is no shame in running from a fight!",
            "You should buy weapon and armor to defend yourself!",
            "Legends talk of the king of bears living nearby.",
            "Some people say that they have a seen a huge treeant around here.",
        ],
        
        weapons:[
            // name, value (0-4), price (0-4)
            ["Wooden sword",2,2],
            ["Bronze sword",3,3],
        ],
        
        armors:[
            // name, value (0-4), price (0-4)
            ["Reinforced leather clothes",2,2],
            ["Rusty soldier armor",3,3],
        ],
        
        heals:[
          // name, value(0-4), price (0-4)
            ["Forest potion",2,2],
            ["Leaf tea",1,1],
            
        ],
        
        enemies:[
            //enemy, appearance %, drop
            //ref,name,desc,hp,atk,def,xp,gold,%,loot
            //loot=type,name,val(0->4),chance(%)
            ["a bear","A black bear",3,2,1,2,2,20,[
                ["armor","Bear hat",2,25],
            ]],
            ["a wolf","A lone wolf",2,2,0,2,1,20],
            ["a dog","A lone dog",2,1,0,1,1,10],
            ["a treeant","A moving tree",2,1,2,3,0,30,[
                ["weapon","Spiky branch",2,25]
            ]],
            ["a man eating plant","A plant with a hunger for humans",1,3,0,2,1,30],
            ["a wooden chest","An old wooden chest",2,0,0,0,3,10],
        ],
        
        bosses:[
            //enemy, appearance %, drop
            //ref,name,desc,hp,atk,def,xp,gold,%,loot
            //loot=type,name,val(0->4),chance(%)
            ["a big treeant","A huge moving tree",4,2,3,4,2,66,[
                ["weapon","Hard Spiky branch",3,50],
            ]],
            ["the king bear","The king of all bears",4,3,2,4,2,100,[
                ["armor","King bear crown",4,50],
            ]],
        ],
    },
    
    humid:{
        names:[
            //reference name, actual name, desc
            ["swamp","the swamp","A big swamp filled with aquatic fauna and flora."],
            ["humidForest","the humid forest","An incredibly humid forest."],
            ["foggyLake","the foggy lake","An incredibly foggy lake."],
            ["lake","the lake","A circular lake."],
            ["river","the river","A lively river."],
            ["largeRiver","the large river","A large river."],
        ],
        shopNames:[
            //reference name, actual name, desc
            ["swampShop","the swamp shop","A shop at the entrance of a swamp"],
            ["woodenHut","a wooden hut","A wooden humid hut with a smiling owner."],
            ["riverMall","the river mall","A small but popular mall near a river."],
        ],
        
        owners:[
            "the owner",
            "the talking fish behind the counter",
            "the talking mermaid behind the counter",
        ],
        
        talks:[
            "Welcome to these humid lands!",
            "Be careful of the water creatures nearby.",
            "You should buy potions before facing the creatures.",
            "You should buy weapon and armor to defend yourself!",
            "Some people have been talking about a huge creature with multiple arms around here.",
            "Be aware of a nasty looking witch living nearby, she does not like visitors.",
        ],
        
        weapons:[
            // name, value (0-4), price (0-4)
            ["Swordfight",2,2],
            ["Shark tooth sword",3,3],
        ],
        
        armors:[
            // name, value (0-4), price (0-4)
            ["Humid armor",2,2],
            ["Water armor",3,3],
        ],
        
        heals:[
          // name, value(0-4), price (0-4)
            ["Refreshing water",2,2],
            ["Shrimp cocktail",3,3],
            
        ],
        
        enemies:[
            //enemy, appearance %, drop
            //ref,name,desc,hp,atk,def,xp,gold,%,loot
            //loot=type,name,val(0->4),chance(%)
            ["an angry fish","A seemingly angry fish",1,1,0,1,1,10],
            ["a shark","A bloodthirsty shark",2,3,1,3,2,20],
            ["an angry whale","A whale that is furious",3,1,2,3,2,20],
            ["a sunken chest","A forgoten underwater chest",2,0,1,0,4,10,[
                ["armor","Water armor",3,25],
                ["weapon","Shark tooth sword",3,25],
                ["heal","Shrimp cocktail",3,25],
                ["heal","Forgotten underwater elixir",4,10],
            ]],
            ["a lizard","A big lizard",1,1,1,2,1,15],
            ["a crab","A big crab",1,2,2,2,2,15],
            ["an octopus","A boxing octopus",2,3,1,3,2,15],
            ["an electric eel","An angry looking electric eel",1,3,1,2,2,15],
            ["a wooden chest","An old wooden chest",2,0,0,0,3,10],
        ],
        
        bosses:[
            //enemy, appearance %, drop
            //ref,name,desc,hp,atk,def,xp,gold,%,loot
            //loot=type,name,val(0->4),chance(%)
            ["the kraken","The legendary kraken",4,3,2,4,3,50,[
                ["heal","The kraken cocktail",4,25],
            ]],
            ["the ugly witch","A nasty looking witch, who is not fond of visitors",3,4,2,4,3,100,[
                ["weapon","The ugly witch staff",4,50],
            ]],
        ],
    },
    
    underground:{
        names:[
            //reference name, actual name, desc
            ["cave","the caves","A connection of caves."],
            ["darkCave","the dark caves","A dark connection of caves."],
            ["tunnels","the tunnels","A dim lighted connection of tunnels."],
            ["crevasse","the crevasse","The bottom of a large crevasse."],
            ["mineshaft","the mineshaft","An abandonned mineshaft."],
            ["darkMineshaft","the dark mineshaft","An abandonned and dim lighted mineshaft."],
        ],
        shopNames:[
            //reference name, actual name, desc
            ["undergroundShop","the underground shop","An underground shop"],
            ["cavernTavern","the cavern tavern","A popular tavern even though it is difficult of access."],
            ["mineshaftHouse","the mineshaft house","A small house at the entrace of a mineshaft."],
        ],
        
        owners:[
            "the owner",
            "the friendly miner",
            "the old owner",
        ],
        
        talks:[
            "Welcome to the undergrounds!",
            "Make yourself comfortable.",
            "You should not explore too far.",
            "You should buy better weapon, nearby creatures are more defensive.",
            "This underground is filled with abandonned and angry miners.",
            "Nearby residents claimed to have seen a ridicilously huge earthworm.",
            "Nearby residents claimed to have seen a earthworm so big it can eat whole mountains.",
        ],
        
        weapons:[
            // name, value (0-4), price (0-4)
            ["Traveler sword",2,2],
            ["Iron sword",3,3],
        ],
        
        armors:[
            // name, value (0-4), price (0-4)
            ["Rock armor",2,2],
            ["Iron armor",3,3],
        ],
        
        heals:[
          // name, value(0-4), price (0-4)
            ["Underground healing potion",2,2],
            
        ],
        
        enemies:[
            //enemy, appearance %, drop
            //ref,name,desc,hp,atk,def,xp,gold,%,loot
            //loot=type,name,val(0->4),chance(%)
            ["an abandonned miner","An angry looking abandonned miner",2,2,2,2,2,30,[
                ["armor","Rock armor",2,25],
                ["weapon","Used pickaxe",1,50],
                ["weapon","Iron pickaxe",3,20],
            ]],
            ["a bat","A bloodthirsty bat",1,1,1,1,1,10],
            ["a huge earthworm","A huge earthworm",3,3,1,3,2,20],
            ["a huge rat","A huge rat",2,2,2,2,2,20,[
                ["armor","Huge rat skin",1,25],
            ]],
            ["an angry mole","An angry mole",2,1,2,2,1,20],
            ["a huge ant","A huge ant",2,2,3,2,3,20],
            ["an underground chest","A forgotten underground chest",2,0,2,0,4,10,[
                ["armor","Iron armor",3,25],
                ["weapon","Iron sword",3,25],
                ["heal","Forgotten underground elixir",4,10],
            ]],
        ],
        
        bosses:[
            //enemy, appearance %, drop
            //ref,name,desc,hp,atk,def,xp,gold,%,loot
            //loot=type,name,val(0->4),chance(%)
            ["the ridiculously huge earthworm","The ridiculously huge earthworm",6,3,2,5,4,80],
            ["the mountain eating earthworm","An earthworm so gigantic it can eat whole mountain",8,4,3,8,4,80,[
                ["heal","The mountain eating earthworm meat",4,100]
            ]],
        ],
    },
}

var firstLocation=undefined;

function generate(){
    var maxLocations=99;
    //generate locations
    var generatedLocations={};
    
    //get themes
    var themes=[];
    for (var property in gen) {
        if (gen.hasOwnProperty(property)){
            themes.push(property.toString());
        }
    }
    
    
    //main loop
    var levelRequired=1;
    var difficulty=1;
    var theme=themes[0];
    var themeLength=4;
    
    
    for(var i=0;i<maxLocations;i++){
        if(i<2){
            //first 2
        }else{
            
            if(i>=10){
                difficulty+=ran(1,2);
                levelRequired+=ran(1,2);
            }else{
                difficulty++;
                levelRequired++;
            }
            
        }
        //check if shop and change theme each 3 locations
        var isShop=false;
        var bossSpawn=false;
        
        if(i%themeLength==0){
            isShop=true;
            if(i>0){
                themes.splice(themes.indexOf(theme),1);
                if(themes.length>0){
                    theme=themes[ran(0,themes.length-1)];
                }else{
                    //restart themes
                    for (var property in gen) {
                        if (gen.hasOwnProperty(property)){
                            if(property.toString()!=theme){
                                themes.push(property.toString());
                            }
                        }
                    }
                    theme=themes[ran(0,themes.length-1)];
                    /*console.log("loop finished: no more themes");
                    break;*/
                }
                
            }
        }else if((i+1)%themeLength==0){
            bossSpawn=true;
        }
        if(i==1){
            isShop=false;
        }
        
        //check name/desc and if available use it
        var triesCpt=0;
        var maxTries=99;
        
        var randName=gen[theme].names[ran(0,gen[theme].names.length-1)];
        if(isShop){
            randName=gen[theme].shopNames[ran(0,gen[theme].shopNames.length-1)];
        }
        
        while(generatedLocations[randName[0]]!=undefined && triesCpt<=maxTries){
            var randName=gen[theme].names[ran(0,gen[theme].names.length-1)];
        
            if(isShop){
                randName=gen[theme].shopNames[ran(0,gen[theme].shopNames.length-1)];
            }
            triesCpt++;
        }
        
        if(triesCpt>=maxTries){
            //stop the loop
            console.log("loop finished: max tries acheived")
            break;
        }
        
        //if it's not a shop add enemies and create the location
        if(!isShop){
            //add boss
            //enemies
            var generatedEnemies=[];
            
            var listEnemies=[];
            for(var cpt=0;cpt<gen[theme].enemies.length;cpt++){
                listEnemies.push(gen[theme].enemies[cpt])
            }
            
            var percent=0;
            
            for(var cpt=0;cpt<gen[theme].enemies.length;cpt++){
                if(listEnemies.length>0){
                    //ce for currEnemy
                    var type="enemy";
                    var ce=listEnemies[ran(0,listEnemies.length-1)]
                    
                    
                    if(bossSpawn==true && gen[theme].bosses.length>0){
                            
                        bossSpawn=false;
                        type="unique";
                        var randomVar=ran(0,100);
                        var tempBoss=undefined;
                        var bossFound=false;
                        for(var cptBoss=0;cptBoss<gen[theme].bosses.length;cptBoss++){
                            if(randomVar<=gen[theme].bosses[cptBoss][7] && bossFound==false){
                                tempBoss=gen[theme].bosses[cptBoss];
                                bossFound=true;
                                break;
                            }
                        }
                        if(bossFound==true){
                           ce=tempBoss;
                        }
                    }else{
                        //safe to delete
                        listEnemies.splice(listEnemies.indexOf(ce),1);
                    }
                    
                    //name,desc,hp,atk,def,xp,gold
                    var cName=ce[0];
                    var cDesc=ce[1];
                    
                    var cHp=Math.ceil((5+(difficulty*4.6))*((ce[2]+1)/5));
                    
                    var cAtk=Math.ceil((4+(difficulty*0.75))*((ce[3]+1)/5));
                    
                    var cDef=Math.floor((4+((difficulty-1)*0.25))*((ce[4]+1)/5));
                    
                    var cXp=Math.ceil((4+((difficulty-1)*3.6))*((ce[5]+1)/5));
                    
                    if(ce[5]==0){cXp=0;}
                    
                    var cGold=Math.ceil((4+((difficulty-1)*2.6))*((ce[6]+1)/5));
                    
                    if(ce[6]==0){cGold=0;}
                    
                    var cPercent=ce[7];
                    if(type=="unique"){
                        cPercent=100;
                    }else{
                        percent+=cPercent;
                    }
                    
                    var cLoot=undefined;
                    if(ce[8]!=undefined){
                        cLoot=[];
                        for(var lootCpt=0;lootCpt<ce[8].length;lootCpt++){
                            var cVal=0;
                            
                            if(ce[8][lootCpt][0]=="weapon"){
                                cVal=Math.ceil((4+(difficulty*1))*((ce[8][lootCpt][2]+1)/5));
                            }else if(ce[8][lootCpt][0]=="armor"){
                                cVal=Math.ceil((2+(difficulty*1))*((ce[8][lootCpt][2]+1)/5));
                            }else if(ce[8][lootCpt][0]=="heal"){
                                cVal=Math.ceil((6+(difficulty*2))*((ce[8][lootCpt][2]+1)/5));   
                            }
                            
                            cLoot.push({item:new Item(ce[8][lootCpt][0],ce[8][lootCpt][1],cVal),chance:ce[8][lootCpt][3]});
                        }
                    }
                    var objEnemy=new Enemy(cName,cDesc,cHp,cAtk,cDef,cXp,cGold,cLoot)
                    
                    
                    if(percent>100){percent=100}
                    
                    
                    if(type=="unique"){
                            generatedEnemies.push([
                            type,
                            objEnemy,
                            cPercent
                        ]);
                    }else{
                            generatedEnemies.push([
                            type,
                            objEnemy,
                            percent
                        ]);
                    }
                    

                    if(percent>=100){
                        break;
                    }
                }else{
                    break;
                }
                
            }
            
            
            generatedLocations[randName[0]]=new Location(randName[1],randName[2],levelRequired,generatedEnemies)
        }else{
            //events
            var generatedEvents=[];
            
            //name,event,cost,xp gained OR hp gained,item, active (0:limited,1:unactive,2:unlimited)
        //talk,event(talk),[answer]
            
            //TALK
            
            var talkEvent=[];
            var ownerNames=["the owner","the shop owner","the shopkeeper","the vendor","the man behind the counter"]
            if(gen[theme].owners!=undefined && gen[theme].owners.length>0){
                ownerNames=gen[theme].owners;
            }
            talkEvent[0]="Talk to "+ownerNames[ran(0,ownerNames.length-1)];
            
            var talks=[];
            var possibleTalks=[];
            
            for(var cptAllTalk=0;cptAllTalk<gen[theme].talks.length;cptAllTalk++){
                possibleTalks.push(gen[theme].talks[cptAllTalk]);
            }
            
            for(var cptTalk=0;cptTalk<3;cptTalk++){
                var randIndexTalk=ran(0,possibleTalks.length-1)
                talks.push(possibleTalks[randIndexTalk]);
                possibleTalks.splice(randIndexTalk,1);
            }
            
            talkEvent[1]="talk";
            talkEvent[2]=talks;
                
            generatedEvents.push(talkEvent);
            
            
            //HEAL
            
            var healEvent=[];
            
            var sleepPrice=Math.floor((2+(difficulty*1.5)));
            var sleepValue=Math.ceil((3+(difficulty*1.2)));
            
            var healNames=["Sleep here","Rent a bed","Rent a room","Sleep at this place","Sleep at "+randName]
            
            healEvent[0]=healNames[ran(0,healNames.length-1)]+" ("+sleepPrice+" gold)";
            healEvent[1]="heal";
            healEvent[2]=sleepPrice;
            healEvent[3]=sleepValue;
            healEvent[4]=undefined;
            healEvent[5]=0;
                
            generatedEvents.push(healEvent)
            
            
            //SHOP - WEAPON
            
            var weaponEvent=[];
            
            var chosenWeapon=gen[theme].weapons[ran(0,gen[theme].weapons.length-1)];
            
            var weaponPrice=Math.floor((7+(difficulty*2))*((chosenWeapon[2]+1)/5));
            var weaponValue=Math.ceil((4+(difficulty*1))*((chosenWeapon[1]+1)/5));
            
            weaponEvent[0]="Buy "+chosenWeapon[0]+" ("+weaponPrice+" gold)";
            weaponEvent[1]="buy";
            weaponEvent[2]=weaponPrice;
            weaponEvent[3]=0;
            weaponEvent[4]=new Item("weapon",chosenWeapon[0],weaponValue);
            weaponEvent[5]=0;
            
            generatedEvents.push(weaponEvent);
            
            
            //SHOP - ARMOR
            
            var armorEvent=[];
            
            var chosenArmor=gen[theme].armors[ran(0,gen[theme].armors.length-1)];
            
            var armorPrice=Math.floor((15+(difficulty*3))*((chosenArmor[2]+1)/5));
            var armorValue=Math.ceil((2+(difficulty*1))*((chosenArmor[1]+1)/5));
            
            armorEvent[0]="Buy "+chosenArmor[0]+" ("+armorPrice+" gold)";
            armorEvent[1]="buy";
            armorEvent[2]=armorPrice;
            armorEvent[3]=0;
            armorEvent[4]=new Item("armor",chosenArmor[0],armorValue);
            armorEvent[5]=0;
            
            generatedEvents.push(armorEvent);
            
            
            //SHOP - POTION
            
            var potionEvent=[];
            
            var chosenPotion=gen[theme].heals[ran(0,gen[theme].heals.length-1)];
            
            var potionPrice=Math.floor((16+(difficulty*4))*((chosenPotion[2]+1)/5));
            var potionValue=Math.ceil((6+(difficulty*2))*((chosenPotion[1]+1)/5));
            
            potionEvent[0]="Buy "+chosenPotion[0]+" ("+potionPrice+" gold)";
            potionEvent[1]="buy";
            potionEvent[2]=potionPrice;
            potionEvent[3]=0;
            potionEvent[4]=new Item("heal",chosenPotion[0],potionValue);
            potionEvent[5]=2;
            
            generatedEvents.push(potionEvent);
            
            
            generatedLocations[randName[0]]=new Location(randName[1],randName[2],levelRequired,undefined,generatedEvents)
        }
        
        if(i==0){
            for (var property in generatedLocations) {
                if (generatedLocations.hasOwnProperty(property)){
                    firstLocation=property.toString();
                }
            }
        }
        
    }
    
    
    
    if(i>=maxLocations){
        console.log("loop finished: max locations")
    }
    
    console.log(generatedLocations)
    locations=generatedLocations;
}

function calcVal(value,level){
    var finalValue=value*level;
}