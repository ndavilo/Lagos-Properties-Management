import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import all_orders from '../../constants/properties';
import {calculateRange, sliceData} from '../../utils/table-pagination';

import '../styles.css';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import RefundedIcon from '../../assets/icons/refunded.svg';

function Orders () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        setPagination(calculateRange(all_orders, 5));
        setOrders(sliceData(all_orders, page, 5));
    }, []);

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = orders.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(all_orders, new_page, 5));
    }

    return(
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="New Property" />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Properties List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>CR No.</th>
                        <th>IMAGE</th>
                        <th>COMPLAINANT</th>
                        <th>SUSPECT</th>
                        <th>AMOUNT INVOLVED</th>
                        <th>DESCRIPTION</th>
                        <th>ADDRESS</th>
                        <th>VALUE</th>
                        <th>TEAM/SECTION</th>
                        <th>STATUS</th>
                        <th>OPTIONS</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                <td>{order.cr}</td>
                                    <td>
                                        <img
                                            src={order.avatar}
                                            className='dashboard-content-avatar'
                                            alt='Avatar'
                                        />
                                    </td>
                                    <td>{order.complainant}</td>
                                    <td>{order.suspect}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.description}</td>
                                    <td>{order.address}</td>
                                    <td>{order.value}</td>
                                    <td>{order.team}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <div className="option-buttons">
                                            <button className="edit-button">Edit</button>
                                            <button className="delete-button">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Orders;
