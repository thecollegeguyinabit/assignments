function task1(str){
    console.log(str)
    let result = 0;
    for( let char of str){
        if(!isNaN(char)){
            result+=parseInt(char);
        }
    } 
    console.log(result);
}
task1("foo8bar8cat2tc2");


function task2(str){
    let result = 0, nums;
    if(str.includes(" ")) {
        nums = str.split(",").join("").split(" ");
    }else {
        nums = str.split(",");
    }
    nums = nums.map( num => parseFloat(num));
    result = nums.reduce((prev, cur) => prev+= cur);
    console.log("The Answer is ",result);
}
task2("1.5, 2.3, 3.1, 4, 5.5, 6, 7, 8, 9, 10.9");
task2("1.5,2.3,3.1,4,5.5,6,7,8,9,10.9");



class Shape{
    area(){}
}
class Circle extends Shape{
    constructor(r){
        super();
        this.r = r;
    }
    area(){
        return Math.PI*Math.pow(this.r,2);
    }
}
class Rectangle extends Shape{
    constructor(l,b){
        super();
        this.l = l;
        this.b = b;
    }
    area(){
        return 0.5*this.l*this.b;
    }
}

const circle = new Circle(10);
console.log("Area of circle is",circle.area().toFixed(4));
const rect = new Rectangle(12,4);
console.log("Area of rectangle is",rect.area().toFixed(2));



class University{
    constructor(name){
        this.name = name;
        this.department = [];
    }
    addDepartment(department){
        if(this.department.includes(department)) return console.error("Already existed");
        this.department.push(department);
    }
    removeDepartment(department){
        if(!this.department.includes(department)) return console.error("Can't remove as the department don't exist");
        const index = this.department.indexOf(department);
        if(index !== -1) this.department.splice(index, 1);
    }
    displayDepartment(){
        if(this.department.length == 0) return console.error("Department don't exist");
        this.department.forEach( dep => console.log(dep));
    }
}
const mbit = new University("MBIT");
mbit.addDepartment("Computer");
mbit.addDepartment("IT");
mbit.removeDepartment("Civil");
mbit.removeDepartment("Computer");
mbit.removeDepartment("IT");
mbit.displayDepartment();



function task5(){
    const show = document.getElementById("result");
    const n = document.getElementById("number").value;

    let a = 0, b = 1; 
    const res = [];
    if (n <= 0 ) throw new Error("Fibonacci series can't be negative");
    for( let i = 0 ; i < n; i++){
        res.push(a);
        [a,b] = [b , a + b];
    }

    show.innerHTML = `[${res}]`;
}




function task6(number){
    if(number === 0 || number === 1){
        return 1;
    }else{
        return number * task6(number-1);
    }
}
console.log("the factorial of 5 is ", task6(10));