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
// TODO: []Ajouter enemies qui meurent après une fois
// TODO: []Ajouter Contenu

//CONSTANTS
var fadingTime=500;

var game={
    version:0.5,
    state:"introduction",
    log:[],
    updateObj:undefined,
    init:function(){
        //initialize
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
        
        //update location text
        id("locationName1",capitalize(player.location.name))
        id("locationDesc",capitalize(player.location.description))
        
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
        //event
        if(player.state=="battle"){
            
            $("#eventActive").css("display","inline-block");
            $("#exploreButton").addClass("hide");
            
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
                $("#exploreButton").removeClass("hide");
            }else{
                $("#exploreButton").addClass("hide");
            }
        }else if(player.state=="level"){
            if(player.luck>=40){
                $("#levelUpLuck").hide();
            }
            $("#levelUp").removeClass("hide");
            $("#levelUpNum").html(player.level);
            $("#exploreButton,#eventsList,#locationList,#change,#exploreButton").addClass("hide");
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
        
        var locked=false;
        
        for (var property in locations) {
            if (locations.hasOwnProperty(property) && player.location!=locations[property] && locked==false) {
                if(locations[property].level>player.level){
                    locked=true;
                    $("#locationList").append(
                    "<button class='locked button buttonGreen'>"+capitalize(locations[property].name)+" (Locked until level "+locations[property].level+")</button><br>")
                }else{
                    $("#locationList").append(
                    "<button class='button buttonGreen' onclick='changeLocation(\""+property+"\")'>"+capitalize(locations[property].name)+"</button><br>")
                }
                
            }
        }
        
        
    }
}

var player={
    name:"undefined",
    state:"free",
    location:locations.village,
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
    
    gold:5,
    
    level:1,
    xp:0,
    totalXp:10,
}


function explore(){
    if(player.state=="free"){
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
                    
                    player.enemy.unique=player.location;
                }
                
                game.log.push("You have encountered <b>"+event[1].name+"</b>!");
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
            }
            
            if(tempXp<0){
                tempXp=0;
            }
            var randGold=ran(-player.enemy.gold/4,player.enemy.gold/4);
            var tempGold=Math.ceil(randGold+(player.enemy.gold*(player.luck+100)/100));
            
            if(player.enemy.gold==0){
                tempGold=0;
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
                    console.log("r"+rand)
                    console.log(loot.chance)
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
                    //dead unique
                    var locationUnique=player.enemy.unique;
                    
                    for(var i=0;i<player.location.events.length;i++){
                        var event=player.location.events[i][1];
                        if(event==player.enemy){
                            //destroy enemy
                            player.location.events.splice(i,1);
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
                game.log.push("You dealt <span class='dmg'>"+dmg+"</span> damage to <b>"+player.enemy.name+"</b>.")
                game.log.push("You received <span class='dmg'>"+eneDmg+"</span> damage!")
            }else{
                //player dead
                game.log.push("<span class='dmg'>You died.</span>")
                
            
                player.enemy.hp=player.enemy.totalHp;
                player.state="dead";
                $("#change").hide();
                $("#dead").removeClass("hide");
                $("#exploreButton").hide();
                game.update();
            }
        }
        
        
        game.update();
    }
}


function run(){
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
    $("#exploreButton,#eventsList,#locationList,#change,#exploreButton").removeClass("hide");
    $("#change").show();
    save();
}


function introVerify(){
    var name= $("#introName").val();
    if(verifierString(name)){
        player.name=name;
        
        $("#playerName").html(capitalize(name));
        fadeOutInDiv("introduction","player,#location,#event,#change,#saveButton,#loadButton,#saveMessage",fadingTime)

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

function heal(gold,hp){
    if(player.gold>=gold){
        player.gold-=gold;
        player.hp+=hp;
        game.log.push("You healed <span class='dmg'>"+hp+"</span> hp for <b>"+gold+"</b> gold!")
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
            if(better==true){
                if(gold<=0){
                    game.log.push("You equipped <b>"+objItem.name+"</b> ("+objItem.value+")!");
                }else{
                    game.log.push("You equipped <b>"+objItem.name+"</b> ("+objItem.value+") for <b>"+gold+"</b> gold!");
                }
                //remove event?
                for(var i=0;i<player.location.customs.length;i++){
                    var custom=player.location.customs[i]
                    if(custom[4]!=undefined){
                        if(custom[4].name==objItem.name && custom[5]==0){
                            custom[5]=1;
                            break;
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
    
    if(objItem.type=="weapon"){
        if(player.weapon.value<stat){
            player.weapon=objItem;
            better=true;
        }
    }else{
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

function save(){
    if(player.state=="free"){
        localStorage.setItem("player",JSON.stringify(player));
        localStorage.setItem("locations",JSON.stringify(locations));
        localStorage.setItem("log",JSON.stringify(game.log));
        localStorage.setItem("version",game.version);
        game.log.push("Game saved.")
        game.update();
    }
}

function load(){
    if(player.state=="free"){
        if(localStorage.getItem("player")==null){
            return false;
        }else{
            var version=(localStorage.getItem("version"));
            if(version!=game.version){
                game.log.push("Game <b>not</b> loaded, your save file is from an older version.")
            }else{
                player=JSON.parse(localStorage.getItem("player"));
                locations=JSON.parse(localStorage.getItem("locations"));
                game.log=JSON.parse(localStorage.getItem("log"));


                for (var property in locations) {
                    if (locations.hasOwnProperty(property) && player.location.name == locations[property].name) {
                        changeLocation(property,false);
                        break;
                    }
                }
                game.log.push("Game loaded.")
            }
            
        }
        
        game.update();
    }
}

function deleteSave(){
    if(window.confirm("Are you sure you want to delete your save file?")==true){
        localStorage.removeItem("player");
        localStorage.removeItem("locations");
        localStorage.removeItem("log");
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