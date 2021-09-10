var car;
var infoCar = document.getElementById('infoCar');
var infoWheels = document.getElementById('infoWheels');
function createCar() {
    //dom element definition
    var plate = document.getElementById("plate").value;
    var brand = document.getElementById("brand").value;
    var color = document.getElementById("color").value;
    //validation
    var formValidate = validateCar(plate, brand, color);
    if (formValidate === true) {
        car = new Car(plate, brand, color);
        var infoCar_1 = document.getElementById('infoCar');
        infoCar_1.classList.remove("d-none");
        infoCar_1.innerHTML = "<p class=\"pt-3\"><span class=\"font-weight-bold\">Plate:</span> " + plate + "</p>\n        <p class=\"pt-3\"><span class=\"font-weight-bold\">Brand:</span> " + brand + "</p>\n        <p class=\"pt-3\"><span class=\"font-weight-bold\">Color:</span> " + color + "</p>";
        var formWheels_1 = document.getElementById('formWheels');
        formWheels_1.classList.remove("d-none");
    }
}
function validateCar(plate, brand, color) {
    var error = 0;
    var formCar = document.getElementById("formCar");
    // form.classList.remove('is-invalid');
    if (plate == "") {
        document.getElementById("plate").classList.add("is-invalid");
        document.getElementById("errorPlate").textContent = "Plate is required";
        error++;
    }
    //4 numeros i tres lletres
    var plate1 = /^(\d{4})([a-zA-Z]{3})$/;
    if (!plate1.test(plate)) {
        document.getElementById("plate").classList.add("is-invalid");
        document.getElementById("errorPlate").textContent = "Plate must have 4 numbers & 3 letters";
        error++;
    }
    if (brand == "") {
        document.getElementById("brand").classList.add("is-invalid");
        document.getElementById("errorBrand").textContent = "Brand is required";
        error++;
    }
    if (color == "") {
        document.getElementById("color").classList.add("is-invalid");
        document.getElementById("errorColor").textContent = "Color is required";
        error++;
    }
    if (error > 0) {
        return false;
    }
    else {
        return true;
    }
}
function addWheels() {
    var checkWheels = false;
    for (var i = 1; i <= 4; i++) {
        var wheelDiameter = document.getElementById('wheelDiam' + [i]).value;
        var wheelBrand = document.getElementById('wheelBrand' + [i]).value;
        var diameterValue = Number(wheelDiameter);
        var validateWheel = validateWheels(diameterValue, i, wheelBrand);
        if (validateWheel > 0 && !checkWheels) {
            checkWheels = true;
        }
    }
    if (!checkWheels) {
        for (var i = 1; i <= 4; i++) {
            var wheelDiameter = document.getElementById('wheelDiam' + [i]).value;
            var wheelBrand = document.getElementById('wheelBrand' + [i]).value;
            var diameterValue = Number(wheelDiameter); // OJO DUPLICAT!!
            car.addWheel(new Wheel(diameterValue, wheelBrand));
            var infoWheels_1 = document.getElementById('infoWheels');
            infoWheels_1.innerHTML = "<p class=\"col-12 pt-3 font-weight-bold text-center text-success\">ALL WHELLS HAVE BEEN SUCCESSFULLY ADDED</p>";
            infoWheels_1.classList.remove("d-none");
        }
        console.log(car);
    }
}
function validateWheels(diameter, index, brand) {
    var error = 0;
    var diameterElement = document.getElementById("wheelDiam" + [index]);
    var brandElement = document.getElementById("wheelBrand" + [index]);
    var errorDiametre = document.getElementById("errorwheelDiam" + [index]);
    var errorBrand = document.getElementById("errorwheelBrand" + [index]);
    if (diameter == "") {
        diameterElement.classList.add("is-invalid");
        errorDiametre.textContent = "Wheel " + index + " diameter is required!";
        error++;
    }
    else if (brand == "") {
        brandElement.classList.add("is-invalid");
        errorBrand.textContent = "Brand for wheel " + index + " is required!";
        error++;
    }
    else if (diameter < 0.4 || diameter > 2) {
        diameterElement.classList.add("is-invalid");
        errorDiametre.textContent = "Error value wheel " + index + ": the diameter has to be between 0.4cm and 2cm.";
        error++;
    }
    return error;
}
var formWheels = document.getElementById('formWheels');
if (formWheels) {
    formWheels.addEventListener('blur', function (event) {
        if (event.target.value != '')
            event.target.classList.remove('is-invalid');
    }, true);
}
