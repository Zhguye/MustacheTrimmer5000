
const canvas =document.querySelector('canvas');

const d = canvas.getContext('2d');

canvas.width=1024;
canvas.height=576;
d.fillRect(0,0,canvas.width,canvas.height);
const gravity =0.2


class sprite{
    constructor({position, velocity, colour='green', offset}){
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
        
    }

    draw(){
        d.fillStyle= this.colour
    d.fillRect(this.position.x, this.position.y, this.width, this.height)

    //hitbox
    if (this.Attack){
    d.fillStyle ="red"
    d.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
    }
}

    update(){
        this.draw()
        this.hitbox.position.x = this.position.x + this.hitbox.offset.x
        this.hitbox.position.y = this.position.y
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
   }, 10000)
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
}
});
player.draw()

const enemy = new sprite({position:{
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
colour : "blue"
});
enemy.draw()

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

function tribulate() {
window.requestAnimationFrame(tribulate)
d.fillStyle ='lightblue'
d.fillRect(0,0, canvas.width,canvas.height)
d.fillStyle = 'beige'
d.fillRect(0,0, canvas.width,canvas.height/2 )
player.update()
enemy.update()
player.velocity.x =0
enemy.velocity.x=0
if (keys.a.pressed && player.lastkey === 'a'){
    player.velocity.x = -1
}else if (keys.d.pressed && player.lastkey ==='d') {
    player.velocity.x =1 
}

if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
    enemy.velocity.x = -1
}else if (keys.ArrowRight.pressed && enemy.lastkey ==='ArrowRight') {
    enemy.velocity.x =1 
}

//collision detection.
if(
    PunchIntersect({
        rectangle1:player,
        rectangle2:enemy
    }) && player.Attack
    ) { player.Attack =false
     console.log('A')
}

if(
    PunchIntersect({
        rectangle1:enemy,
        rectangle2:player
    }) && enemy.Attack
    ) { enemy.Attack =false
     console.log('B')
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


case 'ArrowRight':
    keys.ArrowRight.pressed = true
    enemy.lastkey = 'ArrowRight'
break
case 'ArrowLeft':
    keys.ArrowLeft.pressed =true
    enemy.lastkey = 'ArrowLeft'
break

case 'ArrowUp':
    enemy.velocity.y = -10;
   
break
case 'End':
        enemy.attacks()
    break
}
    
console.log(event.key);

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
