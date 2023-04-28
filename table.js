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

                del.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16" style="cursor: pointer" onclick="deleteRow(this)"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/></svg>';
                // "<button class='button_delete' onclick = 'deleteRow(this)''>X</button>";
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
        if(entities.length >= 2) {
                temp = entities[0];
                entities.shift();
                entities.push(temp);

                checkEntity();

                clearTable(false); // clears the table but not the array
                createTable();
        } else {
                alertMessage("Error: Need to add a minimum of two entities to the table.");
        }
}

function alertMessage(msg) {
        alert(msg);
}

// test functions
function checkEntity() {
        document.getElementById("test").innerHTML = entities;
}

function clearArray() {
        entities = [];
        checkEntity();
}


