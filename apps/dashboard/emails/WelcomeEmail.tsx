import {
  Mjml,
  MjmlBody,
  MjmlColumn,
  MjmlImage,
  MjmlSection,
  MjmlText,
  MjmlWrapper,
} from "mjml-react";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import Head from "./components/Head";
import Header from "./components/Header";
import { grayDark } from "./components/theme";

export default function WelcomeEmail({ name }: { name?: string }): JSX.Element {
  return (
    <Mjml>
      <Head />
      <MjmlBody width={500}>
        <MjmlWrapper cssClass="container">
          <Header title="Welcome to Flexstart" />
          <MjmlSection padding="0">
            <MjmlColumn>
              <MjmlImage
                cssClass="hero"
                padding="0"
                align="left"
                src="https://flexstart.org/_static/thumbnail.png"
              />
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection cssClass="smooth">
            <MjmlColumn>
              <MjmlText cssClass="paragraph">
                Thanks for signing up{name && `, ${name}`}, we are excited to
                have you on board! We are excited to have you on board!
              </MjmlText>
              <MjmlText cssClass="paragraph">
                <b> You can run 1 pod for free</b> and explore our quality
                services and features before you migrate your production
                applications.
              </MjmlText>
              <MjmlText cssClass="paragraph">
                Here are a few things you can do:
              </MjmlText>
              <MjmlText cssClass="li">
                •&nbsp;&nbsp;Create a new{" "}
                <a
                  href="https://flexstart.org/dashboard"
                  target="_blank"
                  rel="noreferrer"
                >
                  project
                </a>{" "}
                and add your custom domain
              </MjmlText>
              <MjmlText cssClass="li">
                •&nbsp;&nbsp;If your container image is in private registry you
                have to first create a new{" "}
                <a
                  href="https://flexstart.org/dashboard/secrets"
                  target="_blank"
                  rel="noreferrer"
                >
                  secret
                </a>{" "}
                and then attach it to your project.
              </MjmlText>
              <MjmlText cssClass="li">
                •&nbsp;&nbsp;Follow us on{" "}
                <a
                  href="https://twitter.com/flexstart_org"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </MjmlText>
              <MjmlText cssClass="paragraph">
                Let me know if you have any questions or feedback. I'm always
                happy to help!
              </MjmlText>
              <MjmlText cssClass="paragraph" color={grayDark}>
                Mitesh from Flexstart
              </MjmlText>
              <Divider />
            </MjmlColumn>
          </MjmlSection>
          <Footer />
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
