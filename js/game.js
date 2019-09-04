// TODO: [X]Ajouter message erreur à l'intro si nom incorrect
// TODO: [X]Ajouter random au gold/xp
// TODO: [X]Ajouter random aux attaques
// TODO: [X]Ajouter locked locations
// TODO: [X]Ajouter level bonus (health/attack)
// TODO: [X]Ajouter save/load (local storage)
// TODO: [X]Ajouter autosave
// TODO: [X]Ajouter mort
// TODO: [X]Ajouter types of events (gold, item, key)
// TODO: [X]Changer arme/armure pour ajouter type
// TODO: [X]Ajouter drop aux ennemis
// TODO: [X]Ajouter enemies qui meurent après une fois
// TODO: [X]Afficher version du jeu, log et version de la save
// TODO: [X]Ajouter potions vie
// TODO: [X]Ajouter scroll aux locations
// TODO: [X]Fix customs showing up with events
// TODO: [X]Ajouter crits (et scale avec luck)
// TODO: [X]Permadeath mode
// TODO: [X]Loader on main screen
// TODO: [X]Bosses appear message
// TODO: [X]Generator
// TODO: [X]Ajouter Contenu

//CONSTANTS
var initialFadingTime=200;
var fadingTime=initialFadingTime;

var game={
    version:1.06,
    permadeath:false,
    file:"No save file.",
    versionLog:"-Added snails<br>-Added shop tags to shops<br>-Auto mode WIP",
    state:"introduction",
    log:[],
    updateObj:undefined,
    firstShown:0,
    maxShown:5,
    init:function(){
        //initialize
        generate();
        player.location=locations[firstLocation]
        this.updateLocations();
    },
    
    update:function(){
        //delete button
        if(localStorage.getItem("player")==null){
            $("#deleteButton").addClass("hide");   
        }else{
            $("#deleteButton").removeClass("hide");  
        }
        
        //check if showed values are correct
        player.hp=between(player.hp,0,player.totalHp)
        player.xp=between(player.xp,0,player.totalXp)
        
        //level up
        if(player.xp>=player.totalXp && player.state!="level"){
            player.level++;
            player.xp=0;
            player.totalXp=Math.floor(10*Math.pow(1.2,player.level-1));
            player.state="level";
            game.updateLocations();
        }
        
        if(player.state=="battle"){
            player.enemy.hp=between(player.enemy.hp,0,player.enemy.totalHp);   
        }
        
        this.updateText();
        
        if(auto && !dead && !autolock){
            
            var newstate="";
            //AUTO MODE
            if(player.state=="free"){
                if(autostate=="" && player.hp<=player.totalHp/2 && player.gold>=3){
                    autostate="heal";
                }
            }
            if(player.state=="free"){
                //Buy weapon/armor/potions, heal, visit location
                
                
                
                if(autostate=="" || autostate=="grind" || autostate=="supergrind"){
                    var grindlevel1=Math.ceil(player.level/2)-1;
                    var grindlevel2=Math.ceil(player.level/2);
                    if(grindlevel1<1){grindlevel1=1}
                    if(grindlevel2<2){grindlevel2=2}
                    if(player.location.events!=undefined && player.location.level>=player.level-1 && autostate==""){
                        //stay and explore
                        autolock=true;
                        setTimeout(function(){autolock=false;explore()},autodelay)
                    }else if(player.location.events!=undefined && (player.location.level==grindlevel1 || player.location.level==grindlevel2) && autostate=="grind"){
                        //stay and explore
                        autolock=true;
                        setTimeout(function(){autolock=false;explore()},autodelay)
                    }else if(player.location.events!=undefined && player.location.level==1 && autostate=="supergrind"){
                        //stay and explore
                        autolock=true;
                        setTimeout(function(){autolock=false;explore()},autodelay)
                    }else{
                        var bestLocation=undefined;
                        
                        for (var property in locations) {
                            if (locations.hasOwnProperty(property) && player.location!=locations[property]){
                               
                                if(autostate==""){
                                    if(locations[property].level==player.level && locations[property].events!=undefined){
                                        //go there
                                        bestLocation=property;
                                        break;
                                    }

                                    if(locations[property].level==player.level-1 && locations[property].events!=undefined && bestLocation==undefined){
                                        //go there
                                        bestLocation=property;
                                    }
                                }else if(autostate=="grind"){
                                    if(locations[property].level==grindlevel1 && locations[property].events!=undefined){
                                        //go there
                                        bestLocation=property;
                                        break;
                                    }

                                    if(locations[property].level==grindlevel2 && locations[property].events!=undefined){
                                        //go there
                                        bestLocation=property;
                                    }
                                    
                                }else if(autostate=="supergrind"){
                                    if(locations[property].level==1){
                                        //go there
                                        bestLocation=property;
                                        break;
                                    }
                                }
                            }
                        }
                        if(bestLocation!=undefined){
                            //go and explore
                            autolock=true;
                            changeLocation(bestLocation)
                            setTimeout(function(){autolock=false;explore()},autodelay)
                        }else{
                            //stay
                            autolock=true;
                            setTimeout(function(){autolock=false;explore()},autodelay)
                        }
                    }
                }else if(autostate=="getitems" || autostate=="getweapon" || autostate=="getarmor" || autostate=="getheal" || autostate=="getitem" || autostate=="gethealitem"){
                    var bestItem=undefined;
                    var bestGold=0;
                    var bestLocation=undefined;
                    var type="weapon"
                    var isworse=false;
                    if(autostate=="getitem"){
                        if(autolastweapon){
                            type="armor";
                        }else{
                            type="weapon"
                        }
                        
                        
                    }
                    if(autostate=="getarmor"){type="armor"}
                    if(autostate=="getheal"){type="heal"}
                    if(autostate=="gethealitem"){type="heal"}
                    for (var property in locations) {
                        if (locations.hasOwnProperty(property)){
                            if(locations[property].customs!=undefined && locations[property].level<=player.level){
                                //go there
                                var customs=locations[property].customs
                                for(var i=0;i<customs.length;i++){
                                    var custom=customs[i];
                                    if(custom[1]=="buy" && custom[4].type==type){
                                        if(player.gold>=custom[2]){
                                           if(bestItem==undefined){
                                               bestItem=locations[property].customs[i][4];
                                               bestGold=custom[2]
                                               
                                           }else if(bestItem.value<custom[4].value){
                                               bestItem=locations[property].customs[i][4];
                                               bestGold=custom[2]
                                           } 
                                        }
                                    }
                                }
                                if(bestItem!=undefined){
                                    if(type=="weapon"){
                                       if(player.weapon.value>=bestItem.value){
                                           isworse=true;
                                       }else{
                                           isworse=false;
                                       }
                                   }
                                   if(type=="armor"){
                                       if(player.armor.value>=bestItem.value){
                                           isworse=true;
                                       }else{
                                           isworse=false;
                                       }
                                   }
                                    
                                    bestLocation=property;
                                }
                            }
                        }
                    }

                    if(bestLocation!=undefined){
                        //go and explore
                        autolock=true;
                        newstate="";
                        if(autostate=="getitems"){
                            newstate="getarmor";
                        }
                        if(autostate=="gethealitem"){
                            newstate="getitem";
                        }
                        if(autostate=="getitem"){
                            if(type=="weapon"){
                                autolastweapon=true;
                            }else if(type=="armor"){
                                autolastweapon=false;
                            }
                        }
                        
                        if((type=="weapon" || type=="armor") && isworse){
                            if(player.gold>=10){
                                newstate="gethealitem";
                                setTimeout(function(){autostate=newstate;autolock=false;game.update()},autodelay)
                            }else if(player.hp>3 && player.hp<=Math.floor(player.totalHp/3)){
                                newstate="grind";
                                setTimeout(function(){autostate=newstate;autolock=false;game.update()},autodelay)
                            }else if(player.hp<=3){
                                newstate="supergrind";
                                setTimeout(function(){autostate=newstate;autolock=false;game.update()},autodelay)
                            }else{
                                setTimeout(function(){autostate=newstate;autolock=false;game.update()},autodelay)
                            }
                        }else{
                            changeLocation(bestLocation)
                            setTimeout(function(){autostate=newstate;autolock=false;buy(bestGold,bestItem)},autodelay)
                        }
                        
                        
                    }else{
                        //grind money
                        autolock=true;
                        if(player.hp<=3){
                            newstate="supergrind";
                        }else{
                            newstate="grind";
                        }
                        
                        setTimeout(function(){autostate=newstate;autolock=false;game.update()},autodelay)
                    }
                }else if(autostate=="heal"){
                    var bestHeal=undefined;
                    var bestGold=0;
                    var bestLocation=undefined;
                    for (var property in locations) {
                        if (locations.hasOwnProperty(property) && player.location!=locations[property]){
                            if(locations[property].customs!=undefined && locations[property].level<=player.level){
                                //go there
                                var customs=locations[property].customs
                                for(var i=0;i<customs.length;i++){
                                    
                                    var custom=customs[i];
                                    if(custom[1]=="heal"){
                                        if(player.gold>=custom[2]){
                                           if(bestItem==undefined){
                                               bestHeal=locations[property].customs[i][3];
                                               bestGold=custom[2]
                                           }else if(bestHeal<custom[3]){
                                               bestHeal=locations[property].customs[i][3];
                                               bestGold=custom[2]
                                           } 
                                        }
                                    }
                                }
                                if(bestHeal!=undefined){
                                    bestLocation=property;
                                }
                                
                                break;
                            }
                        }
                    }

                    if(bestLocation!=undefined){
                        //go and explore
                        autolock=true;
                        newstate="";
                        changeLocation(bestLocation)
                        setTimeout(function(){autostate=newstate;autolock=false;heal(bestGold,bestHeal)},autodelay)
                    }else{
                        //grind money
                        autolock=true;
                        if(player.hp<=3){
                            newstate="supergrind";
                        }else{
                            newstate="grind";
                        }
                        setTimeout(function(){autostate=newstate;autolock=false;game.update()},autodelay)
                    }
                }
            }else if(player.state=="battle" && !autolock){
                //Attack/run/heal
                //max possible ene dmg
                var variableEneDmg=Math.ceil(player.enemy.atk/4);
                var eneDmg=Math.ceil((variableEneDmg+player.enemy.atk)-player.armor.value);

                if(eneDmg<=0){eneDmg=1;}
                if(player.enemy.atk==0){eneDmg=0;}
                if(eneDmg>=player.hp){
                     var variableDmg=Math.ceil(-player.weapon.value/4);

                    var dmg=Math.ceil(variableDmg+player.weapon.value+player.strength)-player.enemy.def;
                    if(dmg<player.enemy.hp && player.hp==1 && player.gold<=2){
                        
                    }
                    if(dmg>=player.enemy.hp){
                        setTimeout(function(){autolock=false;attack()},autodelay);
                    }else if(eneDmg<player.totalHp){
                        //heal
                        if(player.items.length>0){
                            var bestHeal=undefined;
                            for(var i=0;i<player.items.length;i++){
                                var item=player.items[i];
                                if(eneDmg<player.hp+item.value){
                                    
                                    if(bestHeal==undefined){
                                        bestHeal=player.items[i];
                                    }else{
                                        if(item.value<=bestHeal.value){
                                            bestHeal=player.items[i];
                                        }
                                    }
                                }
                            }
                            if(bestHeal==undefined && !autolock){
                                //run
                                autolock=true;
                               newstate="gethealitem"
                            if(player.gold<=10){newstate="heal"}
                            if(player.gold<=2){
                                if(player.hp<=3){
                                    newstate="supergrind";
                                }else{
                                    newstate="grind";
                                }
                            }

                                setTimeout(function(){autostate=newstate;autolock=false;run()},autodelay);
                            }else if(!autolock){
                                autolock=true;
                                setTimeout(function(){autolock=false;heal(0,bestHeal.value,bestHeal.name)},autodelay)
                            }
                        }else if(!autolock){
                            autolock=true;
                            newstate="gethealitem"
                            if(player.gold<=10){newstate="heal"}
                            if(player.gold<=2){
                                if(player.hp<=3){
                                    newstate="supergrind";
                                }else{
                                    newstate="grind";
                                }
                            }
                                
                            setTimeout(function(){autostate=newstate;autolock=false;run()},autodelay);
                        }
                    }else if(!autolock){
                        autolock=true;
                        newstate="getarmor";
                                
                        setTimeout(function(){autostate=newstate;autolock=false;run()},autodelay);
                    }
                }else if(!autolock){
                    autolock=true;
                    //atk
                    setTimeout(function(){autolock=false;attack()},autodelay);
                }
            }else if(player.state=="level" && !autolock){
                autolock=true;
                //choose health/strength/luck
                var stats=["health","strength","luck"];
                var stat = stats[Math.floor(Math.random()*stats.length)];
                
               if(player.gold>=10){
                   newstate="getitem";
               } 
                
                setTimeout(function(){autostate=newstate;autolock=false;levelup(stat);game.update()},autodelay)
                
            }
            
            
            //show state
            
            var desc=player.location.description.charAt(0).toLowerCase()+player.location.description.substring(1);
            var state="exploring "+desc;
            if(autostate=="heal"){state="trying to sleep"}
            if(autostate=="getitems"){state="shopping new equipments"}
            if(autostate=="getheal"){state="shopping healing items"}
            if(autostate=="gethealitem"){state="shopping new items"}
            if(autostate=="getweapon"){state="shopping weapons"}
            if(autostate=="grind"){state="grinding for money and xp"}
            if(autostate=="supergrind"){state="really grinding for money and xp"}
            $("#autoState").html("Currently "+state);
            
            //setTimeout(function(){game.update()},100)
        }
    },
    
    updateText:function(){
        //update player text
        var healthBar=Math.floor((player.hp/player.totalHp)*100);
        $(".healthBar").width(healthBar+"%");
        
        id("playerHp",player.hp)
        id("playerTotalHp",player.totalHp)
        
        id("playerWeapon",player.weapon.name)
        id("playerAtk",player.weapon.value+"+"+player.strength)
        
        id("playerArmor",player.armor.name)
        id("playerDef",player.armor.value)
        
        id("playerLuck",player.luck)
        
        id("playerGold",player.gold)
        
        id("playerLevel",player.level)
        
        var xpBar=Math.floor((player.xp/player.totalXp)*100);
        
        $(".xpBar").width(xpBar+"%")
        id("playerXp",player.xp)
        id("playerTotalXp",player.totalXp)
        
        var mode="Normal";
        if(game.permadeath==true){
            mode="Permanent Death";
            $("#playerMode").addClass("dmg");
        }else{
            $("#playerMode").removeClass("dmg");
        }
        id("playerMode",mode)
        
        //update location text
        id("locationName1",capitalize(player.location.name))
        id("locationDesc",capitalize(player.location.description))
        
        id("savingLatest",game.version);
        id("savingLog",game.versionLog);
        id("savingFile",game.file);
        
        var logs="";
        while(game.log.length>6){
            game.log.splice(0,1);    
        }
        
        for(var i=0;i<game.log.length;i++){
            logs+="-"+game.log[i]+"<br>";
        }
        id("locationLog",logs);
        
        id("locationName2",player.location.name)
        $("levelUp").addClass("hide");
        
        //healing stuff
        $("#heal").html("");
        if(player.items.length>0){
            //show healing items
            
            for(var i=0;i<player.items.length;i++){
                var item=player.items[i];
                $("#heal").append(
                "<button class='button buttonRed' onclick='heal(0,"+item.value+",\""+item.name+"\")'>Use "+item.name+" ("+item.value+" hp) ("+item.quantity+" left)</button><br>")
            }
        }
        
        //event
        if(player.state=="dead"){
            $("#eventActive").css("display","none");
        }else if(player.state=="battle"){
            
            $("#eventActive").css("display","inline-block");
            $("#exploreButton,#eventsList").addClass("hide");
            
            id("eventTitle","Fighting "+player.enemy.name);
            
            id("nameFirst",capitalize(player.name));
            id("descFirst","You");
            
            id("hpFirst",'('+player.hp+'/'+player.totalHp+')');
            
            
            
            var enemyBar=Math.floor((player.enemy.hp/player.enemy.totalHp)*100);
            $(".enemyBar").width(enemyBar+"%");
            
            id("weaponFirst",player.weapon.name+" ("+player.weapon.value+" atk)");
            id("armorFirst",player.armor.name+" ("+player.armor.value+" def)");
            
            id("nameSecond",capitalize(player.enemy.name));
            id("descSecond",player.enemy.desc);
            id("hpSecond",'('+player.enemy.hp+'/'+player.enemy.totalHp+')');
            
        }else if(player.state=="free"){
            $("#eventActive").css("display","none");
            if(player.location.events!=undefined){
                $("#exploreButton,#eventsList").removeClass("hide");
            }else{
                $("#exploreButton").addClass("hide");
            }
        }else if(player.state=="level"){
            if(player.luck>=40){
                $("#levelUpLuck").hide();
            }
            $("#levelUp").removeClass("hide");
            $("#levelUpNum").html(player.level);
            $("#exploreButton,#heal,#eventsList,#locationList,#change,#exploreButton").addClass("hide");
            $("#change").hide();
        }else{
            $("#levelUp").addClass("hide");
        }
        
        
        
    },
    
    updateLocations:function(){
        //events
        $("#eventsList").html("");
        if(player.location.customs!=undefined){
            for (var i=0;i<player.location.customs.length;i++){
                var event=player.location.customs[i];
                
                var functionCalled="";
                
                var valid=true;
                if(event[5]==1){
                    valid=false;
                }
                
                if(event[1]=="talk"){
                    var answers=JSON.stringify(event[2]);
                    functionCalled="talk("+answers+")";
                }
                
                if(event[1]=="heal"){
                    var gold=event[2];
                    var heal=event[3];
                    functionCalled="heal("+gold+","+heal+")";
                }
                
                if(event[1]=="buy"){
                    var item=JSON.stringify(event[4]);
                    var xp=event[3];
                    var gold=event[2];
                    functionCalled="buy("+gold+","+item+","+xp+")";
                }
                
                if(valid){
                    $("#eventsList").append(
                    "<button class='button buttonBlue' onclick='"+functionCalled+"'>"+event[0]+"</button><br>")
                }
                
            }
        }
        
        
        //locations
        $("#locationList").html("");
        
        var locked=true;
        var numberShown=0;
        var numberCount=0;
        var totalProperty=0;
        var locked1=false;
        
        for (var property in locations) {
            if (locations.hasOwnProperty(property) && player.location!=locations[property] && locked1==false){
                if(locations[property].level>player.level){
                 locked1=true;   
                }
                //calculate total number of visitable locations
                totalProperty++;
            }
        }
        
        //first shown location restricted between 0 and max
        if(game.firstShown<0){game.firstShown=0;}
        if(game.firstShown>totalProperty-game.maxShown){game.firstShown=totalProperty-game.maxShown;}
        
        //loop every locations
        for (var property in locations) {
            if(numberCount>=game.firstShown){
                locked=false;
                numberCount=-999;
            }
            if (locations.hasOwnProperty(property) && player.location!=locations[property] && locked==false && numberShown<game.maxShown) {
                if(locations[property].level==player.level+1){
                    //add locked button
                    locked=true;
                    $("#locationList").append(
                    "<button class='locked button buttonGreen'>"+capitalize(locations[property].name)+" (Locked until level "+locations[property].level+")</button><br>")
                    numberShown++;
                }else if(locations[property].level<=player.level){
                    //add normal location button
                    $("#locationList").append(
                    "<button class='button buttonGreen' onclick='changeLocation(\""+property+"\")'>"+capitalize(locations[property].name)+"</button><br>")
                    numberShown++;
                    
                }
            }
            if (locations.hasOwnProperty(property) && player.location!=locations[property]){
                //calculate number of locations before the first one shown
                numberCount++;
            }
            
            
        }
        
        //show the buttons up and down
        if(numberShown>=game.maxShown){
            //if first shown is more than 0
            if(game.firstShown>0){
                $("#changeUp").removeClass("hide");
            }else{
                $("#changeUp").addClass("hide");
            }
            
            //if first shown isn't at the end of the list
            if(game.firstShown+game.maxShown<totalProperty){
                $("#changeDown").removeClass("hide");
            }else{
                $("#changeDown").addClass("hide");
            }
        }
        
        
    }
}

