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
                        if (Number(entities[i][4]) < Number(entities[j][4])) {
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
        var name, race, entityClass, init, entityPic;
        name = document.entityForm.entityName.value;
        race = document.entityForm.race.value;
        entityClass = document.entityForm.entityClass.value;
        init = document.entityForm.init.value;
        ac = document.entityForm.ac.value;
        
        entityPic = document.getElementById("entityPic");
        entityPic = entityPic.files[0];

        entities.push([name, race, entityClass, init, ac, entityPic]);
        sortArray();
        checkEntity();
}

/**
 * Display the first entity who is first in the array. If there is no image uploaded, display the default avatar image.
 * This function is called on Initiative Tracker's form submit, nextEntity(), confirmationBox(), and "x" in the Entity Table
 * @returns {void}
 */
function displayImage() { // display the first image in the array only

        var divPic = document.getElementById("divPic");
        divPic.innerHTML = "";

        var img = document.createElement("img");

        if(entities.length != 0) {
                if(entities[0][5] === undefined) {
                        img.src = "./Images/default-avatar-builder.png";
                } else {
                        img.src = URL.createObjectURL(entities[0][5]);
                }
        
                img.style.width = "150px";
                img.style.height = "150px";
                img.style.borderRadius = "10px";
                divPic.appendChild(img);
        }

        setDisplayName();
}

/**
 * Sets the display name to the entity who is first in the array. If there are no entities in the array, remove the name.
 * @returns {void}
 */
function setDisplayName() {
        if (entities.length == 0) {
                document.getElementById("displayName").innerHTML = "Add a player or enemy to the table to display their portrait here";
        } else {
                document.getElementById("displayName").innerHTML = entities[0][0];
        }
}

/**
 * Create table from array
 * @returns {void}
 */
function createTable() {
        for (var i = 0; i < entities.length; i++) {
                var table, newRow, name, race, entityClass, init, ac, del;
                table = document.getElementById("entityTable");
                newRow = table.insertRow();

                name = newRow.insertCell(0);
                race = newRow.insertCell(1);
                entityClass = newRow.insertCell(2);
                init = newRow.insertCell(3);
                ac = newRow.insertCell(4);

                del = newRow.insertCell(5);


                name.innerText = entities[i][0];
                race.innerText = entities[i][1];
                entityClass.innerText = entities[i][2];
                init.innerText = entities[i][3];
                ac.innerText = entities[i][4];

                del.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16" style="cursor: pointer" onclick="deleteRow(this);displayImage()"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/></svg>';
                newRow.style.textAlign = 'center';
                newRow.style.color = '#090707';
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
 * @returns {void}
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
        displayImage();
}

/**
 * Alerts the user based on the specified message parameter value
 * @param {*} msg
 * @returns {void}
 */
function alertMessage(msg) {
        alert(msg);
}

/**
 * Confirms whether or not the user wants to clear the table
 * @returns {void}
 */
function confirmationBox() {
        if(confirm("Are you sure you want to clear the entity table?") == true) {
                clearTable(true);
                displayImage();
        }
}

/**
 * For the hidden array field in index.html
 * @returns {void}
 */
function checkEntity() {
        document.getElementById("test").innerHTML = entities;
}

/**
 * Clears the array
 * @returns {void}
 */
function clearArray() {
        entities = [];
        checkEntity();
}

function getRandomInt(minimum, maximum){
        var result = Math.floor(Math.random() * (maximum - minimum)) + minimum + 1;
        if (result == 7){
            return getRandomInt(minimum, maximum);
        }
        else{
            return result;
        }
    }

function rollDice(max, diceNumber){
//give the dice number. for ex, a d6 would have a max of 6 ofc
document.getElementById(diceNumber).innerHTML = getRandomInt(0, max);
}

var health = [0, 0, 0, 0];
var maxHealth = [0, 0, 0, 0];

var changeAmounts = ['changeAmountOne', 'changeAmountTwo', 'changeAmountThree', 'changeAmountFour'];
var maxHealths = ['maxHealthChangeAmountOne', 'maxHealthChangeAmountTwo', 'maxHealthChangeAmountThree', 'maxHealthChangeAmountFour']

function incrementHealth(which){
        health[which] += parseInt(document.getElementById(changeAmounts[which]).value);
        updateHealth();
}

function reduceHealth(which){
        health[which] -= parseInt(document.getElementById(changeAmounts[which]).value);
        updateHealth();
}

function updateHealth(){
        document.getElementById("currentHealthOne").innerHTML = health[0];
        document.getElementById("currentHealthTwo").innerHTML = health[1];
        document.getElementById("currentHealthThree").innerHTML = health[2];
        document.getElementById("currentHealthFour").innerHTML = health[3];
}

function setMaxHealth(which){
        maxHealth[which] = parseInt(document.getElementById(maxHealths[which]).value);
        updateMaxHealth();
}

function updateMaxHealth(){
        document.getElementById("maxHealthOne").innerHTML = maxHealth[0];
        document.getElementById("maxHealthTwo").innerHTML = maxHealth[1];
        document.getElementById("maxHealthThree").innerHTML = maxHealth[2];
        document.getElementById("maxHealthFour").innerHTML = maxHealth[3];
}
