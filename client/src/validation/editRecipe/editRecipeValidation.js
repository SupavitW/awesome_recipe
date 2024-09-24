import * as yup from 'yup';

const validFileExtensions = { image: ['jpg', 'png'] };
function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const createRecipeSchema = yup.object().shape({
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters long").max(50, "Title must be at most 50 characters long"),
    category: yup.string().required("Category is required").min(3, "Category must be at least 3 characters long").max(50, "Category must be at most 50 characters long"),
    preparation_time: yup.string().required("Preparation time is required").max(20, "Preparation time must be at most 20 characters long"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters long"),
    ingredients: yup.array().of(
        yup.object().shape({
            title: yup.string().required("Ingredient name is required").min(3, "Title must be at least 3 characters long").max(50, "Title must be at most 50 characters long"),
            quantity: yup.number().typeError("Fill in a number").required("Quantity is required").min(0.01, "Invalid quantity"),
            unit: yup.string().required("Unit is required").max(50, "Unit must be at most 50 characters long"),
        })
    ).required("At least one ingredient is required"),
    instructions: yup.array().of(
        yup.object().shape({
            instruction: yup.string().required("Instruction is required").min(10, "Instruction must be at least 10 characters long").max(350, "Each instruction must be at most 350 characters long")
        })
    ).required("At least one instruction is required"),
    recipe_pic: yup
        .mixed()
        .nullable(true)
        .test(
            "is-valid-type",
            "File must be jpeg or png",
            value => {
                if (!value) return true; // add this line
                return isValidFileType(value && value.name.toLowerCase(), "image");
            }
        )
});

export default createRecipeSchema;
