var MenuCapa = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
		this.audioEngine = cc.audioEngine;
		this.audioEngine.playMusic(res.musica_escena_2,true);
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF("Red Sentir", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        this.addChild(helloLabel, 5);
        this.sprite = new cc.Sprite();
        this.sprite.setSpriteFrame(cache.getSpriteFrame("inicio.png"));
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        backgroundLayer = cc.LayerColor.create(new cc.Color(200,100,40,255),size.width, size.height);
        this.addChild(backgroundLayer);
        this.addChild(this.sprite, 0);
        cc.eventManager.addListener({
        	event:cc.EventListener.MOUSE,
        	onMouseDown:function(event){
				energia=100;
				puntage = 0;
				cc.director.runScene(new JuegoEscena());
        	}
        },this)
        cc.eventManager.addListener({
        	event:cc.EventListener.TOUCH_ONE_BY_ONE,
        	onTouchBegan:function(event){
				energia=100;
				puntage = 0;
				cc.director.runScene(new JuegoEscena());
        	}
        },this)
        return true;
    }
});

var PuntageCapa = cc.Layer.extend({
    ctor:function () {
		this._super();
		altura = cc.winSize.height - 40;
		var energiaTitulo = new cc.LabelTTF("Energia :", "Arial", 18);
		energiaTitulo.x = 50;
		energiaTitulo.y = altura;
		energiaValor = new cc.LabelTTF(energia, "Arial", 18);
		energiaValor.x = 100;
		energiaValor.y = altura;
		var puntageTitulo = new cc.LabelTTF("Puntage :", "Arial", 18);
		puntageTitulo.x = 180;
		puntageTitulo.y = altura;
		puntageValor = new cc.LabelTTF(puntage, "Arial", 18);
		puntageValor.x = 250;
		puntageValor.y = altura;
		this.addChild(energiaTitulo);
		this.addChild(energiaValor);
		this.addChild(puntageTitulo);
		this.addChild(puntageValor);
	}
});

var JuegoCapa = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();        
        this.audioEngine = cc.audioEngine;
        this.audioEngine.playMusic(res.musica_escena_2,true);
        fondo = new Fondo();                
        cache = cc.spriteFrameCache;
        cache.addSpriteFrames(res.imagenes_plist, res.imagenes);
        fondo.setSpriteFrame(cache.getSpriteFrame("conducto.png"));
        this.addChild(fondo);
        ovulo = new Ovulo();
        this.addChild(ovulo);				
        this.scheduleUpdate();
        cc.eventManager.addListener({
        	event:cc.EventListener.MOUSE,
        	onMouseDown:function(event){
        		ovulo.encendido = true;
        	},
        	onMouseUp:function(event){
        		ovulo.encendido = false;
        	}
        },this)	
        cc.eventManager.addListener({
        	event:cc.EventListener.TOUCH_ONE_BY_ONE,        	
                onTouchBegan: function(touch, event) {
                    ovulo.encendido = true;
                    return true
                },
                onTouchEnded: function(touch, event) {
                    ovulo.encendido = false;                    
                    return true
                }
        },this)
        this.schedule(this.agregarEsperma,0.5);
    },
    agregarEsperma:function(event){
    	var esperma = new Esperma();
    	this.addChild(esperma,1);
    },
	update:function(){
		fondo.mover();
		ovulo.caer();
		puntage += 1;
		puntageValor.setString(puntage);
		energiaValor.setString(energia);
	}
});