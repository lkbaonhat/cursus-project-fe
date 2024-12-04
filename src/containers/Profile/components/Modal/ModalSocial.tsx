import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/organisms/Modals/Modals";
import { INSTRUCTOR, ROLE, STUDENT } from "@/routes";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ModalSocial.scss";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useSelector } from "react-redux";
import { selectIntructerProfile } from "@/modules/global/selector";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

const user = useSelector(selectIntructerProfile);
const role = user?.role;

const ModalSocial: React.FC<ModalProps> = ({ show, onHide }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (role === ROLE.STUDENT) {
      navigate(`/${role ?? ROLE.STUDENT}/${STUDENT.SETTINGS}`);
    } else {
      navigate(`/${role ?? ROLE.INSTRUCTOR}/${INSTRUCTOR.SETTINGS}`);
    }
  };
  const handleClose = () => {
    onHide();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader>
        <ModalTitle>Notification.</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <h4>You don't link any social account yet.</h4>
        <h5>Do you want to link your social account?</h5>
      </ModalBody>
      <ModalFooter>
        <button onClick={handleNavigate} className="submit-button">
          Yes
        </button>
        <button onClick={handleClose} className="cancel-button">
          No
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalSocial;
