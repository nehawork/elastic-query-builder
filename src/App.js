import "./App.css";
import QueryBuilder from "./lib/QueryBuilder";
import { Layout, Row, Col } from "antd";
import { useState } from "react";
import formatQuery from "./helpers/QueriesFormatter";

const { Header, Footer, Content } = Layout;
const App = () => {
  const [queryData, setQueryData] = useState({
    query: {
      bool: {},
    },
  });

  const onQuerySubmit = (queryData) => {
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
        <h4>&#169;Query Builder - Author: Neha Ramchandani</h4>
      </Footer>
    </Layout>
  );
};

export default App;
