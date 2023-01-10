const canvas =document.querySelector('canvas');

const d = canvas.getContext('2d');

canvas.width=1024;
canvas.height=576;
d.fillRect(0,0,canvas.width,canvas.height);
const gravity =0.2


class sprite{
    constructor({position, velocity, colour='magenta', offset,offset1}){
        this.position=position;
        this.velocity =velocity;
        this.height = 150;
        this.width =50
        this.lastkey
        this.hitbox = {
            position: { x: this.position.x, y: this.position.y}
             , width: 100, height: 50, offset
        }
        this.colour = colour
        this.Attack
        this.health =100;
        this.Blockbox =  {
            position: { x: this.position.x, y: this.position.y}
             , width: 20, height: 150, offset1
        }
        this.Block

    }

    draw(){
        d.fillStyle= this.colour
    d.fillRect(this.position.x, this.position.y, this.width, this.height)

    //hitbox
    if (this.Attack){
    d.fillStyle ="red"
    d.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
    }

    //blockbox
    if (this.Block){
        d.fillstyle = 'yellow'
        d.fillRect(this.Blockbox.position.x, this.Blockbox.position.y, this.Blockbox.width, this.Blockbox.height)
    }
    
}

    update(){
        this.draw()
        this.hitbox.position.x = this.position.x + this.hitbox.offset.x
        this.hitbox.position.y = this.position.y
        this.Blockbox.position.x = this.position.x + this.Blockbox.offset1.x+ 70
        this.Blockbox.position.y = this.position.y

        this.position.x+= this.velocity.x
        this.position.y+= this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y =0;
        }
        else  this.velocity.y += gravity
    }

    attacks(){
   this.Attack = true
   setTimeout(() => {
    this.Attack = false
   }, 1000)
    }

    blocking(){
        this.Block = true
        setTimeout(()=>{
            this.Block =false
        }, 100)
    }
};





const player = new sprite({position: {
    x:0,
    y:0
},
velocity: {
    x:0,
    y:0
},
offset: {
    x:0,
    y:0
},
offset1: {
    x:0,
    y:0
}

});
player.draw()

const player2 = new sprite({position:{
    x:974,
    y:0
},
velocity: {
    x:0,
    y:0
},

offset: {
    x:-50,
    y:0
},
offset1: {
    x:-110,
    y:0
},
colour : "blue"
});
player2.draw()

console.log(player)

const keys = {
    a : {
        pressed:false
    },
    d : {
        pressed:false
    },
    w : {
        pressed:false
    },
 

    ArrowLeft: {
        pressed:false
    },
    
    ArrowRight: {
        pressed:false
    },
    
    ArrowUp: {
        pressed:false
    }
}
function PunchIntersect({
    rectangle1, rectangle2
}){
    return(
        rectangle1.hitbox.position.x+ rectangle1.hitbox.width >= rectangle2.position.x &&
        rectangle1.hitbox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.hitbox.position.y + rectangle1.hitbox.height >= rectangle2.position.y && 
        rectangle1.hitbox.position.y <= rectangle2.position.y + rectangle2.height
    )
}


function BlockIntersect({
    rectangle3, rectangle4
}){
    return(
        rectangle3.Blockbox.position.x+ rectangle3.Blockbox.width >= rectangle4.position.x &&
        rectangle3.Blockbox.position.x <= rectangle4.position.x + rectangle4.width &&
        rectangle3.Blockbox.position.y + rectangle3.Blockbox.height >= rectangle4.position.y && 
        rectangle3.Blockbox.position.y <= rectangle4.position.y + rectangle4.height
    )
}
function Gamestate({player2, player}){

    document.querySelector('#Baa').style.display = 'flex'

    if(player.health===player2.health) {
        document.querySelector('#Baa').innerHTML = 'Tie!'
        
    }
    else if(player.health<player2.health) {
        document.querySelector('#Baa').innerHTML = 'Player 2 Wins!'
       
    }
    else if( player.health>player2.health){
        document.querySelector('#Baa').innerHTML = 'Player 1 Wins!'
        
    }

}


let Time=60
function DTimer(){
  
    if(Time>0){
        setTimeout(DTimer, 1000)
        Time-- 
        document.querySelector('#Clock').innerHTML = Time}
        if (Time ===0){
            document.querySelector('#Baa').style.display = 'flex'
       
            Gamestate({player2, player})
    }
       
         
}
DTimer()
function tribulate() {
window.requestAnimationFrame(tribulate)
d.fillStyle ='lightblue'
d.fillRect(0,0, canvas.width,canvas.height)
d.fillStyle = 'beige'
d.fillRect(0,0, canvas.width,canvas.height/2 )
player.update()
player2.update()
player.velocity.x =0
player2.velocity.x=0
if (keys.a.pressed && player.lastkey  === 'a'){
    player.velocity.x = -1
}else if (keys.d.pressed && player.lastkey ==='d') {
    player.velocity.x =1 
}

if (keys.ArrowLeft.pressed && player2.lastkey === 'ArrowLeft'){
    player2.velocity.x = -1
}else if (keys.ArrowRight.pressed && player2.lastkey ==='ArrowRight') {
    player2.velocity.x =1 
}



//collision detection.
if(
    PunchIntersect({
        rectangle1:player,
        rectangle2:player2
    }) && player.Attack
    ) { player.Attack =false
        player2.health-=20
     document.querySelector('#HealthR').style.width= player2.health + '%'
}

if(
    PunchIntersect({
        rectangle1:player2,
        rectangle2:player
    }) && player2.Attack
    ) { player2.Attack =false
        player.health-=20
        document.querySelector('#HealthL').style.width= player.health + '%'
}

if(
    BlockIntersect({
        rectangle3:player2,
        rectangle4:player
    }) && player2.Block
    ) { player2.Block =false
        player.health-=5
        document.querySelector('#HealthL').style.width= player.health + '%'
}

if(
    BlockIntersect({
        rectangle3:player,
        rectangle4:player2
    }) && player.Block
    ) { player.Block =false
        player2.health-=5
        document.querySelector('#HealthR').style.width= player2.health + '%'
}


if (player.health <= 0 || player2.health <=0){
    Gamestate({player2,player})

}

}

tribulate()

window.addEventListener('keydown', (event) =>{
switch (event.key){
    case 'd':
        keys.d.pressed = true
        player.lastkey = 'd'
    break
    case 'a':
        keys.a.pressed =true
        player.lastkey = 'a'
    break

    case 'w':
        player.velocity.y = -10;
       
    break

    case ' ':
        player.attacks()
    break

    case 'e':
        player.blocking()
    break


case 'ArrowRight':
    keys.ArrowRight.pressed = true
    player2.lastkey = 'ArrowRight'
break
case 'ArrowLeft':
    keys.ArrowLeft.pressed =true
    player2.lastkey = 'ArrowLeft'
break

case 'ArrowUp':
    player2.velocity.y = -10;
   
break
case 'End':
        player2.attacks()
    break

    case 'l':
        player2.blocking()
    break

}
    

})

window.addEventListener('keyup', (event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed =false
        break
        case 'a':
           keys.a.pressed =false
        break
        case 'w':
            keys.w.pressed =false
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed =false
        break
        case 'ArrowLeft':
           keys.ArrowLeft.pressed =false
        break
        case 'ArrowUp':
            keys.ArrowUp.pressed =false
        break
    }





    //window.addEventListener("dblclick", (event) => {
      //  switch(event.key){
       //     case 'dd':
       //         player.velocity.x = 3
//
      //  }
      //  console.log("Double-click detected")
        // Double-click detected
     // })
        
   // console.log(event.key);
    
    })

   // const buffer[]
