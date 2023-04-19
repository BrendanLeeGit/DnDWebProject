var entities = [];

//sorts array based off of intiative only
function sortArray(){

        //testing to make sure the entities array is working properly
        for (var i = 0; i < entities.length; i++){
                for (var j = 0; j < 4; j++){
                        console.log(entities[i][j] + " " + i);
                }
        }

        //intialize as the first value in the array
        var largestValueIndex = 0;
        var largestValue = entities[0][3];

        //this is because arrayLengths change throughout the function, and i need them set in stone
        var arrayLength = entities.length;
        var miniArrayLength = 4; //god i keep confusing myself between entities and the mini arrays
        
        //holds values for the array as I port them over
        var temp = [];
        var tempArray = [];

        for (var j = 0; j < arrayLength; j++){
                //reset temp
                var temp = [];

                //loop to find the largest initiative and its index
                for (var i = 0; i < entities.length - 1; i++){
                        if (entities[i + 1][3] > largestValue){
                                largestValueIndex = i + 1;
                                largestValue = entities[largestValueIndex][3];
                        }
                }

                //if the entities array only has one element left, then auto set variables to that element
                if (entities.length == 1){
                        largestValueIndex = 0;
                }

                //making sure to copy every element bc awesomeness to new array
                for (var i = 0; i < miniArrayLength; i++){
                        console.log(largestValueIndex);
                        console.log(entities);
                        temp.push(entities[largestValueIndex][i]);
                }
                tempArray.push(temp);
                
                //remove element in original array bc who needs it amirite
                entities.splice(largestValueIndex, 1);

                //reset loop variables, but only if there's elements left in entities[]
                if (entities.length > 0){
                        largestValueIndex = 0;
                        largestValue = entities[0][3];
                }
        }
        entities = tempArray;
        checkEntity();
}

function addArray() {
    name = document.entityForm.entityName.value;
    race = document.entityForm.race.value;
    entityClass = document.entityForm.entityClass.value;
    init = document.entityForm.init.value;

    entities.push([name, race, entityClass, init]);

    checkEntity();
}

function createTable() {
        for (var i = 0; i < entities.length; i++) {
            var table, newRow, name, race, entityClass, init, edit, del
                table = document.getElementById("entityTable");
                newRow = table.insertRow();

                name = newRow.insertCell(0);
                race = newRow.insertCell(1);
                entityClass = newRow.insertCell(2);
                init = newRow.insertCell(3);
                del = newRow.insertCell(4);


                name.innerText = entities[i][0];
                race.innerText = entities[i][1];
                entityClass.innerText = entities[i][2];
                init.innerText = entities[i][3];
                del.innerHTML = "<button onclick = 'deleteRow(this)''>X</button>";
        }
}

function deleteRow(b) { // button's parent is cell and cell's parent is row
        index = b.parentElement.parentElement.rowIndex; // have to get index of row
        entities.splice(index-1, 1); // -1 because headings are index 0 in table
        checkEntity(); // checks array (so the array above the form changes)
        b.parentElement.parentElement.remove();
}

function clearTable(clearArr) { // accepts a boolean parameter to clear the array or just the table's <tr></tr>
        if (clearArr == true) {
                clearArray();
        }

        table = document.getElementById("entityTable");
        while (table.rows.length > 1) { // table length keeps changing as it's removed, keep <th></th>
                table.deleteRow(1);
        }
}

function nextEntity() {
        // press button, shift gets rid of the first element and moves everyone over in the array, clears the table and recreates the table
        temp = entities[0];
        entities.shift();
        entities.push(temp);
        
        checkEntity();
        
        clearTable(false); // clears the table but not the array
        createTable();
}

// test functions
function sayHi() {
    document.write("Hi");
}

function checkEntity() {
    document.getElementById("test").innerHTML = entities;
}

function printArray() {
        for (var i = 0; i < entities.length; i++) {
                document.write(entities[i]);
        }
}

function clearArray() {
    entities = [];
    checkEntity();
}


