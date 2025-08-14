// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'

// ** Third Party Components
import ReactPaginate from 'react-paginate'

import { calcPageXofY } from '@utils'
// import { current } from '@reduxjs/toolkit'

export const usePaginationF01 = ({
    initialFilter, 
    initialSortColumn, 
    getData, 
    store,
    reloadData}) => {
    // * Pagination
    const [filter, setFilter] = useState(initialFilter)
    const [sort, setSort] = useState('desc')
    const [sortColumn, setSortColumn] = useState(initialSortColumn)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [pageCount, setPageCount] = useState(0)
    const [startPageRow, setStartRowOfPage] = useState(1)
    const [endPageRow, setEndRowOfPage] = useState(10)

    const dispatch = useDispatch()

    const fetchData = async ({ 
        newSortDir = sort, 
        newSortColumn = sortColumn, 
        newPage = currentPage, 
        newRowsPerPage = rowsPerPage, 
        newFilter = '', 
        newCaller = 'fetchData@usePaginationF01' 
    }) => {

        await dispatch(
            getData({
                sort: newSortDir,
                sortColumn: newSortColumn,
                page: newPage,
                perPage: newRowsPerPage,
                q: newFilter,
                caller: newCaller
            })
        )

    }

    const handleFilter = newFilter => {
        setFilter(newFilter)
        fetchData({ newFilter, newCaller: 'handleFilter@usePaginationF01' })

    }

    const handlePerPage = e => {
        const { adjustedCurrentPage: newCurrentPage } = calcPageXofY(store.total, parseInt(e.target.value), currentPage)

        setRowsPerPage(parseInt(e.target.value))
        setCurrentPage(newCurrentPage)
        fetchData({ newPage: newCurrentPage, newRowsPerPage: parseInt(e.target.value), newCaller: 'handlePerPage@usePaginationF01' })

    }

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
        fetchData({ newPage: page.selected + 1, newCaller: 'handlePagination@usePaginationF01' })
    }

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection)
        setSortColumn(column.sortField)
        fetchData({ newSortDir: sortDirection, newSortColumn: column.sortField, newCaller: 'handleSort@usePaginationF01' })
    }

    const dataToRender = () => {
        const filters = { q: filter }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })

        if (store.data.length > 0) {
            return store.data
        } else if (store.data.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
        }
    }

    const CustomPagination = () => {
        return (
        <>
            <Row className='d-flex align-items-center justify-content-end'>
            <Col xs='auto' className='d-flex justify-content-end align-items-center mb-1'>
                <label htmlFor='rows-per-page'>Show</label>
                <Input
                    type='select'
                    id='rows-per-page'
                    value={rowsPerPage}
                    onChange={handlePerPage}
                    className='form-control ms-50 pe-3 me-1'
                >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                </Input>
            </Col>
            <Col xs='auto' className='p-1 mb-1' style={{color: 'rgb(var(--theme-rgb-primary-900))'}}>
                Items {startPageRow} - {endPageRow} of {store.total}
            </Col>
            <Col xs='auto'>

                <ReactPaginate
                    nextLabel=''
                    breakLabel='...'
                    previousLabel=''
                    pageCount={pageCount || 1}
                    activeClassName='active'
                    breakClassName='page-item'
                    pageClassName={'page-item'}
                    breakLinkClassName='page-link'
                    nextLinkClassName={'page-link'}
                    pageLinkClassName={'page-link'}
                    nextClassName={'page-item next'}
                    previousLinkClassName={'page-link'}
                    previousClassName={'page-item prev'}
                    onPageChange={page => handlePagination(page)}
                    forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                    containerClassName={'pagination react-paginate justify-content-end p-1'}
                />
            </Col>
            </Row>
        </>
        )
    }


    useEffect(() => {
        fetchData({})
    }, [reloadData]) // Orig: [dispatch, store.data.length, sort, filter, sortColumn, currentPage, rowsPerPage,  reloadData]) store.total, 

    useEffect(() => {
        if (!store.isDataLoaded) return
        const { 
            pageCount: newPageCount, 
            startPageRow: newStartRowOfPage, 
            endPageRow: newEndRowOfPage, 
            adjustedCurrentPage: newCurrentPage 
        } = calcPageXofY(store.total, rowsPerPage, currentPage)

        setPageCount(newPageCount)
        setStartRowOfPage(newStartRowOfPage)
        setEndRowOfPage(newEndRowOfPage)
        setCurrentPage(newCurrentPage)

    }, [store.total, rowsPerPage, currentPage])

    return {
        currentPage,
        CustomPagination,
        dataToRender,
        handleFilter,
        handlePerPage,
        handleSort,
        rowsPerPage,
        filter
    }
}
