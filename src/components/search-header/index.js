import React, { useState } from 'react';
import styles from './styles/SearchHeader.module.scss';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchHeader = (props) => {

    const [ formValue , setFormValue ] = useState('');

    let navigate = useNavigate();

    const enterHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${formValue}`);
    }

    const changeHandler = (e) => {
        let value = e.target.value;

        setFormValue(value);
    }

    return (
        <section className={styles.search_header}>
            <div className={`${styles.container_x_md} ${styles.container_y_1}`}>
                <div className={styles.form_wrapper}>
                    <div className={styles.input_field}>
                        <form onSubmit={enterHandler}>
                            <TextField
                                fullWidth label="Search for movies, series and celebrities"
                                id="fullWidth"
                                autoComplete='off'
                                value={formValue}
                                helperText = {`Results for "${props.query}"`}
                                variant='filled'
                                size='small'
                                onChange={changeHandler}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SearchHeader;
