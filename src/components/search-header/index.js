import React, { useState, useEffect } from 'react';
import styles from './styles/SearchHeader.module.scss';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { nanoid } from '@reduxjs/toolkit';

const SearchHeader = (props) => {

    const [ display, setDisplay ] = useState(false);
    const [formValue, setFormValue] = useState(props.query);
    const [autoComData, setAutoComData] = useState(null);

    let url;
    if(formValue.length === 0){
        url = `https://api.themoviedb.org/3/search/multi?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&query=demo`;
    }else{
        url = `https://api.themoviedb.org/3/search/multi?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&query=${formValue}`;
    }

    const { data } = useFetch(url);

    useEffect(() => {
        let autoCom = [];

        (async () => {
            await data;

            if (formValue.length > 0 && data !== null) {
                data.results.map(item => {
                    return item.title ? autoCom.push(item.title) : autoCom.push(item.name)
                });

                setAutoComData(autoCom.slice(0,5));
            }else {
                setAutoComData(false);
            }
        })();

    }, [formValue,data]);

    if (autoComData !== null) {
        // console.log(autoComData);
    }

    let navigate = useNavigate();

    const enterHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${formValue}/1`);
        setDisplay(false);
    }

    const changeHandler = (e) => {
        let value = e.target.value;
        setFormValue(value);
        setDisplay(true);
    }

    const handleAutoCom = (value) => {
        setFormValue(value);
        setAutoComData(false);

        navigate(`/search/${value}/1`);
        setDisplay(false);
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
                                // helperText={`Results for "${props.query}"`}
                                variant='filled'
                                size='small'
                                onChange={changeHandler}
                            />
                            <div className={display ? `${styles.autocomplete} ${styles.d_block}` : `${styles.d_none}`}>
                            {
                                autoComData && autoComData.map(item => {
                                    return (
                                        <div className={styles.auto_item} onClick={() => handleAutoCom(item)} key={nanoid()}>
                                            {item}
                                        </div>
                                    )
                                })
                            }
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SearchHeader;
