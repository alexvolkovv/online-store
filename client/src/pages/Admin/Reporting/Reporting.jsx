import React from 'react';
import {Button, Form} from "react-bootstrap";

const Reporting = () => {
  return (
    <Form>
      <h4>Отчет о финансовых результатах</h4>
      <Form.Label htmlFor={'year'}>Год для составления отчестности:</Form.Label>
      <Form.Control id={'year'} type={'number'} min={"2000"} max={"2099"} step={"1"} />
      <Button className={'mt-3'}>Сформировать</Button>
    </Form>
  );
};

export default Reporting;