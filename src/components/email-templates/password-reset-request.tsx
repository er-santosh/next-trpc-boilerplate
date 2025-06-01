import { Clock, Mail, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Link } from '@/i18n/navigation';

interface PasswordResetRequestTemplateProps {
  name: string;
  resetLink: string;
}

export default function PasswordResetRequestTemplate({
  name,
  resetLink,
}: PasswordResetRequestTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-muted min-h-screen">
      <Card className="w-full bg-card shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Password Reset Request</h1>
          <p className="text-muted-foreground mt-2">We received a request to reset your password</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-foreground">
                  <strong>Hello {name},</strong>
                </p>
                <p className="text-sm text-foreground mt-1">
                  Someone requested a password reset for your account associated with this email
                  address. If this was you, click the button below to reset your password.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
            >
              <Link href={resetLink} target="_blank" rel="noopener noreferrer">
                Reset Your Password
              </Link>
            </Button>
          </div>

          <div className="bg-secondary/50 border border-secondary rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-secondary-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-secondary-foreground">
                  Important Security Information
                </p>
                <ul className="text-sm text-secondary-foreground mt-1 space-y-1">
                  <li>• This link will expire in 24 hours</li>
                  <li>• This link can only be used once</li>
                  <li>• If you didn&apos;t request this, please ignore this email</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Didn&apos;t request this?</h3>
            <p className="text-sm text-muted-foreground">
              If you didn&apos;t request a password reset, you can safely ignore this email. Your
              password will remain unchanged. However, if you&apos;re concerned about the security
              of your account, please contact our support team.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Having trouble?</h3>
            <p className="text-sm text-muted-foreground">
              If the button above doesn&apos;t work, copy and paste the following link into your
              browser:
            </p>
            <div className="bg-muted p-3 rounded border text-sm font-mono text-foreground break-all">
              {resetLink}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 border-t">
          <div className="w-full space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                This email was sent by <strong>NextJs Boilerplate</strong>
              </p>
              <p className="text-sm text-muted-foreground">123 Main Street, City, State 12345</p>
            </div>

            <div className="flex justify-center space-x-4 text-sm">
              <Link href="#" className="text-primary hover:underline">
                Contact Support
              </Link>
              <span className="text-muted-foreground/60">•</span>
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              <span className="text-muted-foreground/60">•</span>
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                © 2024 NextJs Boilerplate. All rights reserved.
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
