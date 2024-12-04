import styled from 'styled-components';
import { FaFileAlt, FaStream, FaClipboardList } from 'react-icons/fa';

const ItemRowContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  gap: 10px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
`;

interface ItemRowProps {
  item: {
    id: number;
    type: string;
    title: string;
  };
}

const ItemRow: React.FC<ItemRowProps> = ({ item }) => (
  <ItemRowContainer>
    <ItemTitle>
      {item.type === 'Lecture' && <FaFileAlt />}
      {item.type === 'Quiz' && <FaStream />}
      {item.type === 'Assignment' && <FaClipboardList />}
      {item.title}
    </ItemTitle>
  </ItemRowContainer>
);

export default ItemRow;
