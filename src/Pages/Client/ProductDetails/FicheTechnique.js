import React, { useState } from "react";
import { map } from "lodash";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import ReactHtmlParser from "react-html-parser";

function Fiche({ data, dataFiche, product, k, number, offset, setOffset }) {
  // while (!product[data[number + offset]]) {
  //   setOffset(offset+1)
  // }
  return number + offset < 5 && product[data[number + offset]] ? (
    <Col key={k} xl="6">
      <Card>
        <CardBody>
          <CardTitle>{dataFiche[number + offset]}</CardTitle>
          <div className="mt-5">
            {ReactHtmlParser(product[data[number + offset]])}
          </div>
        </CardBody>
      </Card>
    </Col>
  ) : (
    ""
  );
}

function FicheTechnique({ product }) {
  const [data, setData] = useState([
    "mainCharacteristics",
    "technicalDescription",
    "general",
    "garantie",
    "venduWith",
  ]);
  const [dataFiche, setDataFiche] = useState([
    "PRINCIPALES CARACTÉRISTIQUES",
    "DESCRIPTIF TECHNIQUE",
    "GENERAL",
    "GARANTIE",
    "VENDU AVEC LE PRODUIT",
  ]);
  const [offset, setOffset] = useState(0)
  
  return (product[data[0]] && product[data[1]] && product[data[2]] && 
  product[data[3]] && product[data[4]]) ? (
    <Card data-aos="fade-up">
      <CardBody>
        <CardTitle>Fiche technique :</CardTitle>
        {map(Array(3), (item, i) => (
          <Row key={i}>
            {map(Array(2), (c, j) => (
              <Fiche 
                data={data}
                dataFiche={dataFiche}
                product={product}
                k={j} 
                number={i + 1 + i + (j - 1)} 
                offset={offset} 
                setOffset={setOffset}>
              </Fiche>
            ))}
          </Row>
        ))}
      </CardBody>
    </Card>
  ) : "";
}

export default FicheTechnique;
