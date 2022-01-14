# Funciones útiles para JS

##  Comparar dos array de objetos | compare two object array
```js
const posibilidades = [{Nombre: 'Abdi'},{Nombre: 'Wuri'},{ Nombre: 'Navaga'}];

//Convierto cada objeto a string
const strArray = posibilidades.map((e)=> JSON.stringify(e));
// respuestas del usuario
const datos = [{ Nombre: 'Abdi' },{Nombre: 'Wuri'}];
//acum para contar las coincidencias
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
##  operador de propagación | spread operator 

```js
let itemA = ['A','B'];
let itemB = ['B','C'];
let itemAB = [...itemA,...itemB];

//console.log(itemAB) = ["A", "B", "B", "C"]
```

##  Laravel pusher
https://stackoverflow.com/questions/62153997/binding-callbacks-on-laravel-echo-with-laravel-websockets

reconnect
https://github.com/beyondcode/laravel-websockets/issues/69

