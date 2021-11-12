// example data
const exampleArray = [10, 4, 100, 35, 31, 23, 443, 221, 342, 10, 12,42];
const exampleArray3 = [10, 4, 100, 35, 31, 23, 443, 221, 342, 10, 12 , 42];
const shit = ["function", null, function() {}, () => {}, 10, 100, {}];
const exampleArray2 = [[10, 4, "100", 35, "31", "23", 443, "221", "342", 10, 12, 42]]
//Funciones para encontrar el valor en el array
    // Imperativa con coste lineal:
    function getNumberFour (valor){ 
    let posiciones = [];  
        for(let i in valor){
            if(valor[i]===4) posiciones.push(i)
        }
        return posiciones
    }
    //console.log(getNumberFour(exampleArray))

    //Imperativa con coste logaritmico:
    //Funcion limpiar array
    function clearArray (arr){
        let newArr=[];
        for (let i in arr){
            if(typeof (arr[i])==='number'){
                newArr.push(arr[i]);
            }
        } 
        return newArr;
    }
    //Funcion para ordenar de menor a mayor el array
    function merge (left, right, type){
        const arrFinal = []
        while (left.length && right.length) {
          arrFinal.push(type === '<' ? (left[0] > right[0] ? right.shift() : left.shift()) : ( left[0] < right[0] ? right.shift() : left.shift()))
        }
        while (left.length) {
          arrFinal.push(left.shift())
        }
        while (right.length) {
          arrFinal.push(right.shift())
        }
        return arrFinal;
    }
    function mergeSort (array, type) {
        let arr = clearArray(array)
        if (arr.length < 2) return arr
        const middle = Math.floor(arr.length / 2)
        const arr_l = arr.slice(0, middle)
        const arr_r = arr.slice(middle, arr.length)
        const sorted_l = mergeSort(arr_l,type)
        const sorted_r = mergeSort(arr_r,type)
        return merge(sorted_l, sorted_r,type)
    }
    // Funcion para encontrar el elemento
    const binarySearch = (array, item) => {
        let arr=mergeSort(array, '<')
        let low = 0
        let high = arr.length - 1
        while (low <= high) {
          const mid = Math.floor((low + high) / 2)
          const auxMid = arr[mid]
          if (auxMid === item) {
            return `En numero ${item} se encuentra en la posicion ${exampleArray.indexOf(item)}`
          }
          if (auxMid > item) {
            high = mid - 1
          } else {
            low = mid + 1
          }
        }
    return null //if not found
    }
    // console.log(binarySearch(exampleArray,443))
    
    //Declarativa:
    const searchValue = (val, arr) => {
    	return (
    		arr.filter(element => element===val).map((val) => { 
    				const index = arr.indexOf(val);
    				arr.splice(index, 1);
    				return index;	
    			})
    	);
    };
    // console.log(searchValue(4, exampleArray));

// Funcion que limpia el array shit y deja solo strings
let cleanShit = shit.filter(value => typeof value === 'string')
// console.log(cleanShit)

//Funcion para calcular la distancia entre puntos usando objetos
function Point(x, y) {
    this.x = x;
    this.y = y;
}
let a = new Point(3,5)
let b = new Point(7,8)
//Mediante una funcion
function calculateDistance (pointA, pointB) {
    return (pointA instanceof Point && pointB instanceof Point) ? new Point((pointB.x-pointA.x),(pointB.y-pointA.y)) : null
}
//Mediante metodos del objeto
Point.prototype.calculateDistance = function (pointNew) {
    return (pointNew instanceof Point) ? new Point((pointNew.x-this.x),(pointNew.y-this.y)) : null
}
// let c = calculateDistance(a,b)
// let c = b.calculateDistance(a)
// console.log(c)

//Funcion para comparar cada elemento del ambos arrays
let compare = exampleArray.slice(0,exampleArray2[0].length).map((value1,i) => {
    let compare2 = exampleArray2.map((value2) => {
        return(value1==value2[i] && value1 === value2[i])
    })
    return compare2;
})
// console.log(compare)

//Funcion para recorrer la matrix y transformarla en array
const reloadMatrix = (matrix, internalResponse = []) => {
    //comprobar que ya es numero
    if (!Array.isArray(matrix)) {

        if (!typeof internalResponse === 'undefined') return internalResponse;
        else return 'Error trying to load matrix';
    }
    //seguir descomponiendo la matriz
    matrix.forEach((rhs) => {
        if (typeof rhs === 'number' || typeof rhs === 'string') internalResponse.push(rhs);
        return reloadMatrix(rhs, internalResponse);
    });
    return internalResponse;
}
//Funcion para comparar valores
function compareValue (arr,arr2){
    let comparasao = []
    let i=0;
    let flag = true;
    while (i < arr.length && flag==true){
        if(!arr2.includes(arr[i])) flag = false;
        else comparasao.push(arr.includes(arr2[i]));
        i++;
    }
    return [comparasao, flag]
}
//Funcion para comparar los arrays
function compareArr(arr1, arr2) {
    let array1 = reloadMatrix(arr1);
    let array2 = reloadMatrix(arr2);
    let res = [];
    if(array1.length == array2.length){
        res = compareValue(array1,array2)
        res[1]==='true' ? console.log('Mismo tamaño y mismo contenido') : console.log(`Mismo tamaño y mismo contenido hasta ${res[0].length}`)
        return res[0]
    }else {
        if (array1.length > array2.length){
            res = compareValue(array2,array1)
            res[1]==='true' ? console.log('Distinto tamaño y mismo contenido') : console.log(`Distinto tamaño y mismo contenido hasta ${res[0].length}`)
            return res[0]
        } else {
            res = compareValue(array1,array2)
            res[1]==='true' ? console.log('Distinto tamaño y mismo contenido') : console.log(`Distinto tamaño y mismo contenido hasta ${res[0].length}`)
            return res[0]
        }
    }
}
console.log(compareArr(exampleArray,exampleArray2))
