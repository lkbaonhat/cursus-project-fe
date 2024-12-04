import { useState } from "react";
import styled from "styled-components";
import { Button } from '@/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next'; 

const BillingDetails = styled.div`
  width: 100%;
  margin-right: 20px;
  padding: 20px;
  border: 1px solid #eee;
  background-color: #fff;
  border-radius: 5px;

  h3 {
    color: #333;
    margin-bottom: 10px;
  }
  hr {
    margin-bottom: 15px;
    width: 50px; 
    color: #ed2a26;
  }
  
  .edit-address {
    font-weight: bold;
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      text-decoration: none; 
    }
  }

  .address-content {
    margin-bottom: 10px;
  }
  min-height: 300px;
`;


const BillingFormContainer = styled.div`
  margin-top: 10px;
  overflow: hidden;
  max-height: 0; 
  transition: max-height 0.3s ease-in-out; 
  opacity: 0;
  transition: opacity 0.3s ease-in-out, max-height 0.3s ease-in-out;

  &.show {
    max-height: 1200px; 
    opacity: 1; 
  }
`;

const FormContainer = styled.div`
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: auto;
  font-family: sans-serif;
  transition: all 0.3s ease-in-out;
  @media (max-width: 768px) { 
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  display: flex; 
  margin-bottom: 15px; 
  width: 100%;
  flex-direction: column; 

  @media (max-width: 768px) { 
    flex-direction: column; 
  }
`;

const LabelGroup = styled.div`
  display: flex; 
  align-items: flex-start; 
  width: 100%; 
`;

const InputGroup2 = styled.div`
  display: flex;
  align-items: flex-start; 
  width: 100%; 
  margin-top: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block; 
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%; 
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 3px;
`;

const SmallInput = styled.input`
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 3px;
  width: 50%;
  margin-bottom: 10px; 
  padding-left: 20px;
`;

const Select = styled.select`
  width: 100%; 
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 3px;
`;

const countryOptions = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "American Samoa", label: "American Samoa" },
  { value: "Argentina", label: "Argentina" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Belgium", label: "Belgium" },
  { value: "Brazil", label: "Brazil" },
  { value: "Canada", label: "Canada" },
  { value: "China", label: "China" },
  { value: "France", label: "France" },
  { value: "Germany", label: "Germany" },
  { value: "Greece", label: "Greece" },
  { value: "India", label: "India" },
  { value: "Italy", label: "Italy" },
  { value: "Japan", label: "Japan" },
  { value: "Mexico", label: "Mexico" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Norway", label: "Norway" },
  { value: "Russia", label: "Russia" },
  { value: "South Africa", label: "South Africa" },
  { value: "South Korea", label: "South Korea" },
  { value: "Spain", label: "Spain" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Turkey", label: "Turkey" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Vietnam", label: "Vietnam" },
];

const BillingDetailsComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation('checkout'); 

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <BillingDetails>
      <h3>{t('checkout.Billing Details')}</h3> 
      <hr />
      <div className="edit-address" onClick={toggleForm}>
        <span>{t('checkout.Edit Address')}</span> 
        <span>{showForm ? "-" : "+"}</span>
      </div>
      <BillingFormContainer
        className={showForm ? 'show' : ''}
      >
        <FormContainer>
          <InputGroup>
            <LabelGroup>
              <Label htmlFor="firstName">{t('checkout.First Name')}</Label>*
              <Label htmlFor="lastName" style={{ marginLeft: "42%" }}>
                {t('checkout.Last Name')}*
              </Label>
            </LabelGroup>
            <InputGroup2>
              <SmallInput
                type="text"
                id="firstName"
                placeholder={t('checkout.First Name')}
              />
              <SmallInput
                type="text"
                id="lastName"
                placeholder={t('checkout.Last Name')}
                style={{ marginLeft: "20px" }}
              />
            </InputGroup2>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="academyName">{t('checkout.Academy Name')}*</Label>
          </InputGroup>
          <InputGroup>
            <Input type="text" id="academyName" placeholder={t('checkout.Academy Name')} />
          </InputGroup>

          <p style={{ textAlign: "left" }}>
            {t('checkout.Ifyou')}
          </p>
          <InputGroup>
            <Label htmlFor="country">{t('checkout.Country')}*</Label>
          </InputGroup>
          <InputGroup>
          <Select id="country">
              {countryOptions.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </Select>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="address1">{t('checkout.Address1')}*</Label>
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              id="address1"
              placeholder={t('checkout.Address1')}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="address2">{t('checkout.Address2')}*</Label>
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              id="address2"
              placeholder={t('checkout.Address2')}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="city">{t('checkout.City')}*</Label>
          </InputGroup>
          <InputGroup>
            <Input type="text" id="city" placeholder={t('checkout.City')} />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="state">{t('checkout.State / Province / Region')}*</Label>
          </InputGroup>
          <InputGroup>
            <Input type="text" id="state" placeholder={t('checkout.State / Province / Region')} />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="zip">{t('checkout.Zip/Postal Code')}*</Label>
          </InputGroup>
          <InputGroup>
            <Input type="text" id="zip" placeholder={t('checkout.Zip/Postal Code')} />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="phone">{t('checkout.Phone Number')}*</Label>
          </InputGroup>
          <InputGroup>
            <Input type="text" id="phone" placeholder={t('checkout.Phone Number')} />
          </InputGroup>

          <Button type="submit" width="25%" border_radius="3px">{t('checkout.Save Changes')}</Button>
        </FormContainer>
      </BillingFormContainer>
      <div className="address-content">
        <p>Joginder Singh</p>
        <p>#1234 Street No. 45, Ward No. 60, Phase 3,</p>
        <p>Shahid Karnail Singh Nagar, Near Pakhowal Road.</p>
        <p>Ludhiana, Punjab, 141013</p>
        <p>India</p>
      </div>
    </BillingDetails>
  );
};

export default BillingDetailsComponent;