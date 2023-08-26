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
import { grayDark, purple } from "./components/theme";

export default function WelcomeEmail({
  domains,
}: {
  domains?: string[];
}): JSX.Element {
  return (
    <Mjml>
      <Head />
      <MjmlBody width={500}>
        <MjmlWrapper cssClass="container">
          <Header title="Welcome again to Flexstart" />
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
                Welcome to Flexstart - A Serverless Kubernetes Platform!
              </MjmlText>
              <MjmlText cssClass="paragraph">
                Apologies for the belated welcome message - I just{" "}
                <a
                  href="https://twitter.com/flexstart_org/status/1579471673325408257"
                  target="_blank"
                >
                  got transactional emails working
                </a>{" "}
                this weekend.
              </MjmlText>
              {domains ? (
                <MjmlText cssClass="paragraph">
                  I noticed that you've been successfully using Flexstart with your
                  custom domain
                  {domains.length > 1 ? "s" : ""}{" "}
                  {domains.map((domain) => (
                    <span key={domain}>
                      <code>
                        <a
                          rel="nofollow"
                          style={{
                            textDecoration: "none",
                            color: `${purple} !important`,
                          }}
                        >
                          {domain}
                        </a>
                      </code>
                      {", "}
                    </span>
                  ))}{" "}
                  and I wanted to reach out to ask if you have any feedback or
                  suggestions for Flexstart? I'd love to hear from you!
                </MjmlText>
              ) : (
                <MjmlText cssClass="paragraph">
                  I noticed that you recently signed up for Flexstart but haven't
                  successfully connected a custom domain yet, and I wanted to
                  reach out to ask if you have any questions about that?
                </MjmlText>
              )}
              <MjmlText cssClass="paragraph">
                In case you missed it, I also revamped our pricing model and
                made it more affordable for everyone. You can read more about it{" "}
                <a
                  href="https://twitter.com/flexstart_org/status/1579466952594292737"
                  target="_blank"
                >
                  here
                </a>
                .
              </MjmlText>
              <MjmlText cssClass="paragraph">
                If you haven't already, here are a few more things you can do:
              </MjmlText>
              <MjmlText cssClass="li">
                •&nbsp;&nbsp;Follow us on{" "}
                <a href="https://twitter.com/flexstart_org/" target="_blank">
                  Twitter
                </a>
              </MjmlText>
              {domains ? (
                <MjmlText cssClass="paragraph" color={grayDark}>
                  P.S.: You'll receive an email from Trustpilot in the next
                  couple of days - if you enjoyed using Flexstart, it would mean a lot
                  if you could leave a review; if not, I'd love to hear what I
                  can do to improve Flexstart!
                </MjmlText>
              ) : (
                <MjmlText cssClass="paragraph">
                  Looking forward to hearing from you!
                </MjmlText>
              )}
              <MjmlText cssClass="paragraph" color={grayDark}>
                Mitesh from Flexstart
              </MjmlText>
              <Divider />
            </MjmlColumn>
          </MjmlSection>
          <Footer unsubscribe />
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
