let car: Car;
let cars: Array<{[key: string]: any }> =[]

function createCar() {
    //dom element definition
    let plate:string=(<HTMLInputElement>document.getElementById("plate")).value;
    let brand:string=(<HTMLInputElement>document.getElementById("brand")).value;
    let color:string=(<HTMLInputElement>document.getElementById("color")).value;

    //validation
    let formValidate = validateCar(plate, brand, color);

    if (formValidate === true) {
        car = new Car(plate, brand, color);
        let infoCar = <HTMLElement>document.getElementById('infoCar');
        infoCar.classList.remove("d-none");

        infoCar.innerHTML = `<p class="pt-3"><span class="font-weight-bold">Plate:</span> ${plate}</p>
        <p class="pt-3"><span class="font-weight-bold">Brand:</span> ${brand}</p>
        <p class="pt-3"><span class="font-weight-bold">Color:</span> ${color}</p>`;

        let formWheels = <HTMLFormElement>document.getElementById('formWheels');
        formWheels.classList.remove("d-none");

        let formCar = (<HTMLFormElement>document.getElementById("formCar"));
        formCar.reset();

        let inputs = Array.from(formCar.querySelectorAll("input"));
        inputs.forEach(function(input){
            if(input.classList.contains("is-invalid")){
                input.classList.remove("is-invalid");
                
            }
        })
    }
}


function validateCar(plate:string,brand:string,color:string) {
  
    let error:number = 0;

    //4 numeros i tres lletres
    let plate1:any =/^(\d{4})([a-zA-Z]{3})$/

    if(plate==""){
        (<HTMLInputElement>document.getElementById("plate")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorPlate")).textContent = "Plate is required";
        error++;
    } else if (!plate1.test(plate)) {
        (<HTMLInputElement>document.getElementById("plate")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorPlate")).textContent = "Plate must have 4 numbers & 3 letters";
        error++;
    }

    if(brand==""){
        (<HTMLInputElement>document.getElementById("brand")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorBrand")).textContent = "Brand is required";
        error++;
    }

    if(color==""){
        (<HTMLInputElement>document.getElementById("color")).classList.add("is-invalid"); 
        (<HTMLElement>document.getElementById("errorColor")).textContent = "Color is required";
        error++;
    }


    if (error > 0) { 
        return false;
    } else {
        return true;
    }
}


function addWheels() {
    let checkWheels: boolean = false;

    for (let i = 1; i <= 4; i++) { 
        let wheelDiameter = (<HTMLInputElement>document.getElementById('wheelDiam' + [i])).value; 
        let wheelBrand = (<HTMLInputElement>document.getElementById('wheelBrand' + [i])).value;
        let diameterValue = Number(wheelDiameter); 
        let validateWheel: number = validateWheels(diameterValue, i, wheelBrand);

        if (validateWheel > 0 && !checkWheels) {
            checkWheels = true;
        }
    }

    if (!checkWheels) {
        for (let i = 1; i <= 4; i++) {
            let wheelDiameter = (<HTMLInputElement>document.getElementById('wheelDiam' + [i])).value;
            let wheelBrand = (<HTMLInputElement>document.getElementById('wheelBrand' + [i])).value; 
            let diameterValue = Number(wheelDiameter); 
            car.addWheel(new Wheel(diameterValue, wheelBrand));

            let formWheels = <HTMLFormElement>document.getElementById('formWheels');
            formWheels.reset();
    
            let inputs = Array.from(formWheels.querySelectorAll("input"));
            inputs.forEach(function(input){
                if(input.classList.contains("is-invalid")){
                    input.classList.remove("is-invalid");
                    
                }
            })

            let infoWheels = <HTMLElement>document.getElementById('infoWheels');
            infoWheels.innerHTML = `<p class="col-12 pt-3 font-weight-bold text-center text-success">ALL WHELLS HAVE BEEN SUCCESSFULLY ADDED</p>`;
            infoWheels.classList.remove("d-none");
        }
        // console.log(car);
        cars.push(car);
        let list = <HTMLElement>document.getElementById('list');
        list.innerHTML =  cars.map(car => `<li>${car.plate + " " + car.brand + " " + car.color}</li>`).join('')
    }
}


function validateWheels(diameter: any, index: number, brand: any) {
    let error:number = 0;

    let diameterElement = <HTMLInputElement>document.getElementById("wheelDiam" + [index]);
    let brandElement = <HTMLInputElement>document.getElementById("wheelBrand" + [index]);
    let errorDiametre = <HTMLInputElement>document.getElementById("errorwheelDiam" + [index]);
    let errorBrand = <HTMLInputElement>document.getElementById("errorwheelBrand" + [index]);

    if (diameter == "") {
        diameterElement.classList.add("is-invalid");
        errorDiametre.textContent = `Wheel ${index} diameter is required!`
        error++;
    } else if (diameter < 0.4 || diameter > 2) {
        diameterElement.classList.add("is-invalid");
        errorDiametre.textContent = `Error value wheel ${index}: the diameter has to be between 0.4cm and 2cm.`
        error++;
    }
    
    if (brand == "") {
        brandElement.classList.add("is-invalid");
        errorBrand.textContent = `Brand for wheel ${index} is required!`
        error++;
    } 

    return error;
}


let formWheels = <HTMLElement>document.getElementById('formWheels');
if (formWheels) {
    formWheels.addEventListener('blur', (event: any) => {
        if (event.target.value != '') event.target.classList.remove('is-invalid');
    }, true);
}
