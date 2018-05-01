var fondo;
var velocidad = 2;
var juegoCapa;
var ovulo;
var gravedad = -0.1;
var potencia = 0.2;
var motonea = 8;
var contador = 0;
var energia = 100;
var puntage = 0;
var puntageValor = 0;
var energiaValor = 0;

var JuegoEscena = cc.Scene.extend({
    onEnter:function () {
        this._super();		
        juegoCapa = new JuegoCapa();
		puntageCapa = new PuntageCapa();
        this.addChild(juegoCapa);
		this.addChild(puntageCapa);
    }
});

var MenuEscena = cc.Scene.extend({
    onEnter:function () {
        this._super();
        puntageCapa = new PuntageCapa();	
        menuCapa = new MenuCapa();
		this.addChild(menuCapa);
        this.addChild(puntageCapa);
    }
});
