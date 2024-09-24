import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from '../../../slices/user/userAPI';

export default function Navbar() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser({ navigate}));
    }

    return (
        <nav>
            <div className="nav-links-container">
                <ul className="nav-links list">
                    <li key='home' className="nav-logo">
                        <NavLink to='/' title="Go to Homepage" id="logo">
                            AWESOME <span className="highlight">RECIPES</span>
                        </NavLink>
                    </li>
                    <li key='categories'>
                        <NavLink to='/categories' >
                            Categories
                        </NavLink>
                    </li>
                    <li key='recipes'>
                        <NavLink to='/recipes' >
                            Recipes
                        </NavLink>
                    </li>
                    <li key='about'>
                        <NavLink to='/about'>
                            About
                        </NavLink>
                    </li>
                    <li key='contact'>
                        <NavLink to='/contact'>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="icons-container">
                <ul className="icons list">
                    {!user.loggedIn ? (
                        <>
                            <li key='login'>
                                <NavLink to='/login'>
                                    Login
                                </NavLink>
                            </li>
                            <li key='sign-up'>
                                <NavLink to='/signUp'>
                                    Sign up
                                </NavLink>
                            </li>
                        </>) : (
                        <>
                            <li key='create-recipe' className="root_navbar_create_recipe">
                                <NavLink to='/createRecipe' title='Create a recipe'>
                                    Create My Recipe
                                </NavLink>
                            </li>
                            <li key='user' className="root_navbar_user">
                                <NavLink to='/profile' title="User Profile">
                                    <FontAwesomeIcon icon={faCircleUser} size="lg" />
                                </NavLink>
                                <div />
                                <p>{user.profile.firstname}</p>
                            </li>
                            <li key='logout'>
                                <button className='logout' onClick={handleLogout}>
                                    LOGOUT
                                </button>
                            </li>
                        </>)}
                </ul>
            </div>
        </nav>
    )
}