var player={
    name:"undefined",
    state:"free",
    location:locations[""+firstLocation],
    enemy:undefined,
    strength:0,
    luck:0,
    hp:20,
    totalHp:20,
    
    weapon:{
        type:"weapon",
        name:"Fists",
        value:2,
    },
    
    armor:{
        type:"armor",
        name:"Leather clothes",
        value:1,
    },
    
    items:[
    ],
    
    gold:5,
    
    level:1,
    xp:0,
    totalXp:10,
}


function explore(){
    if(player.state=="free" && player.location.events!=undefined){
        var rand=ran(0,100);
        
        var loc=player.location;
        var event=undefined;
        for(var i=0;i<loc.events.length;i++){
            if(rand<=loc.events[i][2]){
                event=loc.events[i];
                break;
            }
        }
        if(event!=undefined){
            if(event[0]=="enemy" || event[0]=="unique"){
                $("#eventAttack,#eventRun,#hpFirstAll,#hpSecondAll").removeClass("hide");
                player.state="battle";
                player.enemy=event[1];
                if(event[0]=="unique"){
                    
                    player.enemy.unique=player.location.level;
                }
                
                if(event[0]=="enemy"){
                    game.log.push("You have encountered <b>"+event[1].name+"</b>!");
                }else if(event[0]=="unique"){
                    game.log.push("You have encountered <b>"+event[1].name+"</b> (<b>BOSS</b>)!");
                }
                
                enemyDead=false;
                fadeInDiv("eventActive",fadingTime);
            }else if(event[0]=="gold"){
                game.log.push(event[1]);
                player.gold+=event[3];
            }else if(event[0]=="custom"){
                game.log.push(event[1]);
                var customs=locations[""+event[3]].customs;
                for(var j=0;j<customs.length;j++){
                    if(customs[j][0]==event[4]){
                        customs[j]=event[5];
                    }
                }
                loc.events.splice(i,1);
            }
        }else{
            game.log.push("You found nothing.");
        }
        
        game.update();
    }   
}

