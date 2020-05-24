# Funciones útiles para JS

##  | Comparar dos array de objetos | 
```js
const posibilidades = [
  {
    Nombre: 'Abdi',
    Edad: 45
  },
  {
    Nombre: 'Wuri',
    Edad: 15
  },
  {
    Nombre: 'Navaga',
    Edad: 60
  }
];

//Convierto cada objeto a string
const strArray = posibilidades.map((e)=> JSON.stringify(e));
// respuestas del usuario
const datos = [
  {
    Nombre: 'Abdi',
    Edad: 46
  },
  {
    Nombre: 'Wuri',
    Edad: 15
  }
];

let acum = 0;
for(const i of datos){
  const exist = strArray.includes(JSON.stringify(i))
  if(exist) acum++;
}
if (datos.length == acum){
  console.log('Resultado dentro de las posibilidades')
}else{
  console.log('Algún dato no estaba en las posibilidades')
}


```
