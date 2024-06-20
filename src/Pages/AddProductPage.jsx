import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { uid } from "uid";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../Components/Input";

function AddProductPage() {
  const schema = yup
    .object({
      productName: yup.string().min(3).required(),
      productBrand: yup.string().min(3).required(),
      price: yup.number().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const AddFireStore = async (filteredData) => {
    const formData = new FormData(filteredData.target);

    await setDoc(doc(db, "product", uid(16)), {
      filteredData,
    });

    toast.success("Product is Added");
    console.log("data is succesfully addded");
  };

  return (
    <div className="p-10">
      <div className="shadow">
        <h1 className="text-2xl text-center">Add Product</h1>
        <form className="p-4" onSubmit={handleSubmit(AddFireStore)}>
          <Input
            ItemName={"Product Name"}
            IdentityName={"productName"}
            error={errors.productName}
            register={{ ...register("productName") }}
          />
          <Input
            ItemName={"product Brand"}
            IdentityName={"productBrand"}
            error={errors.productName}
            register={{ ...register("productBrand") }}
          />
          <Input
            ItemName={"Product Price"}
            IdentityName={"price"}
            error={errors.price}
            register={{ ...register("price") }}
            type="number"
          />
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
