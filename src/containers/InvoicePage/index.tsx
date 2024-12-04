import { Printer } from 'lucide-react';
import './styles.scss';

export default function Invoice() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="invoice-container">
        <div className="invoice-header">
          {/* Thay logo bằng thẻ hình ảnh và link ra trang chủ */}
          <a href="/">
            <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/ct_logo.svg" alt="Cursus Logo" />
          </a>
          <span className="invoice-header-invoice">Invoice</span>
        </div>

        <div className="invoice-content">
          <div className="invoice-info">
            <div>
              <h2>To</h2>
              <div className="text-sm text-gray-600">
                <p>Cursus</p>
                <p>Street 101</p>
                <p>4124 District Name</p>
                <p>City Name</p>
                <p>State</p>
                <p>12345</p>
                <p>United States</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col text-sm space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium">Date:</p>
                  <p className="font-light">10 April 2020</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">Invoice No:</p>
                  <p className="font-light">1234</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">Order ID:</p>
                  <p className="font-light">523424</p>
                </div>
              </div>
            </div>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th className="text-right">Price</th>
                <th className="text-right">VAT(5%)</th>
                <th className="text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Item 1</td>
                <td className="text-right">$75.00</td>
                <td className="text-right">$75.00</td>
                <td className="text-right">$150.00</td>
              </tr>
              <tr>
                <td>Item 2</td>
                <td className="text-right">$75.00</td>
                <td className="text-right">$75.00</td>
                <td className="text-right">$150.00</td>
              </tr>
            </tbody>
          </table>

          <div className="invoice-total">
            Invoice Total: USD $225.00
          </div>
          <div className="invoice-paid-info">Paid via PayPal</div>
        </div>

        <div className="invoice-footer">
          <p>Thanks for buying!</p>
          <button type="button">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
