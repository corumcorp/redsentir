var Fondo = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile(res.Conducto_png);
	},
	onEnter:function(){
		this.setPosition(cc.winSize.width,cc.winSize.height/2);
		this.scheduleUpdate();
	},
	mover:function(){
		this.setPosition(this.getPosition().x-velocidad,this.getPosition().y);
		if(this.getPosition().x < - 200){
			this.initWithFile(res.Conducto_2);
			this.setPosition(this.getPosition().x + cc.winSize.width,this.getPosition().y);
		}
	}
});

var Ovulo = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile(res.Ovulo_png);
		this.velocidadEnY = 0;
		this.encendido = false;
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
		contador += 1;
		if(contador==motonea){
			this.initWithFile(res.Motonea_png);
			this.tipo = 'motonea';
			contador = 0;
		}else{
			this.initWithFile(res.Esperma);
		}
	},
	onEnter:function(){
		this._super();
		this.setPosition(cc.winSize.width+100,Math.random()*cc.winSize.height);
		var mover = cc.MoveTo.create(4,new cc.Point(-100,Math.random()*cc.winSize.height));
		this.runAction(mover);
		this.scheduleUpdate();
	},
	update:function(dt){
		if(this.movimiento%10==0  && contador!=motonea){
			if(this.tipo == 'normal'){
				this.initWithFile(res.Esperma);
			}else{
				this.initWithFile(res.Motonea_png);
			}			
		}
		if(this.movimiento%20==0 && contador!=motonea){
			if(this.tipo == 'normal'){
				this.initWithFile(res.Esperma_m);
			}else{
				this.initWithFile(res.Motonea_png);
			}
		}
		this.movimiento++;
		var ovuloContorno = ovulo.getBoundingBox();
		var espermaContorno = this.getBoundingBox();
		if(cc.rectIntersectsRect(ovuloContorno,espermaContorno)){
			if(energia == 0){
				cc.director.pushScene(new MenuEscena());
			}else{
				energia--;
				ovulo.setOpacity(ovulo.getOpacity() - 5);
			}			
		}
		if(this.getPosition().x < -50){
			this.removeFromParent(true);
		}
	}
});
