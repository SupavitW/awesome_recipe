const validator = require('validator');
const bcrypt = require('bcrypt');

// Check length
const checkLength = (options, input) => {
  if (options === 'username' || options === 'password') {
    return validator.isLength(input, {min: 6, max:6 });
  } else if (options === 'firstname' || options === 'lastname') {
    return validator.isLength(input, { max:50 });
  } else if (options === 'unit') {
    return validator.isLength(input, {max: 50 });
  } else if (options === 'title') {
    return validator.isLength(input, {max:50});
  } else if (options === 'description') {
    return validator.isLength(input, {max:500});
  }
};

// Sanitize malicious chars
const checkSpecialChars = input => {
  const specialChars = "\\#$%&'()*+,-^[]?|{}!";
  for (let i = 0; i < specialChars.length; i++) {
    if (input.includes(specialChars[i])) {
      return false; // Special character found
    }
  }
  return true; // No special characters found
};

// Maybe I should refactor these functions into class to follow better design pattern
const sanitizeInput = (options, input) => {
  if (options === 'register') {
    return validateRegister(input);
  } else if (options === 'login') {
    return validateLogin(input);
  } else if (options === 'editName') {
    return validateName(input);
  } else if (options === 'editPassword') {
    return validatePassword(input);
  } else if (options === 'addToShoppingList') {
    return validateAddShoppingList(input);
  } else if (options === 'createRecipe') {
    return validateRecipe(input);
  }
};


const validateRegister = ({ username, password, firstname, lastname }) => {
  const fields = [
      {name: 'username', value: username},
      {name: 'password', value: password},
      {name: 'firstname', value: firstname},
      {name: 'lastname', value: lastname}
  ];
  for (const field of fields) {
      if (!checkSpecialChars(field.value)) {
          return false;
      }
      if (!checkLength(field.name, field.value)) {
          return false;
      }
  }
  return true;
};

const validateLogin = ({username, password}) => {
  const fields = [
    { name: 'username', value: username},
    { name: 'password', value: password},
  ];
  for (const field of fields) {
    if (!checkSpecialChars(field.value)) {
        return false;
    }
    if (!checkLength(field.name, field.value)) {
        return false;
    }
  }
  return true;
};

const validateName = ({firstname, lastname}) => {
  const fields = [
    { name: 'firstname', value: firstname},
    { name: 'firstname', value: lastname},
  ];
  for (const field of fields) {
    if (!checkSpecialChars(field.value)) {
        return false;
    }
    if (!checkLength(field.name, field.value)) {
        return false;
    }
  }
  return true;
};

const validatePassword = newPassword => {
  if (!checkSpecialChars(newPassword)) {
    return false;
  }
  if (!checkLength('password', newPassword)) {
    return false;
  }
  return true;
};

const validateAddShoppingList = ({unit, quantity}) => {
  if (!checkSpecialChars(unit) || !checkSpecialChars(quantity)) {
    return false;
  }
  if (!checkLength('unit', unit)) {
    return false;
  }
  if (!validator.isNumeric(quantity)) {
    return false;
  }
  return true;
};

const validateRecipe = ({title, description}) => {
  const fields = [
    {name: 'title', value: title},
    {name: 'description', value: description},
  ];
  for (const field of fields) {
    if (!checkLength(field.name, field.value)) {
        return false;
    }
  }
  return true;
}

// Password hashing function
const passwordHash = async (password, saltRounds) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch(err) {
      const hashingError = new Error('Error hashing the password');
      throw hashingError;
    }
};
  
  //Password comparison function
const comparePasswords = async (password, hash) => {
    try {
      const matchFound = await bcrypt.compare(password, hash);
      return matchFound;
    } catch (err) {
      const compareError = new Error('Error comparing the password');
      throw compareError;
    }
}; 

// Converting function
const convertToBase64 = (recipes) => {
  // If recipes is an array, map over each recipe and convert image data to base64
  if (Array.isArray(recipes)) {
      return recipes.map(recipe => {
        const recipeImage = recipe.recipe_pic.imageData.toString('base64');
        recipe.recipe_pic.imageData = recipeImage;
        return recipe;
      });
  } else {
      // If recipes is a single object, convert image data to base64 for that recipe
      const recipeImage = recipes.recipe_pic.imageData.toString('base64');
      recipes.recipe_pic.imageData = recipeImage;
      return recipes;
  }
};


module.exports = {sanitizeInput, passwordHash, comparePasswords, convertToBase64};