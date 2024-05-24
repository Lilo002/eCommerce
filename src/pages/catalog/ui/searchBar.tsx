import { useState } from 'react';
import { Button, Form, Input } from 'antd';

export const SearchBar = ({ onSearch }: { onSearch: (searchTerm: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ offset: 0, span: 23 }}
      onFinish={handleSearch}
      autoComplete="off"
      layout="vertical"
      className="catalog-control-panel-form"
    >
      <Form.Item name="email">
        <Input value={searchTerm} placeholder="Search..." onChange={onSearchTermChange} />
      </Form.Item>

      <Form.Item>
        <Button className="login-btn" type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};