var enemyDead=false;

function attack(){
    if(player.state=="battle"){
        //player attack
        var variableDmg=Math.ceil(ran(-player.weapon.value/4,player.weapon.value/4));
        
        var dmg=Math.ceil(variableDmg+player.weapon.value+player.strength)-player.enemy.def;
        
        var critical=false;
        
        if(ran(0,100)<=(10+player.luck)){
            critical=true;
            dmg=Math.ceil((player.weapon.value+player.strength)*2)-player.enemy.def;
        }
        
        
        
        if(dmg<=0){dmg=1;}
        var playerDead=false;
        player.enemy.hp-=dmg;
        if(player.enemy.hp<=0 && enemyDead==false){
            //defeated
            enemyDead=true;
            
            //random xp/gold
            var randXp=ran(-player.enemy.xp/4,player.enemy.xp/4);
            var tempXp=Math.ceil(randXp+(player.enemy.xp*(player.luck+100)/100));
            
            if(player.enemy.xp==0){
                tempXp=0;
            }else if(tempXp<=0){
                tempXp=1;
            }
            
            if(tempXp<0){
                tempXp=0;
            }
            var randGold=ran(-player.enemy.gold/4,player.enemy.gold/4);
            var tempGold=Math.ceil(randGold+(player.enemy.gold*(player.luck+100)/100));
            
            if(player.enemy.gold==0){
                tempGold=0;
            }else if(tempGold<=0){
                tempGold=1;
            }
            
            if(tempGold<0){
                tempGold=0;
            }
            
            player.xp+=tempXp;
            player.gold+=tempGold;
            
            game.log.push("<b>"+capitalize(player.enemy.name)+"</b> was defeated! You gained <b>"+tempXp+"</b> xp and <b>"+tempGold+"</b> gold!")
            
            //Loot
            if(player.enemy.loot!=undefined){
                for(var i=0;i<player.enemy.loot.length;i++){
                    var rand=ran(0,100);
                    var loot=player.enemy.loot[i];
                    if(rand<=(loot.chance+Math.ceil(player.luck/4))){
                        //loot obtained
                        var better=equip(loot.item,false);
                        if(better==true){
                            game.log.push("<b>"+capitalize(player.enemy.name)+"</b> dropped <b>"+loot.item.name+"</b> ("+loot.item.value+") and you equipped it!");
                        }else{
                            game.log.push("<b>"+capitalize(player.enemy.name)+"</b> dropped <b>"+loot.item.name+"</b> ("+loot.item.value+") but your "+loot.item.type+" is better.");
                        }
                        
                    }
                }
            }
            
            
            
            $("#eventActive").fadeOut(fadingTime,function(){
                if(player.enemy.unique!=undefined){
                    
                    var locationUnique=undefined;
                    //dead unique
                    for (var property in locations) {
                            if (locations.hasOwnProperty(property)){
                                if(locations[property].level==player.enemy.unique){
                                    locationUnique=locations[property];
                                }
                                
                            }
                        
                    }
                    
                    if(locationUnique!=undefined){

                        for(var i=0;i<player.location.events.length;i++){
                            var event=player.location.events[i][1];
                            if(event==player.enemy){
                                //destroy enemy
                                player.location.events.splice(i,1);
                            }
                        }
                    }
                    
                    
                }
                    
                player.enemy.hp=player.enemy.totalHp;
                if(player.state!="level"){
                    player.state="free";
                }
                game.update();
            })
            
        }
        
        if(!enemyDead){
            //enemy attack
            var variableEneDmg=Math.ceil(ran(-player.enemy.atk/4,player.enemy.atk/4));
            var eneDmg=Math.ceil((variableEneDmg+player.enemy.atk)-player.armor.value);
            
            if(eneDmg<=0){eneDmg=1;}
            if(player.enemy.atk==0){eneDmg=0;}
            
            player.hp-=eneDmg;
            if(player.hp<=0){
                //defeated
                playerDead=true;
            }
            
            if(!playerDead){
                if(critical==false){
                    game.log.push("You dealt <span class='dmg'>"+dmg+"</span> damage to <b>"+player.enemy.name+"</b>.")
                }else{
                    game.log.push("<b>CRITICAL!</b> You dealt <span class='dmg'>"+dmg+"</span> damage to <b>"+player.enemy.name+"</b>.")
                }
                game.log.push("You received <span class='dmg'>"+eneDmg+"</span> damage!")
            }else{
                //player dead
                game.log.push("<span class='dmg'>You died.</span>")
                
                dead=true;
                
            
                player.enemy.hp=player.enemy.totalHp;
                player.state="dead";
                $("#eventActive").css("display","none");
                $("#change").hide();
                $("#dead").removeClass("hide");
                $("#exploreButton").hide();
                if(game.permadeath==true){
                    deleteSave(false);
                }
                game.update();
            }
        }
        
        
        game.update();
    }
}


