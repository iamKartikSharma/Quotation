import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./ProductCustomerSection.css";

const ProductCustomerSection = forwardRef((props, ref) => {
  const [products] = useState([
    "ADDITIONAL - GST 18%",
    "SERVICE - GST 18%",
    "PANELLING - GST 18%",
    "VANITY - GST 18%",
    "DOOR - GST 18%",
    "KITCHEN - GST 18%",
    "FURNITURE - GST 18%",
    "WARDROBE - GST 18%",
  ]);

  const [quotationType, setQuotationType] = useState("Original");
  const [reference, setReference] = useState("");
  const [designer, setDesigner] = useState("");
  const [manager, setManager] = useState("");
  const [customer, setCustomer] = useState("");
  const [designers, setDesigners] = useState([]);
  const [managers, setManagers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [gst, setGst] = useState("");
  const [mobile, setMobile] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [landmark, setLandmark] = useState("");
  const [address, setAddress] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const authHeader = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    fetch("http://localhost:8000/api/designers", { headers: authHeader })
      .then((res) => res.json())
      .then((data) => setDesigners(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch("http://localhost:8000/api/managers", { headers: authHeader })
      .then((res) => res.json())
      .then((data) => setManagers(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch("http://localhost:8000/api/customers", { headers: authHeader })
      .then((res) => res.json())
      .then((data) => setCustomers(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handleGstChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z0-9]{0,15}$/.test(value)) setGst(value);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) setMobile(value);
  };

  // Expose customer data to parent
  useImperativeHandle(ref, () => ({
    getCustomerData: () => ({
      product: products[0],
      quotationType,
      reference,
      designer,
      manager,
      customer,
      shippingAddress: {
        gstNumber: gst,
        building,
        floor,
        nearestLandmark: landmark,
        address,
        mobileNumber: mobile,
      },
      remarks,
    }),
  }));

  return (
    <div className="kyc-container">
      {/* Product Details */}
      <div className="product-details">
        <h4>Product Details</h4>

        <div className="form-group">
          <label>Product</label>
          <select>{products.map((p, i) => <option key={i}>{p}</option>)}</select>
        </div>

        <div className="form-group">
          <label>Quotation Type</label>
          <select value={quotationType} onChange={(e) => setQuotationType(e.target.value)}>
            <option value="Original">Original</option>
            <option value="Revised">Revised</option>
          </select>
        </div>

        <div className="form-group">
          <label>Reference</label>
          <select value={reference} onChange={(e) => setReference(e.target.value)}>
            <option value="">Select Reference</option>
            <option>Mr. X</option>
          </select>
        </div>

        <div className="form-group">
          <label>Designer</label>
          <select value={designer} onChange={(e) => setDesigner(e.target.value)}>
            <option value="">Select Designer</option>
            {designers.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Manager</label>
          <select value={manager} onChange={(e) => setManager(e.target.value)}>
            <option value="">Select Manager</option>
            {managers.map(m => <option key={m._id} value={m.name}>{m.name}</option>)}
          </select>
        </div>
      </div>

      {/* Customer Details */}
      <div className="customer-details">
        <h4>Customer Details & Shipping</h4>

        <div className="form-group">
          <label>Select Customer</label>
          <select value={customer} onChange={(e) => setCustomer(e.target.value)}>
            <option value="">Select Customer</option>
            {customers.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>GSTIN</label>
          <input type="text" value={gst} onChange={handleGstChange} placeholder="15 DIGIT GST NO" />
        </div>

        <div className="form-group">
          <label>Building</label>
          <input value={building} onChange={(e) => setBuilding(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Floor</label>
          <input value={floor} onChange={(e) => setFloor(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Nearest Landmark</label>
          <input value={landmark} onChange={(e) => setLandmark(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input value={mobile} onChange={handleMobileChange} placeholder="10 digit number" />
        </div>

        <div className="form-group">
          <label>Remarks</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>
      </div>
    </div>
  );
});

export default ProductCustomerSection;
