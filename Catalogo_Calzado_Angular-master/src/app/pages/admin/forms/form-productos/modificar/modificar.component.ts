import { Component, OnInit } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { ConexProductosService, Producto,Genero } from 'src/app/services/conexiones/conex-productos/conex-productos.service';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  cargar:any=[];//CARGAR DATOS PARA MODIFICAR
  ListaMarca: Marca[]=[];//LISTA DE MARCAS
  ListaCateforias: categoria[]=[];//LISTA DE CATEGORIAS
  ListaGenero: Genero[]=[];//LISTA DE Genero
  LlenarcomboMarca:any=[];//LLenar Combobox de Marcas
  LlenarcomboCategorias:any=[];//LLenar Combobox de Categorias
  LlenarcomboGenero:any=[];//LLenar Combobox de Categorias
  aux:Producto[]=[];//auxiliar
  idm:number=0;//Index de Marcas
  idc:number=0;//Index de Categoria
  idg:string='';//Index de Genero
  modal_admin:boolean  = false;//bandera de Modal
  isChecked: boolean = false//bandera de oferta;
  id_entrada:number=0;//ID PARA EDITAR 
  subcription: Subscription = new Subscription();

  /* Un modelo del producto. */
  Producto:Producto={
    pk_id_producto: 0,
    codigo_producto:'', 
    img:'', 
    nombre_producto:'',
    descripcion:'',
    fk_marca:0, 
    modelo:'',
    genero:'',
    talla:'',
    costo:'',
    oferta:'',
    fk_id_categoria:0
  };

  /**
   * Un constructor que se utiliza para inicializar la clase.
   * @param {ConexProductosService} ConexProductoService - Este es el servicio que creé para conectarme
   * a la API.
   * @param {ConexMarcaService} ConexMarca - es el nombre del servicio que estoy usando para obtener
   * los datos de la base de datos.
   * @param {ConexCategoriaService} ConexCategoria - es el nombre del servicio
   */
  constructor(private ConexProductoService:ConexProductosService, private ConexMarca:ConexMarcaService,private ConexCategoria:ConexCategoriaService) {
    this.CargarProducto();
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    console.log('Observable cerrado')
  }

  /**
   * Se suscribe a un servicio que devuelve un producto, luego asigna el producto a una variable, luego
   * asigna el producto a otra variable, luego recorre la segunda variable y asigna la marca, categoría
   * y género del producto a las variables, luego llama a una función que devuelve la marca, la
   * categoría y el género, luego verifica si el producto está en oferta.
   */
  CargarProducto(){
    this.subcription.add(
      this.ConexProductoService.disparadorDetalleProducto.subscribe(data=>{
        this.ConexProductoService.getUnProducto(data).subscribe(
        res=>{             
          this.cargar=res;  
          this.aux = <any>res;      
          for(let marca of this.aux) {          
            this.idm=marca.fk_marca;
            this.idc=marca.fk_id_categoria;
            this.idg=marca.genero;
            this.listarMarcas(this.idm);
            this.listarCategorias(this.idc);
            this.listarGenero(this.idg);
            if(marca.oferta=='Oferta'){
              this.isChecked = true;
            }
          }
        },
        err => console.log('Hola')
        );
      })
    );
  }

   //METODO PARA LLENAR EL COMBOBOX DE MARCAS PARA EL OBJETO A MODIFICAR
  listarMarcas(id:number){  
   this.ConexMarca.getMarcas().subscribe(
     res=>{    
       this.ListaMarca=<any>res;
       this.LlenarcomboMarca = this.ListaMarca.filter(item =>item.id_Marca == id)
       for (let i = 0; i < this.ListaMarca.length; i++) {
          if(this.ListaMarca[i].id_Marca !=id){
            this.LlenarcomboMarca.push(this.ListaMarca[i]);
          } 
        }      
     },
     err => console.log(err)  
   );
  } 

   //METODO PARA LLENAR EL COMBOBOX DE CATEGORIAS PARA EL OBJETO A MODIFICAR
  listarCategorias(id:number)
  { 
    this.ConexCategoria.getCategoria().subscribe(
      res=>{     
        this.ListaCateforias=<any>res;
        this.LlenarcomboCategorias = this.ListaCateforias.filter(item =>item.pk_id_categoria == id)
        for (let i = 0; i < this.ListaCateforias.length; i++) {
            if(this.ListaCateforias[i].pk_id_categoria !=id){
              this.LlenarcomboCategorias.push(this.ListaCateforias[i]);
            } 
          }      
      },
      err => console.log(err)  
    );
  } 
    
   //METODO PARA LLENAR EL COMBOBOX DE GENERO PARA EL OBJETO A MODIFICAR
  listarGenero(id:string){
  this.ListaGenero= this.ConexProductoService.getGenero();
  this.LlenarcomboGenero = this.ListaGenero.filter(item =>item.genero == id)
    for (let i = 0; i < this.ListaGenero.length; i++) {
      if(this.ListaGenero[i].genero !=id){
        this.LlenarcomboGenero.push(this.ListaGenero[i]);
      } 
    }     
  } 

  //OFERTA CHECK
  /**
   * Si el valor es verdadero, establezca la propiedad isChecked en verdadero y registre "Oferta" en la
   * consola. Si el valor es falso, establezca la propiedad isChecked en falso y registre "No Oferta"
   * en la consola.
   * @param {boolean} valor - booleano
   */
  obtenerOferta(valor: boolean) {
    if(valor == true){
      this.isChecked = valor;
      console.log('Oferta');
    }else{
      this.isChecked = valor;
      console.log('No Oferta');
    }
  }

  /**
   * Toma una cadena, la convierte en un número entero y la asigna a la propiedad fk_id_categoria del
   * objeto Producto.
   * </código>
   * @param {string} valor - cadena
   */
  obtenercategoria(valor: string) {
    this.Producto.fk_id_categoria= parseInt(valor); 
    console.log(valor);
  }

 /**
  * La función obtenerMarca() toma como parámetro una cadena y la asigna a la propiedad fk_marca del
  * objeto Producto.
  * </código>
  * @param {string} valor - cadena
  */
  obtenerMarca(valor: string) {
    this.Producto.fk_marca = parseInt(valor); 
    console.log(valor);
  }

  /**
   * "La función obtenercGenero toma como argumento un string y lo asigna a la propiedad
   * Producto.genero."
   * </código>
   * @param {string} valor - cadena
   */
  obtenerGenero(valor: string) {
    this.Producto.genero = valor;
    console.log(valor);
  }
  
 

  /**
   * Quiero actualizar los datos en la base de datos, pero quiero actualizar solo los datos que no
   * están vacíos, es decir, si el usuario no quiere cambiar los datos, no los actualiza. R: Puede usar
   * el método <code>Object.keys()</code> para obtener las claves del objeto y luego iterar sobre ellas
   * para verificar si el valor está vacío o no. <code>Object.keys(this.Producto).forEach(key =&gt; {
   * if (this.Producto[key] === &#39;&#39;) { delete this.Producto[key]; } });</code>
   * @param {number} ind - número,
   * @param {string} codigo_producto - cadena;
   * @param {string} img - cadena,
   * @param {string} nombre_producto - cadena;
   * @param {string} descripcion - cadena,fk_marca: numero,modelo: cadena,genero: cadena,
   * @param {number} fk_marca - número,
   * @param {string} modelo - cadena,
   * @param {string} genero - cadena;
   * @param {string} talla - cadena,
   * @param {string} costo - cadena;
   * @param {string} oferta - cadena;
   * @param {number} fk_id_categoria - número,
   */
  modificar(ind:number,codigo_producto:string,img:string,nombre_producto:string,descripcion:string,fk_marca:number,modelo:string,genero:string,
    talla:string,costo:string,oferta:string,fk_id_categoria:number){
    //Extrae text//
    this.Producto.pk_id_producto = ind;
    this.Producto.codigo_producto =codigo_producto;
    this.Producto.img =img;
    this.Producto.nombre_producto =nombre_producto;
    this.Producto.descripcion =descripcion;
    if(this.Producto.fk_marca == 0){
      this.Producto.fk_marca = fk_marca;
    }
    this.Producto.modelo = modelo;
    if(this.Producto.genero == ''){
      this.Producto.genero =genero;
    }
   
    this.Producto.talla = talla;
    this.Producto.costo =costo;

    if(this.isChecked == true){
      this.Producto.oferta ='Oferta';
    }else{
      this.Producto.oferta ='No Oferta';
    }

    if(this.Producto.fk_id_categoria== 0){
      this.Producto.fk_id_categoria =fk_id_categoria;
    }
    console.log(this.Producto);
    
    swal.fire({
      title: 'Seguro que quieres modificarlo?',
      text: "Seguro que quieres hacer esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, modificarlo!'
    }).then((result) => {
      if (result.value) {         
        try {   
          if(this.Producto.pk_id_producto != 0 && this.Producto.codigo_producto !='' && this.Producto.img!='' && this.Producto.nombre_producto!=''
         && this.Producto.descripcion!='' && this.Producto.fk_marca !=0 && this.Producto.modelo!='' && this.Producto.genero !='' && this.Producto.talla !=''
         && this.Producto.costo !='' && this.Producto.oferta !='' && this.Producto.fk_id_categoria !=0){
          this.ConexProductoService.editProducto(this.Producto.pk_id_producto,this.Producto).subscribe(
              res=>{
                console.log(res);       
              },
              err=>console.log(err)
            );
            
            swal.fire({
              icon: 'success',
              title: 'Se modificó el registro de Producto Exitosamente',
              text: 'Continuar'
            });
          }else{
            swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por Favor!! Ingrese todos los parámetros'
            });
          }
        } catch (error) {
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ingrese todos los parametros Por favor'
          });
        } 
      }
    })    
  }
}
