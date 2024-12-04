import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  width: 100%;
  padding: 50px 150px;
`;

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 20px; 
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const FAQList = styled.ul`
  list-style: none;
  padding: 0;
  width: 80%; 
`;

const FAQItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  width: 100%; 
  
  &:last-child {
    border-bottom: none;
  }
`;


const FAQQuestion = styled.span`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FAQAnswer = styled.div<FAQAnswerProps>`
  font-size: 16px;
  color: #666;
  max-height: ${({ isExpanded }) => (isExpanded ? '100px' : '0')};
  opacity: ${({ isExpanded }) => (isExpanded ? '1' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  margin-top: 10px;
`;
interface FAQAnswerProps {
  isExpanded: boolean;
}

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((i) => i !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const faqItems = [
    { question: 'Is it easy to change plans?', answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.' },
    { question: 'Can I cancel at any time?', answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.' },
    { question: 'Are there any credit card or PayPal fees?', answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.' },
    { question: 'Do I have to choose my plan before I start my trial?', answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.' },
    { question: 'Edututs+ isn’t for me. Can I have a refund?', answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.' },
    { question: 'How do I get my money?', answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.' },
    { question: 'Do I need a credit card to sign up?', answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.' },
    { question: 'Is Edututs+ safe and secure for online transactions?', answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.' },
    { question: 'I still have questions. HELP!', answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.' },
  ];

  return (
    <Container>
      <Wrapper>
        <Title>Membership FAQ</Title>
        <Subtitle>Wait, what about...</Subtitle>
      </Wrapper>
      <FAQList>
        {faqItems.map((item, index) => (
          <FAQItem key={index} onClick={() => toggleExpanded(index)}>
            <FAQQuestion>
              {item.question}
              <span>{expandedItems.includes(index) ? '-' : '+'}</span>
            </FAQQuestion>
            <FAQAnswer isExpanded={expandedItems.includes(index)}>
              {item.answer}
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQList>
    </Container>
  );
};

export default FAQ;
