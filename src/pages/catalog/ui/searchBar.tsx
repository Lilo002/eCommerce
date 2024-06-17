import { useState } from 'react';
import { Button, Form, Input } from 'antd';

export const SearchBar = ({ onSearch }: { onSearch: (searchTerm: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const search = () => {
    onSearch(searchTerm);
  };

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ offset: 0, span: 23 }}
      onFinish={search}
      autoComplete="off"
      layout="vertical"
      className="catalog-control-panel-form"
    >
      <Form.Item name="search">
        <Input value={searchTerm} placeholder="Search..." onChange={onSearchTermChange} />
      </Form.Item>

      <Form.Item>
        <Button className="search-btn" type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};
