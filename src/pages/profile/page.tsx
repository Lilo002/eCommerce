import { useContext, useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { Button, Card, Divider, Input, Typography } from 'antd';

import { sessionContext } from '../../context/sessionContext';

const { Title, Text: AntText } = Typography;

export function ProfilePage() {
  const { session } = useContext(sessionContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editedUser, setEditedUser] = useState<Customer | null>(session?.userData || null);

  useEffect(() => {
    setEditedUser(session?.userData || null);
  }, [session?.userData]);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    // Здесь вы можете выполнить действия для сохранения отредактированных данных
    console.log('Сохранение изменений:', editedUser);
    setIsEdit(false);
  };

  return (
    <Card>
      <Title level={3}>User Information</Title>
      <AntText>
        <AntText strong>Email: </AntText>
        {session?.userData?.email}
      </AntText>
      <br />
      {isEdit && editedUser ? (
        <>
          <Input name="firstName" value={editedUser.firstName} onChange={handleInputChange} placeholder="First Name" />
          <br />
          <Input name="lastName" value={editedUser.lastName} onChange={handleInputChange} placeholder="Last Name" />
          <br />
          <Input
            name="dateOfBirth"
            value={editedUser.dateOfBirth}
            onChange={handleInputChange}
            placeholder="Date of Birth"
          />
        </>
      ) : (
        <>
          <AntText>
            <AntText strong>First Name: </AntText>
            {session?.userData?.firstName}
          </AntText>
          <br />
          <AntText>
            <AntText strong>Last Name: </AntText>
            {session?.userData?.lastName}
          </AntText>
          <br />
          <AntText>
            <AntText strong>Date of Birth: </AntText>
            {session?.userData?.dateOfBirth}
          </AntText>
        </>
      )}

      <Divider />

      {isEdit ? (
        <Button type="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      ) : (
        <Button type="primary" onClick={() => setIsEdit(true)}>
          Edit Profile
        </Button>
      )}
    </Card>
  );
}