function run(){
    if(player.state=="battle"){
        $("#eventActive").fadeOut(fadingTime,function(){
            player.enemy.hp=player.enemy.totalHp;
            player.state="free";
            var goldLost=0;
            if(player.gold>0){
                goldLost=Math.ceil(player.gold*(0.2-(player.luck/200)));
                player.gold-=goldLost;
            }

            game.log.push("You ran away from the fight, but you lost <b>"+goldLost+"</b> gold.")
            game.update();
        })
    }
}


function changeLocation(location,show){
    if(player.state=="free"){
        $("#change").fadeOut(fadingTime);
        if(show!=undefined){
            $("#location").fadeOut(fadingTime,function(){
            player.location=locations[location];
            game.updateText();
            game.updateLocations();
            $("#location").fadeIn(fadingTime);
            $("#change").fadeIn(fadingTime);
            })
        }else{
            $("#location").fadeOut(fadingTime,function(){
            if(player.location!=locations[location]){
               game.log.push("You travelled to "+locations[location].name+".");
            }
            player.location=locations[location];
            game.updateText();
            game.updateLocations();
            $("#location").fadeIn(fadingTime);
            $("#change").fadeIn(fadingTime);
            })
        }
        
    }
}


function levelup(attr){
    if(attr=="health"){
        player.totalHp+=4;
    }else if(attr=="strength"){
        player.strength+=0.5;
    }else if(attr=="luck"){
        player.luck+=2;
    }
    player.hp=player.totalHp;
    player.state="free";
    $("#levelUp").addClass("hide");
    $("#exploreButton,#heal,#eventsList,#locationList,#change").removeClass("hide");
    $("#change").show();
    save();
}


