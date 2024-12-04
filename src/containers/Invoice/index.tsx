import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
const Invoice = () => {
    return (
        <div className='invoice'>
            <div className='invoice-main'>
                <div className='container'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-8'>
                            <div className='invoice-header'>
                                <div className='invoice-header-item'>
                                    <div className='invoice-logo'>
                                        <Link to='/'>
                                            <img src="	https://gambolthemes.net/html-items/cursus-new-demo/images/ct_logo.svg" alt="" />
                                        </Link>
                                    </div>
                                    <p>Invoice</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='invoice-body p-0'>
                <div className='container'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-8'>
                            <div className='invoice-content'>
                                <div className='invoice-date-info'>
                                    <ul>
                                        <li>
                                            <div id='invoice-info' className='invoice-date'>
                                                <span>
                                                    Date :
                                                </span>
                                                19 October 2024
                                            </div>
                                        </li>
                                        <li>
                                            <div id='invoice-info' className='invoice-number'>
                                                <span>
                                                    Invoice No :
                                                </span>
                                                IVIP9999999
                                            </div>
                                        </li>
                                        <li>
                                            <div id='invoice-info' className='invoice-id'>
                                                <span>
                                                    Order ID :
                                                </span>
                                                1258963487
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className='invoice-address'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <h2 className='invoice-title'>Invoice</h2>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='recipient'>
                                                <h4>To</h4>
                                                <ul>
                                                    <li>
                                                        <div className='recipient-info'>
                                                            Tuấn Kiệt
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='recipient-info'>
                                                            123 OneHub Thủ Đức Quận 9 TPHCM
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='recipient-info'>
                                                            0901234567
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                        <div className='col-md-6'>
                                            <div className='sender'>
                                                <h4>Cursus</h4>
                                                <ul>
                                                    <li>
                                                        <div className='sender-info'>
                                                            Tuấn Kiệt
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='sender-info'>
                                                            Trường ĐH FPT, Phường Long Thạnh Mỹ, Quận Thủ Đức
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='sender-info'>
                                                            0901234567
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='sender-info'>
                                                            Mã số thuế: 000002111111
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='invoice-table'>
                                    <div className='table-responsive-md'>
                                        <table className='table table-borderless'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>
                                                        Item
                                                    </th>
                                                    <th scope='col'>
                                                        Price
                                                    </th>
                                                    <th scope='col'>
                                                        Vat (..%)
                                                    </th>
                                                    <th scope='col'>
                                                        Total Amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope='row'>
                                                        <div id='product-info' className='item-title'>
                                                            <p>Item Title</p>
                                                        </div>
                                                    </th>
                                                    <td>
                                                        <div id='product-info' className='item-price'>
                                                            <p>$30.00</p>
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <div id='product-info' className='item-vat'>
                                                            <p>$5.00</p>
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <div id='product-info' className='item-total'>
                                                            <p>$35.00</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={1}>
                                                    </td>
                                                    <td colSpan={3}>
                                                        <div className='invoice-payment'>
                                                            <div className='invoice-total'>
                                                                Invoice Total : USD $220.00
                                                            </div>
                                                            <p >
                                                                Paid via MoMo
                                                                <a href="https://www.momo.vn/">
                                                                    <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square-1024x1024.png" alt="" />
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='invoice-footer'>
                                    <div className='invoice-footer-left'>
                                        <p>
                                            Thank you for buying
                                        </p>
                                    </div>
                                    <div className='invoice-footer-right'>
                                        <a className='btn-print' onClick={() => window.print()}>Print</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Invoice
