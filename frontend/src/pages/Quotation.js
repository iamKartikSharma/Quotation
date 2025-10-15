import React, { useState, useEffect, useRef } from "react";
import "./Quotation.css";
import ProductCustomerSection from "./ProductCustomerSection.js";
import BlocksSection from "./BlocksSections.js";

const Quotation = ({ onLogout }) => {
  const [quotationNumber, setQuotationNumber] = useState(""); // will show after save
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Draft");
  const [businessUnit, setBusinessUnit] = useState("Ambala Unit");

  const blocksRef = useRef();
  const customerRef = useRef();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleSave = async () => {
    const blocksData = blocksRef.current.getBlocks();
    const customerData = customerRef.current.getCustomerData();

    try {
      // Save or get customer
      let customerId = customerData.customerId;
      if (!customerId) {
        const customerRes = await fetch("http://localhost:8000/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
          body: JSON.stringify({
            name: customerData.customer,
            gstNumber: customerData.shippingAddress.gstNumber,
            building: customerData.shippingAddress.building,
            floor: customerData.shippingAddress.floor,
            nearestLandmark: customerData.shippingAddress.nearestLandmark,
            address: customerData.shippingAddress.address,
            mobileNumber: customerData.shippingAddress.mobileNumber,
          }),
        });
        const savedCustomer = await customerRes.json();
        customerId = savedCustomer._id;
      }

      // Save quotation
      const quotationRes = await fetch("http://localhost:8000/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          date,
          status,
          businessUnit,
          product: customerData.product,
          quotationType: customerData.quotationType,
          reference: customerData.reference,
          designer: customerData.designer,
          manager: customerData.manager,
          customer: customerId,
          shippingAddress: customerData.shippingAddress,
          remarks: customerData.remarks,
          blocks: blocksData,
        }),
      });

      const savedQuotation = await quotationRes.json();
      setQuotationNumber(savedQuotation.quotationNumber); // show generated number
      alert("✅ Quotation saved successfully!");
      console.log("Saved quotation data:", savedQuotation);
    } catch (err) {
      console.error("Error saving quotation:", err);
      alert("❌ Failed to save quotation.");
    }
  };

  return (
    <div className="quotation-page">
      <div className="quotation-header">
        <div className="left-header">
          <button className="save-btn" onClick={handleSave}>💾 Save</button>
        </div>

        <div className="right-header">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
            <button className="save-btn" onClick={onLogout}>⎋ Logout</button>
          </div>
          <div className="header-row">
            <div className="header-field">
              <label># Quotation:</label>
              {/* Display generated number as text instead of input */}
              <span className="quotation-number">
                {quotationNumber ? quotationNumber : "Will be generated on save"}
              </span>
            </div>

            <div className="header-field">
              <label># Dated:</label>
              <input type="date" value={date} readOnly />
            </div>

            <div className="header-field">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Draft">Draft</option>
                <option value="Prepared">Prepared</option>
                <option value="Verified">Verified</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="header-field">
              <label>Business Unit</label>
              <select value={businessUnit} onChange={(e) => setBusinessUnit(e.target.value)}>
                <option value="Ambala Unit">Ambala Unit</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="quotation-section">
        <details>
          <summary>Product Selection and Customer KYC ↓</summary>
          <ProductCustomerSection ref={customerRef} />
        </details>

        <details>
          <summary>Blocks and Block Items ↓</summary>
          <BlocksSection ref={blocksRef} />
        </details>
      </div>
    </div>
  );
};

export default Quotation;
