// "use strict";class TextScramble{constructor(t){this.el=t,this.chars="!<{}—=+*^?#________",this.update=this.update.bind(this)}setText(t){const e=this.el.innerText,s=Math.max(e.length,t.length),h=new Promise(t=>this.resolve=t);this.queue=[];for(let h=0;h<s;h++){const s=e[h]||"",r=t[h]||"",a=Math.floor(40*Math.random()),n=a+Math.floor(40*Math.random());this.queue.push({from:s,to:r,start:a,end:n})}return cancelAnimationFrame(this.frameRequest),this.frame=0,this.update(),h}update(){let t="",e=0;for(let s=0,h=this.queue.length;s<h;s++){let{from:h,to:r,start:a,end:n,char:i}=this.queue[s];this.frame>=n?(e++,t+=r):this.frame>=a?((!i||Math.random()<.28)&&(i=this.randomChar(),this.queue[s].char=i),t+=`<span class="dud">${i}</span>`):t+=h}this.el.innerHTML=t,e===this.queue.length?this.resolve():(this.frameRequest=requestAnimationFrame(this.update),this.frame++)}randomChar(){return this.chars[Math.floor(Math.random()*this.chars.length)]}}const phrases=["mcfaith&lt;/&gt;"],el=document.querySelector(".text-change"),fx=new TextScramble(el);let counter=0;const next=()=>{fx.setText(phrases[counter]).then(()=>{setTimeout(next,5e3)}),counter=(counter+1)%phrases.length};next();

const chars = "Σ×Π#-_¯—→↓↑←0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";

var Glitch = function(selector, index, numberOfGlitchedLetter, timeGlitch, timePerLetter, timeBetweenGlitch){
  this.selector = selector;
  this.index = index;
  this.numberOfGlitchedLetter = numberOfGlitchedLetter;
  this.innerText;
  this.charArray = [];
  this.charIndex = [];
  this.timeGlitch = timeGlitch;
  this.timeBetweenGlitch = timeBetweenGlitch;
  this.timePerLetter = timePerLetter;
  this.maxCount = Math.floor(this.timeGlitch/this.timePerLetter);
  this.count = 0;
}

Glitch.prototype.init = function(){
  this.innerText = this.selector.innerText;
  this.charArray = this.innerText.split("");
  if(this.numberOfGlitchedLetter == undefined || this.numberOfGlitchedLetter > this.innerText.length){
    this.numberOfGlitchedLetter = this.innerText.length;
  }
  this.defineCharIndexToRandomize();
}

Glitch.prototype.defineCharIndexToRandomize = function(){
  this.charIndex = [];
  for(let i=0; i<this.numberOfGlitchedLetter; i++){
    let randCharIndex = Math.floor(Math.random() * this.charArray.length);
    this.charIndex.push(randCharIndex);
  }
}

Glitch.prototype.randomize = function(){
  //copy the char array
  let randomString = Array.from(this.charArray);
  
  //randomize char
  for(let i=0; i<this.numberOfGlitchedLetter; i++){
    let randIndex = Math.floor(Math.random() * chars.length);
    let randCharIndex = this.charIndex[i];
    if(randomString[randCharIndex] !== ' '){
      randomString[randCharIndex] = chars[randIndex];
    }
  }
  this.selector.innerText = randomString.join("");
}

Glitch.prototype.update = function(interval){
  if(this.count >= this.maxCount - 1){
    this.selector.innerText = this.innerText;
    this.defineCharIndexToRandomize();
    let ctx = this;
    let wait = setTimeout(function(){
      ctx.count = 0;
    }, this.timeBetweenGlitch);
  }else{
    this.randomize();
    this.count ++;
  }
}

Glitch.prototype.glitch = function(){
  let ctx = this;
  let interval= setInterval(function(){
        ctx.update(this);
      },this.timePerLetter);
}

var arrayElements;
var glitchArray = [];

function initAllGlitch(){
  arrayElements = document.querySelectorAll(".hack-text");
  for(let i=0; i<arrayElements.length; i++){
    let selector = arrayElements[i];
    let randLetterNumber = 2 + Math.floor(Math.random() * 8);
    let randGlitchTime = 500 + Math.floor(Math.random() * 2500);
    let randGlitchPauseTime = 500 + Math.floor(Math.random() * 2500);
    let glitch = new Glitch(selector, i, randLetterNumber, 200, 65, randGlitchPauseTime);
    glitch.init();
    glitchArray.push(glitch);
  }
}


function update(){
  for(let i=0; i<glitchArray.length; i++){
    let glitch = glitchArray[i];
    glitch.glitch();
  }
}

initAllGlitch();
update();