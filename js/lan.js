
var canvas = document.getElementById('canvas'),
   
    c = canvas.getContext("2d"),
    // 初始化了一个空的particles对象，来记录生成的粒子们
    particles = {},
    particleIndex = 0,
    particleNum = 50,
    gravity = 0.7;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//particle
    function Particle() {
        
        this.posX = canvas.width/2;
        this.posY = canvas.height/8;
        
        this.vx = Math.random()*10-5;
        this.vy = Math.random()*10-5;
        this.width = 1; 
        this.height = Math.random()*6-3; 


        particleIndex++;
        
        particles[particleIndex] = this;
       
        this.id = particleIndex;
        
        this.life = 0;
        this.death = 140;

//        random color
        this.colors = [
            "rgba(100,100,100,"+(Math.random()+.5)+")",
            "rgba(52,152,200,"+(Math.random()+.5)+")",
            "rgba(41,128,250,"+(Math.random()+.5)+")"
        ];
        this.color = this.colors[Math.floor(Math.random()*3)];
}


Particle.prototype.draw = function () {
    this.posX += this.vx;
    this.posY += this.vy;

    this.life++;

    if (this.life>= this.death){
        delete particles[this.id];
    }

    
    if (this.posY > (canvas.height - 100)){
        this.vx *= 0.8;
        this.vy *= -0.5;
        this.posY = (canvas.height - 100);
    }

    this.vy += gravity;

     c.fillStyle = this.color;
     c.fillRect(this.posX,this.posY,this.width,this.height);
}

setInterval(function () {
    
    c.fillStyle = "rgba(0,0,0,0.4)";
    c.fillRect(0,0,canvas.width,canvas.height);

    
    for (var i = 0; i < particleNum; i++){
        new Particle();
    }

    
    for (var i in particles){
        particles[i].draw();
    }
    
},30)
