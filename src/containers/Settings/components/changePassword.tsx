import { cursusAPI } from "@/services";
import { CookiesService } from "@/services/cookies.service";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";


const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = decodeJWT();
  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    const userId = user?.sub;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await cursusAPI.userService.changePassword(userId || 'null', {
        currentPassword,
        newPassword,
        confirmPassword
      });

      toast.success(response.data.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowModal(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'An error occurred while changing password');
    } finally {
      setLoading(false);
    }
  };
  const handleKeepLoggedIn = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    setShowModal(false);
    CookiesService.remove();
    window.location.reload();
    toast.info('Vui lòng đăng nhập lại');
  };
  return (
    <FullscreenContainer>
      <Container>
        <Title>Change Your Password</Title>
        <InputGroup>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>

        <Button onClick={handleChangePassword} disabled={loading}>
          {loading ? <Spinner /> : "Save"}
        </Button>
      </Container>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Password changed successfully!</ModalTitle>
            <ModalText>Do you want to stay logged in?</ModalText>
            <ModalButtons>
              <ModalButtonYes onClick={handleKeepLoggedIn}>Yes</ModalButtonYes>
              <ModalButtonNo onClick={handleLogout}>No</ModalButtonNo>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </FullscreenContainer>
  )
}

export default ChangePassword
const FullscreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  
  background-color: #f4f4f4;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  &:focus {
    outline: none;
     border-color: #2196F3; 
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #ed2a26;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #C30000;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
const Spinner = styled.div`
  border: 4px solid #f3f3f3; 
  border-top: 4px solid #ed2a26;
  border-radius: 50%;
  width: 28px; 
  height: 28px; 
  animation: spin 1s linear infinite;
  margin: 0 auto; 
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const ModalText = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButtonNo = styled.button`
  background-color: #C1C1C1;
  color: white;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-right: 60px;
  &:hover {
    background-color: #A9A9A9;
  }
`;

const ModalButtonYes = styled.button`
  background-color: #ed2a26;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-left: 60px;
  &:hover {
    background-color:  #C30000;
  }
`;