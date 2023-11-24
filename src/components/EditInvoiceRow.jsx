import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Button, Form, Modal } from 'react-bootstrap'
import InvoiceItem from '../components/InvoiceItem'


const EditInvoiceRow = ({ invoice, setinvoices, invoices }) => {
    const [calculateTotal, setcalculateTotal] = useState(false)
    const [showModal, setShowModal] = useState(false);
  
    const handleModal = () => setShowModal(!showModal);

    useEffect(() => {
      handleCalculateTotal()
    }, [calculateTotal])
  
    const handleChange = (name, value) => {
      const updatedInvoices = invoices.map((obj) =>
        obj.id === invoice.id ? { ...obj, [name]: value } : obj
      )
      setinvoices(updatedInvoices)
      setcalculateTotal(!calculateTotal)
    }
  
    const onItemizedItemEdit = (evt, id) => {
      const updatedItems = invoice.items.map((oldItem) => {
        if (oldItem.itemId === id) {
          return { ...oldItem, [evt.target.name]: evt.target.value }
        }
        return oldItem
      })
      const updatedInvoices = invoices.map((obj) =>
        obj.id === invoice.id ? { ...obj, items: updatedItems } : obj
      )
      setinvoices(updatedInvoices)
      setcalculateTotal(!calculateTotal)
    }
  
    const addItem = (e) => {
      e.preventDefault()
      const newItem = {
        itemId: nanoid(),
        itemName: '',
        itemDescription: '',
        itemQuantity: 0,
        itemPrice: '0.00',
      }
      const updatedItems = invoice.items.map((item) => item)
      updatedItems.push(newItem)
      const updatedInvoices = invoices.map((obj) =>
        obj.id === invoice.id ? { ...obj, items: updatedItems } : obj
      )
      setinvoices(updatedInvoices)
      setcalculateTotal(!calculateTotal)
    }
  
    const handleRowDel = (item) => {
      
      const id = item?.itemId;
      const updatedItems = invoice.items.filter((item) => item.itemId !== id)
      const updatedInvoices = invoices.map((obj) =>
        obj.id === invoice.id ? { ...obj, items: updatedItems } : obj
      )
      setinvoices(updatedInvoices)
      setcalculateTotal(!calculateTotal)
    }
  
    const handleCalculateTotal = () => {
      const updatedInvoices = invoices.map((obj) => {
        if (obj.id === invoice.id) {
          let subTotal = 0
  
          obj.items.forEach((item) => {
            subTotal +=
              parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity)
          })
  
          const taxAmount = parseFloat(subTotal * (obj.taxRate / 100)).toFixed(2)
          const discountAmount = parseFloat(
            subTotal * (obj.discountRate / 100)
          ).toFixed(2)
          const total = (
            subTotal -
            parseFloat(discountAmount) +
            parseFloat(taxAmount)
          ).toFixed(2)
  
          return {
            ...obj,
            subTotal: parseFloat(subTotal).toFixed(2),
            taxAmount,
            discountAmount,
            total,
          }
        } else {
          return obj
        }
      })
      setinvoices(updatedInvoices)
    }
  
    return (
      <>
        <tr>
          <td
            style={{ textAlign: 'center' }}
            
          >
            {invoice.invoiceNumber}
          </td>
          <td  >
            <Form.Control
              type="date"
              value={invoice.dateOfIssue}
              name="dateOfIssue"
              className="my-2"
              onChange={(e) => {
                e.preventDefault()
                handleChange(e.target.name, e.target.value)
              }}
              required
            />
          </td>
          <td  >
            <Form.Control
              placeholder="Name"
              rows={3}
              value={invoice.billTo}
              type="text"
              name="billTo"
              className="my-2"
              onChange={(e) => {
                e.preventDefault()
                handleChange(e.target.name, e.target.value)
              }}
              autoComplete="name"
              required
            />
          </td>
          <td  >
            <Form.Control
              placeholder="Email"
              value={invoice.billToEmail}
              type="email"
              name="billToEmail"
              className="my-2"
              onChange={(e) => {
                e.preventDefault()
                handleChange(e.target.name, e.target.value)
              }}
              autoComplete="email"
              required
            />
          </td>
          <td  >
            <Form.Control
              placeholder="address"
              value={invoice.billToAddress}
              type="text"
              name="billToAddress"
              className="my-2"
              autoComplete="address"
              onChange={(e) => {
                e.preventDefault()
                handleChange(e.target.name, e.target.value)
              }}
              required
            />
          </td>
          <td  >
            <Form.Control
              placeholder="Customer name"
              rows={3}
              value={invoice.billFrom}
              type="text"
              name="billFrom"
              className="my-2"
              onChange={(e) => {
                e.preventDefault()
                handleChange(e.target.name, e.target.value)
              }}
              autoComplete="name"
              required
            />
          </td>
          <td  >
            <Form.Control
              placeholder="Email"
              value={invoice.billFromEmail}
              type="email"
              name="billFromEmail"
              className="my-2"
              onChange={(e) => {
                e.preventDefault()
                handleChange(e.target.name, e.target.value)
              }}
              autoComplete="email"
              required
            />
          </td>
          <td  >
            <Form.Control
              placeholder="address"
              value={invoice.billFromAddress}
              type="text"
              name="billFromAddress"
              className="my-2"
              autoComplete="address"
              onChange={(e) => {
                e.preventDefault()
                handleChange(e.target.name, e.target.value)
              }}
              required
            />
          </td>  
          <td  >
            <Form.Control
              name="taxRate"
              type="number"
              value={invoice.taxRate}
              onChange={(e) => {
                e.preventDefault()
                handleChange(e.target.name, e.target.value)
              }}
              className="bg-white border"
              placeholder="0.0"
              min="0.00"
              step="0.01"
              max="100.00"
            />
          </td>
          <td  >
            <Form.Control
              name="discountRate"
              type="number"
              value={invoice.discountRate}
              onChange={(e) => {
                e.preventDefault()
                handleChange(e.target.name, e.target.value)
              }}
              className="bg-white border"
              placeholder="0.0"
              min="0.00"
              step="0.01"
              max="100.00"
            />
          </td>
          <td  >
            {invoice.currency}
            {invoice.total || 0}
          </td>
          <td  >
          <Button variant="primary" onClick={handleModal}>
          Items
        </Button>
          </td>
        </tr>
        <Modal show={showModal} onHide={handleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add/Edit Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
     
   <InvoiceItem
                onItemizedItemEdit={onItemizedItemEdit}
                onRowAdd={addItem}
                onRowDel={handleRowDel}
                currency={invoice.currency}
                items={invoice.items}
              />
          </Modal.Body>
          <Modal.Footer>
          
            <Button variant="secondary" onClick={handleModal}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  export default EditInvoiceRow;