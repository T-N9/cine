import React from 'react';
import styles from './styles/pagination.module.scss';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';

const Pagination = (props) => {

    let page_arr = [], paginationNow, endOfPagination , startOfPagination,  paginationStart, paginationEnd;
    if(props.page != null) {

        for(let i = 1; i <= props.totalPages; i++) {
            page_arr.push(i);
        }

        let paginateShow;
        if(page_arr.length > 7) {
            paginationEnd = [page_arr.length-1, page_arr.length];
            paginationStart = [1, 2];
            if(props.page === 1 || props.page === 2){
                paginateShow = page_arr.slice(0,5)   
            }else if(props.page >= page_arr.length-3){
                paginateShow = [page_arr.length-4,page_arr.length-3,page_arr.length-2,page_arr.length-1, page_arr.length];
            }else{
                paginateShow = [props.page-2, props.page-1, props.page, props.page+1, props.page+2]; 
            }
        }else{
            paginateShow = page_arr;
        }


        paginationNow = paginateShow.map((item) => {
            return (
                <div onClick={() => props.pageClick(item)} key={item} className={item === props.page ? `${styles.paginate_page}  ${styles.active_page}`: `${styles.paginate_page}`}>
                    <p>{item}</p>
                </div>
            )
        })

        if(page_arr.length > 7 && props.page < page_arr.length-3) {
            endOfPagination = paginationEnd.map((item) => {
                return (
                    <div onClick={() => props.pageClick(item)} key={item} className={item === props.page ? `${styles.paginate_page}  ${styles.active_page}`: `${styles.paginate_page}`}>
                        <p>{item}</p>
                    </div>
                )
            });
        }else if(props.page >= page_arr.length-3){
            endOfPagination = '';
        }else {
            endOfPagination = '';
        }

        if(props.page > 7) {
            startOfPagination = paginationStart.map((item) => {
                return (
                    <div onClick={() => props.pageClick(item)} key={item} className={item === props.page ? `${styles.paginate_page}  ${styles.active_page}`: `${styles.paginate_page}`}>
                        <p>{item}</p>
                    </div>
                )
            });
        } else {
            startOfPagination = '';
        }
    }

    return (
        <>
         <div className={styles.paginate_wrapper}>
                    <button onClick={props.goToBackPage} disabled={props.page === 1}>
                        <ArrowBackIosRounded/>
                    </button>
                    <div className={styles.paginate}>
                        { startOfPagination }
                        { startOfPagination !== '' && <span> ... </span> }
                        { paginationNow }
                        { endOfPagination !== '' && <span> ... </span> }
                        { endOfPagination }
                    </div>
                    <button onClick={props.goToNextPage} disabled={props.page === page_arr.length}>
                        <ArrowForwardIosRounded/>
                    </button>
            </div>   
        </>
    );
}

export default Pagination;