function introVerify(mode){
    var name= $("#introName").val();
    if(mode!=undefined){
            if(mode=="load"){
               var tempPlayer=JSON.parse(localStorage.getItem("player"));
                name=tempPlayer.name;
            }
    }
    if(verifierString(name)){
        player.name=name;
        
        $("#playerName").html(capitalize(name));
        fadeOutInDiv("introduction","player,#location,#event,#change,#autoButton,#autoState,#saveButton,#loadButton,#savingInfo,#saveMessage,#heal",fadingTime)
        
        if(localStorage.getItem("player")!=null){
            game.file=(localStorage.getItem("version"));
        }
        
        if(mode!=undefined){
            if(mode=="load"){
                load();
            }
            if(mode=="permadeath"){
                game.permadeath=true;
            }
        }

        game.updateText();
        game.updateObj=setInterval(game.update.bind(game),1000);
    }else{
        document.getElementById("introName").focus();
        $("#introError").html("Invalid name");
    }
}



//events

function nothing(){}

function talk(ans){
    var answers=ans;
    var rand=ran(0,answers.length-1);
    game.log.push(answers[rand]);
    game.update();
}

function heal(gold,hp,name){
    if(player.gold>=gold){
        player.gold-=gold;
        
        if(name!=undefined){
            for(var i=0;i<player.items.length;i++){
                if(player.items[i].name==name && player.items[i].value==hp){
                    player.hp+=hp;
                    if(player.items[i].quantity>1){
                        player.items[i].quantity--;
                    }else{
                        player.items.splice(i,1);
                    }
                    game.log.push("You used <b>"+name+"</b> and healed <span class='dmg'>"+hp+"</span> hp!")
                }
            }
        }else{
            if(player.hp>=player.totalHp){
                game.log.push("You already have max health.")
                player.gold+=gold;
            }else{
                player.hp+=hp;
                game.log.push("You healed <span class='dmg'>"+hp+"</span> hp for <b>"+gold+"</b> gold!")
            }
            
        }
        
    }else{
        game.log.push("You don't have enough gold.")
    }
    game.update();
}


