import { useEffect, useState } from "react";
import { collection, getDocs,doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import {  toast } from 'react-toastify';

function HomePage() {
  const [data, setData] = useState([]);

  // Update Operation
  const handleUpdate = async (datakey) => {
    try {
      const washingtonRef = doc(db, "product", datakey);
      let ProductName = prompt("Enter a Product Name");
      await updateDoc(washingtonRef, {
        "filteredData.productName": ProductName,
      });
      getData();
      toast.success("You Are Updated Successfully!", {
        position: "top-center",
      });
      console.log("You Are Updated Successfully!");
    } catch (err) {
      console.err(err);
    }
  };

  //Delect Opeation
  const handleDelect = async (datakey) => {
    try {
      if(confirm("Are you sure to delect")){
        await deleteDoc(doc(db, "product", datakey));
        getData()
        toast.warn("You Are Delected Successfully!", {
          position: "top-center",
        });
        console.log("You Are Delected Successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const productsRef = collection(db, "product");
      const res = await getDocs(productsRef);

      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setData(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    console.log("data is rendered");
    getData();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Product Brand
            </th>
            <th scope="col" className="px-6 py-3">
              Product Price
            </th>
            <th scope="col" className="px-6 py-3">
              Update
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>

        {data.map((data, index) => {
          const { price, productBrand, productName } = data.filteredData;
          const { id } = data;

          return (
            <tbody key={index}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {productName}
                </th>
                <td className="px-6 py-4">{productBrand}</td>
                <td className="px-6 py-4">{price}</td>
                <td className="px-6 py-4">
                  <button
                    className=" bg-green-600 text-white px-2 py-2 rounded"
                    onClick={() => handleUpdate(id)}
                  >
                    Update
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className=" bg-red-600 text-white px-2 py-2 rounded"
                    onClick={() => handleDelect(id)}
                  >
                    Delect
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}

      </table>
    </div>
  );
}

export default HomePage;
