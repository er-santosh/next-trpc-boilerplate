import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

import { getPasswordResetRequestEmailTemplateStyles } from '@/utils/get-email-template-styles';

interface PasswordResetRequestTemplateProps {
  name: string;
  resetLink: string;
}

export default function PasswordResetRequestTemplate({
  name,
  resetLink,
}: PasswordResetRequestTemplateProps) {
  const styles = getPasswordResetRequestEmailTemplateStyles();

  return (
    <Html lang="en">
      <Head />
      <Preview>Password Reset Request</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.sectionCentered}>
            <div style={styles.headerIconWrapper}>
              <Text style={styles.headerIcon}>LOGO</Text>
            </div>
            <Text style={styles.headerTitle}>Password Reset Request</Text>
            <Text style={styles.headerSubtitle}>We received a request to reset your password</Text>
          </Section>

          <Section style={styles.infoBox}>
            <div>
              <Text style={{ fontSize: 14, margin: 0 }}>
                <strong>Hello {name},</strong>
              </Text>
              <Text style={{ fontSize: 14, marginTop: 8 }}>
                Someone requested a password reset for your account associated with this email
                address. If this was you, click the button below to reset your password.
              </Text>
            </div>
          </Section>

          <Section style={styles.sectionCentered}>
            <Button
              href={resetLink}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.button}
            >
              Reset Your Password
            </Button>
          </Section>

          <Section style={styles.securityBox}>
            <div>
              <Text style={styles.securityTitle}>Important Security Information</Text>
              <ul style={styles.securityList}>
                <li>This link will expire in 24 hours</li>
                <li>This link can only be used once</li>
                <li>If you didn&apos;t request this, please ignore this email</li>
              </ul>
            </div>
          </Section>

          <Hr style={{ borderColor: '#e5e7eb', marginBottom: 24 }} />

          <Section style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                marginBottom: 8,
                color: '#111827',
              }}
            >
              Didn&apos;t request this?
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
              If you didn&apos;t request a password reset, you can safely ignore this email. Your
              password will remain unchanged. However, if you&apos;re concerned about the security
              of your account, please contact our support team.
            </Text>
          </Section>

          <Section style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                marginBottom: 8,
                color: '#111827',
              }}
            >
              Having trouble?
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
              If the button above doesn&apos;t work, copy and paste the following link into your
              browser:
            </Text>
            <Text style={styles.monospaceBox}>{resetLink}</Text>
          </Section>

          <Section style={styles.footer}>
            <Text style={{ marginBottom: 4 }}>
              This email was sent by <strong>NextJs Boilerplate</strong>
            </Text>
            <Text style={{ marginBottom: 12 }}>123 Main Street, City, State 12345</Text>

            <div style={styles.footerLinks}>
              <Link href="#" style={styles.footerLink}>
                Contact Support
              </Link>
              <span style={styles.footerSeparator}>•</span>
              <Link href="#" style={styles.footerLink}>
                Privacy Policy
              </Link>
              <span style={styles.footerSeparator}>•</span>
              <Link href="#" style={styles.footerLink}>
                Terms of Service
              </Link>
            </div>

            <Text style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>
              © {new Date().getFullYear()} NextJs Boilerplate. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