function buy(gold,item,xp){
    if(player.gold>=gold){
        player.gold-=gold;
        if(item!=undefined){
            var objItem=item
            var better=equip(objItem,false);
            var val=objItem.value;
            if(objItem.type=="heal"){
                val+=" hp";
            }
            if(better==true){
                if(gold<=0){
                    game.log.push("You equipped <b>"+objItem.name+"</b> ("+val+")!");
                }else{
                    game.log.push("You equipped <b>"+objItem.name+"</b> ("+val+") for <b>"+gold+"</b> gold!");
                }
                //remove event?
                if(player.location.customs!=undefined){
                    for(var i=0;i<player.location.customs.length;i++){
                        var custom=player.location.customs[i]
                        if(custom[4]!=undefined){
                            if(custom[4].name==objItem.name && custom[5]==0){
                                custom[5]=1;
                                break;
                            }
                        }
                    }
                }
            }else{
                player.gold+=gold;
                game.log.push("Your "+objItem.type+" is better.")
            }
            game.updateLocations();
        }else{
            player.xp+=xp;
            game.log.push("You gained <b>"+xp+"</b> xp for <b>"+gold+"</b> gold!")
        }
    }else{
        game.log.push("You don't have enough gold.")
    }
    game.update();
}

function equip(obj,show){
    var objItem=obj;
    var stat=objItem.value;
    var better=false;
    
    if(objItem.type=="heal"){
        better=true;
        var found=false;
        for(var i=0;i<player.items.length;i++){
            var item=player.items[i];
            if(item.name==objItem.name && item.value==objItem.value){
                found=true;
                item.quantity++;
            }
        }
        if(found==false){
            player.items.push({
                type:"heal",
                name:objItem.name,
                value:objItem.value,
                quantity:objItem.quantity
            })
        }
    }
    
    if(objItem.type=="weapon"){
        if(player.weapon.value<stat){
            player.weapon=objItem;
            better=true;
        }
    }else if(objItem.type=="armor"){
        if(player.armor.value<stat){
            player.armor=objItem;
            better=true;
        }
    }
    if(show==true && better==true){
        game.log.push("You equipped <b>"+objItem.name+"</b> ("+stat+")!");
    }
    return better;
}

