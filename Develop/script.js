// Assignment Code
var generateBtn = document.querySelector("#generate");

// Create and append dynamic input fields to the card element
generateInputFields();

// Write password to the #password input
function writePassword() {
  validInputExists = checkInput();

  if (validInputExists) {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
  
    passwordText.value = password;
  }

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  // Initialize password to blank string
  var random_password = '';
  
  // Get the selected password length
  const password_length_field = document.querySelector("#password_length");
  let password_length = password_length_field.value;

  // Select all of the checkboxes
  const char_type_boxes = document.querySelectorAll(".checkbox_field");

  // Stores the identity of which boxes are checked into an array
  let boxes_checked = [];

  // Set the checked status for each checkbox
  for (var i = 0, q = 0 ; i < char_type_boxes.length ; i++) {
    if (char_type_boxes[i].checked === true) {
      // Set the box checked to the name attribute of the checkbox element for use with a switch statement later
      boxes_checked[q] = char_type_boxes[i].name;
      // Increment q for next index value
      q++;
    }
  }

  // Set a random character based on the user defined parameters, iterating based on the desired password length
  for (var i = 0 ; i < password_length ; i++) {
    // Generate a random index of the checked boxes based on the length of the boxes_checked array
    let num_char_selected = boxes_checked.length;
    let random_index = Math.floor(Math.random() * num_char_selected);

    // This should be a string value set to the name of a randomly selected character type field of those chosen by the user
    char_route = boxes_checked[random_index];
    
    // Defining the characters for each route
    const LWR_CASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
    const UPR_CASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const SPECIAL_CHARS = "!@#$%^&*()-+_=";

    switch (char_route) {
      case 'lwr_case':
        let lwr_case_index = Math.floor(Math.random() * LWR_CASE_CHARS.length);
        let random_lwr_case_char = LWR_CASE_CHARS[lwr_case_index];
        random_password += random_lwr_case_char;
        
        break;
      case 'upr_case':
        let upr_case_index = Math.floor(Math.random() * UPR_CASE_CHARS.length);
        let random_upr_case_char = UPR_CASE_CHARS[upr_case_index];
        random_password += random_upr_case_char;
        
        break;
      case 'numeric':
        let rand_num = Math.floor(Math.random() * 10);
        random_password += rand_num;
        
        break;
      case 'special':
        let special_index = Math.floor(Math.random() * SPECIAL_CHARS.length);
        let random_special_char = SPECIAL_CHARS[special_index];
        random_password += random_special_char;

        break;
    }
  }
  
  // Check that the password contains all of the selected character types
  for (var i = 0 ; i < boxes_checked.length ; i++) {
    let char_needed = boxes_checked[i];
    
    // Validate character type of password based on user set parameters
    switch (char_needed) {
      case 'lwr_case':
        const lwr_case_regex = /[a-z]/g;
        let password_contains_lwr_case = lwr_case_regex.test(random_password);

        if (!password_contains_lwr_case) {
          // The password did not contain any lower-case characters, so generate a new one
          generatePassword();
        }

        break;
      case 'upr_case':
        const upr_case_regex = /[A-Z]/g;
        let password_contains_upr_case = upr_case_regex.test(random_password);

        if (!password_contains_upr_case) {
          // The password did not contain any upper-case characters, so generate a new one
          generatePassword();
        }
        
        break;
      case 'numeric':
        const numeric_regex = /\d+/g;
        let password_contains_numeric = numeric_regex.test(random_password);

        if (!password_contains_numeric) {
          // The password did not contain any numeric characters, so generate a new one
          generatePassword();
        }
        
        break;
      case 'special':
        const special_regex = /[!@#$%^&*()-+_=]/g;
        let password_contains_special = special_regex.test(random_password);
        
        if (!password_contains_special) {
          // The password did not contain any numeric characters, so generate a new one
          generatePassword();
        }
        
        break;
    }
  }
  
  console.log("Here's your password, friend");
  return random_password;

}

function checkInput () {
  const password_length_field = document.querySelector("#password_length");
  let length = password_length_field.value;

  const MIN_LENGTH = 8;
  const MAX_LENGTH = 128;

  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    console.log(`The password length entered was invalid. It must be between ${MIN_LENGTH}-${MAX_LENGTH} characters`);
    return false;
  }

  const char_type_boxes = document.querySelectorAll(".checkbox_field");

  for (var i = 0 ; i < char_type_boxes.length ; i++) {
    current_checkbox = char_type_boxes[i];

    if (current_checkbox.checked) {
      // As long as one box is checked, then the input is valid
      return true;
    }

  }

  console.log("There was a problem checking inputs...");
  return false;

}

/*********** All Code Below Dynamically Generates HTML Elements for Input Fields ************/

function generateInputFields() {
  // Check if existing input fields exist, and remove them if so
  if (document.querySelector('#input_container') !== null) {
    console.log('New start!');

    // Select the previous inputs
    let previous_input_fields = document.querySelector('#input_container');

    // Remove the whole container with its children elements included
    previous_input_fields.remove();
  }

  // Change this value in the future if more card elements are generated before the main one
  const PASSWORD_CARD_INDEX = 0;
  const card = document.getElementsByClassName("card")[PASSWORD_CARD_INDEX];
  const input_container = document.createElement("div");
  input_container.setAttribute("id", "input_container");

  let length_field = document.createElement("input");
  length_field.setAttribute("type", "number");
  length_field.setAttribute("id", "password_length");
  length_field.setAttribute("name", "password_length");

  let length_label = generateLabel("password_length", "Password Length (8-128 characters)");

  // Append length field and label to input container
  input_container.appendChild(length_label);
  input_container.appendChild(length_field);

  // Character types selection heading
  char_heading = document.createElement("h2");
  input_container.appendChild(char_heading);

  // Defining the parameters of the character type fields
  const char_types = ["lwr_case", "upr_case", "numeric", "special"];
  const char_box_text = ["Lower-case", "Upper-case", "Numeric", "Special"];

  for (var i = 0 ; i < char_types.length ; i++) {
    let char_box = document.createElement("input");
    char_box.setAttribute("type", "checkbox");
    char_box.setAttribute("class", "checkbox_field");
    char_box.setAttribute("name", char_types[i]);
    char_box.setAttribute("value", char_types[i]);

    // Generate the label for the current character check box
    let char_label = generateLabel (char_types[i], char_box_text[i]);

    // Append newly generated field to the input container
    input_container.appendChild(char_label);
    input_container.appendChild(char_box);

  }

  // Append entire container to card element
  card.appendChild(input_container);
}

function generateLabel (input_name, label_text) {
  // Create the label, set its attribute to define which input field it is associated with, and insert text
  label = document.createElement("label");
  label.setAttribute("for", input_name);
  label.innerHTML = label_text;

  // Return the newly generated label element
  return label;
}
