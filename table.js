/**
 * @type {array}
 */
var entities = [];

var temp;
/**
 * Sort array in descending order
 * @returns {void}
 */
function sortArray() {
        for (var i = 0; i < entities.length; i++) 
        {
                for (var j = i + 1; j < entities.length; j++) 
                {
                        if (Number(entities[i][3]) < Number(entities[j][3])) {
                                temp = entities[i];
                                entities[i] = entities[j];
                                entities[j] = temp;
                        }
                }
        }

}

/**
 * Add element to array
 * @returns {void}
 */
function addArray() {
        name = document.entityForm.entityName.value;
        race = document.entityForm.race.value;
        entityClass = document.entityForm.entityClass.value;
        init = document.entityForm.init.value;

        entities.push([name, race, entityClass, init]);
        sortArray();
        checkEntity();
}

/**
 * Create table from array
 * @returns {void}
 */
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

/**
 * Delete row from table
 * @param {*} b - This is the current row parameter
 * @returns {void}
 */
function deleteRow(b) {                                 // button's parent is cell and cell's parent is row
        index = b.parentElement.parentElement.rowIndex; // have to get index of row
        entities.splice(index - 1, 1);                  // -1 because headings are index 0 in table
        checkEntity();                                  // checks array (so the array above the form changes)
        b.parentElement.parentElement.remove();
}

/**
 * Clears the table when `clearArr` parameter is true
 * @param {Boolean} clearArr - This is the `clearArr` parameter
 */
function clearTable(clearArr) { // accepts a boolean parameter to clear the array or just the table's <tr></tr>
        if (clearArr == true) {
                clearArray();
        }

        table = document.getElementById("entityTable");
        while (table.rows.length > 1) { // table length keeps changing as it's removed, keep <th></th>
                table.deleteRow(1);
        }
}

/**
 * Allows user to go to the next row in the table/array and will shift the table up
 * @returns {void}
 */
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


