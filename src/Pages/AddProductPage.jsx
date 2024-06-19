import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { uid } from "uid";
import {  toast } from 'react-toastify';


function AddProductPage() {
  const AddFireStore = async (e) => {
    e.preventDefault();

    const formData =  new FormData(e.target);
    const filteredData=[...formData].reduce( (storeVar,[key ,val]) =>{
        storeVar[key]= val
        return storeVar
    },{})

     await setDoc(doc(db, "product", uid(16)), {
       filteredData
    });

    toast.success("Product is Added")
    console.log("data is succesfully addded");
    e.target.reset();
  };

  return (
    <div className="p-10">
      <div className="shadow">
        <h1 className="text-2xl text-center">Add Product</h1>
        <form className="p-4" onSubmit={AddFireStore}>
          <div className=" space-y-2 mt-3">
            <label htmlFor="productName" className=" text-pretty block">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              className=" border w-full py-2 px-3 rounded outline-none hover:border-blue-400"
              placeholder="Product Name"
            />
          </div>
          <div className=" space-y-2 mt-3">
            <label htmlFor="productBrand" className=" text-pretty block">
              product Brand
            </label>
            <input
              type="text"
              name="productBrand"
              id="productBrand"
              className=" border w-full py-2 px-3 rounded outline-none hover:border-blue-400"
              placeholder="Product Brand"
            />
          </div>
          <div className=" space-y-2 mt-3">
            <label htmlFor="price" className="text-pretty block">
              Product Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              className=" border w-full py-2 px-3 rounded outline-none hover:border-blue-400"
              placeholder="Product price"
            />
          </div>
          <div>
            <button className=" bg-green-600 py-3 px-3 mt-2 rounded text-white">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
