import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

const Add = ({ isModalOpen, setIsModalOpen, setSubmittedData, submittedData, selectedUser, handleAddOrUpdate }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    // Update the local state when selectedUser changes (for edit/update)
    setUserData(selectedUser || { name: '', email: '' });
  }, [selectedUser]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleAddOrUpdate(userData);
  };

  return (
    <>
      <Modal
        title={selectedUser ? 'Edit User' : 'Add User'}
        footer={null}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='form'>
          <div>
            <input
              type='text'
              name='name'
              placeholder='Enter name'
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type='email'
              name='email'
              placeholder='Enter email'
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>
              {selectedUser ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Add;
