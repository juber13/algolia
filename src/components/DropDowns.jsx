/* eslint-disable react/prop-types */


const DropDowns = ({handleDropDown,data,searchType}) => {
  
  const handleChange = (e) => {
    console.log(e)
    const dataValue = e.target.value;
    console.log(dataValue)

    handleDropDown(dataValue,searchType);
  }
  return (
    <select
      name=''
      id=''
      className='text-xs bg-[#F6F6EF] border p-1 outline-none focus:outline-none'
      onChange={handleChange}
    >
      {data.map((item, index) => (
        <option
          key={index}
          value={item == "all" ? "story,jobs,poll" : item}
          className='bg-white border p-2 border-gray-600 hover:gray-500 text-xs'
        >
            {item
              .split("_")
              .map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
              .join(" ")}
        </option>
      ))}
    </select>
  );
};

export default DropDowns