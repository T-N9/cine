import React, { useState } from 'react';
import styles from './styles/SearchForAll.module.scss';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const SearchForAll = () => {

    const [ formValue , setFormValue ] = useState('');

    let navigate = useNavigate();

    const enterHandler = (e) => {
        e.preventDefault();
        console.log('Enter Pressed');
        navigate(`/search/${formValue}`);
    }

    const changeHandler = (e) => {
        let value = e.target.value;

        setFormValue(value);
    }

    return (
        <section className={styles.search_for_all}>
            <div className={styles.container_x_md}>
                
                <div className={styles.form_wrapper}>
                    <div className={styles.input_field}>
                        <h1>Explore Now !</h1>
                        <form onSubmit={enterHandler}>
                            <TextField 
                                fullWidth label="Search for movies, series and celebrities" 
                                id="fullWidth"
                                autoComplete='off'
                                value={formValue}
                                variant='outlined'
                                onChange={changeHandler}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SearchForAll;
