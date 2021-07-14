import "./App.css";
import QueryBuilder from "./lib/QueryBuilder";
import { Layout, Row, Col } from "antd";
import { useState } from "react";
import formatQuery from "./helpers/QueriesFormatter";
import GmailIcon from "./helpers/GmailIcon";

const { Header, Footer, Content } = Layout;
const App = () => {
  const [queryData, setQueryData] = useState({
    query: {
      bool: {},
    },
  });
  // const [queryData, setQueryData] = useState(
// []
//   );

{console.log(queryData);}
  const onQuerySubmit = (queryData) => {
    setQueryData(queryData);
    
    setQueryData({ query: { bool: formatQuery(queryData) } });
  };

  return (
    <Layout className="app_layout">
      <Header>
        <h1 className="header_app_name">Query Builder</h1>
      </Header>
      <Content className="app_main_content">
        <Row className="content_wrapper">
          <Col span={12} className="query_builder_wrapper">
            <QueryBuilder
              onQueryReset={() => setQueryData({ query: { bool: {} } })}
              onQuerySubmit={(values) => onQuerySubmit(values.subQueries)}
            />
          </Col>
          <Col span={12} className="query_builder_wrapper">
            <pre>
              <h3 style={{ marginBottom: 0 }}>
                {JSON.stringify(queryData, null, 4)}
              </h3>
            </pre>
          </Col>
        </Row>
      </Content>
      <Footer>
        <h4>&#169;Query Builder - Author: Neha Ramchandani&nbsp;</h4>
        <a
          rel="noreferrer"
          href="mailto:neharamchandani02@gmail.com?&subject=Regarding%20Query%20Builder"
          target="_blank"
        >
          <GmailIcon />
        </a>
      </Footer>
    </Layout>
  );
};

export default App;