var auto=false;
var autostate="";
var autodelay=10;
var autocall="";
var autolock=false;
var dead=false;
var autolastweapon=false;

function automode(){
    if(!auto){auto=true;fadingTime=autodelay/2;$("#autoButton").html("Auto mode (On)")}else if(auto){auto=false;fadingTime=initialFadingTime;$("#autoButton").html("Auto mode (Off)")}
    
    if(auto){
        clearInterval(game.updateObj)
        game.updateObj=setInterval(game.update.bind(game),autodelay*2);
    }else{
        clearInterval(game.updateObj)
        game.updateObj=setInterval(game.update.bind(game),1000);
    }
    
    game.update();
}

function save(){
    if(player.state=="free" && !dead){
        localStorage.setItem("player",JSON.stringify(player));
        localStorage.setItem("locations",JSON.stringify(locations));
        localStorage.setItem("log",JSON.stringify(game.log));
        localStorage.setItem("version",game.version);
        game.file=game.version;
        game.log.push("Game saved.")
        game.update();
    }
}

if(localStorage.getItem("player")!=null){
    $("#introLoad").removeClass("hide");
}

function load(){
    if(player.state=="free"){
        if(localStorage.getItem("player")==null){
            game.log.push("No save file to load.")
        }else{
            game.file=(localStorage.getItem("version"));
            
            
            player=JSON.parse(localStorage.getItem("player"));
            locations=JSON.parse(localStorage.getItem("locations"));
            game.log=JSON.parse(localStorage.getItem("log"));


            for (var property in locations) {
                if (locations.hasOwnProperty(property) && player.location.name == locations[property].name) {
                    changeLocation(property,false);
                    break;
                }
            }
            
            if(game.file!=game.version){
                game.log.push("Game loaded, your save file is from an older version.")
            }else{
                game.log.push("Game loaded.")
            }
                
            
        }
        
        game.update();
    }
}

