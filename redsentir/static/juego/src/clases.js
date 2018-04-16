
var Fondo = cc.Sprite.extend({
	onEnter:function(){
		this.setPosition(cc.winSize.width,cc.winSize.height/2);                
		this.scheduleUpdate();
	},
	mover:function(){
		this.setPosition(this.getPosition().x-velocidad,this.getPosition().y);
		if(this.getPosition().x < - 200){
			this.setSpriteFrame(cache.getSpriteFrame("conducto_2.png"));
			this.setPosition(this.getPosition().x + cc.winSize.width,this.getPosition().y);
		}
	}
});

var Ovulo = cc.Sprite.extend({
	ctor:function(){
		this._super();                
		this.velocidadEnY = 0;
		this.encendido = false;
                this.setSpriteFrame(cache.getSpriteFrame("ovulo.png"));
	},
	onEnter:function(){
		this._super();
		this.setPosition(cc.winSize.width/2,cc.winSize.height/2);		
		this.scheduleUpdate();                
	},
	caer:function(){
		var y = this.getPosition().y;
		if(y > cc.winSize.height || y < 0){
			cc.director.runScene(new MenuEscena());
		}
		if(this.encendido){
			this.velocidadEnY += potencia;
		}
		this.setPosition(this.getPosition().x,this.getPosition().y+this.velocidadEnY);
		this.velocidadEnY += gravedad; 
	}    
});

var Esperma = cc.Sprite.extend({
	movimiento: 0,
	tipo: 'normal',
	ctor:function(){
		this._super();		
	},
	onEnter:function(){
		this._super();
		this.setPosition(cc.winSize.width+100,Math.random()*cc.winSize.height);
		var mover = cc.MoveTo.create(4,new cc.Point(-100,Math.random()*cc.winSize.height));
		this.runAction(mover);
                var aniFrames = [];
                var aniFrame = new cc.AnimationFrame();
                aniFrame.initWithSpriteFrame(cache.getSpriteFrame("esperma.png"), 1, null);
                aniFrames.push(aniFrame);
                var aniFrame1 = new cc.AnimationFrame();
                aniFrame1.initWithSpriteFrame(cache.getSpriteFrame("esperma_m.png"), 1, null);
                aniFrames.push(aniFrame1);
                var animation = cc.Animation.create(aniFrames, 0.08);
                var animate = cc.Animate.create(animation);
                this.runAction(animate.repeatForever());
		this.scheduleUpdate();
	},
	update:function(dt){		
		this.movimiento++;
		var ovuloContorno = ovulo.getBoundingBox();
		var espermaContorno = this.getBoundingBox();
		if(cc.rectIntersectsRect(ovuloContorno,espermaContorno)){
			if(energia == 0){
				cc.director.pushScene(new MenuEscena());
			}else{
				energia--;
				ovulo.setOpacity(ovulo.getOpacity() - 25);
			}			
		}
		if(this.getPosition().x < -50){
			this.removeFromParent(true);
		}
	}
});