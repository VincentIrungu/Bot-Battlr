import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Inputs from "./Inputs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal); // Add this line to create MySwal instance

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/transactions`)
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.log(error));
  }, []);

  function handleAddTransaction(newTransaction) {
    setTransactions([...transactions, newTransaction]);
  }

  const handleClick = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this transaction!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/transactions/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              const updatedTransactions = transactions.filter(
                (transaction) => transaction.id !== id
              );
              setTransactions([...updatedTransactions]);
              MySwal.fire(
                "Deleted!",
                "Transaction has been deleted.",
                "success"
              );
            } else {
              throw new Error("Failed to delete transaction");
            }
          })
          .catch((error) => {
            console.error(error);
            MySwal.fire("Error", "Failed to delete transaction", "error");
          });
      }
    });
  };

  return (
    <div className="p-6 font-inter">
      <div className="bg-white rounded-lg shadow">
        <Inputs onAddTransaction={handleAddTransaction} />
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr
                  key={transaction.id}
                  className="border transition-colors hover:bg-gray-200 hover:cursor-pointer"
                >
                  <td className="border px-4 py-2 text-center ">
                    {transaction.date}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {transaction.description}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {transaction.category}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {transaction.amount}
                  </td>
                  <td
                    className="border px-4 py-2 text-center text-red-600"
                    onClick={() => handleClick(transaction.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;