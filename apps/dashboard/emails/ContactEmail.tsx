import {
  Mjml,
  MjmlBody,
  MjmlColumn,
  MjmlSection,
  MjmlText,
  MjmlWrapper,
} from "mjml-react";

export default function ContactEmail({
  company,
  email,
  number,
  message,
}: {
  company?: string;
  email: string;
  number?: string;
  message: string;
}): JSX.Element {
  return (
    <Mjml>
      <MjmlBody width={500}>
        <MjmlWrapper cssClass="container">
          <MjmlSection cssClass="smooth">
            <MjmlColumn>
              <MjmlText cssClass="paragraph">
                Company Name: <strong>{company}</strong>
              </MjmlText>
              <MjmlText cssClass="paragraph">
                Email: <strong>{email}</strong>
              </MjmlText>
              <MjmlText cssClass="paragraph">
                Phone number: <strong>{number}</strong>
              </MjmlText>
              <MjmlText cssClass="paragraph">Message: {message}</MjmlText>
            </MjmlColumn>
          </MjmlSection>
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
