import { default as FeedbackEmailChild } from "../FeedbackEmail";
import { default as InvalidDomainEmail } from "../InvalidDomain";
import { default as UsageExceededEmail } from "../UsageExceeded";

export function InvalidDomain() {
  return (
    <InvalidDomainEmail
      domain="google.com"
      projectSlug="google"
      invalidDays={14}
    />
  );
}

export function UsageExceeded() {
  return <UsageExceededEmail usage={2406} usageLimit={1000} type="first" />;
}

export function FeedbackEmail() {
  return (
    <FeedbackEmailChild
      email="mitesh@flexstart.org"
      feedback="This is a test feedback email"
    />
  );
}
