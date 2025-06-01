import type { CSSProperties } from 'react';

export function getPasswordResetRequestEmailTemplateStyles(): Record<string, CSSProperties> {
  const styles: Record<string, CSSProperties> = {
    body: {
      backgroundColor: '#f9fafb',
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      margin: 0,
      padding: '20px 0',
      color: '#374151',
    },
    container: {
      maxWidth: 600,
      margin: '0 auto',
      padding: 24,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
    },
    headerIconWrapper: {
      width: 64,
      height: 64,
      backgroundColor: '#000000',
      color: '#ffffff',
      borderRadius: '50%',
      margin: '0 auto 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerIcon: {
      textAlign: 'center',
      fontWeight: 'bold',
      width: '100%',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111827',
      margin: 0,
    },
    headerSubtitle: {
      fontSize: 14,
      color: '#6b7280',
      marginTop: 4,
      marginBottom: 0,
    },
    infoBox: {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: 8,
      padding: 16,
      marginBottom: 24,
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
    },
    securityBox: {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
      border: '1px solid #6b7280',
      borderRadius: 8,
      padding: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      marginBottom: 24,
    },
    securityTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#4b5563',
      margin: 0,
    },
    securityList: {
      fontSize: 14,
      color: '#4b5563',
      marginTop: 8,
      paddingLeft: 20,
      marginBottom: 0,
      lineHeight: 1.4,
    },
    button: {
      backgroundColor: '#000000',
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
      borderRadius: 6,
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer',
      padding: '12px 24px',
    },
    sectionCentered: {
      textAlign: 'center',
      paddingBottom: 24,
    },
    footer: {
      borderTop: '1px solid #e5e7eb',
      paddingTop: 16,
      color: '#6b7280',
      fontSize: 12,
      textAlign: 'center',
    },
    footerLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 12,
    },
    footerLink: {
      color: '#3b82f6',
      textDecoration: 'underline',
      fontSize: 12,
    },
    footerSeparator: {
      color: '#9ca3af',
    },
    monospaceBox: {
      backgroundColor: '#f3f4f6',
      padding: 12,
      borderRadius: 6,
      fontFamily: 'monospace, monospace',
      fontSize: 14,
      wordBreak: 'break-all',
      margin: 0,
      color: '#111827',
    },
  };

  return styles;
}
