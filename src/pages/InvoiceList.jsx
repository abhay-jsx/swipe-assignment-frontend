import React, { useState } from "react";
import { Button, Card, Col, Row, Table,Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import InvoiceRow from "./InvoiceRow";

const InvoiceList = () => {
  const { invoiceList, getOneInvoice } = useInvoiceListData();
  const isListEmpty = invoiceList.length === 0;
  const [copyId, setCopyId] = useState("");
  const [ids,setIds] = useState([]);

  const multiInvoice = (id)=>{
    setIds(prevIds => {
      const idIndex = prevIds.indexOf(id);

      if (idIndex === -1) {
          return [...prevIds, id];
      } else {
          const updatedIds = [...prevIds];
          updatedIds.splice(idIndex, 1);
          return updatedIds;
      }
  });
   
  }
  
  const navigate = useNavigate();
  const [multiUpdate , setMultiUpdated] = useState(false);
  const handleCopyClick = () => {
    const invoice = getOneInvoice(copyId);
    if (!invoice) {
      alert("Please enter the valid invoice id.");
    } else {
      navigate(`/create/${copyId}`);
    }
  };

  const handleBlukUpdate = ()=>{
      navigate(`/edit-bulk`,{state:{
        ids
      }});
  }

  return (
    <Row>
      <Col className="mx-auto" xs={12} md={8} lg={9}>
        <h3 className="fw-bold pb-2 pb-md-4 text-center">Swipe Assignment</h3>
        <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
          {isListEmpty ? (
            <div className="d-flex flex-column align-items-center">
              <h3 className="fw-bold pb-2 pb-md-4">No invoices present</h3>
              <Link to="/create">
                <Button variant="primary">Create Invoice</Button>
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <h3 className="fw-bold pb-2 pb-md-4">Invoice List</h3>
                <Link to="/create">
                  <Button variant="primary mb-2 mb-md-4">Create Invoice</Button>
                </Link>

                <div className="d-flex gap-2">
                {ids.length>0 ? <Button variant="success mb-2 mb-md-4" onClick={handleBlukUpdate}>
                    Update Multiple
                  </Button>:
                  <Button variant="danger mb-2 mb-md-4" onClick={()=>setMultiUpdated(!multiUpdate)}>
                    Edit Multiple
                  </Button>}
                  <Button variant="dark mb-2 mb-md-4" onClick={handleCopyClick}>
                    Copy Invoice
                  </Button>

                  <input
                    type="text"
                    value={copyId}
                    onChange={(e) => setCopyId(e.target.value)}
                    placeholder="Enter Invoice ID to copy"
                    className="bg-white border"
                    style={{
                      height: "50px",
                    }}
                  />
                </div>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    {multiUpdate?<th>Select</th>:null}
                    <th>Invoice No.</th>
                    <th>Bill To</th>
                    <th>Due Date</th>
                    <th>Total Amt.</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceList.map((invoice) => (
                    <InvoiceRow
                      key={invoice.id}
                      invoice={invoice}
                      navigate={navigate}
                      multiUpdate={multiUpdate}
                      setIds={setIds}
                      ids={ids}
                      multiInvoice={multiInvoice}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default InvoiceList;
