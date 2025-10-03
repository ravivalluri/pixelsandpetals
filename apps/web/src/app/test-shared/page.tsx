"use client";
import React from 'react';
import { Button, colors, spacing } from '@/components/ui';

export default function TestSharedComponents() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      padding: spacing[6],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[4],
    }}>
      <h1 style={{
        color: colors.darkGray,
        marginBottom: spacing[6],
        textAlign: 'center'
      }}>
        Shared UI Components Test
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[4],
        alignItems: 'center'
      }}>
        <Button
          title="Primary Button"
          onPress={() => alert('Primary button clicked!')}
          variant="primary"
          size="lg"
        />

        <Button
          title="Secondary Button"
          onPress={() => alert('Secondary button clicked!')}
          variant="secondary"
          size="md"
        />

        <Button
          title="Subtle Button"
          onPress={() => alert('Subtle button clicked!')}
          variant="subtle"
          size="sm"
        />
      </div>

      <p style={{
        color: colors.mediumGray,
        textAlign: 'center',
        marginTop: spacing[6]
      }}>
        These buttons use the same shared UI components as the mobile app!
      </p>
    </div>
  );
}