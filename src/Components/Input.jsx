function Input({ ItemName, IdentityName, type = "text", error, register }) {
  return (
    <div className=" space-y-2 mt-3">
      <label htmlFor={IdentityName} className=" text-pretty block">
        {ItemName}
      </label>
      <input
        type={type}
        name={IdentityName}
        id={IdentityName}
        className={"border w-full py-2 px-3 rounded outline-none hover:border-blue-400 "+ (error &&'border-red-500') }
        placeholder={ItemName}
        {...register}
      />
      {error && <small className="text-red-500"> {error.message}</small>}
    </div>
  );
}

export default Input;
