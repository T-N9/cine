import React, { useState, useEffect } from 'react';
import styles from './styles/UpcomingAllMovies.module.scss';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import useFetch from '../../hooks/useFetch';
import UpcomingItem from '../upcoming-movies/UpcomingItem';

const UpcomingAllMovies = () => {


    const [ getData, setGetData ] = useState(null);
    const [ page, setPage] = useState(1);
    const { data } = useFetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=68d49bbc8d40fff0d6cafaa7bfd48072&language=en-US&page=${page}`);

    useEffect(() => {
        if(data !== null) {
            setGetData(data);
        }
    }, [data, page]);

    const pageClick =(page) => {
        setPage(page)
    }

    const goToBackPage = () => {
        setPage( prev => prev-1)
    }

    const goToNextPage = () => {
        setPage( prev => prev+1)
    }

    let movieList, page_arr = [], paginationNow, endOfPagination , startOfPagination,  paginationStart, paginationEnd;

    if(getData !== null) {
        movieList = getData.results.map( item => {
            return(
                <UpcomingItem
                    key = {item.id}
                    id = {item.id}
                    title = {item.title}
                    poster_path = {item.poster_path}
                    overview = {item.overview}
                    release_date = {item.release_date}
                />
            )
        });

        for(let i = 1; i <= getData.total_pages; i++) {
            page_arr.push(i);
        }

        let paginateShow;
        if(page_arr.length > 7) {
            paginationEnd = [page_arr.length-1, page_arr.length];
            paginationStart = [1, 2];
            if(page === 1 || page === 2){
                paginateShow = page_arr.slice(0,5)   
            }else if(page >= page_arr.length-3){
                paginateShow = [page_arr.length-4,page_arr.length-3,page_arr.length-2,page_arr.length-1, page_arr.length];
            }else{
                paginateShow = [page-2, page-1, page, page+1, page+2]; 
            }
        }else{
            paginateShow = page_arr;
        }


        paginationNow = paginateShow.map((item) => {
            return (
                <div onClick={() => pageClick(item)} key={item} className={item === page ? `${styles.paginate_page}  ${styles.active_page}`: `${styles.paginate_page}`}>
                    <p>{item}</p>
                </div>
            )
        })

        if(page_arr.length > 7 && page < page_arr.length-3) {
            endOfPagination = paginationEnd.map((item) => {
                return (
                    <div onClick={() => pageClick(item)} key={item} className={item === page ? `${styles.paginate_page}  ${styles.active_page}`: `${styles.paginate_page}`}>
                        <p>{item}</p>
                    </div>
                )
            });
        }else if(page >= page_arr.length-3){
            endOfPagination = '';
        }else {
            endOfPagination = '';
        }

        if(page > 7) {
            startOfPagination = paginationStart.map((item) => {
                return (
                    <div onClick={() => pageClick(item)} key={item} className={item === page ? `${styles.paginate_page}  ${styles.active_page}`: `${styles.paginate_page}`}>
                        <p>{item}</p>
                    </div>
                )
            });
        } else {
            startOfPagination = '';
        }
    }

    return (
        <section>
            <div className={`${styles.container_x_md} ${styles.container_y_2}`}>
                <div className={`${styles.list_grid}`}>
                    { movieList }
                </div>

                <div className={styles.paginate_wrapper}>
                    <button onClick={goToBackPage} disabled={page === 1}>
                        <ArrowBackIosRounded/>
                    </button>
                    <div className={styles.paginate}>
                        { startOfPagination }
                        { startOfPagination !== '' && <span> ... </span> }
                        { paginationNow }
                        { endOfPagination !== '' && <span> ... </span> }
                        { endOfPagination }
                    </div>
                    <button onClick={goToNextPage} disabled={page === page_arr.length}>
                        <ArrowForwardIosRounded/>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default UpcomingAllMovies;
