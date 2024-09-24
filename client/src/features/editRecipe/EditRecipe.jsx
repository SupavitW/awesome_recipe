import React, { useEffect, useState } from 'react'
import styles from './EditRecipe.module.css';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetEditRecipeState } from '../../slices/editRecipe/editRecipeSlice';
import { editRecipe } from '../../slices/editRecipe/editRecipeAPI';
import { yupResolver } from '@hookform/resolvers/yup';
import editRecipeSchema from '../../validation/editRecipe/editRecipeValidation';

import Button from '../../components/button/Button';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from '../../utils/axios/axiosInstance';

export default function EditRecipe() {
    const editRecipeState = useSelector(state => state.editRecipe);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { recipeID } = useParams(); // Access the recipe ID params from the URL

    // Function to fetch recipe data
    const fetchRecipeData = async (id) => {
        try {
            const targetURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SUB_URL_RECIPES + '/getRecipe/' + recipeID;
            const response = await axiosInstance.get(targetURL, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch (error) {
            console.error("Failed to fetch recipe data", error);
        }
    };

    const form = useForm({
        defaultValues: {
            title: '',
            category: '',
            preparation_time: '',
            description: '',
            ingredients: [{
                title: '',
                quantity: '',
                unit: ''
            }],
            instructions: [{
                instruction: ''
            }],
            recipe_pic: null,
        },
        mode: 'onBlur',
        resolver: yupResolver(editRecipeSchema)
    });
    const { register, handleSubmit, formState, control, reset } = form;
    const { errors, isSubmitting, isValid } = formState;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients'
    });
    const { fields: instructionsFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: 'instructions'
    });

    const [file, setFile] = useState(null);

    const onSubmit = (userInput) => {
        //  Create a new FormData object
        const formData = new FormData();

        // Append each value from userInput to formData
        for (let key in userInput) {
            if (key !== 'recipe_pic' && key !== 'instructions' && key !== 'ingredients') {
                formData.append(key, userInput[key]);
            }
        }
        // Create instructions array from instruction objects of the form {instruction: 'instruction'}
        const instructionsArray = userInput.instructions.map(instruction => instruction.instruction);
        // Append the instructions array to formData
        const instructionsString = JSON.stringify(instructionsArray);
        formData.append('instructions', instructionsString);

        // Append ingredients array to formData
        const ingredientsString = JSON.stringify(userInput.ingredients);
        formData.append('ingredients', ingredientsString);

        //  Append the file to formData
        formData.append('recipe_pic', file?.file || ''); // send the file if it exists, otherwise send an empty string

        // send formData to the server
        dispatch(editRecipe({ formData, recipeID }));
    }

    const onError = (errors) => {
        console.log(errors);
    }

    const handleGoBack = () => {
        navigate('/');
    }

    useEffect(() => {
        const loadRecipeData = async () => {
            const { data } = await fetchRecipeData(recipeID);
            if (data) {
                // Map the ingredients data to match the form's structure
                const ingredients = data.ingredients.map(ingredient => ({
                    title: ingredient.title,
                    quantity: ingredient.measurements.quantity,
                    unit: ingredient.measurements.unit
                }));
                reset({
                    title: data.title,
                    category: data.category,
                    preparation_time: data.preparation_time,
                    description: data.description,
                    ingredients: ingredients,
                    instructions: data.instructions.map(instruction => ({ instruction })),
                });
            }
        };
        loadRecipeData();
    }, []);

    useEffect(() => {
        return () => {
            dispatch(resetEditRecipeState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={styles.editRecipe_page}>
                <div className={styles.editRecipe_banner}>
                    <div className={styles.header}>
                        <SectionTitle titleName="Edit Recipe" />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.editRecipe_form} encType={'multipart/form-data'} noValidate>
                    <div className={`${styles.title} ${styles.slot}`}>
                        <label htmlFor="title">Recipe Name</label>
                        <input type="text" id="title" placeholder='Enter the recipe name' {...register('title')} />
                        {errors.title && <p className={styles.error}>*{errors.title.message}</p>}
                    </div>
                    <div className={`${styles.category} ${styles.slot}`}>
                        <label htmlFor="category">Category</label>
                        <select id="category" {...register('category')} defaultValue="dinner">
                            <option value="breakfast">breakfast</option>
                            <option value="lunch">lunch</option>
                            <option value="dinner">dinner</option>
                            <option value="dessert">dessert</option>
                            <option value="snacks">snacks</option>
                        </select>
                        {errors.category && <p className={styles.error}>*{errors.category.message}</p>}
                    </div>
                    <div className={`${styles.preparation_time} ${styles.slot}`}>
                        <label htmlFor="preparation_time">Preparation Time</label>
                        <input type="text" id="preparation_time" placeholder='Enter the preparation time' {...register('preparation_time')} />
                        {errors.preparation_time && <p className={styles.error}>*{errors.preparation_time.message}</p>}
                    </div>
                    <div className={`${styles.description} ${styles.slot}`}>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" rows="6" cols="50" placeholder='Enter the recipe description...' {...register('description')} />
                        {errors.description && <p className={styles.error}>*{errors.description.message}</p>}
                    </div>
                    <div className={`${styles.ingredients} ${styles.slot}`}>
                        <label htmlFor="ingredients">List of Ingredients</label>
                        <div className={styles.ingredients_data}>
                            {fields.map((ingredient, index) => {
                                return (
                                    <div className={styles.flex_subData_removeBtn}> 
                                        <div key={ingredient.id} className={styles.ingredients_subData}>
                                            <div className={styles.ingredients_fields_errors}>
                                                <div className={styles.field}>
                                                    <label htmlFor="ingredient">Ingredient :</label>
                                                    <input type="text" id="ingredient" placeholder='Enter the ingredient' {...register(`ingredients[${index}].title`)} />
                                                </div>
                                                {errors.ingredients && errors.ingredients[index]?.title && <p className={styles.error}>*{errors.ingredients[index].title.message}</p>}
                                            </div>
                                            <div className={styles.ingredients_fields_errors}>
                                                <div className={styles.field}>
                                                    <label htmlFor="quantity">Quantity :</label>
                                                    <input type="number" id="quantity" placeholder='Enter the quantity' step='any' min="0" {...register(`ingredients[${index}].quantity`)} />
                                                </div>
                                                {errors.ingredients && errors.ingredients[index]?.quantity && <p className={styles.error}>*{errors.ingredients[index].quantity.message}</p>}
                                            </div>
                                            <div className={styles.ingredients_fields_errors}>
                                                <div className={styles.field}>
                                                    <label htmlFor="unit">Unit :</label>
                                                    <input type="text" id="unit" placeholder='Enter the unit' {...register(`ingredients[${index}].unit`)} />
                                                </div>
                                                {errors.ingredients && errors.ingredients[index]?.unit && <p className={styles.error}>*{errors.ingredients[index].unit.message}</p>}
                                            </div>
                                        </div>
                                        {index > 0 && <button type="button" onClick={() => remove(index)} className={styles.removeIngredient_btn}>Remove</button>}
                                    </div>
                                )
                            })}
                            <button type="button" onClick={() => append({ title: '', quantity: '', unit: '' })} className={styles.addIngredient_btn}>Add Ingredient</button>
                        </div>
                    </div>
                    <div className={`${styles.instructions} ${styles.slot}`}>
                        <label htmlFor="instructions">Instructions</label>
                        <div className={styles.instructions_data}>
                            {instructionsFields.map((instruction, index) => {
                                return (
                                    <div key={instruction.id} className={styles.instructions_fields_errors}>
                                        <div className={styles.instructions_step}>
                                            <label htmlFor="instruction">Step {index + 1} :</label>
                                            <input
                                                type="text"
                                                id={`instruction[${index}]`}
                                                placeholder='Enter the instruction'
                                                {...register(`instructions[${index}].instruction`)}
                                            />
                                            {index > 0 && (
                                                <button type="button" onClick={() => removeInstruction(index)} className={styles.removeIngredient_btn}>
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        {errors.instructions && errors.instructions[index] && (
                                            <p className={styles.error}>*{errors.instructions[index].instruction.message}</p>
                                        )}
                                    </div>
                                )
                            })}
                            <button type="button" onClick={() => appendInstruction({ instruction: '' })} className={styles.addInstruction_btn}>
                                Add Instruction
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.image} ${styles.slot}`}>
                        <label htmlFor="recipe_pic">Recipe Image (optional)</label>
                        <Controller
                            control={control}
                            name="recipe_pic"
                            render={({ field: { onChange, onBlur, name, ref } }) => (
                                <input
                                    type="file"
                                    id="recipe_pic"
                                    onChange={(e) => {
                                        onChange(e.target.files[0]);
                                        setFile(e.target.files[0]);
                                    }}
                                    onBlur={onBlur}
                                    name={name}
                                    ref={ref}
                                />
                            )}
                        />
                        {errors.recipe_pic && <p className={styles.error}>*{errors.recipe_pic.message}</p>}
                    </div>
                    <div className={styles.reset}>
                        <input type="reset" value="Reset" className='' />
                    </div>
                    {editRecipeState.error && <p className={`${styles.editRecipeError} ${styles.error}`}>*{editRecipeState.error}</p>}
                    {editRecipeState.success && (
                        <div className={styles.successBanner}>
                            <p>Your recipe has been edited</p>
                            <FontAwesomeIcon icon={faSquareCheck} size="xl" />
                        </div>)
                    }
                    <div className={styles.editRecipe_btns}>
                        {isSubmitting || editRecipeState.loading ? <ReactLoading type="spin" color="#fff" height={20} width={20} /> :
                            <>
                                <Button type="submit" disabled={!isValid || isSubmitting} className={styles.edit_btn} title='EDIT RECIPE' />
                                <Button className={styles.cancel_btn} title={editRecipeState.success ? 'BACK' : 'CANCEL'} onClick={handleGoBack} />
                            </>
                        }
                    </div>
                </form>
            </div>
        </>
    );
}
