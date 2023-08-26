export type PlanProps = "free" | "pro" | "enterprise";

export interface Session {
  user: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
  };
}

export interface UserProps {
  id: string;
  name: string;
  namespace: string;
  username: string;
  gh_username: string;
  email: string;
  image: string;
  stripeId: string;
  plan: string;
  usage: number;
  usageLimit: number;
  joinedAt: Date;
  projects?: { projectId: string }[];
}

export interface ProjectProps {
  id: string;
  name: string;
  image: string;
  port: number;
  replicas: number;
  arch?: string;
  secret?: string;
  namespace: string;
  logo?: string;
  usage?: number;
  domain: string;
  domainVerified: boolean;
  ownerUsageLimit?: number;
  ownerExceededUsage?: boolean;
  users?: {
    role: string;
  }[];
}

export interface UsageProps {
  plan: string;
  usage: number;
  usageLimit: number;
  projectCount?: number;
  billingCycleStart?: number;
  ownerUsageLimit?: number;
  ownerExceededUsage?: boolean;
}

export interface SecretProps {
  id: string;
  name: string;
  namespace: string;
}

export interface RootDomainProps {
  target: string;
  rewrite?: boolean;
}

export interface DomainProps {
  slug: string;
  verified: boolean;
  primary: boolean;
  target?: string;
  type: "redirect" | "rewrite";
}

export interface ProjectWithDomainProps extends ProjectProps {
  domains: DomainProps[];
  primaryDomain: DomainProps;
}

export type DomainVerificationStatusProps =
  | "Valid Configuration"
  | "Invalid Configuration"
  | "Pending Verification"
  | "Domain Not Found"
  | "Unknown Error";

export interface TagProps {
  id: string;
  name: string;
  color: TagColorProps;
}

export type TagColorProps =
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "brown";
