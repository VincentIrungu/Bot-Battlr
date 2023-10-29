import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Inputs = ({ onAddTransaction }) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !description || !category || !amount) {
      MySwal.fire({
        icon: "error",
        title: "All fields are required",
      });
      return;
    }

    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");

    const transaction = { date, description, category, amount };

    fetch(`http://localhost:8000/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.json())
      .then((newTransaction) => {
        onAddTransaction(newTransaction);

        MySwal.fire({
          icon: "success",
          title: "Transaction Added",
          showConfirmButton: false,
          timer: 2000, // Close the alert after 1.5 seconds (adjust as needed)
        });
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-2 mb-4">
      <div>
        <label className="mr-4">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          className="outline-3 border border-black text-center rounded-full"
          placeholder="Description.."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          className="outline-3 border border-black text-center rounded-full"
          placeholder="Category.."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          className="outline-3 border border-black text-center rounded-full"
          placeholder="Amount.."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className="bg-gray-400 rounded-full">
        <FontAwesomeIcon
          icon={faPlus}
          className="text-black "
          onClick={handleSubmit}
        >
          Add Transaction
        </FontAwesomeIcon>
      </button>
    </div>
  );
};

export default Inputs;