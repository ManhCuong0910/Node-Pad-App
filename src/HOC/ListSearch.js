import React, { useEffect, useState } from "react";
import UseDebounce from "../HOC2/UseDebounce";
import axios from "axios";

export default function ListSearch() {
  const [inputSearch, setInputSearch] = useState();
  const [dataSearch, setDataSearch] = useState([]);

  const debouunceSearchValue = UseDebounce(inputSearch,1000)

  useEffect(() => {
    const fetchData = (query) => {
        axios.get(`https://backoffice.nodemy.vn/api/tasks/?filters[title][$contains]=${query}&populate=*`).then((res) => {
            let data = res.data
            setDataSearch(data.data);
        });
    };

    if (debouunceSearchValue) {
        fetchData(debouunceSearchValue);
    } else {
        setDataSearch([]);
    }
}, [debouunceSearchValue]);

  return (
    <div>
      <input onChange={(e) => setInputSearch(e.target.value)} style={{width:'60%',textAlign:'center',padding:'15px',borderRadius:'10px'}} placeholder="Hãy nhập nội dung cần tìm"></input>
      <ul style={{listStyleType:'none',marginTop:'20px',textAlign:'center'}}>
    {dataSearch.map((data) => {
      return <li>{data.attributes.title}</li>
    })}
      </ul>
    </div>
  );
}
