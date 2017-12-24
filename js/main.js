/* TO DOS */
// TODO: []Ajouter message erreur à l'intro si nom incorrect

//CONSTANTS
var fadingTime=500;

var game={
    state:"introduction",
    updateObj:undefined,
    init:function(){
        //initialize
    },
    
    update:function(){
        player.xp++;
        
        //check if showed values are correct
        player.hp=between(player.hp,0,player.totalHp)
        player.xp=between(player.xp,0,player.totalXp)
        
        this.updateText();
    },
    
    updateText:function(){
        //update text
        var healthBar=Math.floor((player.hp/player.totalHp)*100);
        
        $(".healthBar").width(healthBar+"%")
        id("mainHp",player.hp)
        id("mainTotalHp",player.totalHp)
        
        id("mainWeapon",player.weapon.name)
        id("mainAtk",player.weapon.atk)
        
        id("mainArmor",player.armor.name)
        id("mainDef",player.armor.def)
        
        id("mainGold",player.gold)
        
        id("mainLevel",player.level)
        
        var xpBar=Math.floor((player.xp/player.totalXp)*100);
        
        $(".xpBar").width(xpBar+"%")
        id("mainXp",player.xp)
        id("mainTotalXp",player.totalXp)
    }
}

var player={
    name:"",
    hp:10,
    totalHp:10,
    
    weapon:{
        name:"Fists",
        atk:1,
    },
    
    armor:{
        name:"Leather clothes",
        def:0,
    },
    
    gold:0,
    
    level:1,
    xp:0,
    totalXp:10,
}

function introVerify(){
    var name= $("#introName").val();
    if(name!=""){
        player.name=name;
    }
    
    $("#mainName").html(name);
    fadeOutInDiv("introduction","main",fadingTime)
    
    game.updateText();
    game.updateObj=setInterval(game.update.bind(game),1000);
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

game.init();