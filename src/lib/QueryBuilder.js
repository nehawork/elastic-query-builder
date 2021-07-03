import { Form, Input, Select, Space, Button } from "antd";
import queryFields from "../helpers/FieldsData";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Operators from "../helpers/Operators";

const { Option } = Select;

const QueryBuilder = ({onQuerySubmit, onQueryReset}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onQuerySubmit(values);
  };

  const onReset = () => {
    form.resetFields();
    onQueryReset();
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      onReset={onReset}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        name="queryName"
        label="Query Name"
        rules={[{ required: true, message: "Missing query name" }]}
      >
        <Input placeholder="Enter query name" />
      </Form.Item>
      <Form.List name="subQueries">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div
                key={field.key}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: 'center'
                }}
              >
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.queryName !== curValues.queryName ||
                    prevValues.subQueries !== curValues.subQueries
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Field"
                      style={{ width: "30%" }}
                      name={[field.name, "field"]}
                      fieldKey={[field.fieldKey, "field"]}
                      rules={[{ required: true, message: "Missing field" }]}
                    >
                      <Select placeholder="Select field" showSearch style={{ width: "100%" }}>
                        {queryFields.map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.queryName !== curValues.queryName ||
                    prevValues.subQueries !== curValues.subQueries
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Operator"
                      name={[field.name, "operator"]}
                      style={{ width: "30%" }}
                      fieldKey={[field.fieldKey, "operator"]}
                      rules={[{ required: true, message: "Missing operator" }]}
                    >
                      <Select placeholder="Select operator" showSearch style={{ width: "100%" }}>
                        {Operators.map((item) => (
                          <Option key={item.value} value={item.value}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>

                <Form.Item
                  {...field}
                  label="Value"
                  style={{ width: "30%" }}
                  name={[field.name, "value"]}
                  fieldKey={[field.fieldKey, "value"]}
                  rules={[{ required: true, message: "Missing value" }]}
                >
                  <Input placeholder="Enter value" style={{ width: "100%" }} />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Filters
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="default" style={{ marginRight: "1rem" }} htmlType="reset">
          Reset
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QueryBuilder;
