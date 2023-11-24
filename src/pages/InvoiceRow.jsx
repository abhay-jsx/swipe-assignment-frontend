import React, { useState } from "react";
import { Button,Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../redux/invoicesSlice";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "../components/InvoiceModal";
const InvoiceRow = ({ invoice, navigate ,multiUpdate,ids,multiInvoice}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
   
  
    const handleDeleteClick = (invoiceId) => {
      dispatch(deleteInvoice(invoiceId));
    };
  
    const handleEditClick = () => {
      navigate(`/edit/${invoice.id}`);
    };
  
    const openModal = (event) => {
      event.preventDefault();
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    return (
      <tr>
        {multiUpdate &&
        <td style={{ width: "5%" }}>
        
  
          
        <Form.Check
            type="checkbox"
            checked={ids.includes(invoice.id)}
            onClick={() => multiInvoice(invoice.id)}
        >
          
          </Form.Check>
        </td>
          }
        <td>{invoice.invoiceNumber}</td>
        <td className="fw-normal">{invoice.billTo}</td>
        <td className="fw-normal">{invoice.dateOfIssue}</td>
        <td className="fw-normal">
          {invoice.currency}
          {invoice.total}
        </td>
        <td style={{ width: "5%" }}>
          <Button variant="outline-primary" onClick={handleEditClick}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <BiSolidPencil />
            </div>
          </Button>
        </td>
        <td style={{ width: "5%" }}>
          <Button variant="danger" onClick={() => handleDeleteClick(invoice.id)}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <BiTrash />
            </div>
          </Button>
        </td>
        <td style={{ width: "5%" }}>
          <Button variant="secondary" onClick={openModal}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <BsEyeFill />
            </div>
          </Button>
        </td>
        
        <InvoiceModal
          showModal={isOpen}
          closeModal={closeModal}
          info={{
            isOpen,
            id: invoice.id,
            currency: invoice.currency,
            currentDate: invoice.currentDate,
            invoiceNumber: invoice.invoiceNumber,
            dateOfIssue: invoice.dateOfIssue,
            billTo: invoice.billTo,
            billToEmail: invoice.billToEmail,
            billToAddress: invoice.billToAddress,
            billFrom: invoice.billFrom,
            billFromEmail: invoice.billFromEmail,
            billFromAddress: invoice.billFromAddress,
            notes: invoice.notes,
            total: invoice.total,
            subTotal: invoice.subTotal,
            taxRate: invoice.taxRate,
            taxAmount: invoice.taxAmount,
            discountRate: invoice.discountRate,
            discountAmount: invoice.discountAmount,
          }}
          items={invoice.items}
          currency={invoice.currency}
          subTotal={invoice.subTotal}
          taxAmount={invoice.taxAmount}
          discountAmount={invoice.discountAmount}
          total={invoice.total}
        />
      </tr>
    );
  };
  
  export default InvoiceRow;