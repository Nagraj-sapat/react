import React, { useRef, useState } from "react";
import { themeColor } from "../../utilis/constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleAddNewItem } from "../../store/menuSlice";
import useIdGenerator from "../../utilis/useIdGenerator";
import { useParams } from "react-router-dom";
import { handleActiveItem } from "../../store/activeItemSlice";
import toast from "react-hot-toast";

function NewCatEditableText({ toggle }) {
  const menuOverallDetails = useSelector((state) => state.menuData.overallData);

  const [name, setName] = useState("");
  const [generateId, setGenerateId] = useIdGenerator();

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const params = useParams();

  const activeStyle = {
    border: `1px solid ${themeColor.primary}`,
    borderRadius: "4px",
  };

  const handleSubmit = () => {
    if (!name.trim().length) {
      toast.error("Field cannot be empty");
      return false;
    }
    const payload = {
      type: "category",
      value: {
        category_id: `${params?.menuId}_${generateId}`,
        name: name.trim(),
      },
    };

    dispatch(handleAddNewItem(payload));
    setName("");
    toggle();
  };

  return (
    <div className="catSubcatEditableTextContainer col-2 d-flex align-items-center gap-2">
      <div className="languageTextLabel text-nowrap">
        {Object.keys(menuOverallDetails)[0]} -{" "}
      </div>
      <div className="d-flex gap-2 align-items-center">
        <input
          style={activeStyle}
          ref={inputRef}
          type="text"
          className="catSubcatInputbox"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onFocus={() =>
            dispatch(
              handleActiveItem({
                name: "isMenuEdit",
                value: true,
              })
            )
          }
          onBlur={() => {
            setGenerateId();
            handleSubmit();
          }}
          autoFocus
        />
      </div>
    </div>
  );
}

export default NewCatEditableText;
