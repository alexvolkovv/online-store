import React from 'react';
import {Button, Form} from "react-bootstrap";
import PdfAPI from "../../../API/PdfAPI";
import {saveAs} from 'file-saver'

const Reporting = () => {
  const [year, setYear] = React.useState('')

  function createAndDownload() {
    console.log(year)
    PdfAPI.getFinancialPDF(year).then(res => {
      const pdfBlob = new Blob([res.data], {});

      saveAs(pdfBlob, 'Финансовая отчетность.pdf');
    })
  }

  return (
    <Form>
      <h4>Отчет о финансовых результатах</h4>
      <Form.Label htmlFor={'year'}>Год для составления отчестности:</Form.Label>
      <Form.Control id={'year'} type={'number'} min={"2000"} max={"2099"} step={"1"}  value={year} onChange={(event) => {setYear(event.target.value)}}/>
      <Button onClick={createAndDownload} className={'mt-3'}>Сформировать</Button>
    </Form>
  );
};

export default Reporting;