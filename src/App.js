import React, { useState } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import Add from './Add';
import '../src/App.css'
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [selectedUserToEdit, setSelectedUserToEdit] = useState(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <a>Delete</a>
          </Popconfirm>
          <a onClick={() => handleUpdate(record)}>Update</a>
        </Space>
      ),
    },
  ];

  const handleDelete = (record) => {
    setSubmittedData((prevData) => prevData.filter((item) => item.id !== record.id));
  };

  const handleUpdate = (record) => {
    setSelectedUserToEdit(record);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleAddOrUpdate = (userData) => {
    if (selectedUserToEdit) {
      // Update existing user
      setSubmittedData((prevData) => prevData.map((item) => (item.id === selectedUserToEdit.id ? userData : item)));
    } else {
      // Add new user
      setSubmittedData((prevData) => [...prevData, { ...userData, id: Date.now().toString() }]);
    }

    setIsModalOpen(false);
    setSelectedUserToEdit(null);
  };

  return (
    <div className="App">
      <div>
        <Button type="primary" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <Add
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSubmittedData={setSubmittedData}
        submittedData={submittedData}
        selectedUser={selectedUserToEdit}
        handleAddOrUpdate={handleAddOrUpdate}
      />
      <Table dataSource={submittedData} columns={columns} />
    </div>
  );
}

export default App;