function deleteSave(choose){
    if(choose!=undefined && choose==false){
        localStorage.removeItem("player");
        localStorage.removeItem("locations");
        localStorage.removeItem("log");
        localStorage.removeItem("version");
        game.file="No save file."
        game.log.push("Save file deleted.")
        game.update();
    }else if(window.confirm("Are you sure you want to delete your save file?")==true){
        localStorage.removeItem("player");
        localStorage.removeItem("locations");
        localStorage.removeItem("log");
        localStorage.removeItem("version");
        game.file="No save file."
        game.log.push("Save file deleted.")
        game.update();
    }
}



function fadeOutInDiv(id,id2,dur,delay){
    var del=0;
    if(delay!=undefined){del=delay;}
    $("#"+id).fadeOut(dur).delay(del).queue(function(){
        $("#"+id2).fadeIn(dur);
    });
}

function fadeOutDiv(id,dur){
    $("#"+id).fadeOut(dur);
}

function fadeInDiv(id,dur){
    $("#"+id).fadeIn(dur);
}

function id(id,val){
    $("#"+id).html(val);
}

function between(val,min,max){
    if(val<min){val=min}
    if(val>max){val=max}
    return val;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ran(min,max){
    {return Math.floor(Math.random()*(max-min+1)+min);}
}

function verifierString(str){
    var regex=/^\S/;
    var vide=false;
    if(str!="" && regex.exec(str)){
        vide=true;
    }
    return vide;
}

game.init();