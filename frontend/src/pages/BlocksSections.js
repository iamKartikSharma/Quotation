import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./BlocksSection.css";

const BlocksSection = forwardRef((props, ref) => {
  const [blocks, setBlocks] = useState([]);

  const addBlock = () => setBlocks([...blocks, { name: "", items: [] }]);
  const updateBlockName = (index, name) => {
    const updated = [...blocks];
    updated[index].name = name;
    setBlocks(updated);
  };
  const removeBlock = (index) => {
    const updated = [...blocks];
    updated.splice(index, 1);
    setBlocks(updated);
  };

  const addItem = (bIdx) => {
    const updated = [...blocks];
    updated[bIdx].items.push({
      description: "",
      unit: "MTR",
      width: "",
      quantity: "",
      rate: "",
      payType: "Paid",
      itemFinish: "",
      image: null,
      addons: [],
      fittings: [],
    });
    setBlocks(updated);
  };
  const removeItem = (bIdx, iIdx) => {
    const updated = [...blocks];
    updated[bIdx].items.splice(iIdx, 1);
    setBlocks(updated);
  };

  const addAddon = (bIdx, iIdx) => {
    const updated = [...blocks];
    updated[bIdx].items[iIdx].addons.push({
      description: "",
      unit: "MTR",
      quantity: "",
      rate: "",
      payType: "Paid",
      itemFinish: "",
      image: null,
    });
    setBlocks(updated);
  };
  const removeAddon = (bIdx, iIdx, aIdx) => {
    const updated = [...blocks];
    updated[bIdx].items[iIdx].addons.splice(aIdx, 1);
    setBlocks(updated);
  };

  const addFitting = (bIdx, iIdx) => {
    const updated = [...blocks];
    updated[bIdx].items[iIdx].fittings.push({
      brand: "",
      unit: "",
      quantity: "",
      payType: "Paid",
      listPrice: "",
      description: "",
      image: null,
    });
    setBlocks(updated);
  };
  const removeFitting = (bIdx, iIdx, fIdx) => {
    const updated = [...blocks];
    updated[bIdx].items[iIdx].fittings.splice(fIdx, 1);
    setBlocks(updated);
  };

  // ✅ Corrected upload and remove logic for all types
  const handleImageUpload = (e, bIdx, iIdx, type, idx = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...blocks];
      if (type === "item") updated[bIdx].items[iIdx].image = reader.result;
      else if (type === "addon") updated[bIdx].items[iIdx].addons[idx].image = reader.result;
      else if (type === "fitting") updated[bIdx].items[iIdx].fittings[idx].image = reader.result;
      setBlocks(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (bIdx, iIdx, type, idx = null) => {
    const updated = [...blocks];
    if (type === "item") updated[bIdx].items[iIdx].image = null;
    else if (type === "addon") updated[bIdx].items[iIdx].addons[idx].image = null;
    else if (type === "fitting") updated[bIdx].items[iIdx].fittings[idx].image = null;
    setBlocks(updated);
  };

  const updateItemField = (bIdx, iIdx, field, value) => {
    const updated = [...blocks];
    updated[bIdx].items[iIdx][field] = value;
    setBlocks(updated);
  };
  const updateAddonField = (bIdx, iIdx, aIdx, field, value) => {
    const updated = [...blocks];
    updated[bIdx].items[iIdx].addons[aIdx][field] = value;
    setBlocks(updated);
  };
  const updateFittingField = (bIdx, iIdx, fIdx, field, value) => {
    const updated = [...blocks];
    updated[bIdx].items[iIdx].fittings[fIdx][field] = value;
    setBlocks(updated);
  };

  useImperativeHandle(ref, () => ({
    getBlocks: () => blocks,
  }));

  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  return (
    <div className="blocks-section">
      <button className="add-block" onClick={addBlock}>
        + Add New Block
      </button>

      {blocks.map((block, bIdx) => (
        <div key={bIdx} className="block">
          <div className="block-header">
            <input
              type="text"
              placeholder="e.g. Living Room"
              value={block.name}
              onChange={(e) => updateBlockName(bIdx, e.target.value)}
            />
            <button className="remove-btn" onClick={() => removeBlock(bIdx)}>
              🗑 Remove Block
            </button>
          </div>

          <button className="add-item-btn" onClick={() => addItem(bIdx)}>
            + Add Block Item
          </button>

          {block.items.map((item, iIdx) => (
            <div key={iIdx} className="item-section">
              <div className="section-header">
                <h4 className="item-title">
                  {getOrdinal(iIdx + 1)} Item in {block.name || "Block"}
                </h4>
                <button className="remove-btn" onClick={() => removeItem(bIdx, iIdx)}>
                  🗑 Remove Item
                </button>
              </div>


              <input
                type="text"
                placeholder="DESCRIPTION"
                value={item.description}
                onChange={(e) =>
                  updateItemField(bIdx, iIdx, "description", e.target.value)
                }
              />
              <select
                value={item.unit}
                onChange={(e) =>
                  updateItemField(bIdx, iIdx, "unit", e.target.value)
                }
              >
                <option>MTR</option>
                <option>SQFT</option>
                <option>RFT</option>
                <option>EACH</option>
                <option>SET</option>
                <option>MM</option>
                <option>RFTX2</option>
              </select>
              <input
                type="number"
                placeholder="Width (mm.)"
                value={item.width}
                onChange={(e) =>
                  updateItemField(bIdx, iIdx, "width", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Qty (nos.)"
                value={item.quantity}
                onChange={(e) =>
                  updateItemField(bIdx, iIdx, "quantity", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Rate (₹)"
                value={item.rate}
                onChange={(e) =>
                  updateItemField(bIdx, iIdx, "rate", e.target.value)
                }
              />
              <select
                value={item.payType}
                onChange={(e) =>
                  updateItemField(bIdx, iIdx, "payType", e.target.value)
                }
              >
                <option>Paid</option>
                <option>FOC</option>
              </select>
              <textarea
                placeholder="ITEM FINISH HERE ..."
                value={item.itemFinish}
                onChange={(e) =>
                  updateItemField(bIdx, iIdx, "itemFinish", e.target.value)
                }
              />

              <div className="upload-section">
                {item.image ? (
                  <div className="image-preview">
                    <img src={item.image} alt="preview" />
                    <button
                      className="remove-image-btn"
                      onClick={() => handleRemoveImage(bIdx, iIdx, "item")}
                    >
                      🗑 Remove Picture
                    </button>
                  </div>
                ) : (
                  <label className="upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, bIdx, iIdx, "item")
                      }
                    />
                    <span>
                      📷 No preview available
                      <br />
                      <small>Click to upload</small>
                    </span>
                  </label>
                )}
              </div>

              <button onClick={() => addAddon(bIdx, iIdx)}>➕ Addon Item</button>
              {item.addons.map((addon, aIdx) => (
                <div key={aIdx} className="addon-section">
                  <div className="section-header">
                    <h4 className="addon-title">
                      {getOrdinal(aIdx + 1)} Addon Item in {block.name || "Block"}
                    </h4>
                    <button className="remove-btn" onClick={() => removeAddon(bIdx, iIdx, aIdx)}>
                      🗑 Remove Addon
                    </button>
                  </div>

                  <textarea
                    placeholder="ITEM DESCRIPTION HERE ..."
                    value={addon.description}
                    onChange={(e) =>
                      updateAddonField(
                        bIdx,
                        iIdx,
                        aIdx,
                        "description",
                        e.target.value
                      )
                    }
                  />
                  <select
                    value={addon.unit}
                    onChange={(e) =>
                      updateAddonField(bIdx, iIdx, aIdx, "unit", e.target.value)
                    }
                  >
                    <option>MTR</option>
                    <option>SQFT</option>
                    <option>RFT</option>
                    <option>EACH</option>
                    <option>SET</option>
                    <option>MM</option>
                    <option>RFTX2</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Qty (nos.)"
                    value={addon.quantity}
                    onChange={(e) =>
                      updateAddonField(
                        bIdx,
                        iIdx,
                        aIdx,
                        "quantity",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="number"
                    placeholder="Rate (₹)"
                    value={addon.rate}
                    onChange={(e) =>
                      updateAddonField(bIdx, iIdx, aIdx, "rate", e.target.value)
                    }
                  />
                  <select
                    value={addon.payType}
                    onChange={(e) =>
                      updateAddonField(
                        bIdx,
                        iIdx,
                        aIdx,
                        "payType",
                        e.target.value
                      )
                    }
                  >
                    <option>Paid</option>
                    <option>FOC</option>
                  </select>
                  <textarea
                    placeholder="ITEM FINISH HERE ..."
                    value={addon.itemFinish}
                    onChange={(e) =>
                      updateAddonField(
                        bIdx,
                        iIdx,
                        aIdx,
                        "itemFinish",
                        e.target.value
                      )
                    }
                  />

                  <div className="upload-section">
                    {addon.image ? (
                      <div className="image-preview">
                        <img src={addon.image} alt="preview" />
                        <button
                          className="remove-image-btn"
                          onClick={() =>
                            handleRemoveImage(bIdx, iIdx, "addon", aIdx)
                          }
                        >
                          🗑 Remove Picture
                        </button>
                      </div>
                    ) : (
                      <label className="upload-box">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, bIdx, iIdx, "addon", aIdx)
                          }
                        />
                        <span>
                          📷 No preview available
                          <br />
                          <small>Click to upload</small>
                        </span>
                      </label>
                    )}
                  </div>

                  {/* <button onClick={() => removeAddon(bIdx, iIdx, aIdx)}>
                    🗑 Remove Addon Item
                  </button> */}
                </div>
              ))}

              <button onClick={() => addFitting(bIdx, iIdx)}>
                ➕ Add Fitting
              </button>
              {item.fittings.map((fitting, fIdx) => (
                <div key={fIdx} className="fitting-section">
                  <div className="section-header">
                    <h4 className="fitting-title">
                      {getOrdinal(fIdx + 1)} Fitting Item in {block.name || "Block"}
                    </h4>
                    <button className="remove-btn" onClick={() => removeFitting(bIdx, iIdx, fIdx)}>
                      🗑 Remove Fitting
                    </button>
                  </div>


                  <input
                    placeholder="Brand"
                    value={fitting.brand}
                    onChange={(e) =>
                      updateFittingField(
                        bIdx,
                        iIdx,
                        fIdx,
                        "brand",
                        e.target.value
                      )
                    }
                  />
                  <input
                    placeholder="Unit"
                    value={fitting.unit}
                    onChange={(e) =>
                      updateFittingField(
                        bIdx,
                        iIdx,
                        fIdx,
                        "unit",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="number"
                    placeholder="Qty (nos.)"
                    value={fitting.quantity}
                    onChange={(e) =>
                      updateFittingField(
                        bIdx,
                        iIdx,
                        fIdx,
                        "quantity",
                        e.target.value
                      )
                    }
                  />
                  <select
                    value={fitting.payType}
                    onChange={(e) =>
                      updateFittingField(
                        bIdx,
                        iIdx,
                        fIdx,
                        "payType",
                        e.target.value
                      )
                    }
                  >
                    <option>Paid</option>
                    <option>FOC</option>
                  </select>
                  <input
                    type="number"
                    placeholder="List Price (₹)"
                    value={fitting.listPrice}
                    onChange={(e) =>
                      updateFittingField(
                        bIdx,
                        iIdx,
                        fIdx,
                        "listPrice",
                        e.target.value
                      )
                    }
                  />
                  <textarea
                    placeholder="ENTER DESCRIPTION HERE"
                    value={fitting.description}
                    onChange={(e) =>
                      updateFittingField(
                        bIdx,
                        iIdx,
                        fIdx,
                        "description",
                        e.target.value
                      )
                    }
                  />

                  <div className="upload-section">
                    {fitting.image ? (
                      <div className="image-preview">
                        <img src={fitting.image} alt="preview" />
                        <button
                          className="remove-image-btn"
                          onClick={() =>
                            handleRemoveImage(bIdx, iIdx, "fitting", fIdx)
                          }
                        >
                          🗑 Remove Picture
                        </button>
                      </div>
                    ) : (
                      <label className="upload-box">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, bIdx, iIdx, "fitting", fIdx)
                          }
                        />
                        <span>
                          📷 No preview available
                          <br />
                          <small>Click to upload</small>
                        </span>
                      </label>
                    )}
                  </div>

                  {/* <button onClick={() => removeFitting(bIdx, iIdx, fIdx)}>
                    🗑 Remove Fitting
                  </button> */}
                </div>
              ))}

              {/* <button onClick={() => removeItem(bIdx, iIdx)}>
                🗑 Remove Item
              </button> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});

export default BlocksSection;
