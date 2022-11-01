// clase constructora de ojetos que van hacer push al array misProductos
class Producto{
    constructor(id,nombre,descripcion,talle,precio,imagen){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.talle = talle;
        this.precio = precio;
        this.imagen = imagen;
        this.vendido= false;
    }
}
const misProductos = [];
const carrito = JSON.parse(localStorage.getItem("compras"))||[];

misProductos.push(new Producto(1,"en una sola pieza","maya entera en varios colores disponibles","Talle: L,S",2600,"../fotos/bikini-mar (4).jpg"));
misProductos.push(new Producto(2,"Tops negro","tops en varios colores y tallas","Talle: L,M,S", 1500 ,"../fotos/training-828741_640.jpg"));
misProductos.push(new Producto(3,"Conjuntito de short y remera","conjunto disponible en unico color, talles varios","Talle: M, L",4200,"../fotos/model-2405173_640.jpg"));
misProductos.push(new Producto(4,"Bikini en dos piezas hermosa !!","varios colores disponibles","Talle: unico Nº2",3000,"../fotos/sand-4359026_1920.jpg"));
misProductos.push(new Producto(5,"Remera negra 100% algodon","ultimas dos unidades","Talle: L",800,"../fotos/woman-3399464_640.jpg"));
misProductos.push(new Producto(6,"Bikini multicolores","conjunto disponible en unico color","Talle: L, S",2200,"../fotos/surf-1533278_1920.jpg"));
misProductos.push(new Producto(7,"calza deportiva lycra","calza resistente y comoda para hacer tus actividades","Talle: L",2800,"../fotos/mujer mancuerna.jpg"));
misProductos.push(new Producto(8,"Conjunto tops-joggin","ultimos dos conjuntos disponibles","Talle: S",900,"../fotos/adult-640.jpg"));
misProductos.push(new Producto(9,"En una sola pieza","maya entera en varios colores disponibles","Talle: S, L, XL",3200,"../fotos/bikini-mar (1).jpg"));
