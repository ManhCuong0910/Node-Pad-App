import { Title } from '@mui/icons-material';
import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import {useSelector} from 'react-redux'
import {message} from 'antd'
import { getTaskListApi } from '../redux/actions/TodoListAction';
import axios from 'axios';
import ExplicitIcon from '@mui/icons-material/Explicit';
export default function ExportExcels() {
    const [dataExcel, setDataExcel] = useState()

   const getTaskListApi = async() => {
const {data} =  await axios.get('https://backoffice.nodemy.vn/api/tasks')
setDataExcel(data.data)
   }
   getTaskListApi()
const handleExport = () => {
    if (Array.isArray(dataExcel)){
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(dataExcel.map((item,index) => ({
            STT: index + 1,
            ID: item?.id,
            Title: item?.attributes?.title,
            Status: item?.attributes?.compelete,
        })));
        ws['!cols'] = [
            {wpx:50}, // Độ rộng của cột 
            {wpx:50},
            {wpx:200}
        ]
        XLSX.utils.book_append_sheet(wb,ws,"List to do")
        XLSX.writeFile(wb,'listTodo.xlsx')
    }else{
        message.info('Dữ liệu không phải 1 mảng')
    }
}
  return (
<span onClick={handleExport}><ExplicitIcon style={{fontSize:'40px'}}></ExplicitIcon></span>
  )
}
